package com.nuwainu.model;

import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@NoArgsConstructor
@Document
@TypeAlias("jwt")
public class Jwt {

	@Id
	private String id;
	private String jwtSource;
	private Long issuedAt; // iat - Identifies the time at which the JWT was issued.
	private Long expirationTime; // exp - Identifies the expiration time on and after which the JWT must not be accepted for processing.
	private Long notBefore; // nbf - Identifies the time on which the JWT will start to be accepted for processing.
	private String jwtId; // jti - Case sensitive unique identifier of the token even among different issuers.
	private String userId;
	@CreatedDate
	private Long created;
}
