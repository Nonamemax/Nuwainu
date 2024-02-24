package com.nuwainu.util;

import lombok.SneakyThrows;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.UUID;

public class SecurityUtil {

	private static final String salt = "PeSXq1BT9xhQ84H38eCp";

	@SneakyThrows(NoSuchAlgorithmException.class)
	public static String encrypt(String password) {
		password = password + salt;
		return Base64.getEncoder().encodeToString(
				MessageDigest.getInstance("SHA-256").digest(
					password.getBytes(StandardCharsets.UTF_8)));
	}

	@SneakyThrows(NoSuchAlgorithmException.class)
	public static String generateActivationCode(String email, String password) {
		var uuid = UUID.randomUUID().toString();
		var code = email + password + salt + uuid;
		var hash = MessageDigest.getInstance("SHA-256").digest(code.getBytes(StandardCharsets.UTF_8));
		return Base64.getUrlEncoder().encodeToString(hash);
	}

}
