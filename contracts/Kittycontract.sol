// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./IERC721.sol";
import "./IERC721Receiver.sol";
import "./Ownable.sol";

//Contracts are considered abstract if at least ONE of their functions is not implemented

contract Kittycontract is IERC721, Ownable {

    constructor() IERC721() {}

    string public constant Name = "HelloKitties";
    string public constant Symbol ="HKTS";
    uint public constant MAX_AMOUNT_GEN0 = 1000;
    uint gen0Counter;
    bytes4 internal constant MAGIC_NUMBER = bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"));
    bytes4 private constant INTERFACE_ID_721 = 0x80ac58cd;
    bytes4 private constant INTERFACE_ID_165 = 0x01ffc9a7;

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

   
    function transferFrom(address _from, address _to, uint256 _tokenId) external {

        require(ownership[_tokenId] == msg.sender || approveToken[_tokenId] == msg.sender 
            || operatorApproval[_from][msg.sender] == true, "msg.sender is not owner, nor approved, nor operator");
        require(ownership[_tokenId] == _from, "_from address is not the owner");
        require(_tokenId < allTokens.length, "Token does not exist");
        require(_to != address(0));

        _transfer(_from, _to, _tokenId);
    }

    function safeTransferFrom(address _from, address _to, uint256 _tokenId) public {
        require(ownership[_tokenId] == msg.sender || approveToken[_tokenId] == msg.sender 
            || operatorApproval[_from][msg.sender] == true, "msg.sender is not owner, nor approved, nor operator");
        require(ownership[_tokenId] == _from, "_from address is not the owner");
        require(_tokenId < allTokens.length, "Token does not exist");
        require(_to != address(0));

        _safeTransfer(_from, _to, _tokenId, "");   
    }

    function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes calldata _data) public {
        //Can also put all these checks into a function that returns true (bool)
        require(ownership[_tokenId] == msg.sender || approveToken[_tokenId] == msg.sender 
            || operatorApproval[_from][msg.sender] == true, "msg.sender is not owner, nor approved, nor operator");
        require(ownership[_tokenId] == _from, "_from address is not the owner");
        require(_tokenId < allTokens.length, "Token does not exist");
        require(_to != address(0));

        _safeTransfer(_from, _to, _tokenId, _data);
    }

    function _safeTransfer(address _from, address _to, uint _tokenId, bytes memory _data) public {
        _transfer(_from, _to, _tokenId);
        
        require( _checkERC721Support(_from, _to, _tokenId, _data) );
    }

    function _checkERC721Support(address _from, address _to, uint _tokenId, bytes memory _data) internal returns (bool) {
        //Check if _to is not a contract. If it isn't, then we're dealing with a wallet.
        //The return value will be true and the transfer will go through.
        if( !_isContract(_to) ) {
            return true;
        }

        //Here we call the the onERC721Received() function in the contract/interface at address _to 
        bytes4 returnData = IERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data);
        //And then we check the return value
        return returnData == MAGIC_NUMBER;
    }

    function _isContract(address _to) view internal returns(bool) {
        uint32 size;
        assembly {
            size := extcodesize(_to)    //external code size: checks the code size. 
        }                               //If code size = 0 -> wallet; if code size > 0 -> contract
        return size > 0;                //If the size is > 0, then the return value will be true, which means we're dealing with a 
    }                                   //contract and the the if statement in _checkERC721Support will not be true
 
    function supportsInterface(bytes4 _interfaceId) external pure returns(bool) {
        return ( _interfaceId == INTERFACE_ID_721 || _interfaceId == INTERFACE_ID_165);
    }

    function breed(uint _mumId, uint _dadId) public returns(uint) {
        //Check ownership of mum and dad
        //You got the DNA
        //Figure out the generation of new cat
        //Create a new cat with the new properties, transfer it to the msg.sender

        uint _mumDNA = allTokens[_mumId].genes;
        uint _dadDNA = allTokens[_dadId].genes;

        uint newDNA = _mixDNA(_mumDNA, _dadDNA);
    }

    function _mixDNA(uint _mumDNA, uint _dadDNA) public pure returns(uint) {

        //10 + 20 = 1020    this is what we want to achieve when we "add" the first and second half
        //10 * 100 = 1000
        //1000 + 20 = 1020

        uint firstHalf = _dadDNA / 100000000;
        uint secondHalf = _mumDNA % 100000000;
        uint newDNA = firstHalf * 100000000 + secondHalf;
        return newDNA;
}    

