package com.nuwainu.pojo;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class FirebaseUserMoney {
	private long currency;
	private long initialized;
	private long score;
	private long claimed;
}