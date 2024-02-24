package com.nuwainu.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;
import com.google.firebase.cloud.FirestoreClient;
import com.nuwainu.pojo.FirebaseUserMoney;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;

@Service
@Slf4j
public class FirebaseServices {


	public Long getCoin(String email) {
		try {
			val uid = getUidByEmail(email);
			val docRef = FirestoreClient.getFirestore()
				.collection("users").document(uid);
			val document = docRef.get().get();
			if (document.exists()) {
				val firebaseUserMoney = document.toObject(FirebaseUserMoney.class);
				return firebaseUserMoney.getScore() - firebaseUserMoney.getClaimed();
			} else {
				System.err.println("No such document. Email: " + email);
				return null;
			}
		} catch (InterruptedException | ExecutionException e) {
			e.printStackTrace();
		}
		return null;
	}

	public boolean checkClaimCoin(String email, long claimed) {

		try {
			val uid = getUidByEmail(email);
			val docRef = FirestoreClient.getFirestore()
				.collection("users").document(uid);

			val document = docRef.get().get();
			if (document.exists()) {
				// val firebaseUserMoney = document.toObject(FirebaseUserMoney.class);
				// val score = firebaseUserMoney.getScore();
				val score = (long)document.get("score");
				val claimedOld = (long)document.get("claimed");
				if ((score - claimed - claimedOld) >= 0) {
					return true;
				}
			}

		} catch (Exception e) {
			log.error("Error in method checkClaimCoin()", e);
		}
		return false;
	}

	public boolean setCoin(String email, long claimed) {
		try {
			val uid = getUidByEmail(email);
			val docRef = FirestoreClient.getFirestore()
				.collection("users").document(uid);

			val document = docRef.get().get();
			if (document.exists()) {
				// val firebaseUserMoney = document.toObject(FirebaseUserMoney.class);
				// val score = firebaseUserMoney.getScore();
				val score = (long)document.get("score");
				val claimedOld = (long)document.get("claimed");
				if ((score - claimed - claimedOld) >= 0) {
					docRef.update("claimed", claimed + claimedOld);
					return true;
				}
			}

		} catch (Exception e) {
			log.error("Error in method setCoin()", e);
		}
		return false;
	}

	public String deleteUser(String name) throws InterruptedException, ExecutionException {
		Firestore db = FirestoreClient.getFirestore();
		ApiFuture<WriteResult> writeResult = db.collection("users").document(name).delete();
		return writeResult.get().getUpdateTime().toString();
	}

	public String getUidByEmail(String email) {
		UserRecord userRecord = null;
		try {
			userRecord = FirebaseAuth.getInstance().getUserByEmail(email);
		} catch (FirebaseAuthException e) {
			e.printStackTrace();
			return null;
		}
		return userRecord.getUid();

	}

	public void getAllUsers() throws FirebaseAuthException {
		var listUsers = FirebaseAuth.getInstance().listUsers(null);
		listUsers.getValues().forEach(exportedUserRecord -> {

		});
		UserRecord userRecord = FirebaseAuth.getInstance().getUser("CYSOnmneyycP2jYJIcQXMAxBHug2");
		System.out.println("Successfully fetched user data: " + userRecord.getEmail());
	}

	public UserRecord createUser(String email, String password, String nickname) {
		var newUser = new UserRecord.CreateRequest();
		newUser.setEmail(email);
		newUser.setPassword(password);
		newUser.setDisplayName(nickname);
		newUser.setDisabled(false);
		newUser.setEmailVerified(true);
		try {
			return FirebaseAuth.getInstance().createUser(newUser);
		} catch (FirebaseAuthException e) {
			e.printStackTrace();
		}
		return null;
	}
}
