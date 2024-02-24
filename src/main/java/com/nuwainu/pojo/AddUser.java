package com.nuwainu.pojo;

import lombok.Data;

@Data
public class AddUser {
	private String key;
	private String userId;
	private String nickname;
	private String avatar;
	private String email;
	private String password;
	// private String googleId;
	// private String appleId;
}
