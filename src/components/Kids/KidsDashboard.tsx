import React, { useState } from 'react';
import { KidsTopic, UserProgress } from '../../types/index.ts';
import { kidsTopics } from '../../data/kidsContent.ts';
import { KidsFlashcards } from './KidsFlashcards.tsx';
import { KidsGames } from './KidsGames.tsx';
import { KidsReading } from './KidsReading.tsx';
import { KidsWriting } from './KidsWriting.tsx';
import { Sparkles, Star, BookOpen, Gamepad2, PenTool, LayoutGrid, Volume2 } from 'lucide-react';
import { audioService } from '../../utils/audio.ts';

interface KidsDashboardProps {
  progress: UserProgress;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
}

export const KidsDashboard: React.FC<KidsDashboardProps> = ({
  progress,
  onUpdateProgress,
}) => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>('animals');
  const [activeTab, setActiveTab] = useState<'flashcards' | 'games' | 'reading' | 'writing'>('flashcards');

  const selectedTopic = kidsTopics.find((t) => t.id === selectedTopicId) || kidsTopics[0];
  const uiLang = progress.uiLang;

  const handleEarnStar = (count: number) => {
    onUpdateProgress((prev) => {
      const newStars = prev.stars + count;
      const newXp = prev.xp + count * 10;
      const currentWords = new Set(prev.wordsMastered);
      selectedTopic.words.forEach((w) => currentWords.add(w.english.toLowerCase()));

      return {
        ...prev,
        stars: newStars,
        xp: newXp,
        wordsMastered: Array.from(currentWords),
      };
    });
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-12">
      {/* Friendly Mascot Hero Banner */}
      <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 rounded-3xl p-6 sm:p-8 text-amber-950 shadow-md relative overflow-hidden">
        {/* Soft decorative elements */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-white/20 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center gap-6 justify-between relative z-10">
          <div className="flex items-center gap-4 sm:gap-6 text-center sm:text-left">
            <div
              className="text-6xl sm:text-7xl p-3 bg-white/40 rounded-3xl shadow-sm hover:rotate-6 transition-transform cursor-pointer select-none"
              onClick={() => {
                audioService.speak(
                  uiLang === 'th'
                    ? 'สวัสดีครับน้องๆ! ยินดีต้อนรับสู่ สบาย อิงลิช นะครับ'
                    : 'Hello friends! Welcome to Sabai English!'
                );
              }}
              title="Click to hear Nong Chang speak!"
            >
              🐘
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/50 text-amber-950 rounded-full text-xs font-black mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>
                  {uiLang === 'th' ? 'โหมดเด็กและปูพื้นฐานแสนสนุก' : 'Kids & Starters Wonderland'}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {uiLang === 'th'
                  ? 'สวัสดีครับ! วันนี้มาเรียนภาษาอังกฤษกับน้องช้างกันนะ'
                  : 'Welcome! Let’s learn fun English with Nong Chang!'}
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-amber-900/90 mt-1 max-w-xl">
                {uiLang === 'th'
                  ? 'เรียนง่าย สบายใจ ไม่กดดัน มีคำอ่านภาษาไทย ฟังเสียงชัดเจน และสะสมดาวแลกเกียรติบัตร'
                  : 'Gentle, supportive, and colorful English learning with Thai phonetics and cheerful games.'}
              </p>
            </div>
          </div>

          {/* Quick Stat Pill */}
          <div className="bg-white/80 backdrop-blur-xs rounded-2xl p-4 flex sm:flex-col items-center justify-center gap-3 border border-white/60 shadow-xs min-w-[140px]">
            <div className="text-center">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                {uiLang === 'th' ? 'ดาวสะสม' : 'Total Stars'}
              </span>
              <span className="text-2xl font-black text-amber-600 flex items-center justify-center gap-1">
                ⭐ {progress.stars}
              </span>
            </div>
            <div className="text-center">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                {uiLang === 'th' ? 'คำศัพท์สะสม' : 'Words Known'}
              </span>
              <span className="text-lg font-black text-slate-800">
                {progress.wordsMastered.length} {uiLang === 'th' ? 'คำ' : 'words'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Instructor Talha Afridi's Encouragement for Kids */}
      <div className="bg-white rounded-2xl p-4 border border-amber-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-xl shrink-0">
            👨‍🏫
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xs text-slate-800">
                Talha Afridi (CEO & Master Instructor)
              </span>
              <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full">
                Coach Tip
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              {uiLang === 'th'
                ? '"ออกเสียงตามน้องช้างช้าๆ วันละ 5 คำ แล้วยิ้มไปด้วย จะจำคำศัพท์แม่นยำขึ้นมากครับ!"'
                : '"Speak each word out loud with a smile! Practice 5 words daily for joyful fluency!"'}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            audioService.speak(
              "Speak each word out loud with a smile! Practice 5 words daily for joyful fluency!",
              progress.audioSpeed
            );
          }}
          className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 text-xs font-bold transition cursor-pointer"
        >
          <Volume2 className="w-3.5 h-3.5 text-amber-700" />
          <span>{uiLang === 'th' ? 'ฟังเสียงครูทัลฮา' : 'Hear Coach'}</span>
        </button>
      </div>

      {/* Topic Horizontal Selector */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
            <span>📚</span>
            <span>{uiLang === 'th' ? 'เลือกหมวดหมู่ที่อยากเรียนรู้' : 'Explore Learning Topics'}</span>
          </h2>
          <span className="text-xs font-bold text-slate-400">
            {kidsTopics.length} {uiLang === 'th' ? 'หัวข้อสนุกๆ' : 'topics'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {kidsTopics.map((topic) => {
            const isSelected = topic.id === selectedTopic.id;
            return (
              <button
                key={topic.id}
                onClick={() => {
                  setSelectedTopicId(topic.id);
                  audioService.speak(topic.titleEn, progress.audioSpeed);
                }}
                className={`p-3.5 rounded-2xl text-left transition-all border-2 flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-amber-400/90 text-amber-950 border-amber-500 shadow-md scale-102 font-extrabold'
                    : 'bg-white hover:bg-amber-50 text-slate-700 border-slate-200 hover:border-amber-300'
                }`}
              >
                <div className="text-3xl mb-1">{topic.icon}</div>
                <div>
                  <div className="text-sm font-bold truncate">
                    {uiLang === 'th' ? topic.titleTh : topic.titleEn}
                  </div>
                  <div className="text-xs opacity-80 truncate">
                    {uiLang === 'th' ? topic.titleEn : topic.titleTh}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Activity Sub-Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-slate-200 pb-4">
        <button
          onClick={() => setActiveTab('flashcards')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-sm transition-all cursor-pointer ${
            activeTab === 'flashcards'
              ? 'bg-amber-400 text-amber-950 shadow-sm'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          <LayoutGrid className="w-4 h-4" />
          <span>{uiLang === 'th' ? 'การ์ดคำศัพท์ & ออกเสียง' : 'Flashcards & Phonics'}</span>
        </button>

        <button
          onClick={() => setActiveTab('games')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-sm transition-all cursor-pointer ${
            activeTab === 'games'
              ? 'bg-sky-400 text-sky-950 shadow-sm'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          <Gamepad2 className="w-4 h-4" />
          <span>{uiLang === 'th' ? 'มินิเกมแสนสนุก' : 'Mini-Games'}</span>
        </button>

        <button
          onClick={() => setActiveTab('reading')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-sm transition-all cursor-pointer ${
            activeTab === 'reading'
              ? 'bg-emerald-400 text-emerald-950 shadow-sm'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>{uiLang === 'th' ? 'นิทานภาพและการอ่าน' : 'Storybook'}</span>
        </button>

        <button
          onClick={() => setActiveTab('writing')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-sm transition-all cursor-pointer ${
            activeTab === 'writing'
              ? 'bg-purple-400 text-purple-950 shadow-sm'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          <PenTool className="w-4 h-4" />
          <span>{uiLang === 'th' ? 'ฝึกเรียงคำสร้างประโยค' : 'Sentence Builder'}</span>
        </button>
      </div>

      {/* Render Active View */}
      {activeTab === 'flashcards' && (
        <KidsFlashcards
          topic={selectedTopic}
          audioSpeed={progress.audioSpeed}
          onEarnStar={handleEarnStar}
          uiLang={uiLang}
        />
      )}

      {activeTab === 'games' && (
        <KidsGames
          topic={selectedTopic}
          audioSpeed={progress.audioSpeed}
          onEarnStar={handleEarnStar}
          uiLang={uiLang}
        />
      )}

      {activeTab === 'reading' && (
        <KidsReading
          topic={selectedTopic}
          audioSpeed={progress.audioSpeed}
          onEarnStar={handleEarnStar}
          uiLang={uiLang}
        />
      )}

      {activeTab === 'writing' && (
        <KidsWriting
          topic={selectedTopic}
          audioSpeed={progress.audioSpeed}
          onEarnStar={handleEarnStar}
          uiLang={uiLang}
        />
      )}
    </div>
  );
};
