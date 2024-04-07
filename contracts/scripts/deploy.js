const { ethers } = require("hardhat");

async function main() {
  /*
  A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts,
  so whitelistContract here is a factory for instances of our Whitelist contract.
  */

  const RewardToken = await ethers.getContractFactory("RewardToken");

  // here we deploy the contract
  const rewardToken = await RewardToken.deploy();
  // 10 is the Maximum number of whitelisted addresses allowed

  // Wait for it to finish deploying
  await rewardToken.deployed();

  // print the address of the deployed contract
  console.log("rewardToken Contract Address:", rewardToken.address);



  const StakeToken = await ethers.getContractFactory("StakeToken");

  // here we deploy the contract
  const stakeToken = await StakeToken.deploy();
  // 10 is the Maximum number of whitelisted addresses allowed

  // Wait for it to finish deploying
  await stakeToken.deployed();

  // print the address of the deployed contract
  console.log("stakeToken Address:", stakeToken.address);



  const Staking = await ethers.getContractFactory("StakingContract");

  // here we deploy the contract
  const StakingContract = await Staking.deploy(stakeToken.address, rewardToken.address);
  // 10 is the Maximum number of whitelisted addresses allowed

  // Wait for it to finish deploying
  await StakingContract.deployed();

  // print the address of the deployed contract
  console.log("staking Address:", StakingContract.address);






  saveFrontendFiles(rewardToken, "RewardToken");
  saveFrontendFiles(stakeToken, "StakeToken");
  saveFrontendFiles(StakingContract, "StakingContract");
}

// Call the main function and catch if there is any error
function saveFrontendFiles(contract, name) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../../client/src/contractsData";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + `/${name}-address.json`,
    JSON.stringify({ address: contract.address }, undefined, 2)
  );

  const contractArtifact = artifacts.readArtifactSync(name);
  fs.writeFileSync(
    contractsDir + `/${name}.json`,
    JSON.stringify(contractArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

  // rewardToken Contract Address: 0xA64Ec30462486e5cb8a03866d42636aae99e4628
  // stakeToken Address: 0x03B70a4a0A05b0F67A3E90b484783706cF78c684
  // staking Address: 0x50356DF7948EE2db07A640905EDbad7F56C53Cb1
