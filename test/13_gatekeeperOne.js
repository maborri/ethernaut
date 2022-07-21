const { ethers } = require('hardhat');
const { expect } = require('chai');

describe('Gatekeeper One', function () {
  const INITIAL_ETH = ethers.utils.parseEther('0.001');
  let deployer, attacker;

  before(async function () {
    [deployer, attacker] = await ethers.getSigners();
    const GatekeeperOne = await ethers.getContractFactory('GatekeeperOne', deployer);
    const GatekeeperOneSolution = await ethers.getContractFactory('GatekeeperOneSolution', attacker);

    this.gatekeeperOne = await GatekeeperOne.deploy();
    this.gatekeeperOneSolution = await GatekeeperOneSolution.deploy(this.gatekeeperOne.address);
  });

  it('Goes to the top', async function () {
    const testAddress = '0x9bE997Fe545FE6e54C068b65f7fE66751EFD06af';
    const last2bytes = `0x${testAddress.slice(testAddress.length - 4, testAddress.length)}`;
    const last2bytesPaded = ethers.utils.zeroPad(last2bytes, 8);
    console.log(last2bytes);
    await this.gatekeeperOneSolution.enter(last2bytesPaded);

    expect(await this.gatekeeperOne.entrant()).to.be.eq(testAddress);
  });
});
