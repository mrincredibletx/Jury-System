require("@nomicfoundation/hardhat-toolbox");
const { PrivateKey } = require("./secret.json");

module.exports = {
  defaultNetwork: "testnet",
  networks: {
    hardhat: {},
    testnet: {
      url: "https://rpc.test2.btcs.network", // CoreDAO testnet
      chainId: 1114,
      accounts: [PrivateKey]
    }
  },
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
