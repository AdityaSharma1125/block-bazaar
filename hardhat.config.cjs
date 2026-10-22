require("@nomicfoundation/hardhat-toolbox");
const { AMOY_RPC, PRIVATE_KEY } = process.env;
module.exports = {
  solidity: "0.8.20",
  networks: AMOY_RPC && PRIVATE_KEY
    ? { amoy: { url: AMOY_RPC, accounts: [PRIVATE_KEY] } }
    : {},
};
