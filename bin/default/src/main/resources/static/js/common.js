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

function href(uri) {
	window.location.href = uri;
}

/*
  ╭──────────╮
  │  Events  │
  ╰──────────╯
*/
// function onScroll() {
//
// }
/**
 * Expand/collapse a menu item
 * @param thiz
 */
function onClickMenuExpand(thiz) {
	// let leaderboard = id("menu-item__leaderboard");
	// let taskCenter = id("menu-item__task-center");
	// let yourProfile = id("menu-item__your_profile");
	// if (leaderboard.style.display === "") {
	// 	leaderboard.style.display = "flex";
	// 	taskCenter.style.display = "flex";
	// 	yourProfile.style.display = "flex";
	// } else {
	// 	leaderboard.style.display = "";
	// 	taskCenter.style.display = "";
	// 	yourProfile.style.display = "";
	// }
	let itemName = thiz.id.split("__")[1];
	let items = $$(`.${itemName}__item`);
	// console.dir(items);
	if (thiz.cust_expanded === undefined || thiz.cust_expanded === false) {
		thiz.cust_expanded = true;
		items.forEach(value => value.style.display = "flex");
	} else {
		thiz.cust_expanded = false;
		items.forEach(value => value.style.display = "");
	}
}

/**
 * Show or hide sidebar menu
 */
function onClickHeaderStart() {
	let nav = id("block-nav");
	let menuUl = $("#nav-menu>ul");
	let compact = nav.getAttribute("compact") === "t";
	let display = window.getComputedStyle(nav).display;

	// if (menu.classList.contains("nav-menu-hidden")) {
	// 	menu.classList.remove("nav-menu-hidden");
	// 	// menu.style.display = "flex";
	// 	// menu.style.position = "fixed";
	// } else {
	// 	menu.classList.add("nav-menu-hidden");
	// 	// menu.style.display = "none";
	// 	// menu.style.position = "fixed";
	// }
	// $$("#block-nav__menu span").


	// if (nav.style.display !== "") {
	// 	if (display === "none") {
	// 		nav.style.display = "flex";
	// 	} else if (display === "flex") {
	// 		nav.style.display = "none";
	// 	} else {
	// 		nav.style.display = "";
	// 	}
	// } else if (display === "flex") {
	// 	nav.style.display = "none";
	// } else if (display === "none") {
	// 	nav.style.display = "flex";
	// }

	if (window.innerWidth > 991) {
		// minimize/maximize
		let menu = id("block-nav__menu");
		menu.classList.toggle("block-nav__menu_compact")
		$(".footer__maximize").classList.toggle("hidden")
		$(".footer__minimize").classList.toggle("hidden")
		// if (menu.classList.contains("block-nav__menu_compact")) {
		// 	menu.classList.remove("block-nav__menu_compact");
		//
		// } else {
		// 	menu.classList.add("block-nav__menu_compact");
		// }
	} else {
		// hide/show
		if (display === "none") {
			nav.style.display = "flex";
		} else {
			nav.style.display = "";
		}
	}
}

function isCompactMenu() {
	return id("block-nav")
		.getAttribute("compact") === "t";
}

function setCompactMenu(value) {
	id("block-nav")
		.setAttribute("compact", value ? "t" : "f");
}

function onScroll(event) {
	// console.log("scrollY = " + window.scrollY);
	// if (window.scrollY <= 70) {
	// 	id("block-header").style.display = "block";
	// } else {
	// 	id("block-header").style.display = "none";
	// }

	// let marginTop = 74 - (window.scrollY <= 74 ? window.scrollY : 74);
	// id("block-nav").style.marginTop =  marginTop + "px";
	// id("block-nav").style.height =  "calc(100% - "+marginTop+"px)";

	let display = window.getComputedStyle(id("block-nav")).display;
	// let hidden = id("block-nav").style.display === "";
	if (display !== "none") {
		// console.log("hidden");
		if (window.scrollY === 0) {
			id("block-nav").classList.remove("block-nav-hidden");
			id("block-nav").classList.add("block-nav");
			id("block-header").classList.remove("block-header-hidden");
			id("block-header").classList.add("block-header");
		} else {
			id("block-header").classList.remove("block-header");
			id("block-header").classList.add("block-header-hidden");
			id("block-nav").classList.remove("block-nav");
			id("block-nav").classList.add("block-nav-hidden");
		}
	}
}

let saveWindowInnerWidth = window.innerWidth;

function onResize(event) {
	// if (window.innerWidth > 991) {
	// 	id("block-nav").classList.remove("hidden");
	// } else {
	// 	id("block-nav").classList.add("hidden");
	// }
	if (saveWindowInnerWidth <= 991 && window.innerWidth > 991) {
		id("block-nav").style.display = "";
	}
	// else if (saveWindowInnerWidth > 991 && window.innerWidth <= 991) {
	//
	// }
	// if (saveWindowInnerWidth <= 767 && window.innerWidth > 767) {
	//
	// }

	saveWindowInnerWidth = window.innerWidth;
}

function onClickDialogLangShow() {
	$(".dialog-lang").style.display = "block";
}

function onClickDialogLangClose() {
	$(".dialog-lang").style.display = "";
}

function setTheme(theme) {
	if (theme !== "light"
		&& theme !== "dark"
		&& theme !== "rocket") {
		console.error(`The "${theme}" theme is not available`);
		return;
	}
	document.cookie = "theme=" + theme;
	document.body.classList.remove("theme-light", "theme-dark", "theme-rocket");
	document.body.classList.add("theme-" + theme);
}

function onClickConnect() {
	let window = $(".window-connect");
	window.classList.remove("hidden");
}

function onСlickCloseWindowConnect() {
	let window = $(".window-connect");
	window.classList.add("hidden");
}

function onСlickSelectWallet(walletName) {
	if (walletName === "metamask") {
		if (typeof window.ethereum !== 'undefined') {
			ethereum.request({ method: 'eth_requestAccounts' });
		} else {

		}
	}
	onСlickCloseWindowConnect();
}

(function () {
	window.addEventListener("resize", onResize)
	// window.addEventListener("scroll", onScroll, {passive: true});
	document.querySelectorAll("img").forEach(img => {
		img.addEventListener("dragstart", function (event) {
			event.preventDefault();
		});
	});
})();