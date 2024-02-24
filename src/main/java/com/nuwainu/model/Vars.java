package com.nuwainu.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document
@TypeAlias("vars")
public class Vars {

	@Id
	private Long id;
	private long nonce;

	public Vars inc() {
		nonce++;
		return this;
	}
}
