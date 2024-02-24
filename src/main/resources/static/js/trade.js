'use strict';

function onClickToggle(thiz) {
	if (thiz.classList.value.indexOf("_selected") === -1) {
		onClickDialogBoxClose('settings');

		let buttonSwap = $(".toggle__swap, .toggle__swap_selected");
		let buttonLiquidity = $(".toggle__liquidity, .toggle__liquidity_selected");
		buttonSwap.classList.toggle("toggle__swap");
		buttonSwap.classList.toggle("toggle__swap_selected");
		buttonLiquidity.classList.toggle("toggle__liquidity");
		buttonLiquidity.classList.toggle("toggle__liquidity_selected");

		// Changing the blocks in places
		let blockSwap = $(".swap");
		let blockLiquidity = $(".liquidity");
		blockSwap.classList.toggle("hidden");
		blockLiquidity.classList.toggle("hidden");
	}
}

function onClickSettingsToggle(thiz) {
	thiz.classList.toggle("toggle_on");
}

function onClickDialog(dialogBoxName) {
	let swap = $(".swap");
	let liquidity = $(".liquidity");
	let dialogBox = $("."+dialogBoxName);

	if (swap.classList.contains("hidden")) {
		dialogBox.setAttribute("last_window", "liquidity");
	} else if (liquidity.classList.contains("hidden")) {
		dialogBox.setAttribute("last_window", "swap");
	}

	// $(".toggle").classList.add("hidden");
	swap.classList.add("hidden");
	liquidity.classList.add("hidden");
	dialogBox.classList.remove("hidden");

}

function onClickDialogBoxClose(dialogBoxName) {
	let dialogBox = $("."+dialogBoxName);
	if (dialogBox.classList.contains("hidden")) {
		return;
	}
	let swap = $(".swap");
	let liquidity = $(".liquidity");

	let lastWindow = dialogBox.getAttribute("last_window");
	if (lastWindow === "liquidity") {
		liquidity.classList.remove("hidden");
	} else if (lastWindow === "swap") {
		swap.classList.remove("hidden");
	}
	// $(".toggle").classList.remove("hidden");
	dialogBox.classList.add("hidden");
}

function onClickSlippage(thiz) {
	let spans = thiz.parentElement.querySelectorAll("span");
	if (!thiz.classList.contains("settings__slippage_selected")) {
		spans.forEach(span => span.classList.remove("settings__slippage_selected"));
		thiz.classList.add("settings__slippage_selected");
	}
}

function onClickCurrent(thiz) {

}

