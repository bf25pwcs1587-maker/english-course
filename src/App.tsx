import React, { useState, useEffect } from 'react';
import { UserProgress, LearningPath } from './types/index.ts';
import { Navbar } from './components/Navbar.tsx';
import { KidsDashboard } from './components/Kids/KidsDashboard.tsx';
import { AdvancedDashboard } from './components/Advanced/AdvancedDashboard.tsx';
import { PlacementQuizModal } from './components/PlacementQuizModal.tsx';
import { ParentDashboardModal } from './components/ParentDashboardModal.tsx';
import { InstallAppModal } from './components/InstallAppModal.tsx';
import { badgesData } from './data/badges.ts';
import { checkBadgeUnlocks } from './utils/rules.ts';
import { sfx } from './utils/soundEffects.ts';
import { Sparkles, Trophy, X } from 'lucide-react';

const STORAGE_KEY = 'sabai_english_user_progress_v1';

const defaultProgress: UserProgress = {
  selectedPath: 'kids',
  uiLang: 'th',
  audioSpeed: 1.0,
  stars: 18,
  xp: 180,
  streakDays: 3,
  lastActiveDate: new Date().toISOString().split('T')[0],
  completedLessonIds: ['animals', 'food'],
  completedQuizIds: [],
  wordsMastered: ['elephant', 'cat', 'dog', 'apple', 'banana', 'milk', 'red', 'blue'],
  badges: ['first_step'],
  recommendedLevel: 'Kids Level 1 (Starters)',
  writingSubmissionsCount: 1,
  totalStudyMinutes: 28,
  quizScores: [
    { quizId: 'placement_initial', score: 4, total: 5, date: '2026-10-25' },
  ],
};

export default function App() {
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...defaultProgress, ...JSON.parse(saved) };
      }
    } catch (_) {}
    return defaultProgress;
  });

  const [isPlacementOpen, setIsPlacementOpen] = useState(false);
  const [isParentOpen, setIsParentOpen] = useState(false);
  const [isInstallOpen, setIsInstallOpen] = useState(false);
  const [newlyUnlockedBadge, setNewlyUnlockedBadge] = useState<string | null>(null);

  // Parse URL query parameter for ?path=kids, ?path=advanced or ?quiz=1 or ?install=1
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pathParam = params.get('path');
    if (pathParam === 'kids' || pathParam === 'advanced') {
      setProgress((prev) => ({ ...prev, selectedPath: pathParam }));
    }
    if (params.get('quiz') === '1') {
      setIsPlacementOpen(true);
    }
    if (params.get('install') === '1') {
      setIsInstallOpen(true);
    }
  }, []);

  // Save to local storage & check badge unlocks
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (_) {}

    const freshBadgeIds = checkBadgeUnlocks(progress, badgesData);
    if (freshBadgeIds.length > 0) {
      const firstNewBadge = freshBadgeIds[0];
      setNewlyUnlockedBadge(firstNewBadge);
      sfx.playFanfare();
      setProgress((prev) => ({
        ...prev,
        badges: [...prev.badges, ...freshBadgeIds],
      }));
    }
  }, [progress.stars, progress.streakDays, progress.wordsMastered.length, progress.writingSubmissionsCount, progress.audioSpeed]);

  const handleApplyRecommendation = (path: LearningPath, levelName: string) => {
    setProgress((prev) => ({
      ...prev,
      selectedPath: path,
      recommendedLevel: levelName,
    }));
  };

  const currentBadgeObj = badgesData.find((b) => b.id === newlyUnlockedBadge);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 font-sans ${
        progress.selectedPath === 'kids'
          ? 'bg-amber-50/40 text-slate-800'
          : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Top Navigation */}
      <Navbar
        progress={progress}
        onUpdateProgress={setProgress}
        onOpenPlacement={() => setIsPlacementOpen(true)}
        onOpenParent={() => setIsParentOpen(true)}
        onOpenInstall={() => setIsInstallOpen(true)}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {progress.selectedPath === 'kids' ? (
          <KidsDashboard
            progress={progress}
            onUpdateProgress={setProgress}
          />
        ) : (
          <AdvancedDashboard
            progress={progress}
            onUpdateProgress={setProgress}
          />
        )}
      </main>

      {/* Placement Quiz Modal */}
      <PlacementQuizModal
        isOpen={isPlacementOpen}
        onClose={() => setIsPlacementOpen(false)}
        uiLang={progress.uiLang}
        onApplyRecommendation={handleApplyRecommendation}
      />

      {/* Parent/Teacher Dashboard Modal */}
      <ParentDashboardModal
        isOpen={isParentOpen}
        onClose={() => setIsParentOpen(false)}
        progress={progress}
        uiLang={progress.uiLang}
      />

      {/* Install App / PWA Modal */}
      <InstallAppModal
        isOpen={isInstallOpen}
        onClose={() => setIsInstallOpen(false)}
        uiLang={progress.uiLang}
      />

      {/* Badge Unlock Celebration Banner */}
      {currentBadgeObj && (
        <div className="fixed bottom-6 right-6 z-50 bg-amber-400 text-amber-950 p-4 rounded-3xl shadow-2xl border-2 border-white flex items-center gap-4 animate-fadeIn">
          <div className="text-4xl">{currentBadgeObj.icon}</div>
          <div>
            <div className="text-[10px] font-black uppercase tracking-wider text-amber-900">
              {progress.uiLang === 'th' ? '🎉 ปลดล็อกเหรียญตราใหม่!' : '🎉 New Badge Unlocked!'}
            </div>
            <div className="text-base font-black">
              {progress.uiLang === 'th' ? currentBadgeObj.titleTh : currentBadgeObj.titleEn}
            </div>
            <div className="text-xs font-semibold opacity-90">
              {progress.uiLang === 'th'
                ? currentBadgeObj.descriptionTh
                : currentBadgeObj.descriptionEn}
            </div>
          </div>
          <button
            onClick={() => setNewlyUnlockedBadge(null)}
            className="p-1 rounded-full hover:bg-black/10 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-200/80 bg-white/60 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Sabai English (สบาย อิงลิช) — แอปพลิเคชันฝึกภาษาอังกฤษสำหรับคนไทย</span>
          <div className="flex gap-4">
            <button
              onClick={() => setIsInstallOpen(true)}
              className="hover:underline cursor-pointer text-amber-600 font-bold flex items-center gap-1"
            >
              <span>📲</span>
              <span>{progress.uiLang === 'th' ? 'วิธีดาวน์โหลดและติดตั้งแอป' : 'How to Download App'}</span>
            </button>
            <button
              onClick={() => setIsPlacementOpen(true)}
              className="hover:underline cursor-pointer"
            >
              {progress.uiLang === 'th' ? 'ทำแบบทดสอบวัดระดับ' : 'Placement Quiz'}
            </button>
            <button
              onClick={() => setIsParentOpen(true)}
              className="hover:underline cursor-pointer"
            >
              {progress.uiLang === 'th' ? 'มุมผู้ปกครองและคุณครู' : 'Parent & Teacher View'}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
