const { ethers } = require('hardhat');
const { expect } = require('chai');

describe('Alien Codex', function () {
  let deployer, attacker;

  before(async function () {
    [deployer, attacker] = await ethers.getSigners();
    const AlienCodex = await ethers.getContractFactory('AlienCodex', deployer);
    const AlienCodexSolution = await ethers.getContractFactory('AlienCodexSolution', attacker);

    this.alienCodex = await AlienCodex.deploy();
    this.alienCodexSolution = await AlienCodexSolution.deploy(this.alienCodex.address);
  });

  it('Claims ownership', async function () {
    await this.alienCodexSolution.takeOwnership();

    expect(await this.alienCodex.owner()).to.be.eq(attacker.address);
  });
});
