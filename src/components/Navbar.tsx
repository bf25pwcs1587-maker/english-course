import React from 'react';
import {
  LearningPath,
  UILanguage,
  AudioSpeed,
  UserProgress,
} from '../types/index.ts';
import { translations } from '../data/translations.ts';
import {
  Volume2,
  Sparkles,
  Flame,
  Star,
  Users,
  Compass,
  GraduationCap,
  Smile,
} from 'lucide-react';

interface NavbarProps {
  progress: UserProgress;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
  onOpenPlacement: () => void;
  onOpenParent: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  progress,
  onUpdateProgress,
  onOpenPlacement,
  onOpenParent,
}) => {
  const t = translations[progress.uiLang];

  const handleSpeedChange = (speed: AudioSpeed) => {
    onUpdateProgress((prev) => ({
      ...prev,
      audioSpeed: speed,
    }));
  };

  const handlePathToggle = (path: LearningPath) => {
    onUpdateProgress((prev) => ({
      ...prev,
      selectedPath: path,
    }));
  };

  const handleLangToggle = () => {
    onUpdateProgress((prev) => ({
      ...prev,
      uiLang: prev.uiLang === 'th' ? 'en' : 'th',
    }));
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-md text-2xl">
              🐘
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl sm:text-2xl text-slate-900 tracking-tight">
                  Sabai<span className="text-amber-500">English</span>
                </span>
                <span className="hidden md:inline-block text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                  สบาย อิงลิช
                </span>
              </div>
              <p className="hidden sm:block text-xs text-slate-500 font-medium">
                {progress.uiLang === 'th'
                  ? 'ภาษาอังกฤษเข้าใจง่ายสำหรับคนไทย'
                  : 'English for Thai Speakers'}
              </p>
            </div>
          </div>

          {/* Center: Path Switcher (Kids vs Advanced) */}
          <div className="bg-slate-100 p-1 rounded-2xl flex items-center shadow-inner">
            <button
              onClick={() => handlePathToggle('kids')}
              aria-label="Switch to Kids Path"
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                progress.selectedPath === 'kids'
                  ? 'bg-amber-400 text-amber-950 shadow-sm scale-102'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Smile className="w-4 h-4 text-amber-900" />
              <span>{progress.uiLang === 'th' ? 'เด็ก & พื้นฐาน' : 'Kids'}</span>
            </button>
            <button
              onClick={() => handlePathToggle('advanced')}
              aria-label="Switch to Advanced Path"
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                progress.selectedPath === 'advanced'
                  ? 'bg-indigo-600 text-white shadow-sm scale-102'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>{progress.uiLang === 'th' ? 'ขั้นสูง & ทำงาน' : 'Advanced'}</span>
            </button>
          </div>

          {/* Right Controls: Audio Speed, Lang, Streak, Stars, Parent View */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Audio Speed Selector */}
            <div className="flex items-center gap-1 bg-slate-100 px-2 sm:px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs">
              <Volume2 className="w-3.5 h-3.5 text-slate-500" />
              <select
                aria-label="Audio playback speed"
                value={progress.audioSpeed}
                onChange={(e) => handleSpeedChange(parseFloat(e.target.value) as AudioSpeed)}
                className="bg-transparent font-semibold text-slate-700 outline-none cursor-pointer"
              >
                <option value={0.5}>🐢 0.5x</option>
                <option value={0.75}>🐢 0.75x</option>
                <option value={1.0}>🐰 1.0x</option>
                <option value={1.25}>⚡ 1.25x</option>
              </select>
            </div>

            {/* Stars Count */}
            <div className="flex items-center gap-1 bg-amber-50 text-amber-800 px-2.5 py-1.5 rounded-xl border border-amber-200 text-xs sm:text-sm font-bold shadow-xs">
              <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
              <span>{progress.stars}</span>
            </div>

            {/* Streak */}
            <div className="hidden sm:flex items-center gap-1 bg-orange-50 text-orange-800 px-2.5 py-1.5 rounded-xl border border-orange-200 text-xs sm:text-sm font-bold shadow-xs">
              <Flame className="w-4 h-4 fill-orange-500 text-orange-500" />
              <span>{progress.streakDays}d</span>
            </div>

            {/* UI Language Toggle */}
            <button
              onClick={handleLangToggle}
              aria-label="Toggle UI language between Thai and English"
              className="px-2.5 py-1.5 text-xs font-bold rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
            >
              {progress.uiLang === 'th' ? '🇹🇭 TH' : '🇬🇧 EN'}
            </button>

            {/* Placement Quiz Button */}
            <button
              onClick={onOpenPlacement}
              title={t.placementQuizBtn}
              aria-label={t.placementQuizBtn}
              className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition cursor-pointer"
            >
              <Compass className="w-4 h-4 text-indigo-600" />
              <span className="hidden lg:inline">{t.placementQuizBtn}</span>
            </button>

            {/* Parent View Button */}
            <button
              onClick={onOpenParent}
              title={t.parentDashboardBtn}
              aria-label={t.parentDashboardBtn}
              className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 text-xs font-bold transition cursor-pointer"
            >
              <Users className="w-4 h-4 text-purple-600" />
              <span className="hidden md:inline">{progress.uiLang === 'th' ? 'มุมผู้ปกครอง' : 'Parent View'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
