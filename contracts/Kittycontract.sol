// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./IERC721.sol";

//Contractsare considered abstract if at least ONE of their functions is not implemented

abstract contract Kittycontract is IERC721 {

    constructor() IERC721() {}

    uint numberOfTokens;

    struct Token {
        address owner;
        uint NFTId;
        string name;
        string symbol;
    }
    Token[] allTokens;

    mapping(address => uint) tokenAmount;
    mapping(address => Token[]) allTokensPerOwner;

    function balanceOf(address owner) external view returns (uint256 balance) {
        return tokenAmount[owner];
    }

    function allNFTsPerOwner() public view returns (Token[] memory) {
        return allTokensPerOwner[msg.sender];
    }

    function totalSupply() external view returns (uint256 total) {
        return numberOfTokens;
    }

    function name(uint tokenId) external view returns (string memory tokenName) {
        return allTokens[tokenId].name;
    }

    function symbol(uint tokenId) external view returns (string memory tokenSymbol) {
        return allTokens[tokenId].symbol;
    }

    function ownerOf(uint256 tokenId) external view returns (address owner) {
        return allTokens[tokenId].owner;
    }

    function transfer(address to, uint256 tokenId) external {
        require(to != address(0));
        require(to != address(this));
        require(allTokens[tokenId].owner == msg.sender);

        tokenAmount[msg.sender] -= 1;
        tokenAmount[to] += 1;
        allTokens[tokenId].owner = to;

        emit Transfer(msg.sender, to, tokenId);
    }

}