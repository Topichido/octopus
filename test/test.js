const { expect } = require("chai");
const { ethers } = require("hardhat");
const { utils } = require("web3");

describe("OctopusContractExample", function () {
  let octopusExample;
  let octopusCenter;

  beforeEach(async function () {
    const OctopusCenter = await ethers.getContractFactory("OctopusCenter");
    const random32bytes1 = utils.randomHex(32);
    octopusCenter = await OctopusCenter.deploy(random32bytes1);
    await octopusCenter.waitForDeployment();
    console.log("OC", octopusCenter.target);

    const random32bytes2 = utils.randomHex(32);

    const OctopusContractExample = await ethers.getContractFactory(
      "OctopusContractExample"
    );
    octopusExample = await OctopusContractExample.deploy(
      random32bytes2,
      octopusCenter.target,
      3 // set target block number to some value
    );
    await octopusExample.waitForDeployment();
  });

  it("should decrypt the message after the target block number", async function () {
    await ethers.provider.send("evm_mine", [270604191200]);

    // Call the decrypt function
    await octopusExample.decrypt();

    // Check if the MessageEmit event was emitted
    const filter = octopusCenter.filters.MessageEmit();
    const events = await octopusCenter.queryFilter(filter);
    expect(events.length).to.equal(1);
  });
});
