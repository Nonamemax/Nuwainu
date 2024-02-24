'use strict';

function onClickArrow(direction) {
	let currentRect = $(".controls__rectangle-selected");
	let num = parseInt(currentRect.getAttribute("num"));
	let newRect;
	if (direction == "left") {
		newRect = currentRect.previousElementSibling;
		num--;
	} else if (direction == "right") {
		newRect = currentRect.nextElementSibling;
		num++;
	}
	if (newRect === null) {
		if (direction == "left") {
			newRect = $("#controls__rectangles > :last-child");
			num = 8;
		} else {
			newRect = $("#controls__rectangles > :first-child");
			num = 1;
		}
	}
	if (newRect !== null) {
		currentRect.classList.remove("controls__rectangle-selected")
		newRect.classList.add("controls__rectangle-selected");

		id("game").textContent = textArr[num-1].title;
		id("game-text").innerHTML = textArr[num-1].text;
		if (direction == "left") {
			imageToLeft();
		} else {
			imageToRight();
		}
	}
}

let textArr = [
	{
		title: "Game",
		text: "There are no unimportant objects on the way to a great goal. Asteroids, space debris and other items can be very useful in the future. Have a nice flight and may Nuwa be with you."
	},
	{
		title: "Account",
		text: "What is hidden from strangers eyes.<br/>In your personal account, you will find all the necessary personal parameters. Customize them to your needs. Here you will see the public address of your wallet and will be able to check the number of tokens and rewards you have received."
	},
	{
		title: "Account",
		text: "What is hidden from strangers eyes.<br/>In your personal account, you will find all the necessary personal parameters. Customize them to your needs. Here you will see the public address of your wallet and will be able to check the number of tokens and rewards you have received."
	},
	{
		title: "Home_spaceship",
		text: "Dominate in space!<br/>Without your own spaceship, you will not be able to put up a decent resistance to other players. But it's not enough just to have your own ship. It is necessary to constantly upgrade it. With each new upgrade, you get one step closer to Mars."
	},
	{
		title: "Home_character",
		text: "There is no limit to perfection!<br/>To successfully complete the mission, your character must constantly improve. There are no insignificant things here. Any part of your equipment can be decisive and lifesaving in the  battle."
	},
	{
		title: "NFT",
		text: "It is Space shopping time.<br/>Our NFT store has everything that will help you achieve your desired goal. Come here frequently! Do not be stingy, because only those who are in the trend will reach the end!"
	},
	{
		title: "Game",
		text: "There are no unimportant objects on the way to a great goal. Asteroids, space debris and other items can be very useful in the future. Have a nice flight and may Nuwa be with you."
	},
	{
		title: "Game",
		text: "There are no unimportant objects on the way to a great goal. Asteroids, space debris and other items can be very useful in the future. Have a nice flight and may Nuwa be with you."
	}
];
// let animationTimeout = false;

function imageToLeft() {
	// if (animationTimeout) {
	// 	return;
	// }
	// animationTimeout = true;
	let div = id("screenshots__images");
	let imgLeftHidden = $(".screenshots__left-hidden");
	let imgLeft = $(".screenshots__left");
	let imgCenter = $(".screenshots__center");
	let imgRight = $(".screenshots__right");
	let imgRightHidden = $(".screenshots__right-hidden");

	let newImage = document.createElement("img");
	let lastId = Number(imgLeftHidden.src.match(/presentation\/p([1-8])\.jpg/)[1]);

	if (isNaN(lastId)) {
		console.error("Error in the file name.");
		return;
	}

	lastId = lastId === 1 ? 8 : lastId - 1

	newImage.src = `/img/ss/presentation/p${lastId}.jpg`;
	newImage.classList.add("screenshots__left-hidden");
	div.prepend(newImage);

	imgRightHidden.remove();

	imgLeftHidden.classList.remove("screenshots__left-hidden");
	imgLeftHidden.classList.add("screenshots__left");

	imgLeft.classList.remove("screenshots__left");
	imgLeft.classList.add("screenshots__center");

	imgCenter.classList.remove("screenshots__center");
	imgCenter.classList.add("screenshots__right");

	imgRight.classList.remove("screenshots__right");
	imgRight.classList.add("screenshots__right-hidden");

	// setTimeout(() => animationTimeout = false, 900)
}

function imageToRight() {
	// if (animationTimeout) {
	// 	return;
	// }
	// animationTimeout = true;
	let div = id("screenshots__images");
	let imgLeftHidden = $(".screenshots__left-hidden");
	let imgLeft = $(".screenshots__left");
	let imgCenter = $(".screenshots__center");
	let imgRight = $(".screenshots__right");
	let imgRightHidden = $(".screenshots__right-hidden");

	let newImage = document.createElement("img");
	let lastId = Number(imgRightHidden.src.match(/presentation\/p([0-9])\.jpg/)[1]);
	if (isNaN(lastId)) {
		console.error("Error in the file name.");
		return;
	}

	lastId = lastId === 8 ? 1 : lastId + 1

	newImage.src = `/img/ss/presentation/p${lastId}.jpg`;
	newImage.classList.add("screenshots__right-hidden");
	div.appendChild(newImage);

	imgLeftHidden.remove();

	imgLeft.classList.remove("screenshots__left");
	imgLeft.classList.add("screenshots__left-hidden");

	imgCenter.classList.remove("screenshots__center");
	imgCenter.classList.add("screenshots__left");

	imgRight.classList.remove("screenshots__right");
	imgRight.classList.add("screenshots__center");

	imgRightHidden.classList.remove("screenshots__right-hidden");
	imgRightHidden.classList.add("screenshots__right");

	// setTimeout(() => animationTimeout = false, 900)
}

function onClickScreenshot(thiz) {
	if (thiz.classList.contains("screenshots__left")) {
		onClickArrow("left");
	} else if (thiz.classList.contains("screenshots__right")) {
		onClickArrow("right");
	}
	// console.dir(thiz);
	// thiz.children();
	// $(".screenshots__images").childNodes.forEach(item => {
	// 	if (item.classList.contains("screenshots__left")) {
	//
	// 	} else if (item.classList.contains("screenshots__right")) {
	//
	// 	}
	// });
}

(function () {
	id("screenshots__images").addEventListener('click',item => onClickScreenshot(item.target));
})();
