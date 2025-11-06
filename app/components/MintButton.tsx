'use client';

import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../lib/contract';
import { useState, useEffect } from 'react';
import { SparklesIcon, ClockIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { useTheme } from '../context/ThemeContext';

export function MintButton() {
  const { address } = useAccount();
  const { theme } = useTheme();
  const [countdown, setCountdown] = useState(0);

  const { data: playerStats } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'getPlayerStats',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
      refetchInterval: 1000,
    },
  });

  const { 
    writeContract, 
    data: hash,
    isPending: isWritePending,
    error: writeError 
  } = useWriteContract();

  const { 
    isLoading: isConfirming, 
    isSuccess: isConfirmed,
    error: confirmError 
  } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (playerStats) {
      const [, , cooldown] = playerStats;
      setCountdown(Number(cooldown));
    }
  }, [playerStats]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown(prev => Math.max(0, prev - 1));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  const handleMint = () => {
    writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: CONTRACT_ABI,
      functionName: 'mint',
    });
  };

  const handleReset = () => {
    setCountdown(0);
  };

  if (!address) {
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
          {theme === 'retro' ? '> CONNECT WALLET TO MINT TOKENS' : 'Connect wallet to mint tokens'}
        </p>
      </div>
    );
  }

  const canMint = playerStats ? playerStats[3] : false;
  const isPending = isWritePending || isConfirming;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`rounded-xl p-8 border shadow-lg ${
      theme === 'retro'
        ? 'retro-card font-retro'
        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
    }`}>
      <div className="text-center mb-6">
        <h2 className={`text-2xl font-bold mb-2 ${
          theme === 'retro'
            ? 'text-[#00ffff]'
            : 'text-gray-900 dark:text-white'
        }`}>
          {theme === 'retro' ? '> MINT_TOKENS' : 'Mint Tokens'}
        </h2>
        <p className={theme === 'retro' ? 'text-[#00ff41]' : 'text-gray-600 dark:text-gray-400'}>
          {theme === 'retro' ? '// EARN 10 MQT TOKENS EVERY HOUR //' : 'Earn 10 MQT tokens every hour'}
        </p>
      </div>

      {isConfirmed && (
        <div className={`mb-6 border rounded-lg p-4 flex items-center gap-3 ${
          theme === 'retro'
            ? 'bg-[rgba(0,255,65,0.1)] border-[#00ff41]'
            : 'bg-green-50 dark:bg-green-500 dark:bg-opacity-10 border-green-500'
        }`}>
          <CheckCircleIcon className={`w-6 h-6 flex-shrink-0 ${
            theme === 'retro' ? 'text-[#00ff41]' : 'text-green-600 dark:text-green-400'
          }`} />
          <div>
            <p className={`font-semibold ${
              theme === 'retro' ? 'text-[#00ff41]' : 'text-green-700 dark:text-green-400'
            }`}>
              {theme === 'retro' ? '> MINT_SUCCESSFUL!' : 'Mint Successful!'}
            </p>
            <p className={`text-sm ${
              theme === 'retro' ? 'text-[#00ff41] opacity-80' : 'text-green-600 dark:text-gray-400'
            }`}>
              {theme === 'retro' ? '// 10 MQT ADDED TO BALANCE //' : '10 MQT added to your balance'}
            </p>
          </div>
        </div>
      )}

      {(writeError || confirmError) && (
        <div className={`mb-6 border rounded-lg p-4 flex items-center gap-3 ${
          theme === 'retro'
            ? 'bg-[rgba(255,0,64,0.1)] border-[#ff0040]'
            : 'bg-red-50 dark:bg-red-500 dark:bg-opacity-10 border-red-500'
        }`}>
          <XCircleIcon className={`w-6 h-6 flex-shrink-0 ${
            theme === 'retro' ? 'text-[#ff0040]' : 'text-red-600 dark:text-red-400'
          }`} />
          <div>
            <p className={`font-semibold ${
              theme === 'retro' ? 'text-[#ff0040]' : 'text-red-700 dark:text-red-400'
            }`}>
              {theme === 'retro' ? '> TRANSACTION_FAILED' : 'Transaction Failed'}
            </p>
            <p className={`text-sm ${
              theme === 'retro' ? 'text-[#ff0040] opacity-80' : 'text-red-600 dark:text-gray-400'
            }`}>
              {(writeError || confirmError)?.message?.slice(0, 100)}
            </p>
          </div>
        </div>
      )}

      <button
        onClick={handleMint}
        disabled={!canMint || isPending || countdown > 0}
        className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all flex items-center justify-center gap-3 ${
          theme === 'retro'
            ? canMint && !isPending && countdown === 0
              ? 'retro-button'
              : 'bg-[#0a0a0a] border-2 border-[#004d1a] text-[#004d1a] cursor-not-allowed'
            : canMint && !isPending && countdown === 0
              ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-lg hover:scale-105'
              : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed'
        }`}
      >
        {isPending ? (
          <>
            <div className={`w-5 h-5 border-2 rounded-full animate-spin ${
              theme === 'retro'
                ? 'border-[#00ff41] border-t-transparent'
                : 'border-white border-t-transparent'
            }`} />
            {isConfirming ? (theme === 'retro' ? 'CONFIRMING...' : 'Confirming...') : (theme === 'retro' ? 'MINTING...' : 'Minting...')}
          </>
        ) : countdown > 0 ? (
          <>
            <ClockIcon className="w-6 h-6" />
            {theme === 'retro' ? `COOLDOWN: ${formatTime(countdown)}` : `Cooldown: ${formatTime(countdown)}`}
          </>
        ) : (
          <>
            <SparklesIcon className="w-6 h-6" />
            {theme === 'retro' ? 'MINT 10 MQT' : 'Mint 10 MQT'}
          </>
        )}
      </button>

      <button
        onClick={handleReset}
        className={`mt-4 w-full py-4 px-6 rounded-lg font-semibold text-lg transition-colors ${
          theme === 'retro'
            ? 'bg-[#0a0a0a] border-2 border-[#ff0040] text-[#ff0040] hover:bg-[rgba(255,0,64,0.1)] shadow-[0_0_10px_rgba(255,0,64,0.3)] hover:shadow-[0_0_20px_rgba(255,0,64,0.6)]'
            : 'bg-red-500 text-white hover:bg-red-600'
        }`}
      >
        {theme === 'retro' ? 'RESET_COUNTER' : 'Reset Counter'}
      </button>

      {countdown > 0 && (
        <div className="mt-4">
          <div className={`w-full rounded-full h-2 overflow-hidden ${
            theme === 'retro'
              ? 'retro-progress'
              : 'bg-gray-200 dark:bg-gray-700'
          }`}>
            <div 
              className={`h-full transition-all duration-1000 ${
                theme === 'retro'
                  ? 'retro-progress-fill'
                  : 'bg-gradient-to-r from-purple-500 to-blue-500'
              }`}
              style={{ width: `${((3600 - countdown) / 3600) * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
