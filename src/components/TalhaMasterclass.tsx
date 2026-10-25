import React, { useState } from 'react';
import { instructorTalha, dailyEnglishDrills } from '../data/instructorData.ts';
import { MasterclassTip, AudioSpeed, DailyEnglishDrill } from '../types/index.ts';
import { audioService } from '../utils/audio.ts';
import { sfx } from '../utils/soundEffects.ts';
import {
  Award,
  Sparkles,
  Volume2,
  Mic,
  CheckCircle2,
  BookOpen,
  Quote,
  Lightbulb,
  Play,
  RotateCcw,
} from 'lucide-react';

interface TalhaMasterclassProps {
  audioSpeed: AudioSpeed;
  onEarnStar: (count: number) => void;
  uiLang: 'th' | 'en';
}

export const TalhaMasterclass: React.FC<TalhaMasterclassProps> = ({
  audioSpeed,
  onEarnStar,
  uiLang,
}) => {
  const [activeTipIdx, setActiveTipIdx] = useState(0);
  const [activeDrillIdx, setActiveDrillIdx] = useState(0);
  const [drillCompleted, setDrillCompleted] = useState<{ [key: string]: boolean }>({});

  const currentTip = instructorTalha.masterclassTips[activeTipIdx];
  const currentDrill = dailyEnglishDrills[activeDrillIdx];

  const handlePlayGreeting = () => {
    audioService.speak(instructorTalha.greetingAudioEn, audioSpeed);
  };

  const handlePlayTipAudio = (tip: MasterclassTip) => {
    audioService.speak(tip.audioScript, audioSpeed);
  };

  const handleCompleteDrill = (drillId: string) => {
    setDrillCompleted((prev) => ({ ...prev, [drillId]: true }));
    sfx.playFanfare();
    audioService.speak(currentDrill.sentenceEn, audioSpeed);
    onEarnStar(3);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* CEO Instructor Hero Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-indigo-500/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center gap-6 justify-between relative z-10">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            {/* Instructor Badge / Avatar */}
            <div className="relative shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-amber-400 via-orange-400 to-amber-200 p-1 shadow-lg flex items-center justify-center">
                <div className="w-full h-full bg-slate-900 rounded-[22px] flex flex-col items-center justify-center text-4xl sm:text-5xl">
                  {instructorTalha.avatarEmoji}
                </div>
              </div>
              <span className="absolute -bottom-2 -right-2 bg-amber-400 text-amber-950 text-[10px] font-black px-2 py-0.5 rounded-full border-2 border-slate-900 uppercase tracking-wider">
                CEO & Master
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 justify-center sm:justify-start flex-wrap">
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  {instructorTalha.name}
                </h2>
                <span className="bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 text-xs font-bold px-3 py-1 rounded-full">
                  {instructorTalha.role}
                </span>
              </div>

              <p className="text-xs sm:text-sm font-semibold text-amber-300">
                {instructorTalha.roleTh}
              </p>

              <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                {uiLang === 'th' ? instructorTalha.bioTh : instructorTalha.bioEn}
              </p>

              {/* CEO Voice Greeting */}
              <div className="pt-2">
                <button
                  onClick={handlePlayGreeting}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-black text-xs shadow-md transition transform hover:scale-105 cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>
                    {uiLang === 'th'
                      ? 'ฟังเสียงทักทายจาก อ.ทัลฮา (CEO Greeting Audio)'
                      : 'Listen to CEO Talha’s Welcome'}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Inspirational Motto Card */}
          <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 max-w-xs text-center space-y-2">
            <Quote className="w-6 h-6 text-amber-400 mx-auto opacity-70" />
            <p className="text-xs italic text-indigo-100 font-medium">
              "{instructorTalha.coreMotto}"
            </p>
            <p className="text-[11px] text-amber-300 font-normal">
              — {instructorTalha.coreMottoTh}
            </p>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Masterclass Lessons + Daily English Drills */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Masterclass Lessons by Talha Afridi */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <h3 className="text-xl font-black text-slate-900">
                {uiLang === 'th'
                  ? 'บทเรียนมาสเตอร์คลาสโดย อ.ทัลฮา อาฟรีดี'
                  : 'Masterclass Lessons by CEO Talha Afridi'}
              </h3>
            </div>
            <span className="text-xs font-bold text-slate-400">
              {instructorTalha.masterclassTips.length} {uiLang === 'th' ? 'บทเรียนพิเศษ' : 'Lessons'}
            </span>
          </div>

          {/* Masterclass Lesson Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {instructorTalha.masterclassTips.map((tip, idx) => (
              <button
                key={tip.id}
                onClick={() => setActiveTipIdx(idx)}
                className={`p-3 rounded-2xl text-left border-2 transition-all cursor-pointer ${
                  activeTipIdx === idx
                    ? 'bg-amber-400 text-amber-950 border-amber-500 font-black shadow-sm scale-102'
                    : 'bg-white hover:bg-amber-50 text-slate-700 border-slate-200'
                }`}
              >
                <span className="text-[10px] uppercase tracking-wider block opacity-75">
                  Lesson {idx + 1}
                </span>
                <span className="text-xs font-bold line-clamp-2">
                  {uiLang === 'th' ? tip.titleTh : tip.titleEn}
                </span>
              </button>
            ))}
          </div>

          {/* Current Masterclass Detail Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <span className="text-xs font-bold px-3 py-1 bg-amber-100 text-amber-900 rounded-full inline-block mb-1">
                  Masterclass #{activeTipIdx + 1} • {currentTip.category.toUpperCase()}
                </span>
                <h4 className="text-2xl font-black text-slate-900">
                  {currentTip.titleEn}
                </h4>
                <p className="text-sm font-bold text-slate-600 mt-1">
                  {currentTip.titleTh}
                </p>
              </div>

              <button
                onClick={() => handlePlayTipAudio(currentTip)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition cursor-pointer shrink-0"
              >
                <Volume2 className="w-4 h-4" />
                <span>{uiLang === 'th' ? 'ฟังตัวอย่างเสียง' : 'Listen to Examples'}</span>
              </button>
            </div>

            {/* Explanation Sections */}
            <div className="space-y-4">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">
                  English Explanation:
                </span>
                <p className="text-base text-slate-800 leading-relaxed font-normal">
                  {currentTip.englishText}
                </p>
              </div>

              <div className="bg-amber-50/70 p-5 rounded-2xl border border-amber-200 space-y-1.5">
                <span className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                  <span>คำอธิบายภาษาไทยและเทคนิคพิเศษสำหรับคนไทย:</span>
                </span>
                <p className="text-sm text-slate-700 leading-relaxed font-normal">
                  {currentTip.thaiExplanation}
                </p>
              </div>
            </div>

            {/* Practical Speaking & Application Drill */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mic className="w-4 h-4 text-purple-600" />
                  <span className="text-xs font-black uppercase text-purple-900 tracking-wider">
                    แบบฝึกหัดลงมือพูดจริง (Practical Drill)
                  </span>
                </div>
                <span className="text-xs font-bold text-purple-700">+3 ⭐ Stars</span>
              </div>

              <p className="text-sm font-bold text-slate-800">
                {currentTip.practicalDrill.promptEn}
              </p>
              <p className="text-xs text-slate-500">
                {currentTip.practicalDrill.promptTh}
              </p>

              <div className="bg-white p-3 rounded-xl border border-purple-100 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-400 block">Sample Output:</span>
                  <span className="text-base font-black text-indigo-700">
                    "{currentTip.practicalDrill.sampleAnswerEn}"
                  </span>
                  <span className="text-xs text-slate-500 block">
                    ({currentTip.practicalDrill.thaiMeaning})
                  </span>
                </div>
                <button
                  onClick={() => audioService.speak(currentTip.practicalDrill.sampleAnswerEn, audioSpeed)}
                  className="p-2 hover:bg-slate-100 rounded-lg text-indigo-600 cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => {
                    handleCompleteDrill(currentTip.id);
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xs transition cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    {drillCompleted[currentTip.id]
                      ? uiLang === 'th'
                        ? 'ฝึกพูดเรียบร้อยแล้ว ✓'
                        : 'Completed ✓'
                      : uiLang === 'th'
                      ? 'ฉันลองฝึกพูดตามแล้ว (+3 ⭐)'
                      : 'I practiced this drill (+3 ⭐)'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Daily English Boost & Quotes */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-black text-slate-900">
              {uiLang === 'th' ? 'แบบฝึกภาษาอังกฤษประจำวัน' : 'Daily English Boost'}
            </h3>
          </div>

          {/* Daily Drills Cards */}
          <div className="space-y-4">
            {dailyEnglishDrills.map((drill) => (
              <div
                key={drill.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                    {drill.titleEn}
                  </span>
                  <button
                    onClick={() => audioService.speak(drill.sentenceEn, audioSpeed)}
                    className="p-1 hover:bg-slate-100 rounded-md text-indigo-600 cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-base font-bold text-slate-800 leading-snug">
                  "{drill.sentenceEn}"
                </p>
                <p className="text-xs text-slate-500 font-medium">{drill.sentenceTh}</p>

                <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                  💡 <strong>Tip:</strong> {drill.explanationTh}
                </div>
              </div>
            ))}
          </div>

          {/* Daily Motivational Quotes from Talha Afridi */}
          <div className="bg-gradient-to-br from-amber-400 to-orange-400 text-amber-950 p-6 rounded-3xl shadow-sm space-y-3">
            <div className="flex items-center gap-2 font-black text-xs uppercase tracking-wider text-amber-900">
              <Award className="w-4 h-4" />
              <span>CEO Inspiration of the Day</span>
            </div>
            <p className="text-sm font-black leading-snug">
              "{instructorTalha.dailyQuotes[0].en}"
            </p>
            <p className="text-xs font-semibold text-amber-900/90">
              {instructorTalha.dailyQuotes[0].th}
            </p>
            <div className="pt-2 text-[11px] font-bold bg-white/40 px-3 py-1 rounded-xl inline-block">
              📚 {instructorTalha.dailyQuotes[0].keyVocab}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
