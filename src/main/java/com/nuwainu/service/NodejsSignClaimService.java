package com.nuwainu.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.nuwainu.pojo.SignClaim;
import com.nuwainu.pojo.Signature;
import com.nuwainu.util.JsonUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.util.Pair;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.time.Duration;

import static com.nuwainu.util.JsonUtil.objectMapper;

@Slf4j
public class NodejsSignClaimService {

	private static String readJson(String json) {
		try {
			return objectMapper.readValue(json, Signature.class).getSignature();
		} catch (JsonProcessingException e) {
			log.error("JSON is invalid");
		}
		return null;
	}

	public static Mono<Pair<String, Long>> sign(long amount, long nonce) {
		try {
			final String amountAndNonceJson = objectMapper
				.createObjectNode()
				.put("amount", amount)
				.put("nonce", nonce)
				.toString();
			log.info("sign json: {}", amountAndNonceJson);
			return WebClient.create("http://localhost:8081")
				.post()
				.uri("/")
				.contentType(MediaType.APPLICATION_JSON)
				.bodyValue(amountAndNonceJson)
				.retrieve()
				.bodyToMono(String.class)
				.flatMap(signatureJson -> Mono.just(Pair.of(readJson(signatureJson), nonce)))
				.timeout(Duration.ofSeconds(30))
				.onErrorResume(throwable -> {
					log.error("Error in method sign()", throwable);
					return Mono.empty();
				});
		} catch (Exception e) {
			log.error("Error in method sign()", e);
			return Mono.empty();
		}
	}

}
