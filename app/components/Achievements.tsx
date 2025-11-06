'use client';

import { useAccount, useReadContract } from 'wagmi';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../lib/contract';
import { formatEther } from 'viem';
import { TrophyIcon, StarIcon } from '@heroicons/react/24/solid';

interface Achievement {
  id: string;
  title: string;
  description: string;
  requirement: number;
  icon: string;
}

const achievements: Achievement[] = [
  { id: 'first-mint', title: 'First Steps', description: 'Mint your first tokens', requirement: 10, icon: '\ud83c\udfaf' },
  { id: 'collector', title: 'Collector', description: 'Mint 100 tokens', requirement: 100, icon: '\ud83d\udc8e' },
  { id: 'enthusiast', title: 'Enthusiast', description: 'Mint 500 tokens', requirement: 500, icon: '\ud83d\udd25' },
  { id: 'master', title: 'Master Minter', description: 'Mint 1000 tokens', requirement: 1000, icon: '\ud83d\udc51' },
  { id: 'legend', title: 'Legend', description: 'Mint 5000 tokens', requirement: 5000, icon: '\u2b50' },
];

export function Achievements() {
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

  if (!address || !playerStats) {
    return null;
  }

  const [, minted] = playerStats;
  const totalMinted = parseFloat(formatEther(minted));

  return (
    <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <TrophyIcon className="w-8 h-8 text-yellow-400" />
        <h2 className="text-2xl font-bold text-white">Achievements</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((achievement) => {
          const isUnlocked = totalMinted >= achievement.requirement;
          const progress = Math.min((totalMinted / achievement.requirement) * 100, 100);

          return (
            <div
              key={achievement.id}
              className={`p-4 rounded-lg border transition-all ${
                isUnlocked
                  ? 'bg-gradient-to-br from-yellow-500 from-opacity-10 to-purple-500 to-opacity-10 border-yellow-500'
                  : 'bg-gray-900 border-gray-700'
              }`}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className={`text-3xl ${isUnlocked ? 'grayscale-0' : 'grayscale opacity-50'}`}>
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <h3 className={`font-semibold ${isUnlocked ? 'text-yellow-400' : 'text-gray-400'}`}>
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-gray-500">{achievement.description}</p>
                </div>
                {isUnlocked && <StarIcon className="w-5 h-5 text-yellow-400" />}
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs text-gray-400">
                  <span>{totalMinted.toFixed(0)} / {achievement.requirement}</span>
                  <span>{progress.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      isUnlocked
                        ? 'bg-gradient-to-r from-yellow-400 to-yellow-600'
                        : 'bg-gray-600'
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
