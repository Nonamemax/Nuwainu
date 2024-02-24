package com.nuwainu.controller;

import com.nuwainu.model.User;
import com.nuwainu.repository.SessionRepository;
import com.nuwainu.repository.UserRepository;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.thymeleaf.spring5.context.webflux.IReactiveDataDriverContextVariable;
import org.thymeleaf.spring5.context.webflux.ReactiveDataDriverContextVariable;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.net.URI;

@Controller
@RequestMapping("/space-sweepers")
public class SsHtmlController {

	@Autowired
	private SessionRepository sessionRepository;

	@Autowired
	private UserRepository userRepository;

	private void user(ServerHttpRequest request, Model model) {
		val cookieSessionId = request.getCookies().getFirst("sessionid");
		if (cookieSessionId != null && !cookieSessionId.getValue().isEmpty()) {
			val sessionId = cookieSessionId.getValue();

			Mono<User> user = sessionRepository
				.findBySession(sessionId)
				.flatMap(session -> userRepository.findById(session.getUserId()));
			model.addAttribute("user", user);
		}
	}

	@GetMapping("/home")
	public String home(ServerHttpRequest request, Model model) {
		user(request, model);
		return "ss-home";
	}

	@GetMapping("/presentation")
	public String presentation(ServerHttpRequest request, Model model) {
		user(request, model);
		return "ss-presentation";
	}

	@GetMapping("/roadmap")
	public String roadmap(ServerHttpRequest request, Model model) {
		user(request, model);

		return "ss-roadmap";
	}

	@GetMapping("/account")
	public String account(ServerHttpRequest request, Model model) {
		user(request, model);
		return "ss-account";
	}

	@GetMapping("/login")
	public String login(ServerHttpRequest request, Model model) {
		user(request, model);

		return "ss-login";
	}


	@GetMapping("/verification")
	@ResponseStatus(HttpStatus.TEMPORARY_REDIRECT)
	public Mono<Void> verificationNewUser(@RequestParam String code, ServerHttpResponse response) {
		response.getHeaders().setLocation(URI.create("/space-sweepers/home"));
		return userRepository
			.findByActivationCode(code)
			.map(usr -> usr.setActivated(true))
			.map(usr -> usr.setActivationCode(null))
			.flatMap(userRepository::save)
			.then(response.setComplete());
	}

}
