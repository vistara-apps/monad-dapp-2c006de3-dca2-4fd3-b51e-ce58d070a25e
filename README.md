# Monad Mint Quest

A gamified token minting dApp built on Monad Testnet that allows users to mint ERC-20 tokens with cooldown mechanics and achievement tracking.

## Features

- **Token Minting**: Mint 10 MQT tokens every hour
- **Cooldown System**: 1-hour cooldown between mints
- **Achievement System**: Unlock achievements as you collect tokens
- **Real-time Stats**: Track your balance, total minted, and cooldown status
- **Supply Tracking**: Monitor global token supply progress
- **Responsive Design**: Works seamlessly on desktop and mobile

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Blockchain**: Monad Testnet (Chain ID: 10143)
- **Web3**: Wagmi v2, Viem v2
- **Styling**: Tailwind CSS
- **Icons**: Heroicons

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MetaMask or compatible Web3 wallet
- Monad Testnet configured in your wallet

### Installation

1. Install dependencies:
```bash
npm install
```

2. Deploy the smart contract:
   - Compile and deploy `app/contracts/MintQuestToken.sol` to Monad Testnet
   - Update `CONTRACT_ADDRESS` in `app/lib/contract.ts` with your deployed contract address

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Smart Contract

The MintQuestToken contract includes:
- ERC-20 token functionality
- 10 MQT per mint
- 1-hour cooldown period
- 1,000,000 MQT max supply
- Player statistics tracking

### Contract Functions

- `mint()`: Mint 10 tokens (respects cooldown and max supply)
- `transfer(address to, uint256 amount)`: Transfer tokens
- `getPlayerStats(address user)`: Get player balance, minted amount, cooldown, and mint eligibility

## Monad Testnet Configuration

- **Chain ID**: 10143
- **RPC URL**: https://testnet.monad.xyz
- **Explorer**: https://testnet.monad.xyz
- **Native Token**: MON

## Game Mechanics

### Minting
- Mint 10 MQT tokens per transaction
- 1-hour cooldown between mints
- Maximum supply of 1,000,000 MQT

### Achievements
- **First Steps**: Mint 10 tokens
- **Collector**: Mint 100 tokens
- **Enthusiast**: Mint 500 tokens
- **Master Minter**: Mint 1,000 tokens
- **Legend**: Mint 5,000 tokens

## Development

### Project Structure
```
app/
├── components/          # React components
│   ├── WalletConnect.tsx
│   ├── TokenStats.tsx
│   ├── MintButton.tsx
│   └── Achievements.tsx
├── contracts/          # Smart contracts
│   └── MintQuestToken.sol
├── lib/               # Utilities and configs
│   └── contract.ts
├── providers.tsx      # Wagmi configuration
├── page.tsx          # Main page
└── globals.css       # Global styles
```

### Building for Production

```bash
npm run build
npm start
```

## License

MIT License - feel free to use this project for learning and development.

## Support

For issues or questions, please open an issue on GitHub or refer to the [Monad documentation](https://docs.monad.xyz).
