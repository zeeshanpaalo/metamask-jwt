// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const customERC20 = await hre.ethers.deployContract(
    "CustomERC20",
    [1000000],
    {
      value: hre.ethers.parseEther("0"),
    }
  );

  await customERC20.waitForDeployment();
  console.log("deployed to address");
  console.log(customERC20.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
