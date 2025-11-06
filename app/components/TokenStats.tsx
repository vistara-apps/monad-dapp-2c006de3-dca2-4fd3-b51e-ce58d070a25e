'use client';

import { useAccount, useReadContract } from 'wagmi';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../lib/contract';
import { formatEther } from 'viem';
import { FireIcon, ClockIcon, TrophyIcon } from '@heroicons/react/24/solid';

export function TokenStats() {
  const { address } = useAccount();

  const { data: playerStats } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'getPlayerStats',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
      refetchInterval: 5000,
    },
  });

  const { data: totalSupply } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'totalSupply',
    query: {
      refetchInterval: 5000,
    },
  });

  const { data: maxSupply } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'MAX_SUPPLY',
  });

  if (!address || !playerStats) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg">
        <p className="text-gray-600 dark:text-gray-400 text-center">Connect wallet to view stats</p>
      </div>
    );
  }

  const [balance, minted, cooldown] = playerStats;
  const cooldownMinutes = Number(cooldown) / 60;
  const supplyPercentage = totalSupply && maxSupply 
    ? (Number(totalSupply) / Number(maxSupply)) * 100 
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-purple-100 dark:bg-purple-500 dark:bg-opacity-20 p-2 rounded-lg">
            <FireIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-gray-600 dark:text-gray-400 text-sm">Your Balance</h3>
        </div>
        <p className="text-3xl font-bold text-gray-900 dark:text-white">
          {parseFloat(formatEther(balance)).toFixed(2)} MQT
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-green-100 dark:bg-green-500 dark:bg-opacity-20 p-2 rounded-lg">
            <TrophyIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-gray-600 dark:text-gray-400 text-sm">Total Minted</h3>
        </div>
        <p className="text-3xl font-bold text-gray-900 dark:text-white">
          {parseFloat(formatEther(minted)).toFixed(2)} MQT
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-blue-100 dark:bg-blue-500 dark:bg-opacity-20 p-2 rounded-lg">
            <ClockIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-gray-600 dark:text-gray-400 text-sm">Cooldown</h3>
        </div>
        <p className="text-3xl font-bold text-gray-900 dark:text-white">
          {cooldownMinutes > 0 ? `${Math.ceil(cooldownMinutes)}m` : 'Ready!'}
        </p>
      </div>

      <div className="md:col-span-3 bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-gray-600 dark:text-gray-400 text-sm">Global Supply</h3>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {totalSupply && maxSupply 
              ? `${parseFloat(formatEther(totalSupply)).toFixed(0)} / ${parseFloat(formatEther(maxSupply)).toFixed(0)}`
              : '0 / 0'
            }
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-purple-500 to-blue-500 h-full transition-all duration-500"
            style={{ width: `${supplyPercentage}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
          {supplyPercentage.toFixed(2)}% of max supply minted
        </p>
      </div>
    </div>
  );
}
