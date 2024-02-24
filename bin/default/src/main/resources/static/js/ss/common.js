'use strict';

function id(elementId) {
	return document.getElementById(elementId);
}

function $(selector) {
	return document.querySelector(selector);
}

function $$(selector) {
	return document.querySelectorAll(selector);
}

function postJsonRequest(data, url, callback) {
	let json = JSON.stringify(data);
	let httpReq = new XMLHttpRequest();
	httpReq.responseType = "json";
	httpReq.open("POST", url);
	httpReq.setRequestHeader("Content-type", "application/json");
	httpReq.onload = function () {
		if (this.status == 200) {
			if (typeof this.response !== "undefined"
				&& typeof this.response.ok === "boolean") {
				callback(this.response);
			} else {
				console.error("Status: " + this.status, err);
				callback({ok: false});
			}
		} else {
			console.error("Status: " + this.status);
			callback({ok: false, status: this.status});
		}
	};
	httpReq.onerror = function () {
		console.error("Status: " + this.status);
		callback({ok: false, status: this.status});
	};
	httpReq.send(json);
}

function getJsonRequest(url, callback) {
	let httpReq = new XMLHttpRequest();
	httpReq.responseType = "json";
	httpReq.open("GET", url);
	httpReq.onload = function () {
		if (this.status == 200) {
			if (typeof this.response !== "undefined"
				&& typeof this.response.ok === "boolean") {
				callback(this.response);
			} else {
				console.error("Status: " + this.status, err);
				callback({ok: false});
			}
		} else {
			console.error("Status: " + this.status);
			callback({ok: false, status: this.status});
		}
	};
	httpReq.onerror = function () {
		console.error("Status: " + this.status);
		callback({ok: false, status: this.status});
	};
	httpReq.send();
}

function onClickConnectWallet() {
	// if (id("block-header__wallet-text").classList.contains("wallet-selected")) {
	//
	// } else {
		let wallet = id("block-header__wallet");
		let dialogBox = id("block-header__wallet-dialog-box");
		let blackout = id("blackout");
		if (!wallet.classList.contains("block-header__wallet-dialog_show")) {
			wallet.classList.add("block-header__wallet-dialog_show")
			dialogBox.classList.remove("hidden");
			blackout.classList.remove("hidden");
		} else {
			wallet.classList.remove("block-header__wallet-dialog_show")
			dialogBox.classList.add("hidden");
			blackout.classList.add("hidden");
		}
	// }
}

function onClickSignInUp(thiz) {

}

function onClickDialogBoxMetamask() {
	if (typeof window.ethereum !== 'undefined') {
		ethereum.request({method: 'eth_requestAccounts'});
		if (ethereum.isMetaMask === true) {
			let address = ethereum.selectedAddress.substring(0, 6);
			address += "…" + ethereum.selectedAddress.substring(37);
			id("block-header__wallet-text").textContent = address;
			id("block-header__wallet-text").classList.add("wallet-selected");
			localStorage.setItem("addr", address);
		}
	} else {

	}
	onClickConnectWallet();
}

function onClickBlackout() {
	onClickConnectWallet();
}

function loadAddress() {
	let address = localStorage.getItem("addr");
	if (address != null) {
		id("block-header__wallet-text").textContent = address;
		id("block-header__wallet-text").classList.add("wallet-selected");
	}
}

(function () {
	let path = window.location.pathname;
	if (path.includes("home")) {
		id("block-header__home").classList.add("selected");
	} else if (path.includes("presentation")) {
		id("block-header__presentation").classList.add("selected");
	} else if (path.includes("roadmap")) {
		id("block-header__roadmap").classList.add("selected");
	}

	// let rect = id("block-header__wallet-text").getBoundingClientRect();
	// id("block-header__wallet-dialog-box").style.top = (rect.top + rect.height + 15) + "px";
	// id("block-header__wallet-dialog-box").style.left = rect.left + "px";

	loadAddress();
})();