package com.nuwainu.pojo;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.util.Pair;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResponseMessage {

	private boolean ok = true;
	private String error;
	private String session;
	private Long money;
	private String signature;
	private Long nonce;

	public static ResponseMessage success() {
		var resp = new ResponseMessage();
		return resp;
	}

	public static ResponseMessage fail() {
		var resp = new ResponseMessage();
		resp.ok = false;
		return resp;
	}

	public static ResponseMessage error(final String error) {
		var resp = new ResponseMessage();
		resp.ok = false;
		resp.error = error;
		return resp;
	}

	public static ResponseMessage session(final String session) {
		var resp = new ResponseMessage();
		resp.session = session;
		return resp;
	}
	public static ResponseMessage money(final long money) {
		var resp = new ResponseMessage();
		resp.money = money;
		return resp;
	}
	public static ResponseMessage signClaim(final String signature, final Long nonce) {
		var resp = new ResponseMessage();
		resp.signature = signature;
		resp.nonce = nonce;
		return resp;
	}
}
