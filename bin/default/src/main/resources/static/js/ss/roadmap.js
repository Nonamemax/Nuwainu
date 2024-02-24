'use strict';

let textArr = [
	{
		title: "Q3 2022",
		text: "Start testnet, listing testflight, sale nft ships.<br/>A game that was created at the MVP stage with a better rendered picture, functionality and quality. The passage of the game allows players to improve their professional level and move up to the second level."
	},
	{
		title: "Q4 2022",
		text: "Listing App Store, testing mainnet, sale nft outer space.<br/>A game that will allow users to fully immerse themselves into the strategy of the game, where users will have to invest time and money to fully immerse themselves in the strategy and search for partnerships among the players. Possibility of full integration into the game universe."
	},
	{
		title: "Q1 2023",
		text: "Test app metaverse, release metaverse.<br/>The game that will force the participants to become part of the team and the development of the company.<br/>The game in which the participants will be tasked to delve into the game and, having received a mission, go to the final point of building the Metaverse, capturing planets, Mars and others. Building cities on it."
	}
];

function onClickButton(thiz) {
	let quarter = thiz.textContent;
	textArr.some((item) => {
		if (quarter === item.title) {
			id("roadmap__title").textContent = item.title;
			id("roadmap__text").innerHTML = item.text;
			$(".button__selected").classList.remove("button__selected");
			thiz.classList.add("button__selected");
			return true;
		}
	});
}