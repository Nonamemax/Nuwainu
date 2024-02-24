'use strict';

function onClickVideo() {
	// let video = document.querySelector(".block1__video-file");
	// 	if (video.paused) {
	// 		video.play();
	// 	} else {
	// 		video.pause();
	// 	}
}

function onClickPlay() {
	document.querySelector(".block1__video-play")
		.classList.add("hidden");
	let video = document.querySelector(".block1__video-file");
	video.play();
	video.controls = true;
}