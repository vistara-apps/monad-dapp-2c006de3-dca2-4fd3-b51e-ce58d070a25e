'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { WalletIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../context/ThemeContext';

export function WalletConnect() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { theme } = useTheme();

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-4">
        <div className={`px-4 py-2 rounded-lg border ${
          theme === 'retro'
            ? 'bg-[rgba(0,255,65,0.1)] border-[#00ff41] font-retro'
            : 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700'
        }`}>
          <p className={`text-sm ${
            theme === 'retro' ? 'text-[#00ff41]' : 'text-gray-600 dark:text-gray-400'
          }`}>
            {theme === 'retro' ? 'CONNECTED:' : 'Connected'}
          </p>
          <p className={`font-mono text-sm ${
            theme === 'retro' ? 'text-[#00ffff]' : 'text-green-600 dark:text-green-400'
          }`}>
            {address.slice(0, 6)}...{address.slice(-4)}
          </p>
        </div>
        <button
          onClick={() => disconnect()}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            theme === 'retro'
              ? 'bg-[#0a0a0a] border-2 border-[#ff0040] text-[#ff0040] hover:bg-[rgba(255,0,64,0.1)] shadow-[0_0_10px_rgba(255,0,64,0.3)] hover:shadow-[0_0_20px_rgba(255,0,64,0.6)] font-retro'
              : 'bg-red-500 text-white hover:bg-red-600'
          }`}
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
          {theme === 'retro' ? 'DISCONNECT' : 'Disconnect'}
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => connect({ connector: connectors[0] })}
      className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all shadow-lg ${
        theme === 'retro'
          ? 'retro-button font-retro'
          : 'bg-purple-600 dark:bg-purple-500 text-white hover:bg-purple-700 dark:hover:bg-purple-600'
      }`}
    >
      <WalletIcon className="w-5 h-5" />
      {theme === 'retro' ? 'CONNECT_WALLET' : 'Connect Wallet'}
    </button>
  );
}
