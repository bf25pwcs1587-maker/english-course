import React, { useState } from 'react';
import { UserProgress } from '../../types/index.ts';
import { AdvancedReading } from './AdvancedReading.tsx';
import { AdvancedConversation } from './AdvancedConversation.tsx';
import { AdvancedGrammar } from './AdvancedGrammar.tsx';
import { AdvancedWriting } from './AdvancedWriting.tsx';
import { TalhaMasterclass } from '../TalhaMasterclass.tsx';
import {
  GraduationCap,
  BookOpen,
  MessageSquare,
  AlertTriangle,
  PenTool,
  Sparkles,
  Award,
  Crown,
} from 'lucide-react';

interface AdvancedDashboardProps {
  progress: UserProgress;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
}

export const AdvancedDashboard: React.FC<AdvancedDashboardProps> = ({
  progress,
  onUpdateProgress,
}) => {
  const [activeTab, setActiveTab] = useState<'reading' | 'conversation' | 'grammar' | 'writing' | 'masterclass'>('reading');
  const uiLang = progress.uiLang;

  const handleEarnStar = (count: number) => {
    onUpdateProgress((prev) => ({
      ...prev,
      stars: prev.stars + count,
      xp: prev.xp + count * 15,
    }));
  };

  const handleIncrementWriting = () => {
    onUpdateProgress((prev) => ({
      ...prev,
      writingSubmissionsCount: prev.writingSubmissionsCount + 1,
    }));
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-12">
      {/* Advanced Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden border border-indigo-900/40">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-bold border border-indigo-500/30">
              <GraduationCap className="w-4 h-4" />
              <span>{uiLang === 'th' ? 'โหมดพัฒนาภาษาอังกฤษขั้นสูง' : 'Advanced & Career English Path'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              {uiLang === 'th'
                ? 'เก่งอังกฤษอย่างมั่นใจ สื่อสารในระดับสากล'
                : 'Fluency, Nuance & Precision for Thai Learners'}
            </h1>
            <p className="text-xs sm:text-sm text-indigo-200/90 max-w-xl">
              {uiLang === 'th'
                ? 'เน้นการอ่านบทความเชิงลึก บทสนทนาการทำงานจริง เจาะลึกจุดผิดที่คนไทยมักสับสน และตรวจงานเขียน'
                : 'Master real-life discussions, nuanced reading, common Thai interference pitfalls, and tailored writing feedback.'}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex sm:flex-col items-center justify-center gap-2 min-w-[150px]">
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
              {uiLang === 'th' ? 'ระดับที่แนะนำ' : 'Current Track'}
            </span>
            <span className="text-base font-black text-amber-400 text-center">
              {progress.recommendedLevel || 'Advanced B1-B2'}
            </span>
          </div>
        </div>
      </div>

      {/* Advanced Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-slate-200 pb-4">
        <button
          onClick={() => setActiveTab('reading')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-sm transition-all cursor-pointer ${
            activeTab === 'reading'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>{uiLang === 'th' ? 'บทความและการอ่าน (Reading)' : 'Reading & Glossaries'}</span>
        </button>

        <button
          onClick={() => setActiveTab('conversation')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-sm transition-all cursor-pointer ${
            activeTab === 'conversation'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>{uiLang === 'th' ? 'บทสนทนาสถานการณ์จริง' : 'Real-World Dialogues'}</span>
        </button>

        <button
          onClick={() => setActiveTab('grammar')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-sm transition-all cursor-pointer ${
            activeTab === 'grammar'
              ? 'bg-rose-600 text-white shadow-sm'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>{uiLang === 'th' ? 'จุดผิดบ่อยคนไทย (Pitfalls)' : 'Thai-English Pitfalls'}</span>
        </button>

        <button
          onClick={() => setActiveTab('writing')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-sm transition-all cursor-pointer ${
            activeTab === 'writing'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          <PenTool className="w-4 h-4" />
          <span>{uiLang === 'th' ? 'สตูดิโอฝึกเขียน (Writing Studio)' : 'Writing Studio'}</span>
        </button>

        <button
          onClick={() => setActiveTab('masterclass')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-sm transition-all cursor-pointer ${
            activeTab === 'masterclass'
              ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-amber-950 shadow-md font-extrabold'
              : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200'
          }`}
        >
          <span>👨‍🏫</span>
          <span>{uiLang === 'th' ? 'มาสเตอร์คลาส อ.ทัลฮา (CEO Talha)' : 'CEO Talha Masterclass'}</span>
        </button>
      </div>

      {/* Active Tab View */}
      {activeTab === 'reading' && (
        <AdvancedReading
          audioSpeed={progress.audioSpeed}
          onEarnStar={handleEarnStar}
          uiLang={uiLang}
        />
      )}

      {activeTab === 'conversation' && (
        <AdvancedConversation
          audioSpeed={progress.audioSpeed}
          onEarnStar={handleEarnStar}
          uiLang={uiLang}
        />
      )}

      {activeTab === 'grammar' && (
        <AdvancedGrammar
          audioSpeed={progress.audioSpeed}
          onEarnStar={handleEarnStar}
          uiLang={uiLang}
        />
      )}

      {activeTab === 'writing' && (
        <AdvancedWriting
          audioSpeed={progress.audioSpeed}
          onEarnStar={handleEarnStar}
          onIncrementWritingCount={handleIncrementWriting}
          uiLang={uiLang}
        />
      )}

      {activeTab === 'masterclass' && (
        <TalhaMasterclass
          audioSpeed={progress.audioSpeed}
          onEarnStar={handleEarnStar}
          uiLang={uiLang}
        />
      )}
    </div>
  );
};
