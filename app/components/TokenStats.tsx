'use client';

import { useAccount, useReadContract } from 'wagmi';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../lib/contract';
import { formatEther } from 'viem';
import { FireIcon, ClockIcon, TrophyIcon } from '@heroicons/react/24/solid';
import { useTheme } from '../context/ThemeContext';

export function TokenStats() {
  const { address } = useAccount();
  const { theme } = useTheme();

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
      <div className={`rounded-xl p-8 border shadow-lg ${
        theme === 'retro'
          ? 'retro-card font-retro'
          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
      }`}>
        <p className={`text-center ${
          theme === 'retro'
            ? 'text-[#00ff41]'
            : 'text-gray-600 dark:text-gray-400'
        }`}>
          {theme === 'retro' ? '> CONNECT WALLET TO VIEW STATS' : 'Connect wallet to view stats'}
        </p>
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
      <div className={`rounded-xl p-6 border shadow-lg ${
        theme === 'retro'
          ? 'retro-card font-retro'
          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
      }`}>
        <div className="flex items-center gap-3 mb-2">
          <div className={`p-2 rounded-lg ${
            theme === 'retro'
              ? 'bg-[rgba(255,0,255,0.2)] border-2 border-[#ff00ff]'
              : 'bg-purple-100 dark:bg-purple-500 dark:bg-opacity-20'
          }`}>
            <FireIcon className={`w-6 h-6 ${
              theme === 'retro' ? 'text-[#ff00ff]' : 'text-purple-600 dark:text-purple-400'
            }`} />
          </div>
          <h3 className={`text-sm ${
            theme === 'retro' ? 'text-[#00ff41]' : 'text-gray-600 dark:text-gray-400'
          }`}>
            {theme === 'retro' ? 'YOUR_BALANCE:' : 'Your Balance'}
          </h3>
        </div>
        <p className={`text-3xl font-bold ${
          theme === 'retro' ? 'text-[#00ffff]' : 'text-gray-900 dark:text-white'
        }`}>
          {parseFloat(formatEther(balance)).toFixed(2)} MQT
        </p>
      </div>

      <div className={`rounded-xl p-6 border shadow-lg ${
        theme === 'retro'
          ? 'retro-card font-retro'
          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
      }`}>
        <div className="flex items-center gap-3 mb-2">
          <div className={`p-2 rounded-lg ${
            theme === 'retro'
              ? 'bg-[rgba(0,255,65,0.2)] border-2 border-[#00ff41]'
              : 'bg-green-100 dark:bg-green-500 dark:bg-opacity-20'
          }`}>
            <TrophyIcon className={`w-6 h-6 ${
              theme === 'retro' ? 'text-[#00ff41]' : 'text-green-600 dark:text-green-400'
            }`} />
          </div>
          <h3 className={`text-sm ${
            theme === 'retro' ? 'text-[#00ff41]' : 'text-gray-600 dark:text-gray-400'
          }`}>
            {theme === 'retro' ? 'TOTAL_MINTED:' : 'Total Minted'}
          </h3>
        </div>
        <p className={`text-3xl font-bold ${
          theme === 'retro' ? 'text-[#00ffff]' : 'text-gray-900 dark:text-white'
        }`}>
          {parseFloat(formatEther(minted)).toFixed(2)} MQT
        </p>
      </div>

      <div className={`rounded-xl p-6 border shadow-lg ${
        theme === 'retro'
          ? 'retro-card font-retro'
          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
      }`}>
        <div className="flex items-center gap-3 mb-2">
          <div className={`p-2 rounded-lg ${
            theme === 'retro'
              ? 'bg-[rgba(0,255,255,0.2)] border-2 border-[#00ffff]'
              : 'bg-blue-100 dark:bg-blue-500 dark:bg-opacity-20'
          }`}>
            <ClockIcon className={`w-6 h-6 ${
              theme === 'retro' ? 'text-[#00ffff]' : 'text-blue-600 dark:text-blue-400'
            }`} />
          </div>
          <h3 className={`text-sm ${
            theme === 'retro' ? 'text-[#00ff41]' : 'text-gray-600 dark:text-gray-400'
          }`}>
            {theme === 'retro' ? 'COOLDOWN:' : 'Cooldown'}
          </h3>
        </div>
        <p className={`text-3xl font-bold ${
          theme === 'retro' ? 'text-[#00ffff]' : 'text-gray-900 dark:text-white'
        }`}>
          {cooldownMinutes > 0 ? `${Math.ceil(cooldownMinutes)}m` : (theme === 'retro' ? 'READY!' : 'Ready!')}
        </p>
      </div>

      <div className={`md:col-span-3 rounded-xl p-6 border shadow-lg ${
        theme === 'retro'
          ? 'retro-card font-retro'
          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
      }`}>
        <div className="flex justify-between items-center mb-2">
          <h3 className={`text-sm ${
            theme === 'retro' ? 'text-[#00ff41]' : 'text-gray-600 dark:text-gray-400'
          }`}>
            {theme === 'retro' ? 'GLOBAL_SUPPLY:' : 'Global Supply'}
          </h3>
          <span className={`text-sm ${
            theme === 'retro' ? 'text-[#00ff41]' : 'text-gray-600 dark:text-gray-400'
          }`}>
            {totalSupply && maxSupply 
              ? `${parseFloat(formatEther(totalSupply)).toFixed(0)} / ${parseFloat(formatEther(maxSupply)).toFixed(0)}`
              : '0 / 0'
            }
          </span>
        </div>
        <div className={`w-full rounded-full h-3 overflow-hidden ${
          theme === 'retro'
            ? 'retro-progress'
            : 'bg-gray-200 dark:bg-gray-700'
        }`}>
          <div 
            className={`h-full transition-all duration-500 ${
              theme === 'retro'
                ? 'retro-progress-fill'
                : 'bg-gradient-to-r from-purple-500 to-blue-500'
            }`}
            style={{ width: `${supplyPercentage}%` }}
          />
        </div>
        <p className={`text-xs mt-2 ${
          theme === 'retro' ? 'text-[#00ff41] opacity-70' : 'text-gray-500 dark:text-gray-500'
        }`}>
          {theme === 'retro' 
            ? `// ${supplyPercentage.toFixed(2)}% OF MAX SUPPLY MINTED //`
            : `${supplyPercentage.toFixed(2)}% of max supply minted`
          }
        </p>
      </div>
    </div>
  );
}
