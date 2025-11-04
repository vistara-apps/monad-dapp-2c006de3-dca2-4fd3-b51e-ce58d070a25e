'use client';

import { WalletConnect } from './components/WalletConnect';
import { TokenStats } from './components/TokenStats';
import { MintButton } from './components/MintButton';
import { Achievements } from './components/Achievements';
import { useAccount } from 'wagmi';

export default function Home() {
  const { isConnected } = useAccount();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900 bg-opacity-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Monad Mint Quest
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                Earn tokens on Monad Testnet
              </p>
            </div>
            <WalletConnect />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!isConnected ? (
          <div className="text-center py-20">
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-12 border border-gray-700 max-w-2xl mx-auto">
              <div className="text-6xl mb-6">🎮</div>
              <h2 className="text-4xl font-bold text-white mb-4">
                Welcome to Mint Quest
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Connect your wallet to start minting MQT tokens on Monad Testnet
              </p>
              <div className="bg-gray-900 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold text-white mb-4">How it works:</h3>
                <ul className="text-left text-gray-300 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    <span>Mint 10 MQT tokens every hour</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    <span>Unlock achievements as you collect tokens</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    <span>Track your progress on the leaderboard</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    <span>Experience Monad's high-performance blockchain</span>
                  </li>
                </ul>
              </div>
              <WalletConnect />
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Stats Section */}
            <TokenStats />

            {/* Mint Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <MintButton />
              </div>
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Game Info</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Mint Amount</span>
                    <span className="text-white font-semibold">10 MQT</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Cooldown</span>
                    <span className="text-white font-semibold">1 Hour</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Max Supply</span>
                    <span className="text-white font-semibold">1M MQT</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Network</span>
                    <span className="text-purple-400 font-semibold">Monad Testnet</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements Section */}
            <Achievements />

            {/* Instructions */}
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4">Getting Started</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-purple-500 bg-opacity-20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">1️⃣</span>
                  </div>
                  <h4 className="font-semibold text-white mb-2">Connect Wallet</h4>
                  <p className="text-sm text-gray-400">
                    Connect your Web3 wallet to Monad Testnet
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-500 bg-opacity-20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">2️⃣</span>
                  </div>
                  <h4 className="font-semibold text-white mb-2">Mint Tokens</h4>
                  <p className="text-sm text-gray-400">
                    Click the mint button to receive 10 MQT tokens
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-500 bg-opacity-20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">3️⃣</span>
                  </div>
                  <h4 className="font-semibold text-white mb-2">Unlock Achievements</h4>
                  <p className="text-sm text-gray-400">
                    Collect tokens to unlock special achievements
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-900 bg-opacity-50 backdrop-blur-sm mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-400 text-sm">
            <p>Built on Monad Testnet • Chain ID: 10143</p>
            <p className="mt-2">
              <a 
                href="https://testnet.monad.xyz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                View on Explorer
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
