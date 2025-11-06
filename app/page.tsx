'use client';

import { WalletConnect } from './components/WalletConnect';
import { TokenStats } from './components/TokenStats';
import { MintButton } from './components/MintButton';
import { Achievements } from './components/Achievements';
import { ThemeToggle } from './components/ThemeToggle';
import { useAccount } from 'wagmi';
import { useTheme } from './context/ThemeContext';

export default function Home() {
  const { isConnected } = useAccount();
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'retro' 
        ? 'bg-[#0a0a0a] retro-grid' 
        : 'bg-gradient-to-br from-gray-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900'
    }`}>
      {/* Header */}
      <header className={`border-b transition-all ${
        theme === 'retro'
          ? 'border-[#00ff41] bg-[#0a0a0a] shadow-[0_0_20px_rgba(0,255,65,0.3)]'
          : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 bg-opacity-80 dark:bg-opacity-50 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className={`text-3xl font-bold ${
                theme === 'retro'
                  ? 'neon-text font-retro tracking-wider'
                  : 'bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent'
              }`}>
                {theme === 'retro' ? '> MONAD_MINT_QUEST.EXE' : 'Monad Mint Quest'}
              </h1>
              <p className={`text-sm mt-1 ${
                theme === 'retro'
                  ? 'text-[#00ff41] font-retro'
                  : 'text-gray-600 dark:text-gray-400'
              }`}>
                {theme === 'retro' ? '// EARN TOKENS ON MONAD TESTNET //' : 'Earn tokens on Monad Testnet'}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <WalletConnect />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!isConnected ? (
          <div className="text-center py-20">
            <div className={`rounded-2xl p-12 border max-w-2xl mx-auto shadow-xl ${
              theme === 'retro'
                ? 'retro-card font-retro'
                : 'bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-50 backdrop-blur-sm border-gray-200 dark:border-gray-700'
            }`}>
              <div className="text-6xl mb-6">{theme === 'retro' ? '⚡' : '🎮'}</div>
              <h2 className={`text-4xl font-bold mb-4 ${
                theme === 'retro'
                  ? 'neon-text'
                  : 'text-gray-900 dark:text-white'
              }`}>
                {theme === 'retro' ? '> WELCOME_TO_MINT_QUEST' : 'Welcome to Mint Quest'}
              </h2>
              <p className={`text-xl mb-8 ${
                theme === 'retro'
                  ? 'text-[#00ff41]'
                  : 'text-gray-600 dark:text-gray-400'
              }`}>
                {theme === 'retro' 
                  ? '> CONNECT WALLET TO INITIALIZE PROTOCOL...' 
                  : 'Connect your wallet to start minting MQT tokens on Monad Testnet'}
              </p>
              <div className={`rounded-lg p-6 mb-8 border ${
                theme === 'retro'
                  ? 'bg-[rgba(0,255,65,0.05)] border-[#00ff41]'
                  : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800'
              }`}>
                <h3 className={`text-lg font-semibold mb-4 ${
                  theme === 'retro'
                    ? 'text-[#00ffff]'
                    : 'text-gray-900 dark:text-white'
                }`}>
                  {theme === 'retro' ? '> PROTOCOL_FEATURES:' : 'How it works:'}
                </h3>
                <ul className={`text-left space-y-2 ${
                  theme === 'retro'
                    ? 'text-[#00ff41]'
                    : 'text-gray-700 dark:text-gray-300'
                }`}>
                  <li className="flex items-start gap-2">
                    <span className={theme === 'retro' ? 'text-[#00ffff]' : 'text-purple-600 dark:text-purple-400'}>
                      {theme === 'retro' ? '>' : '•'}
                    </span>
                    <span>{theme === 'retro' ? 'MINT 10 MQT TOKENS EVERY HOUR' : 'Mint 10 MQT tokens every hour'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className={theme === 'retro' ? 'text-[#00ffff]' : 'text-purple-600 dark:text-purple-400'}>
                      {theme === 'retro' ? '>' : '•'}
                    </span>
                    <span>{theme === 'retro' ? 'UNLOCK ACHIEVEMENTS AS YOU COLLECT' : 'Unlock achievements as you collect tokens'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className={theme === 'retro' ? 'text-[#00ffff]' : 'text-purple-600 dark:text-purple-400'}>
                      {theme === 'retro' ? '>' : '•'}
                    </span>
                    <span>{theme === 'retro' ? 'TRACK PROGRESS ON LEADERBOARD' : 'Track your progress on the leaderboard'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className={theme === 'retro' ? 'text-[#00ffff]' : 'text-purple-600 dark:text-purple-400'}>
                      {theme === 'retro' ? '>' : '•'}
                    </span>
                    <span>{theme === 'retro' ? 'EXPERIENCE MONAD HIGH-PERFORMANCE BLOCKCHAIN' : 'Experience Monad\'s high-performance blockchain'}</span>
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
              <div className={`rounded-xl p-6 border shadow-lg ${
                theme === 'retro'
                  ? 'retro-card font-retro'
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
              }`}>
                <h3 className={`text-lg font-semibold mb-4 ${
                  theme === 'retro'
                    ? 'text-[#00ffff]'
                    : 'text-gray-900 dark:text-white'
                }`}>
                  {theme === 'retro' ? '> GAME_INFO' : 'Game Info'}
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className={theme === 'retro' ? 'text-[#00ff41]' : 'text-gray-600 dark:text-gray-400'}>
                      {theme === 'retro' ? 'MINT_AMOUNT:' : 'Mint Amount'}
                    </span>
                    <span className={`font-semibold ${
                      theme === 'retro' ? 'text-[#00ffff]' : 'text-gray-900 dark:text-white'
                    }`}>10 MQT</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={theme === 'retro' ? 'text-[#00ff41]' : 'text-gray-600 dark:text-gray-400'}>
                      {theme === 'retro' ? 'COOLDOWN:' : 'Cooldown'}
                    </span>
                    <span className={`font-semibold ${
                      theme === 'retro' ? 'text-[#00ffff]' : 'text-gray-900 dark:text-white'
                    }`}>1 Hour</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={theme === 'retro' ? 'text-[#00ff41]' : 'text-gray-600 dark:text-gray-400'}>
                      {theme === 'retro' ? 'MAX_SUPPLY:' : 'Max Supply'}
                    </span>
                    <span className={`font-semibold ${
                      theme === 'retro' ? 'text-[#00ffff]' : 'text-gray-900 dark:text-white'
                    }`}>1M MQT</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={theme === 'retro' ? 'text-[#00ff41]' : 'text-gray-600 dark:text-gray-400'}>
                      {theme === 'retro' ? 'NETWORK:' : 'Network'}
                    </span>
                    <span className={`font-semibold ${
                      theme === 'retro' ? 'text-[#ff00ff]' : 'text-purple-600 dark:text-purple-400'
                    }`}>Monad Testnet</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements Section */}
            <Achievements />

            {/* Instructions */}
            <div className={`rounded-xl p-8 border shadow-lg ${
              theme === 'retro'
                ? 'retro-card font-retro'
                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
            }`}>
              <h3 className={`text-xl font-semibold mb-4 ${
                theme === 'retro'
                  ? 'text-[#00ffff]'
                  : 'text-gray-900 dark:text-white'
              }`}>
                {theme === 'retro' ? '> GETTING_STARTED' : 'Getting Started'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                    theme === 'retro'
                      ? 'bg-[rgba(0,255,65,0.2)] border-2 border-[#00ff41]'
                      : 'bg-purple-100 dark:bg-purple-500 dark:bg-opacity-20'
                  }`}>
                    <span className="text-2xl">{theme === 'retro' ? '1' : '1️⃣'}</span>
                  </div>
                  <h4 className={`font-semibold mb-2 ${
                    theme === 'retro'
                      ? 'text-[#00ff41]'
                      : 'text-gray-900 dark:text-white'
                  }`}>
                    {theme === 'retro' ? 'CONNECT_WALLET' : 'Connect Wallet'}
                  </h4>
                  <p className={`text-sm ${
                    theme === 'retro'
                      ? 'text-[#00ff41] opacity-80'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    {theme === 'retro' 
                      ? 'INITIALIZE WEB3 CONNECTION TO MONAD TESTNET' 
                      : 'Connect your Web3 wallet to Monad Testnet'}
                  </p>
                </div>
                <div className="text-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                    theme === 'retro'
                      ? 'bg-[rgba(0,255,65,0.2)] border-2 border-[#00ff41]'
                      : 'bg-purple-100 dark:bg-purple-500 dark:bg-opacity-20'
                  }`}>
                    <span className="text-2xl">{theme === 'retro' ? '2' : '2️⃣'}</span>
                  </div>
                  <h4 className={`font-semibold mb-2 ${
                    theme === 'retro'
                      ? 'text-[#00ff41]'
                      : 'text-gray-900 dark:text-white'
                  }`}>
                    {theme === 'retro' ? 'MINT_TOKENS' : 'Mint Tokens'}
                  </h4>
                  <p className={`text-sm ${
                    theme === 'retro'
                      ? 'text-[#00ff41] opacity-80'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    {theme === 'retro' 
                      ? 'EXECUTE MINT FUNCTION TO RECEIVE 10 MQT' 
                      : 'Click the mint button to receive 10 MQT tokens'}
                  </p>
                </div>
                <div className="text-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                    theme === 'retro'
                      ? 'bg-[rgba(0,255,65,0.2)] border-2 border-[#00ff41]'
                      : 'bg-purple-100 dark:bg-purple-500 dark:bg-opacity-20'
                  }`}>
                    <span className="text-2xl">{theme === 'retro' ? '3' : '3️⃣'}</span>
                  </div>
                  <h4 className={`font-semibold mb-2 ${
                    theme === 'retro'
                      ? 'text-[#00ff41]'
                      : 'text-gray-900 dark:text-white'
                  }`}>
                    {theme === 'retro' ? 'UNLOCK_ACHIEVEMENTS' : 'Unlock Achievements'}
                  </h4>
                  <p className={`text-sm ${
                    theme === 'retro'
                      ? 'text-[#00ff41] opacity-80'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    {theme === 'retro' 
                      ? 'COLLECT TOKENS TO UNLOCK SPECIAL ACHIEVEMENTS' 
                      : 'Collect tokens to unlock special achievements'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className={`border-t mt-20 ${
        theme === 'retro'
          ? 'border-[#00ff41] bg-[#0a0a0a] shadow-[0_0_20px_rgba(0,255,65,0.3)]'
          : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 bg-opacity-80 dark:bg-opacity-50 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className={`text-center text-sm ${
            theme === 'retro'
              ? 'text-[#00ff41] font-retro'
              : 'text-gray-600 dark:text-gray-400'
          }`}>
            <p>{theme === 'retro' ? '> BUILT ON MONAD TESTNET • CHAIN_ID: 10143' : 'Built on Monad Testnet • Chain ID: 10143'}</p>
            <p className="mt-2">
              <a 
                href="https://testnet.monad.xyz" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`transition-colors ${
                  theme === 'retro'
                    ? 'text-[#00ffff] hover:text-[#ff00ff]'
                    : 'text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300'
                }`}
              >
                {theme === 'retro' ? '> VIEW_ON_EXPLORER' : 'View on Explorer'}
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
