require("@nomiclabs/hardhat-waffle");
require("hardhat-abi-exporter");
require("dotenv").config({ path: __dirname + "/.env" });
require("@nomiclabs/hardhat-etherscan");
require("hardhat-contract-sizer");
require("hardhat-gas-reporter");

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.18",
      },
      {
        version: "0.5.16",
      }
    ],
  },

  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337,
      gasPrice: "auto",
    },
    bscnet: {
      url:process.env.RPC_URL,
      chainId: 97,
      gasPrice: "auto",
      accounts:[process.env.PRIVATE_KEY],
    },
    // mainnet: {
    //   url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API}`,
    //   accounts: [`0x${process.env.privateKey}`],
    // },
  },

  // contractSizer: {
  //   alphaSort: true,
  //   disambiguatePaths: false,
  //   runOnCompile: true,
  //   strict: true,
  //   only: [':Staking$',':HESTOKEN$'],
  // },

  mocha: {
    timeout: 1000000,
  },
  gasReporter: {
    currency: "USD",
    gasPrice: "auto",
  },
};