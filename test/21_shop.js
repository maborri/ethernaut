const { ethers } = require('hardhat');
const { expect } = require('chai');

describe('Shop', function () {
  let deployer, attacker;

  before(async function () {
    [deployer, attacker] = await ethers.getSigners();
    const Shop = await ethers.getContractFactory('Shop', deployer);
    const ShopSolution = await ethers.getContractFactory('ShopSolution', attacker);

    this.shop = await Shop.deploy();
    this.shopSolution = await ShopSolution.deploy(this.shop.address);
  });

  it('Drops price to zero', async function () {
    await this.shopSolution.buy();

    expect(await this.shop.price()).to.be.eq(0);
  });
});
