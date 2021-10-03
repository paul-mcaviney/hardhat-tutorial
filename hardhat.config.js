require("@nomiclabs/hardhat-waffle");
require('dotenv').config()


// Go to alchemyapi.io and create a new app
// You will need the provate key for the app
// Be sure to add it to the .env file so you don't accidentally push it to a public repo

// Do the same with your Ropsten Private Key from your metamask wallet
// Open Metamask and switch to the Ropsten Network
// go to Account Details > Export Private Key
// DO NOT PUT REAL ETHER INTO TEST ACCOUNTS
// DO NOT PUSH YOUR PRIVATE KEYS EVER!


/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
      ropsten: {
          url: process.env.ALCHEMY_URL,
          accounts: [process.env.ROPSTEN_PRIVATE_KEY],
      },
  },
};
