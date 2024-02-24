
async function sign(amount, nonce) {

	const ethers = require('./lib/ethers-5.2.umd.min.js')

	const privateKey = "088519fe0cdf6caaab33ab3d39d1980f7fbeecee9e1fccd4611cfdabd6e72fca";
	const wallet = new ethers.Wallet(privateKey);

	amount = ethers.utils.parseEther(String(amount));
	//
	let data = ethers.utils.defaultAbiCoder.encode([ "uint256", "uint256" ], [ amount, nonce ]);
	console.dir("data", data);
	let dataHash = ethers.utils.keccak256(data);
	console.dir("dataHash", dataHash);

	let signature = await wallet.signMessage(ethers.utils.arrayify(dataHash));
	console.log("signature: ", signature);
	let sig = ethers.utils.splitSignature(signature);

	console.log("Signature: ", sig);
	console.log("Recovered: ", ethers.utils.verifyMessage(ethers.utils.arrayify(dataHash), sig));

	return signature;
}

(function webServer() {
	const express = require('express')
	const app = express()
	app.use(express.json())
	app.post('/', async (req, res) => {
		console.dir(req.body)
		// console.log(req.body.amount)
		// console.log(req.body.nonce)
		let signature = await sign(req.body.amount, req.body.nonce)
		res.json({signature: signature})
	});
	app.listen(8081, () => {
	    console.log('Application listening on port 8081')
	});
})();
