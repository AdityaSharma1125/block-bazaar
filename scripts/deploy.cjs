const { ethers } = require("hardhat");
(async () => {
  const c = await (await ethers.getContractFactory("NFTMarketplace")).deploy();
  await c.waitForDeployment();
  console.log("Add this to .env:\nVITE_CONTRACT_ADDRESS=" + (await c.getAddress()));
})();
