package com.nuwainu.repository;

import com.nuwainu.model.Session;
import com.nuwainu.model.User;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Mono;

public interface SessionRepository extends ReactiveMongoRepository<Session, String> {



	Mono<Session> findBySession(String session);

}
