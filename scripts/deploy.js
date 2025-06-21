const hre = require("hardhat");

async function main() {
  console.log("🚀 Deploying Lock...");

  const Lock = await hre.ethers.getContractFactory("Lock");
  const contract = await Lock.deploy(); // no args to constructor
  await contract.waitForDeployment();

  console.log(`✅ Contract deployed at: ${contract.target}`);
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});
