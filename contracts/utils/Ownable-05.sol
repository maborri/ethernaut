// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

contract Ownable {
  address public owner;

  constructor() public {
    owner = msg.sender;
  }
}