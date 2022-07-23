const { ethers } = require('hardhat');
const { expect } = require('chai');

describe('Preservation', function () {
  let deployer, attacker;

  before(async function () {
    [deployer, attacker] = await ethers.getSigners();
    const Preservation = await ethers.getContractFactory('Preservation', deployer);
    const LibraryContract = await ethers.getContractFactory('LibraryContract', deployer);
    const PreservationCoinSolution = await ethers.getContractFactory('PreservationSolution', attacker);

    const libraryContract1 = await LibraryContract.deploy();
    const libraryContract2 = await LibraryContract.deploy();
    this.preservation = await Preservation.deploy(libraryContract1.address, libraryContract2.address);
    this.preservationSolution = await PreservationCoinSolution.deploy(this.preservation.address);
  });

  it('Claims ownership', async function () {
    await this.preservationSolution.attack();

    expect(await this.preservation.owner()).to.be.eq(attacker.address);
  });
});
