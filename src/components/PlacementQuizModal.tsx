import React, { useState } from 'react';
import { PlacementQuestion, UserProgress } from '../types/index.ts';
import { placementQuestions } from '../data/placementQuiz.ts';
import { evaluatePlacementQuiz } from '../utils/rules.ts';
import { audioService } from '../utils/audio.ts';
import { sfx } from '../utils/soundEffects.ts';
import {
  Compass,
  Volume2,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Smile,
  GraduationCap,
  RotateCcw,
} from 'lucide-react';

interface PlacementQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  uiLang: 'th' | 'en';
  onApplyRecommendation: (path: 'kids' | 'advanced', levelName: string) => void;
}

export const PlacementQuizModal: React.FC<PlacementQuizModalProps> = ({
  isOpen,
  onClose,
  uiLang,
  onApplyRecommendation,
}) => {
  if (!isOpen) return null;

  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(placementQuestions.length).fill(null)
  );
  const [isCompleted, setIsCompleted] = useState(false);

  const question = placementQuestions[currentIdx];
  const progressPercent = Math.round(((currentIdx + 1) / placementQuestions.length) * 100);

  const handleSelectOption = (optIdx: number) => {
    const nextAnswers = [...answers];
    nextAnswers[currentIdx] = optIdx;
    setAnswers(nextAnswers);

    sfx.playCorrect();

    if (currentIdx < placementQuestions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setIsCompleted(true);
      sfx.playFanfare();
    }
  };

  const handlePlayAudio = () => {
    if (question.audioPrompt) {
      audioService.speak(question.audioPrompt, 1.0);
    }
  };

  const evalResult = isCompleted
    ? evaluatePlacementQuiz(answers, placementQuestions)
    : null;

  const handleRestart = () => {
    setCurrentIdx(0);
    setAnswers(new Array(placementQuestions.length).fill(null));
    setIsCompleted(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900">
                {uiLang === 'th' ? 'แบบทดสอบวัดระดับ (Placement Quiz)' : 'Level Placement Quiz'}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {uiLang === 'th' ? 'คำถาม 6 ข้อเพื่อแนะนำเส้นทางการเรียนที่เหมาะสมที่สุด' : '6 quick questions to find your optimal path'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-sm cursor-pointer"
          >
            ✕
          </button>
        </div>

        {!isCompleted ? (
          <div className="space-y-6">
            {/* Progress bar */}
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-500 mb-1.5">
                <span>
                  ข้อที่ {currentIdx + 1} จาก {placementQuestions.length}
                </span>
                <span>{progressPercent}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-600 transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <h4 className="text-lg font-black text-slate-900 leading-snug">
                  {question.questionEn}
                </h4>
                {question.audioPrompt && (
                  <button
                    onClick={handlePlayAudio}
                    className="shrink-0 p-2 rounded-xl bg-white hover:bg-indigo-50 text-indigo-600 border border-indigo-200 shadow-xs cursor-pointer"
                    title="Listen to question"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              <p className="text-xs text-slate-500 font-medium">{question.questionTh}</p>
            </div>

            {/* Options */}
            <div className="space-y-2.5">
              {question.options.map((opt, optIdx) => (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 hover:border-indigo-500 hover:bg-indigo-50/50 text-left text-sm font-bold text-slate-800 transition flex items-center justify-between group cursor-pointer"
                >
                  <span>{opt.text}</span>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Results and Recommendation */
          evalResult && (
            <div className="text-center space-y-6 animate-fadeIn py-2">
              <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-3xl mx-auto shadow-inner">
                {evalResult.recommendedPath === 'kids' ? '🧒' : '🎓'}
              </div>

              <div>
                <span className="text-xs font-bold px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full inline-block mb-2">
                  คะแนนของคุณ: {evalResult.score} / {evalResult.total}
                </span>
                <h4 className="text-2xl font-black text-slate-900">
                  {uiLang === 'th' ? evalResult.levelTitleTh : evalResult.levelTitleEn}
                </h4>
                <p className="text-sm text-slate-600 max-w-md mx-auto mt-2 leading-relaxed">
                  {evalResult.explanationTh}
                </p>
              </div>

              {/* Recommendation Callout */}
              <div
                className={`p-5 rounded-2xl border-2 text-left space-y-2 ${
                  evalResult.recommendedPath === 'kids'
                    ? 'bg-amber-50 border-amber-300'
                    : 'bg-indigo-50 border-indigo-300'
                }`}
              >
                <div className="flex items-center gap-2 font-black text-slate-900">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>
                    {evalResult.recommendedPath === 'kids'
                      ? 'แนะนำ: โหมดเด็ก & ปูพื้นฐาน (Kids Path)'
                      : 'แนะนำ: โหมดขั้นสูง & วัยทำงาน (Advanced Path)'}
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  คุณสามารถสลับโหมดไปมาระหว่าง Kids และ Advanced ได้ตลอดเวลาที่แถบด้านบน
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => {
                    onApplyRecommendation(
                      evalResult.recommendedPath,
                      evalResult.recommendedLevel
                    );
                    onClose();
                  }}
                  className="px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm shadow-md transition transform hover:scale-102 cursor-pointer"
                >
                  {uiLang === 'th' ? 'เข้าเรียนในระดับนี้เลย ✨' : 'Start with this track ✨'}
                </button>

                <button
                  onClick={handleRestart}
                  className="px-4 py-3.5 rounded-2xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{uiLang === 'th' ? 'ทำแบบทดสอบใหม่' : 'Retake Quiz'}</span>
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};
