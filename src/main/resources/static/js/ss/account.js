'use strict';

const abi = [{
	"inputs": [{"internalType": "uint256", "name": "_amount", "type": "uint256"}],
	"name": "calcAndClaim",
	"outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"inputs": [{"internalType": "address", "name": "_user", "type": "address"}, {
		"internalType": "uint256",
		"name": "_amount1",
		"type": "uint256"
	}, {"internalType": "uint256", "name": "_amount2", "type": "uint256"}],
	"name": "calculateRewardRateForAddress",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"inputs": [{"internalType": "uint256", "name": "_amount1", "type": "uint256"}, {
		"internalType": "uint256",
		"name": "_amount2",
		"type": "uint256"
	}], "name": "calculateRewardRateForSender", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
	"inputs": [{"internalType": "address", "name": "", "type": "address"}],
	"name": "userReward",
	"outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
	"stateMutability": "view",
	"type": "function"
}, {
	"inputs": [{"internalType": "uint256", "name": "_amount", "type": "uint256"}],
	"name": "withdrawUserReward",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
}];

const contractAddress = "0x473721088287BD13AC8813Da892dDa210a4C36E8";


function onClickClaim(currency) {
	if (currency === 'points') {
		const amount = $("#block3__points input").value;
		if (!isNaN(amount)) {
			checkClaimRewards(amount);
		}
	} else if (currency === 'nft') {
		const nft = $("#block3__nft > input").value;
		// TODO: Need to implement
	}
}

function checkClaimRewards(amount) {
	const scoreNum = Number(amount);
	const scoreFromDB = Number($("#block3__points > span").textContent);
	if (isNaN(scoreFromDB)
		|| isNaN(scoreNum)
		|| scoreNum < 1
		|| scoreNum > scoreFromDB) {
		return;
	}
	try {
		const {ethereum} = window;
		if (ethereum) {
			postJsonRequest({
					amount: amount
				},
				"/space-sweepers/sign",
				async (response) => {
					if (response.ok) {
						console.dir(response);
						await claimRewards(amount, response.nonce, response.signature);
					}
				});
		} else {
			console.log("Ethereum object does not exist");
		}
	} catch (err) {
		console.error(err);
	}
}
async function claimRewards(amount, nonce, signature) {
	console.log("amount: %d, nonce: %d, signature: %s", amount, nonce, signature);
	const abi = [
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "previousOwner",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "newOwner",
					"type": "address"
				}
			],
			"name": "OwnershipTransferred",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "address",
					"name": "signer",
					"type": "address"
				}
			],
			"name": "RewardsClaim",
			"type": "event"
		},
		{
			"inputs": [],
			"name": "owner",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "renounceOwnership",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_address",
					"type": "address"
				}
			],
			"name": "setAuthorizerRole",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "newOwner",
					"type": "address"
				}
			],
			"name": "transferOwnership",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "nonce",
					"type": "uint256"
				},
				{
					"internalType": "address",
					"name": "signer",
					"type": "address"
				},
				{
					"internalType": "bytes32",
					"name": "r",
					"type": "bytes32"
				},
				{
					"internalType": "bytes32",
					"name": "vs",
					"type": "bytes32"
				}
			],
			"name": "verifyAndClaim",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		}
	]
	const contractAddress = "0x21D4FC687757941C11378FBCaF6601498Eb69969";

	try {
		const {ethereum} = window;
		if (ethereum) {
			// id("account__test__loader").classList.remove("unvisible");

			let sig = ethers.utils.splitSignature(signature);
			console.dir("sig: ", sig);
			const provider = new ethers.providers.Web3Provider(ethereum);
			const signer = provider.getSigner();
			const token = new ethers.Contract(contractAddress, abi, signer);

			const amountEther = ethers.utils.parseEther(amount);
			let transaction = await token.verifyAndClaim(amountEther, nonce, signer.getAddress(), sig.r, sig._vs);

			console.log("Transaction:", transaction.hash);

			let gasPrice = transaction.gasPrice
			console.log("Transaction Gas:", ethers.utils.formatUnits(gasPrice, "gwei"))
			// console.dir(transactionReceipt);
			let receipt = await transaction.wait();
			console.log("Receipt Status:", receipt.status);

			if (receipt.status) {
				// id("account__test__loader").classList.add("unvisible");

				$("#block3__points > span").textContent = $("#block3__points > span").textContent - amount
				// postJsonRequest({
				// 		"score": signature
				// 	},
				// 	"/space-sweepers/claim",
				// 	(response) => {
				// 		if (response.ok) {
				// 			loadScore();
				// 		}
				// 	});
			}
		} else {
			console.log("Ethereum object does not exist");
		}
	} catch (err) {
		console.error(err);
	}
}

const claimRewardsOLD = async (score) => {
	const scoreNum = Number(score);
	const scoreFromDB = Number($("#block3__points > span").textContent);
	if (isNaN(scoreFromDB)
		|| isNaN(scoreNum)
		|| scoreNum < 1
		|| scoreNum > scoreFromDB) {
		return;
	}
	try {
		const {ethereum} = window;
		if (ethereum) {
			const provider = new ethers.providers.Web3Provider(ethereum);
			const signer = provider.getSigner();
			const rewardContract = new ethers.Contract(contractAddress, abi, signer);
			const numberOfTokens = ethers.utils.parseUnits(score, 18);
			console.log("Initialize payment, numberOfTokens = " + numberOfTokens);
			const rewardTxn = await rewardContract.calcAndClaim(numberOfTokens);
			console.log("Transaction:", rewardTxn);
			console.log("Claiming... please wait");
			let transactionReceipt = await rewardTxn.wait();
			console.log("Transaction receipt:", transactionReceipt);
			console.log(`Mined, see transaction:https://testnet.bscscan.com/tx/${rewardTxn.hash}`);
			if (transactionReceipt.status) {
				postJsonRequest({
						"score": score
					},
					"/space-sweepers/claim",
					(response) => {
						if (response.ok) {
							loadScore();
						}
					});
			}
		} else {
			console.log("Ethereum object does not exist");
		}
	} catch (err) {
		console.error(err);
	}
}

async function loadBalance() {
	const provider = new ethers.providers.Web3Provider(ethereum);
	const address = ethereum.selectedAddress;
	const balance = await provider.getBalance(address);
	const balanceInBnb = await ethers.utils.formatEther(balance);
	$("#block1__balance > span").textContent = balanceInBnb;
}

function loadScore() {
	getJsonRequest(
		"/space-sweepers/money",
		(response) => {
			// console.log(response.ok);
			if (response.ok) {
				$("#block3__points > span").textContent = response.money;
				// $("#account__nft > span").textContent = response.money.initialized;
			}
			// id("account__test__loader").classList.add("unvisible");
		});
}

function onClickMenu() {
	id("block2__pillar").classList.toggle("block2__pillar--right");
	id("block2__buttons").classList.toggle("block2__buttons--opacity");
}

function onClickChangeAvatar() {

}

function onClickChangeNick() {

}

function onClickChangePassword() {

}

function onClickResetAvatar() {

}

(function () {
	loadScore();

	$("#block1__address > span").textContent = window.localStorage.addr;

	loadBalance();
})();
