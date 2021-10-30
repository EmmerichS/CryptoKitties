// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./IERC721.sol";
import "./Ownable.sol";

//Contracts are considered abstract if at least ONE of their functions is not implemented

contract Kittycontract is IERC721, Ownable {

    constructor() IERC721() {}

    string public constant Name = "HelloKitties";
    string public constant Symbol ="HKTS";
    uint public constant MAX_AMOUNT_GEN0 = 1000;
    uint gen0Counter;

    event Birth(address owner, uint256 kittenId, uint256 mumId, uint256 dadId, uint256 genes);

    struct Token {
        uint256 genes;
        uint64 birthTime;
        uint32 mumId;
        uint32 dadId;
        uint16 generation;
    }
    Token[] allTokens;

    mapping(uint256 => address) ownership;
    mapping(address => uint) tokenAmount;
    mapping(address => Token[]) allTokensPerOwner;  //My own addition
    mapping(uint => address) public approveToken;
    mapping(address => mapping(address => bool)) private operatorApproval;
    
    function createKittyGen0(uint256 _genes) public onlyOwner returns(uint) {

        require(gen0Counter < MAX_AMOUNT_GEN0, "Maximum amount of Generation 0 cats reached");
        gen0Counter ++;

        return _createKitty(0, 0, 0, _genes, msg.sender);
    }

    function _createKitty(
        uint256 _mumId,
        uint256 _dadId,
        uint256 _generation,
        uint256 _genes,
        address _owner
    ) private returns(uint256 tokenId) {

        Token memory _newKitty = Token({
            mumId: uint32(_mumId),
            dadId: uint32(_dadId),
            generation: uint16(_generation),
            genes: _genes,
            birthTime: uint64(block.timestamp)
        });

        allTokens.push(_newKitty);
        uint256 newKittyId = allTokens.length - 1;

        emit Birth(_owner, newKittyId, _mumId, _dadId, _genes);

        _transfer(address(0), _owner, newKittyId);

        return newKittyId;
    }

    function getKitty(uint tokenId) public view returns(Token memory) {
        return allTokens[tokenId];
    }

    function balanceOf(address owner) external view returns (uint256 balance) {
        return tokenAmount[owner];
    }

    //My own addition
    function allNFTsPerOwner() public view returns (Token[] memory) {
        return allTokensPerOwner[msg.sender];
    }

    function totalSupply() external view returns (uint256 total) {
        return allTokens.length;
    }

    function name() external pure returns (string memory tokenName) {
        return Name;
    }

    function symbol() external pure returns (string memory tokenSymbol) {
        return Symbol;
    }

    function ownerOf(uint256 tokenId) external view returns (address owner) {
        return ownership[tokenId];
    }

    function transfer(address to, uint256 tokenId) external {
        require(to != address(0));
        require(to != address(this));
        require(ownership[tokenId] == msg.sender);
        //require(_owns(msg.sender, tokenId));

        _transfer(msg.sender, to, tokenId);
    }

    function _transfer(address _from, address _to, uint tokenId) internal {
        tokenAmount[_to] ++;
        ownership[tokenId] = _to;

        if(_from != address(0)) {
            tokenAmount[_from] --;
            delete approveToken[tokenId];
        }

        emit Transfer(_from, _to, tokenId);
    }

    function approve(address _approved, uint256 _tokenId) external {
        //require(owns(msg.sender, _tokenId), "Not owner");
        require(ownership[_tokenId] == msg.sender || approveToken[_tokenId] == msg.sender, "Neither owner of token nor approved");
        _approve(_approved, _tokenId);
        emit Approval(msg.sender, _approved, _tokenId);
    }

    function _approve(address _approved, uint256 _tokenId) internal {
        approveToken[_tokenId] = _approved;
    }

    function getApproved(uint256 _tokenId) external view returns (address) {
        require(_tokenId < allTokens.length, "Token does not exist");
        return approveToken[_tokenId];
    }

    function setApprovalForAll(address _operator, bool _approved) external {
        require(msg.sender != _operator, "Owner and operator are the same");
        _setApprovalForAll(_operator, _approved);
        emit ApprovalForAll(msg.sender, _operator, _approved);
    }

    function _setApprovalForAll(address _operator, bool _approved) internal {
        operatorApproval[msg.sender][_operator] = _approved;
    }

    function isApprovedForAll(address _owner, address _operator) external view returns (bool) {
        return operatorApproval[_owner][_operator];
    }

    /*function owns(address claimant, uint tokenId) internal view returns(bool) {
        return ownership[tokenId] == claimant;
    }*/
}    

