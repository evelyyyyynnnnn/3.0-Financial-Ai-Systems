// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @notice The same surface written safely. Exists to hold the analyzer's
///         false-positive rate honest: a clean contract must report nothing.
contract SafeVault {
    mapping(address => uint256) public balances;
    address public owner;
    uint256 public feeRate;
    bool private locked;

    modifier onlyOwner() {
        require(msg.sender == owner, "not owner");
        _;
    }

    modifier nonReentrant() {
        require(!locked, "reentrant");
        locked = true;
        _;
        locked = false;
    }

    constructor() {
        owner = msg.sender;
    }

    // checks-effects-interactions: state written before the call
    function withdraw(uint256 amount) external nonReentrant {
        require(balances[msg.sender] >= amount, "insufficient");
        balances[msg.sender] -= amount;
        (bool ok, ) = msg.sender.call{value: amount}("");
        require(ok, "transfer failed");
    }

    // msg.sender, not tx.origin
    function adminSweep(address payable to) external onlyOwner {
        (bool ok, ) = to.call{value: address(this).balance}("");
        require(ok, "sweep failed");
    }

    // return value checked
    function payout(address payable to, uint256 amount) external onlyOwner {
        bool ok = to.send(amount);
        require(ok, "payout failed");
    }

    // guarded
    function setFeeRate(uint256 newRate) external onlyOwner {
        feeRate = newRate;
    }

    receive() external payable {
        balances[msg.sender] += msg.value;
    }
}
