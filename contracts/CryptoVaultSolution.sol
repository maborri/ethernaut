// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./CryptoVault.sol";

contract CryptoVaultSolution is IDetectionBot {
  address private vault;

  constructor(address _vault) public {
    vault = _vault;
  }

  function handleTransaction(address user, bytes calldata) external override {
    address to;
    uint256 value;
    address origSender;

    assembly {
      to := calldataload(0x68)
      value := calldataload(0x88)
      origSender := calldataload(0xa8)
    }
    
    if (origSender == vault) {
      Forta(msg.sender).raiseAlert(user);
    }
  }
}