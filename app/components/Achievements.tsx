'use client';

import { useAccount, useReadContract } from 'wagmi';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../lib/contract';
import { formatEther } from 'viem';
import { TrophyIcon, StarIcon } from '@heroicons/react/24/solid';
import { useTheme } from '../context/ThemeContext';

interface Achievement {
  id: string;
  title: string;
  description: string;
  requirement: number;
  icon: string;
}

const achievements: Achievement[] = [
  { id: 'first-mint', title: 'First Steps', description: 'Mint your first tokens', requirement: 10, icon: '🎯' },
  { id: 'collector', title: 'Collector', description: 'Mint 100 tokens', requirement: 100, icon: '💎' },
  { id: 'enthusiast', title: 'Enthusiast', description: 'Mint 500 tokens', requirement: 500, icon: '🔥' },
  { id: 'master', title: 'Master Minter', description: 'Mint 1000 tokens', requirement: 1000, icon: '👑' },
  { id: 'legend', title: 'Legend', description: 'Mint 5000 tokens', requirement: 5000, icon: '⭐' },
];

export function Achievements() {
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

  if (!address || !playerStats) {
    return null;
  }

  const [, minted] = playerStats;
  const totalMinted = parseFloat(formatEther(minted));

  return (
    <div className={`rounded-xl p-8 border shadow-lg ${
      theme === 'retro'
        ? 'retro-card font-retro'
        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
    }`}>
      <div className="flex items-center gap-3 mb-6">
        <TrophyIcon className={`w-8 h-8 ${
          theme === 'retro' ? 'text-[#ffff00]' : 'text-yellow-500 dark:text-yellow-400'
        }`} />
        <h2 className={`text-2xl font-bold ${
          theme === 'retro' ? 'text-[#00ffff]' : 'text-gray-900 dark:text-white'
        }`}>
          {theme === 'retro' ? '> ACHIEVEMENTS' : 'Achievements'}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((achievement) => {
          const isUnlocked = totalMinted >= achievement.requirement;
          const progress = Math.min((totalMinted / achievement.requirement) * 100, 100);

          return (
            <div
              key={achievement.id}
              className={`p-4 rounded-lg border transition-all ${
                theme === 'retro'
                  ? isUnlocked
                    ? 'bg-[rgba(0,255,65,0.1)] border-[#00ff41] shadow-[0_0_15px_rgba(0,255,65,0.3)]'
                    : 'bg-[rgba(0,255,65,0.02)] border-[#004d1a]'
                  : isUnlocked
                    ? 'bg-gradient-to-br from-yellow-50 to-purple-50 dark:from-yellow-500 dark:from-opacity-10 dark:to-purple-500 dark:to-opacity-10 border-yellow-500'
                    : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700'
              }`}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className={`text-3xl ${isUnlocked ? 'grayscale-0' : 'grayscale opacity-50'}`}>
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <h3 className={`font-semibold ${
                    theme === 'retro'
                      ? isUnlocked ? 'text-[#00ff41]' : 'text-[#004d1a]'
                      : isUnlocked ? 'text-yellow-600 dark:text-yellow-400' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {theme === 'retro' && isUnlocked ? `> ${achievement.title.toUpperCase().replace(/ /g, '_')}` : achievement.title}
                  </h3>
                  <p className={`text-sm ${
                    theme === 'retro'
                      ? isUnlocked ? 'text-[#00ff41] opacity-80' : 'text-[#004d1a]'
                      : 'text-gray-600 dark:text-gray-500'
                  }`}>
                    {theme === 'retro' && isUnlocked 
                      ? `// ${achievement.description.toUpperCase()} //`
                      : achievement.description
                    }
                  </p>
                </div>
                {isUnlocked && (
                  <StarIcon className={`w-5 h-5 ${
                    theme === 'retro' ? 'text-[#ffff00]' : 'text-yellow-500 dark:text-yellow-400'
                  }`} />
                )}
              </div>

              <div className="space-y-1">
                <div className={`flex justify-between text-xs ${
                  theme === 'retro'
                    ? isUnlocked ? 'text-[#00ff41]' : 'text-[#004d1a]'
                    : 'text-gray-600 dark:text-gray-400'
                }`}>
                  <span>{totalMinted.toFixed(0)} / {achievement.requirement}</span>
                  <span>{progress.toFixed(0)}%</span>
                </div>
                <div className={`w-full rounded-full h-2 overflow-hidden ${
                  theme === 'retro'
                    ? 'bg-[#0a0a0a] border border-[#00ff41]'
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}>
                  <div
                    className={`h-full transition-all duration-500 ${
                      theme === 'retro'
                        ? isUnlocked
                          ? 'bg-gradient-to-r from-[#00ff41] to-[#00ffff] shadow-[0_0_10px_#00ff41]'
                          : 'bg-[#004d1a]'
                        : isUnlocked
                          ? 'bg-gradient-to-r from-yellow-400 to-yellow-600'
                          : 'bg-gray-400 dark:bg-gray-600'
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
