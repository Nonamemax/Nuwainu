package com.nuwainu.repository;

import com.nuwainu.model.User;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Mono;

public interface UserRepository extends ReactiveMongoRepository<User, String> {

	// @Query(value = "{ _id: { $eq: ?0 } }")
	// Mono<User> findById(String id);

	// @Query(value = "{ _id: { $eq: ?0 } }")
	Mono<User> findByEmail(String email);

	Mono<User> findByEmailAndPassword(String email, String password);

	// @Query(value = "{ codes: { $elemMatch: { $eq: ?0 } } }")
	Mono<User> findByActivationCode(String code);

}
