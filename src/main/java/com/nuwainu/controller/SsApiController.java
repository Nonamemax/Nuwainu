package com.nuwainu.controller;

import com.nuwainu.pojo.AddUser;
import com.nuwainu.pojo.ResponseMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.thymeleaf.util.StringUtils;
import reactor.core.publisher.Mono;

@RestController
public class SsApiController {

	private static final Logger log = LoggerFactory.getLogger(SsApiController.class);


	@PostMapping(value = { "/space-sweepers/newuser"},
			produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseStatus(HttpStatus.OK)
	@ResponseBody
	public Mono<ResponseMessage> newUser(@RequestBody AddUser user) {
		log.info("\n\nRequestBody:\n{}", user.getKey());

		if (user.getKey() != null && user.getKey().equals("08KZjogJV8wgwKW2lNrh7318")) {
			if (StringUtils.isEmpty(user.getUserId()) ||
					StringUtils.isEmpty(user.getAvatar()) ||
					StringUtils.isEmpty(user.getNickname()) ||
					StringUtils.isEmpty(user.getPassword())) {
				var response = ResponseMessage.error("The required field does not exist.");
				return Mono.just(response);
			} else {
				var response = ResponseMessage.success();
				return Mono.just(response);
			}
		} else {
			var response = ResponseMessage.error("The key is incorrect, access is denied.");
			return Mono.just(response);
		}
	}

}
