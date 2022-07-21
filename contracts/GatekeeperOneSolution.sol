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

  function enter(bytes8 _address) external {


    gateKeeper.enter{gas: 81910}(_address);
  }
}