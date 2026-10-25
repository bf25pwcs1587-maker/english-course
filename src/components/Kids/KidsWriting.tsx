import React, { useState } from 'react';
import { KidsTopic, AudioSpeed } from '../../types/index.ts';
import { audioService } from '../../utils/audio.ts';
import { sfx } from '../../utils/soundEffects.ts';
import { Sparkles, RotateCcw, Volume2, CheckCircle, Heart } from 'lucide-react';

interface KidsWritingProps {
  topic: KidsTopic;
  audioSpeed: AudioSpeed;
  onEarnStar: (count: number) => void;
  uiLang: 'th' | 'en';
}

export const KidsWriting: React.FC<KidsWritingProps> = ({
  topic,
  audioSpeed,
  onEarnStar,
  uiLang,
}) => {
  // Simple fun sentence builder
  const exercises = [
    {
      targetSentence: `I love my ${topic.words[0].english.toLowerCase()}`,
      thaiMeaning: `ฉันรัก${topic.words[0].thai}ของฉัน`,
      tokens: ['I', 'love', 'my', topic.words[0].english.toLowerCase()],
      hint: topic.words[0].emoji,
    },
    {
      targetSentence: `The ${topic.words[1]?.english.toLowerCase() || 'cat'} is happy`,
      thaiMeaning: `${topic.words[1]?.thai || 'แมว'}มีความสุข`,
      tokens: ['The', topic.words[1]?.english.toLowerCase() || 'cat', 'is', 'happy'],
      hint: topic.words[1]?.emoji || '🐱',
    },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const exercise = exercises[currentStep % exercises.length];

  const [selectedTokens, setSelectedTokens] = useState<string[]>([]);
  const [availableTokens, setAvailableTokens] = useState<{ id: string; word: string }[]>(() =>
    [...exercise.tokens]
      .sort(() => Math.random() - 0.5)
      .map((w, i) => ({ id: `${w}-${i}-${Math.random()}`, word: w }))
  );
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSelectToken = (token: { id: string; word: string }) => {
    const nextTokens = [...selectedTokens, token.word];
    setSelectedTokens(nextTokens);
    setAvailableTokens((prev) => prev.filter((t) => t.id !== token.id));

    // Check if sentence is complete
    if (nextTokens.length === exercise.tokens.length) {
      const builtSentence = nextTokens.join(' ');
      if (builtSentence === exercise.tokens.join(' ')) {
        setIsSuccess(true);
        sfx.playFanfare();
        audioService.speak(builtSentence, audioSpeed);
        onEarnStar(2);
      } else {
        sfx.playTryAgain();
      }
    }
  };

  const handleReset = () => {
    setSelectedTokens([]);
    setIsSuccess(false);
    setAvailableTokens(
      [...exercise.tokens]
        .sort(() => Math.random() - 0.5)
        .map((w, i) => ({ id: `${w}-${i}-${Math.random()}`, word: w }))
    );
  };

  const handleNext = () => {
    const nextIdx = currentStep + 1;
    setCurrentStep(nextIdx);
    const nextEx = exercises[nextIdx % exercises.length];
    setSelectedTokens([]);
    setIsSuccess(false);
    setAvailableTokens(
      [...nextEx.tokens]
        .sort(() => Math.random() - 0.5)
        .map((w, i) => ({ id: `${w}-${i}-${Math.random()}`, word: w }))
    );
  };

  return (
    <div className="bg-gradient-to-b from-amber-50/50 to-orange-50/50 rounded-3xl p-6 sm:p-8 border-2 border-amber-200 text-center shadow-xs space-y-6">
      <div className="max-w-md mx-auto">
        <span className="text-xs font-bold px-3 py-1 bg-amber-200 text-amber-900 rounded-full inline-block mb-2">
          {uiLang === 'th' ? 'ฝึกเรียงคำสร้างประโยค' : 'Sentence Builder'}
        </span>
        <h3 className="text-2xl font-black text-slate-800 flex items-center justify-center gap-2">
          <span>{exercise.hint}</span>
          <span>{exercise.thaiMeaning}</span>
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          {uiLang === 'th'
            ? 'แตะบล็อกคำศัพท์ตามลำดับเพื่อสร้างประโยคภาษาอังกฤษที่ถูกต้อง'
            : 'Tap the word blocks in the right order to form the sentence'}
        </p>
      </div>

      {/* Drop Zone / Assembled Sentence */}
      <div className="min-h-[70px] bg-white rounded-2xl border-2 border-dashed border-amber-300 p-4 flex flex-wrap items-center justify-center gap-2 max-w-lg mx-auto shadow-inner">
        {selectedTokens.length === 0 ? (
          <span className="text-sm font-semibold text-slate-400">
            {uiLang === 'th' ? 'แตะคำศัพท์ด้านล่างเพื่อวางที่นี่' : 'Tap words below to place here'}
          </span>
        ) : (
          selectedTokens.map((token, idx) => (
            <span
              key={idx}
              className="px-4 py-2 bg-amber-400 text-amber-950 rounded-xl font-black text-base shadow-xs animate-scaleIn"
            >
              {token}
            </span>
          ))
        )}
      </div>

      {/* Available Word Blocks */}
      {!isSuccess && (
        <div className="flex flex-wrap justify-center gap-3 max-w-md mx-auto">
          {availableTokens.map((token) => (
            <button
              key={token.id}
              onClick={() => handleSelectToken(token)}
              className="px-5 py-2.5 rounded-2xl bg-white hover:bg-amber-100 text-slate-800 font-extrabold text-base border-2 border-amber-200 hover:border-amber-400 shadow-sm transition transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              {token.word}
            </button>
          ))}
        </div>
      )}

      {/* Action buttons: Reset or Next */}
      <div className="flex justify-center gap-3">
        {!isSuccess ? (
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{uiLang === 'th' ? 'เริ่มจัดใหม่' : 'Reset'}</span>
          </button>
        ) : (
          <div className="bg-emerald-50 border-2 border-emerald-300 p-4 rounded-2xl max-w-sm mx-auto animate-fadeIn">
            <p className="font-extrabold text-emerald-800 text-lg mb-2">
              🎉 {uiLang === 'th' ? 'เก่งมากครับ ประโยคถูกต้อง!' : 'Awesome sentence!'} +2 ⭐
            </p>
            <button
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-md transition cursor-pointer"
            >
              {uiLang === 'th' ? 'ทำประโยคถัดไป ➡️' : 'Next Sentence ➡️'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
