package com.nuwainu.controller;

import com.nuwainu.model.Session;
import com.nuwainu.model.User;
import com.nuwainu.pojo.*;
import com.nuwainu.repository.SessionRepository;
import com.nuwainu.repository.UserRepository;
import com.nuwainu.repository.VarsRepository;
import com.nuwainu.service.EmailService;
import com.nuwainu.service.FirebaseServices;
import com.nuwainu.service.NodejsSignClaimService;
import com.nuwainu.util.SecurityUtil;
import lombok.val;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseCookie;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

@RestController
@ResponseBody
public class SsRestController {

	private static final Logger log = LoggerFactory.getLogger(SsRestController.class);

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private SessionRepository sessionRepository;

	@Autowired
	private VarsRepository varsRepository;

	@Autowired
	private EmailService emailService;

	@Autowired
	private FirebaseServices firebaseServices;

	@PostMapping(value = {"/space-sweepers/user/activation-code-resend"}, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseStatus(HttpStatus.OK)
	public Mono<ResponseMessage> activationCodeResend(@RequestBody User user) {
		return userRepository
			.findByEmailAndPassword(user.getEmail(), SecurityUtil.encrypt(user.getPassword()))
			.doOnNext(userInRepository ->
				Mono.fromCallable(() -> {
						emailService.sendMail(user.getEmail(),
							"Confirm your new account",
							"Welcome to NUWAINU site!\n\nClick the following link to confirm and activate your new account:\n"
								+ "https://nuwainu.com/verification?code=" + userInRepository.getActivationCode());
						return true;
					})
					.subscribeOn(Schedulers.boundedElastic())
					.subscribe()
			)
			.onErrorResume(throwable -> {
				log.error("Mongo error: {}", throwable.getMessage());
				return Mono.empty();
				//TODO: Need refactoring
			})
			.then(Mono.just(ResponseMessage.success()));
	}

	@PostMapping(value = {"/space-sweepers/user/create"}, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseStatus(HttpStatus.OK)
	public Mono<ResponseMessage> createUser(ServerHttpResponse response, @RequestBody User user) {
		if (!user.getEmail().matches("^[^@]+@[^@]+$")) {
			return Mono.just(ResponseMessage.error("Email is not valid."));
		}
		var savePassword = user.getPassword();
		user.setPassword(SecurityUtil.encrypt(user.getPassword()));
		user.setActivationCode(SecurityUtil.generateActivationCode(user.getEmail(), user.getPassword()));

		String text = "Welcome to NUWAINU site!\n\nClick the following link to confirm and activate your new account:\n"
			+ "https://nuwainu.com/space-sweepers/verification?code=" + user.getActivationCode();
		Mono.fromCallable(() -> {
				emailService.sendMail(user.getEmail(), "Confirm your new account", text);
				return true;
			})
			.subscribeOn(Schedulers.boundedElastic())
			.subscribe();

		return userRepository
			.save(user)
			.map(usr -> firebaseServices.createUser(usr.getEmail(), savePassword, usr.getNick()))
			.onErrorResume(throwable -> {
				log.error("Mongo error: {}", throwable.getMessage());
				return Mono.empty();
				//TODO: Need refactoring
			})
			.then(Mono.create(sink -> {
				var session = new Session(user.getId());
				response.addCookie(
					ResponseCookie
						.from("sessionid", session.getSession())
						.httpOnly(true)
						.path("/")
						.build());
				sessionRepository
					.save(session)
					.then(Mono.just(ResponseMessage.session(session.getSession())))
					.subscribe();
				sink.success();
			}))
			.thenReturn(ResponseMessage.success());
	}

	@PostMapping(value = {"/space-sweepers/user/login"}, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseStatus(HttpStatus.OK)
	public Mono<ResponseMessage> login(ServerHttpResponse response, @RequestBody Login login) {
		val password = SecurityUtil.encrypt(login.getPassword());
		return userRepository
			.findByEmail(login.getEmail())
			.flatMap(user -> {
				if (user.getPassword().equals(password)) {
					var session = new Session(user.getId());
					response.addCookie(
						ResponseCookie
							.from("sessionid", session.getSession())
							.httpOnly(true)
							.path("/")
							.build());
					return sessionRepository
						.save(session)
						.then(Mono.just(ResponseMessage.session(session.getSession())));
				} else {
					return Mono.just(ResponseMessage.success());
				}
			});
	}

	@PostMapping(value = {"/space-sweepers/sign"}, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseStatus(HttpStatus.OK)
	public Mono<ResponseMessage> signClaim(ServerHttpRequest request, @RequestBody SignClaim signClaim) {
		val sessionId = request.getCookies().getFirst("sessionid").getValue();
		if (sessionId != null) {
			return sessionRepository
				.findBySession(sessionId)
				.flatMap(session -> userRepository.findById(session.getUserId()))
				// .flatMap(user -> Mono.just(firebaseServices.checkClaimCoin(user.getEmail(), signClaim.getAmount())))
				.flatMap(user -> Mono.just(firebaseServices.setCoin(user.getEmail(), signClaim.getAmount())))
				.flatMap(scoringIsSuccessful -> {
					if (scoringIsSuccessful) {
						return varsRepository
							.findById(0L)
							.doOnNext(vars -> log.info("nonce: {}", vars.getNonce()))
							.flatMap(vars -> varsRepository.save(vars.inc()))
							.doOnNext(vars -> log.info("nonce after inc: {}", vars.getNonce()))
							.flatMap(vars -> NodejsSignClaimService.sign(signClaim.getAmount(), vars.getNonce()))
							.flatMap(pair -> Mono.just(ResponseMessage.signClaim(
								pair.getFirst(), // signature
								pair.getSecond() // nonce
							)));
					}
					return Mono.just(ResponseMessage.fail());
				});
		}
		return Mono.just(ResponseMessage.fail());
	}

	@PostMapping(value = {"/space-sweepers/claim"}, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseStatus(HttpStatus.OK)
	public Mono<ResponseMessage> claim(ServerHttpRequest request, @RequestBody Claim claim) {
		val sessionId = request.getCookies().getFirst("sessionid").getValue();
		if (sessionId != null) {
			return sessionRepository
				.findBySession(sessionId)
				.flatMap(session -> userRepository.findById(session.getUserId()))
				.flatMap(user -> {
					if (firebaseServices.setCoin(user.getEmail(), claim.getScore())) {
						return Mono.just(ResponseMessage.success());
					}
					return Mono.just(ResponseMessage.fail());
				});
		}
		return Mono.just(ResponseMessage.fail());
	}

	@GetMapping(value = {"/space-sweepers/money"}, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseStatus(HttpStatus.OK)
	public Mono<ResponseMessage> getMoney(ServerHttpRequest request) {
		val sessionId = request.getCookies().getFirst("sessionid").getValue();
		if (sessionId != null) {
			return sessionRepository
				.findBySession(sessionId)
				.flatMap(session -> userRepository.findById(session.getUserId()))
				.flatMap(user -> {
					if (!user.isBanned()/* && user.isActivated()*/) {
						val money = firebaseServices.getCoin(user.getEmail());
						if (money != null) {
							return Mono.just(ResponseMessage.money(money));
						}
					}
					return Mono.just(ResponseMessage.fail());
				});
		}
		return Mono.just(ResponseMessage.fail());
	}
}
