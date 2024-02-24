package com.nuwainu.controller;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

@Component
@Controller
public class HtmlController {

    public Mono<ServerResponse> start(ServerRequest request) {
        return ServerResponse
                .ok()
                .contentType(MediaType.TEXT_HTML)
                .render("landing");
    }

    public Mono<ServerResponse> home(ServerRequest request) {
        return ServerResponse
                .ok()
                .contentType(MediaType.TEXT_HTML)
                .render("home");
    }

    public Mono<ServerResponse> trade(ServerRequest request) {
        return ServerResponse
            .ok()
            .contentType(MediaType.TEXT_HTML)
            .render("trade");
    }

    public Mono<ServerResponse> landing(ServerRequest request) {
        return ServerResponse
            .ok()
            .contentType(MediaType.TEXT_HTML)
            .render("landing");
    }

    public Mono<ServerResponse> farms(ServerRequest request) {
        return ServerResponse
            .ok()
            .contentType(MediaType.TEXT_HTML)
            .render("farms");
    }

    public Mono<ServerResponse> pools(ServerRequest request) {
        return ServerResponse
            .ok()
            .contentType(MediaType.TEXT_HTML)
            .render("pools");
    }

    public Mono<ServerResponse> market(ServerRequest request) {
        return ServerResponse
            .ok()
            .contentType(MediaType.TEXT_HTML)
            .render("market");
    }

    public Mono<ServerResponse> info(ServerRequest request) {
        return ServerResponse
            .ok()
            .contentType(MediaType.TEXT_HTML)
            .render("info");
    }

    public Mono<ServerResponse> ssHome(ServerRequest request) {
        return ServerResponse
            .ok()
            .contentType(MediaType.TEXT_HTML)
            .render("ss-home");
    }

    public Mono<ServerResponse> ssPresentation(ServerRequest request) {
        return ServerResponse
            .ok()
            .contentType(MediaType.TEXT_HTML)
            .render("ss-presentation");
    }

    public Mono<ServerResponse> ssRoadmap(ServerRequest request) {
        return ServerResponse
            .ok()
            .contentType(MediaType.TEXT_HTML)
            .render("ss-roadmap");
    }

    public Mono<ServerResponse> ssLogin(ServerRequest request) {
        return ServerResponse
            .ok()
            .contentType(MediaType.TEXT_HTML)
            .render("ss-login");
    }

    public Mono<ServerResponse> ssAccount(ServerRequest request) {
        return ServerResponse
            .ok()
            .contentType(MediaType.TEXT_HTML)
            .render("ss-account");
    }
}
