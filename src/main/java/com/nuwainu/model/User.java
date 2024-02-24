package com.nuwainu.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.*;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.UUID;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@Data
@NoArgsConstructor
@Document
@TypeAlias("user")
public class User {

	@Id
	private String id;
	@Indexed(unique = true)
	private String email;
	private String password;
	@Indexed(unique = true)
	private String nick;
	private String avatar;
	private boolean banned = false;
	private boolean activated = false;
	private String activationCode;
	@LastModifiedDate
	private long edited;
	@Version
	private int version;
}
