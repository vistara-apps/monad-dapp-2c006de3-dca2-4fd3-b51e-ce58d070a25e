// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MintQuestToken {
    string public name = "MintQuest Token";
    string public symbol = "MQT";
    uint8 public decimals = 18;
    uint256 public totalSupply;
    
    uint256 public constant MINT_AMOUNT = 10 * 10**18; // 10 tokens per mint
    uint256 public constant COOLDOWN_PERIOD = 1 hours;
    uint256 public constant MAX_SUPPLY = 1000000 * 10**18; // 1 million tokens
    
    mapping(address => uint256) public balanceOf;
    mapping(address => uint256) public lastMintTime;
    mapping(address => uint256) public totalMinted;
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Mint(address indexed to, uint256 amount, uint256 totalMinted);
    
    function mint() external {
        require(totalSupply + MINT_AMOUNT <= MAX_SUPPLY, "Max supply reached");
        require(block.timestamp >= lastMintTime[msg.sender] + COOLDOWN_PERIOD, "Cooldown active");
        
        balanceOf[msg.sender] += MINT_AMOUNT;
        totalSupply += MINT_AMOUNT;
        lastMintTime[msg.sender] = block.timestamp;
        totalMinted[msg.sender] += MINT_AMOUNT;
        
        emit Transfer(address(0), msg.sender, MINT_AMOUNT);
        emit Mint(msg.sender, MINT_AMOUNT, totalMinted[msg.sender]);
    }
    
    function transfer(address to, uint256 amount) external returns (bool) {
        require(balanceOf[msg.sender] >= amount, "Insufficient balance");
        
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
        
        emit Transfer(msg.sender, to, amount);
        return true;
    }
    
    function getCooldownRemaining(address user) external view returns (uint256) {
        if (lastMintTime[user] == 0) return 0;
        
        uint256 nextMintTime = lastMintTime[user] + COOLDOWN_PERIOD;
        if (block.timestamp >= nextMintTime) return 0;
        
        return nextMintTime - block.timestamp;
    }
    
    function getPlayerStats(address user) external view returns (
        uint256 balance,
        uint256 minted,
        uint256 cooldown,
        bool canMint
    ) {
        balance = balanceOf[user];
        minted = totalMinted[user];
        
        if (lastMintTime[user] == 0) {
            cooldown = 0;
            canMint = true;
        } else {
            uint256 nextMintTime = lastMintTime[user] + COOLDOWN_PERIOD;
            cooldown = block.timestamp >= nextMintTime ? 0 : nextMintTime - block.timestamp;
            canMint = cooldown == 0 && totalSupply + MINT_AMOUNT <= MAX_SUPPLY;
        }
    }
}
