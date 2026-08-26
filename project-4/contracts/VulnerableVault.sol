// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @notice Deliberately vulnerable. Test fixture for the analyzer — never deploy.
contract VulnerableVault {
    mapping(address => uint256) public balances;
    address public owner;
    address public treasury;
    uint256 public feeRate;

    constructor() {
        owner = msg.sender;
    }

    // reentrancy: external call before the state write
    function withdraw(uint256 amount) external {
        require(balances[msg.sender] >= amount, "insufficient");
        (bool ok, ) = msg.sender.call{value: amount}("");
        require(ok, "transfer failed");
        balances[msg.sender] -= amount;
    }

    // tx.origin used for authorization
    function adminSweep(address payable to) external {
        require(tx.origin == owner, "not owner");
        to.transfer(address(this).balance);
    }

    // return value discarded
    function payout(address payable to, uint256 amount) external {
        to.send(amount);
    }

    // selfdestruct with no access control
    function shutdown(address payable to) external {
        selfdestruct(to);
    }

    // randomness from block state
    function drawWinner(address[] calldata players) external view returns (address) {
        uint256 idx = uint256(keccak256(abi.encodePacked(block.timestamp, block.number))) % players.length;
        return players[idx];
    }

    // privileged variable set with no guard
    function setFeeRate(uint256 newRate) external {
        feeRate = newRate;
    }

    receive() external payable {
        balances[msg.sender] += msg.value;
    }
}
