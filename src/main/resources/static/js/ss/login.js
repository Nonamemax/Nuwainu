'use strict';

function onClickEye() {
	let type = $(".login__password-input").type;
	if (type === "password") {
		$(".login__password-input").type = "text";
		id("login__eye-hide").classList.add("hidden");
		id("login__eye-show").classList.remove("hidden");
	} else {
		$(".login__password-input").type = "password";
		id("login__eye-show").classList.add("hidden");
		id("login__eye-hide").classList.remove("hidden");
	}
}

function onChangeInput() {
	let email = $(".login__email-input");
	let password = $(".login__password-input");
	let enterBtn = $(".login__enter");
	if (email.value.length > 5
		&& email.value.includes("@")
		&& password.value.length > 6) {
		if (enterBtn.classList.contains("login__enter-inactive")) {
			enterBtn.classList.add("login__enter-active");
			enterBtn.classList.remove("login__enter-inactive");
		}
	} else {
		if (enterBtn.classList.contains("login__enter-active")) {
			enterBtn.classList.remove("login__enter-active");
			enterBtn.classList.add("login__enter-inactive");
		}
	}
}

function onChangeInputNick() {
	let nick = $(".login__nick-input");
	let checkBox = $(".login__check-box");
	let enterBtn = $(".login__enter");
	if (nick.value.length > 3) {
		if (enterBtn.classList.contains("login__enter-inactive")) {
			enterBtn.classList.remove("login__enter-inactive");
			enterBtn.classList.add("login__enter-active");
		}
	} else {
		if (enterBtn.classList.contains("login__enter-active")) {
			enterBtn.classList.remove("login__enter-active");
			enterBtn.classList.add("login__enter-inactive");
		}
	}
}

function createUser(email, password, nick) {
	let httpReq = new XMLHttpRequest();
	let json = JSON.stringify({
		nick: nick,
		email: email,
		password: password
	});
	httpReq.responseType = 'json';
	httpReq.open("POST", '/space-sweepers/user/create');
	httpReq.setRequestHeader('Content-type', 'application/json');
	httpReq.onload = function () {
		if (this.status == 200) {
			console.log("Response:", this.response)
			try {
				let resp = this.response;
				if (resp.ok) {

				}
			} catch (err) {
				console.error("Status: " + this.status, err);
			}
		} else {
			console.error("Status: " + this.status);
		}
	};
	httpReq.onerror = function () {
		console.error("Status: " + this.status);
	};
	httpReq.send(json);
}

function login(email, password) {
	postJsonRequest({
			email: email,
			password: password
		},
		"/space-sweepers/user/login",
		response => {
			if (response.ok) {
				window.location.href = "/space-sweepers/account";
			}
		});
}

function onClickEnter() {
	let email = $(".login__email");
	let password = $(".login__password");
	let nick = $(".login__nick");
	let enter = $(".login__enter");
	let link = $(".login__link");
	let verif = id("login__verification");
	if (window.location.search === "?signup"
		&& enter.classList.contains("login__enter-active")) {
		if (window.location.hash === "") {
			email.classList.add("hidden");
			password.classList.add("hidden");
			nick.classList.remove("hidden");
			enter.classList.remove("login__enter-active")
			enter.classList.add("login__enter-inactive")
			// window.history.pushState()
			window.location = "#nick";
			$(".login__nick-input").focus();
		} else if (window.location.hash === "#nick") {
			createUser(
				$(".login__email-input").value,
				$(".login__password-input").value,
				$(".login__nick-input").value
			);
			nick.classList.add("hidden");
			verif.classList.remove("hidden");
			enter.classList.add("hidden");
			link.classList.add("hidden");
			window.location.href = "#verif";
		} else if (window.location.hash === "#verif") {
			window.location.href = "/space-sweepers/account";
		}
	} else if (window.location.search === "?signin"
		&& enter.classList.contains("login__enter-active")) {
		login(
			$(".login__email-input").value,
			$(".login__password-input").value
		);
	}
}

function onClickResend() {
	postJsonRequest({
			email: email,
			password: password
		},
		"/space-sweepers/user/activation-code-resend",
		response => {
			if (response.ok) {
				window.location.href = "/space-sweepers/account";
			}
		});
}

function onKeyUpEnter(event) {
	if (event.key === "Enter") {
		switch (document.activeElement.id) {
			case "login__email-input":
				id("login__password-input").focus();
				break;
			case "login__password-input":
			case "login__nick-input":
				onClickEnter();
				break;
			case "":
				if (window.location.hash === "#verif") {
					onClickEnter();
				}
				break;
		}
	}
}

(function () {
	SVGInjector($$('img.inject-me'));
	if (window.location.hash.includes("#")) {
		window.location.href = "";
	}
})();
