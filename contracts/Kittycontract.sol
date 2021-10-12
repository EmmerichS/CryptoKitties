// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./IERC721.sol";

//Contractsare considered abstract if at least ONE of their functions is not implemented

abstract contract Kittycontract is IERC721 {

    constructor() IERC721() {}

    uint allNFTs;
    uint tokenId;

    struct Token {
        address owner;
        uint id;
        string name;
        string symbol;
    }

    mapping(address => uint) NFTamount;
    mapping(address => Token) token;

    function balanceOf(address owner) external view returns (uint256 balance) {
        return NFTamount[owner];
    }

    function totalSupply() external view returns (uint256 total) {
        return allNFTs;
    }

    function name() external view returns (string memory tokenName) {
        return token[msg.sender].name;
    }

    function symbol() external view returns (string memory tokenSymbol) {
        return token[msg.sender].symbol;
    }

}