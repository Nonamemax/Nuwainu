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
	$(".sdf").on
}

// let screen7AnimationTimeout = false;

function onClickToLeft() {
	// if (screen7AnimationTimeout) {
	// 	return;
	// }
	// screen7AnimationTimeout = true;
	let div = document.querySelector(".screen7__images");
	let imgLeftHidden = document.querySelector(".screen7__left-hidden");
	let imgLeft = document.querySelector(".screen7__left");
	let imgCenter = document.querySelector(".screen7__center");
	let imgRight = document.querySelector(".screen7__right");
	let imgRightHidden = document.querySelector(".screen7__right-hidden");

	let newImage = document.createElement("img");
	let lastId = Number(imgLeftHidden.src.match(/s7\-([0-9]{1,2})\./)[1]);
	if (isNaN(lastId)) {
		console.error("Error in the file name.");
		return;
	}
	if (lastId == 1) {
		lastId = 19;
	} else {
		lastId--;
	}
	newImage.src = `/img/landing/s7/s7-${lastId}.jpg`;
	newImage.classList.add("screen7__left-hidden");
	// div.prepend(imgLeftHidden, newImage);
	div.prepend(newImage);

	imgRightHidden.remove();

	imgLeftHidden.classList.remove("screen7__left-hidden");
	imgLeftHidden.classList.add("screen7__left");

	imgLeft.classList.remove("screen7__left");
	imgLeft.classList.add("screen7__center");

	imgCenter.classList.remove("screen7__center");
	imgCenter.classList.add("screen7__right");

	imgRight.classList.remove("screen7__right");
	imgRight.classList.add("screen7__right-hidden");

	// setTimeout(() => screen7AnimationTimeout = false, 900)
}

function onClickToRight() {
	// if (screen7AnimationTimeout) {
	// 	return;
	// }
	// screen7AnimationTimeout = true;
	let div = document.querySelector(".screen7__images");
	let imgLeftHidden = document.querySelector(".screen7__left-hidden");
	let imgLeft = document.querySelector(".screen7__left");
	let imgCenter = document.querySelector(".screen7__center");
	let imgRight = document.querySelector(".screen7__right");
	let imgRightHidden = document.querySelector(".screen7__right-hidden");

	let newImage = document.createElement("img");
	let lastId = Number(imgRightHidden.src.match(/s7\-([0-9]{1,2})\./)[1]);
	if (isNaN(lastId)) {
		console.error("Error in the file name.");
		return;
	}
	if (lastId == 19) {
		lastId = 1;
	} else {
		lastId++;
	}
	newImage.src = `/img/landing/s7/s7-${lastId}.jpg`;
	newImage.classList.add("screen7__right-hidden");
	div.appendChild(newImage);

	imgLeftHidden.remove();

	imgLeft.classList.remove("screen7__left");
	imgLeft.classList.add("screen7__left-hidden");

	imgCenter.classList.remove("screen7__center");
	imgCenter.classList.add("screen7__left");

	imgRight.classList.remove("screen7__right");
	imgRight.classList.add("screen7__center");

	imgRightHidden.classList.remove("screen7__right-hidden");
	imgRightHidden.classList.add("screen7__right");

	// setTimeout(() => screen7AnimationTimeout = false, 900)
}

function onClickDown() {
	$(".screen4").scrollIntoView({
		behavior: 'smooth',
		block: 'start'
	});
}

function onClickBurger() {
	let menu = $(".main-menu");
	menu.style.display = "block";
}

function onClickMenuClose() {
	let menu = $(".main-menu");
	menu.style.display = "";
}

function homeHide() {

}

function toPage(thiz) {
	if (thiz.classList.contains("current")) {
		return;
	}
	let newUri = thiz.getAttribute("page").valueOf();
	window.history.pushState("","", newUri);

	let homeEls = $$(".screen2, .hr3, .screen3, .hr4, .screen4, .hr5, .screen5, .hr51, .screen51, .hr6, .screen6, .hr7, .screen6, .hr7, .screen7")
	let missionEls = $$(".screen9");
	let roadMapEls = $$(".screen10");
	let visionEls = $$(".screen11");

	let currentMenu = $(".main-menu .current");
	if (currentMenu != undefined) {
		currentMenu.classList.toggle("current");
		let currentUri = currentMenu.getAttribute("page").valueOf();
		switch (currentUri) {
			case "/":
				homeEls.forEach(val => val.classList.add("hidden"));
				break;
			case "/mission":
				missionEls.forEach(val => val.classList.add("hidden"));
				break;
			case "/road-map":
				roadMapEls.forEach(val => val.classList.add("hidden"));
				break;
			case "/vision":
				visionEls.forEach(val => val.classList.add("hidden"));
				break;
			case "/market":

				break;
			case "/blockchain":

				break;
			case "/game":

				break;
			case "/white-paper":

				break;
			default:
				console.error("Invalid URI.");
		}
	}

	thiz.classList.toggle("current");

	switch (newUri) {
		case "/":
			homeEls.forEach(val => val.classList.remove("hidden"));
			break;
		case "/mission":
			missionEls.forEach(val => val.classList.remove("hidden"));
			break;
		case "/road-map":
			roadMapEls.forEach(val => val.classList.remove("hidden"));
			break;
		case "/vision":
			visionEls.forEach(val => val.classList.remove("hidden"));
			break;
		case "/market":

			break;
		case "/blockchain":

			break;
		case "/game":

			break;
		case "/white-paper":

			break;
		default:
			console.error("Invalid URI.");
	}
	onClickMenuClose();
}

