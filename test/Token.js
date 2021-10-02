const { expect } = require("chai");

describe("Token contract", function () {

    it("(Test) Deployment should assign the total supply of tokens to the owner", async function () {

        // A signer in ethers.js is an object that represents an Ethereum account
        // It is used to send transactions to contracts and other accounts
        // Here we are getting a list of the accounts in the node we are connected to (Hardhat Network) and only keeping the first one
        const [owner] = await ethers.getSigners();

        // ContractFactory in ethers.js is an abstraction used to deploy new smart contracts
        // Token here is a factory for instances of our token contract
        const Token = await ethers.getContractFactory("Token");

        // Calling deploy() on a ContractFactory will start the deployment and return a Promise that resolves to a Contract
        // This is the object that has a method for each of your smart contract functions
        const hardhatToken = await Token.deploy();

        // Once the contract is deployed, we can call our contract methods on hardhatToken and use them to get the balance of the owner account by calling balanceOf()
        const ownerBalance = await hardhatToken.balanceOf(owner.address);

        // here we use our Contract instance (hardhatToken) to call a smart contract function in our Solidity code
        // totalSupply() returns the token's supply amount and we are checking that it's equal to ownerBalance
        expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);

    });

});


// To send a transaction from an account (or Signer in ethers.js) other than the default one, use the connect() method


describe("transactions", function () {
    
    it("(Test) Should transfer tokens between accounts", async function () {

        const [owner, addr1, addr2] = await ethers.getSigners();

        const Token = await ethers.getContractFactory("Token");

        const hardhatToken = await Token.deploy();

        // Transfer 50 tokens from owner to addr1
        await hardhatToken.transfer(addr1.address, 50);
        expect(await hardhatToken.balanceOf(addr1.address)).to.equal(50);

        // Transfer 50 tokens from addr1 to addr2
        await hardhatToken.connect(addr1).transfer(addr2.address, 50);
        expect(await hardhatToken.balanceOf(addr2.address)).to.equal(50);

    });

});