package com.nuwainu.controller;

public class SsContract {

	private String abi = """
		[
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
		""";
	private String contractAddress = "0x21D4FC687757941C11378FBCaF6601498Eb69969";

	public void encode() {

	}
}