function selectPageOnStart() {
	let path = document.location.pathname.valueOf().substr(1);
	if (path.length === 0) {
		path = "home";
	}
	let menuItem = $(".main-menu__" + path);
	toPage(menuItem);
}

function onClickScreen2Switcher(thiz) {
	let selected = $(".screen2__text3-switcher span.selected");
	selected.classList.remove("selected");
	thiz.classList.add("selected");
	let newText = thiz.getAttribute("data-text").valueOf();
	$(".screen2__text3").textContent = newText;
}

let launched = false;

function visibleTest(tag) {
	if (launched) {
		return;
	}
	// let targetPosition = {
	// 		top: window.pageYOffset + target.getBoundingClientRect().top,
	// 		left: window.pageXOffset + target.getBoundingClientRect().left,
	// 		right: window.pageXOffset + target.getBoundingClientRect().right,
	// 		bottom: window.pageYOffset + target.getBoundingClientRect().bottom
	// 	},
	// 	windowPosition = {
	// 		top: window.pageYOffset,
	// 		left: window.pageXOffset,
	// 		right: window.pageXOffset + document.documentElement.clientWidth,
	// 		bottom: window.pageYOffset + document.documentElement.clientHeight
	// 	};
	// let top = window.pageYOffset + tag.getBoundingClientRect().top;
	if (tag.getBoundingClientRect().top < document.documentElement.clientHeight) {
		console.log('You see the element.');
		calculateNumbers();
		launched = true;
	}
}

function calculateNumbers() {
	const step = 20;
	const delay = 30;
	const holders = $(".screen4__holders-amount");
	const holdersMaxVal = 2455005;
	const holdersStep = Math.round(holdersMaxVal / step);
	const burned = $(".screen4__burned-amount");
	const burnedMaxVal = 802847952978;
	const burnedStep = Math.round(burnedMaxVal / step);
	const liquidity = $(".screen4__liquidity-amount");
	const liquidityMaxVal = 53488502;
	const liquidityStep = Math.round(liquidityMaxVal / step);
	const capitalization = $(".screen4__capitalization-amount");
	const capitalizationMaxVal = 53488502;
	const capitalizationStep = Math.round(capitalizationMaxVal / step);
	const course = $(".screen4__course-amount");
	const courseMaxVal = 186837;
	const courseStep = Math.round(courseMaxVal / step);


	let i = 0;
	setTimeout(function run() {
		i++;
		// const val = ;
		const regexp = /\B(?=(\d{3})+(?!\d))/g;
		holders.textContent = String(holdersStep * i)
			.replace(regexp, ",");
		burned.textContent = String(burnedStep * i)
			.replace(regexp, ",");
		liquidity.textContent = "$" + String(liquidityStep * i)
			.replace(regexp, ",");
		capitalization.textContent = "$" + String(capitalizationStep * i)
			.replace(regexp, ",");
		course.textContent = String(courseStep * i)
			.replace(regexp, ",") + " USD";
		if (i < step) {
			setTimeout(run, delay + i * 5);
		} else if (i === step) {
			setTimeout(() => {
				holders.textContent = "soon";
				burned.textContent = "soon";
				liquidity.textContent = "soon";
				capitalization.textContent = "soon";
				course.textContent = "soon";
			}, delay + i * 5 + 200);
		}
	}, delay);
}

function onClickPlay() {
	document.querySelector(".screen51__video-play")
		.classList.add("hidden");
	let video = document.querySelector(".screen51__video-file");
	video.play();
	video.controls = true;
}

(function () {
	let divs = $$(".main-menu__inner-wrapper > div");
	divs.forEach(value => {
		value.addEventListener("click", evt => toPage(evt.target));
	})
	window.addEventListener("scroll", evt => {
		visibleTest($(".screen4__holders"));
	})
	selectPageOnStart();
})();
