const { ethers } = require("hardhat");

async function main() {
  /*
  A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts,
  so whitelistContract here is a factory for instances of our Whitelist contract.
  */

  const USDT = await ethers.getContractFactory("USDT");

  // here we deploy the contract
  const deployedTetherTokenContract = await USDT.deploy();
  // 10 is the Maximum number of whitelisted addresses allowed

  // Wait for it to finish deploying
  await deployedTetherTokenContract.deployed();

  // print the address of the deployed contract
  console.log(
    "TetherToken Contract Address:",
    deployedTetherTokenContract.address
  );



  const StakingContract = await ethers.getContractFactory("StakingContract");

  // here we deploy the contract
  const deployedStakingContract = await StakingContract.deploy(deployedTetherTokenContract.address);
  // 10 is the Maximum number of whitelisted addresses allowed

  // Wait for it to finish deploying
  await deployedStakingContract.deployed();

  // print the address of the deployed contract
  console.log("deployedStakingContract Address:", deployedStakingContract.address);


  saveFrontendFiles(deployedStakingContract, "StakingContract");
  saveFrontendFiles(deployedTetherTokenContract, "USDT");

}

// Call the main function and catch if there is any error
function saveFrontendFiles(contract, name) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../../frontend/src/contractsData";

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

//0x1218F612e93e384D13627f247e94aBAf892f1997 USDT
