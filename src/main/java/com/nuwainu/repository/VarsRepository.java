package com.nuwainu.repository;

import com.nuwainu.model.Vars;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Mono;

public interface VarsRepository extends ReactiveMongoRepository<Vars, Long> {

}
