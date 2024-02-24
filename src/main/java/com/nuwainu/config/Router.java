package com.nuwainu.config;

import com.nuwainu.controller.HtmlController;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.reactive.function.server.*;

@Configuration
public class Router {

	@Bean
	public RouterFunction<ServerResponse> home(HtmlController controller) {
		return RouterFunctions
			.route(RequestPredicates.GET("/")
				.and(RequestPredicates.accept(MediaType.TEXT_HTML)), controller::landing)
			.andRoute(RequestPredicates.GET("/mission")
				.and(RequestPredicates.accept(MediaType.TEXT_HTML)), controller::landing)
			.andRoute(RequestPredicates.GET("/road-map")
				.and(RequestPredicates.accept(MediaType.TEXT_HTML)), controller::landing)
			.andRoute(RequestPredicates.GET("/vision")
				.and(RequestPredicates.accept(MediaType.TEXT_HTML)), controller::landing)
			.andRoute(RequestPredicates.GET("/blockchain")
				.and(RequestPredicates.accept(MediaType.TEXT_HTML)), controller::landing)
			.andRoute(RequestPredicates.GET("/game")
				.and(RequestPredicates.accept(MediaType.TEXT_HTML)), controller::landing)
			.andRoute(RequestPredicates.GET("/white-paper")
				.and(RequestPredicates.accept(MediaType.TEXT_HTML)), controller::landing)
			.andRoute(RequestPredicates.GET("/home")
				.and(RequestPredicates.accept(MediaType.TEXT_HTML)), controller::home)
			.andRoute(RequestPredicates.GET("/trade")
				.and(RequestPredicates.accept(MediaType.TEXT_HTML)), controller::trade)
			.andRoute(RequestPredicates.GET("/farms")
				.and(RequestPredicates.accept(MediaType.TEXT_HTML)), controller::farms)
			.andRoute(RequestPredicates.GET("/pools")
				.and(RequestPredicates.accept(MediaType.TEXT_HTML)), controller::pools)
			.andRoute(RequestPredicates.GET("/market")
				.and(RequestPredicates.accept(MediaType.TEXT_HTML)), controller::market)
			.andRoute(RequestPredicates.GET("/info")
				.and(RequestPredicates.accept(MediaType.TEXT_HTML)), controller::info)
			;
	}

}
