'use client';

import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../lib/contract';
import { useState, useEffect } from 'react';
import { SparklesIcon, ClockIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

export function MintButton() {
  const { address } = useAccount();
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
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg">
        <p className="text-gray-600 dark:text-gray-400 text-center">Connect wallet to mint tokens</p>
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
    <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Mint Tokens</h2>
        <p className="text-gray-600 dark:text-gray-400">Earn 10 MQT tokens every hour</p>
      </div>

      {isConfirmed && (
        <div className="mb-6 bg-green-50 dark:bg-green-500 dark:bg-opacity-10 border border-green-500 rounded-lg p-4 flex items-center gap-3">
          <CheckCircleIcon className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0" />
          <div>
            <p className="text-green-700 dark:text-green-400 font-semibold">Mint Successful!</p>
            <p className="text-sm text-green-600 dark:text-gray-400">10 MQT added to your balance</p>
          </div>
        </div>
      )}

      {(writeError || confirmError) && (
        <div className="mb-6 bg-red-50 dark:bg-red-500 dark:bg-opacity-10 border border-red-500 rounded-lg p-4 flex items-center gap-3">
          <XCircleIcon className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0" />
          <div>
            <p className="text-red-700 dark:text-red-400 font-semibold">Transaction Failed</p>
            <p className="text-sm text-red-600 dark:text-gray-400">
              {(writeError || confirmError)?.message?.slice(0, 100)}
            </p>
          </div>
        </div>
      )}

      <button
        onClick={handleMint}
        disabled={!canMint || isPending || countdown > 0}
        className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all flex items-center justify-center gap-3 ${
          canMint && !isPending && countdown === 0
            ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-lg hover:scale-105'
            : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed'
        }`}
      >
        {isPending ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            {isConfirming ? 'Confirming...' : 'Minting...'}
          </>
        ) : countdown > 0 ? (
          <>
            <ClockIcon className="w-6 h-6" />
            Cooldown: {formatTime(countdown)}
          </>
        ) : (
          <>
            <SparklesIcon className="w-6 h-6" />
            Mint 10 MQT
          </>
        )}
      </button>

      <button
        onClick={handleReset}
        className="mt-4 w-full py-4 px-6 rounded-lg font-semibold text-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
      >
        Reset Counter
      </button>

      {countdown > 0 && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-full transition-all duration-1000"
              style={{ width: `${((3600 - countdown) / 3600) * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
