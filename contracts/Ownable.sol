// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Ownable {

    address owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Caller is not owner");
        _;
    }
}