'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { WalletIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

export function WalletConnect() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-4">
        <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400">Connected</p>
          <p className="font-mono text-sm text-green-600 dark:text-green-400">
            {address.slice(0, 6)}...{address.slice(-4)}
          </p>
        </div>
        <button
          onClick={() => disconnect()}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => connect({ connector: connectors[0] })}
      className="flex items-center gap-2 bg-purple-600 dark:bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors shadow-lg"
    >
      <WalletIcon className="w-5 h-5" />
      Connect Wallet
    </button>
  );
}
