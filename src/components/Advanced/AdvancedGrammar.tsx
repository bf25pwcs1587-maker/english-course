import React, { useState } from 'react';
import { GrammarPitfall, AudioSpeed } from '../../types/index.ts';
import { grammarPitfalls } from '../../data/advancedContent.ts';
import { sfx } from '../../utils/soundEffects.ts';
import { audioService } from '../../utils/audio.ts';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  AlertTriangle,
  Lightbulb,
  Check,
  RotateCcw,
} from 'lucide-react';

interface AdvancedGrammarProps {
  audioSpeed: AudioSpeed;
  onEarnStar: (count: number) => void;
  uiLang: 'th' | 'en';
}

export const AdvancedGrammar: React.FC<AdvancedGrammarProps> = ({
  audioSpeed,
  onEarnStar,
  uiLang,
}) => {
  const [selectedPitfallId, setSelectedPitfallId] = useState(grammarPitfalls[0].id);
  const pitfall = grammarPitfalls.find((p) => p.id === selectedPitfallId) || grammarPitfalls[0];

  const [quizAnswers, setQuizAnswers] = useState<{ [qIdx: number]: number }>({});
  const [revealedTips, setRevealedTips] = useState<{ [qIdx: number]: boolean }>({});

  const handleSelectOption = (qIdx: number, optionIdx: number) => {
    setQuizAnswers((prev) => ({ ...prev, [qIdx]: optionIdx }));
    setRevealedTips((prev) => ({ ...prev, [qIdx]: true }));

    const question = pitfall.practiceQuestions[qIdx];
    if (optionIdx === question.correctIndex) {
      sfx.playCorrect();
      onEarnStar(2);
    } else {
      sfx.playTryAgain();
    }
  };

  const handleResetQuiz = () => {
    setQuizAnswers({});
    setRevealedTips({});
  };

  return (
    <div className="space-y-6">
      {/* Pitfall Selector */}
      <div className="flex flex-wrap gap-2">
        {grammarPitfalls.map((p) => (
          <button
            key={p.id}
            onClick={() => {
              setSelectedPitfallId(p.id);
              handleResetQuiz();
            }}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              p.id === pitfall.id
                ? 'bg-rose-600 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-rose-50 border border-slate-200'
            }`}
          >
            {uiLang === 'th' ? p.titleTh : p.titleEn}
          </button>
        ))}
      </div>

      {/* Main Pitfall Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-700 rounded-full text-xs font-bold mb-2">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>
              {uiLang === 'th' ? 'จุดผิดบ่อยที่คนไทยมักพลาด' : 'Common Thai-English Pitfall'}
            </span>
          </div>
          <h2 className="text-2xl font-black text-slate-900">{pitfall.titleEn}</h2>
          <p className="text-sm font-bold text-slate-600 mt-1">{pitfall.titleTh}</p>
        </div>

        {/* Why Thai speakers make this mistake */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs sm:text-sm text-amber-900">
          <div className="font-extrabold flex items-center gap-1.5 mb-1 text-amber-950">
            <Lightbulb className="w-4 h-4 text-amber-600" />
            <span>ทำไมคนไทยจึงมักสับสนจุดนี้?</span>
          </div>
          <p className="leading-relaxed">{pitfall.thaiMistakePattern}</p>
        </div>

        {/* Side-by-side Comparison (Wrong vs Correct) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-4">
            <div className="flex items-center gap-2 text-rose-800 font-extrabold text-sm mb-2">
              <XCircle className="w-4 h-4 text-rose-600" />
              <span>มักพูดหรือเขียนผิด (Tinglish / Incorrect)</span>
            </div>
            <p className="text-sm font-semibold text-rose-950 line-through decoration-rose-500">
              "{pitfall.incorrectExample}"
            </p>
          </div>

          <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4">
            <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-sm mb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>วิธีใช้ที่ถูกต้องตามมาตรฐานสากล (Correct)</span>
            </div>
            <p className="text-sm font-bold text-emerald-950">
              "{pitfall.correctExample}"
            </p>
          </div>
        </div>

        {/* In-depth Grammar Rule Explanation */}
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            คำอธิบายกฎไวยากรณ์และการนำไปใช้จริง
          </h4>
          <pre className="text-xs sm:text-sm text-slate-800 whitespace-pre-wrap font-sans leading-relaxed">
            {pitfall.explanationTh}
          </pre>
        </div>

        {/* Interactive Practice Questions */}
        <div className="border-t border-slate-200 pt-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-slate-900">
              ลองทดสอบดูว่าเข้าใจแล้วหรือยัง!
            </h3>
            <button
              onClick={handleResetQuiz}
              className="flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>เริ่มใหม่</span>
            </button>
          </div>

          <div className="space-y-6">
            {pitfall.practiceQuestions.map((q, qIdx) => {
              const userAnswer = quizAnswers[qIdx];
              const isAnswered = userAnswer !== undefined;
              const isCorrect = userAnswer === q.correctIndex;

              return (
                <div
                  key={qIdx}
                  className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200 space-y-3"
                >
                  <div>
                    <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">
                      ข้อที่ {qIdx + 1}
                    </span>
                    <p className="text-base font-bold text-slate-900 mt-1">{q.prompt}</p>
                    <p className="text-xs text-slate-500">{q.promptTh}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt, optIdx) => {
                      let style = 'bg-white hover:bg-slate-100 text-slate-800 border-slate-200';
                      if (isAnswered) {
                        if (optIdx === q.correctIndex) {
                          style = 'bg-emerald-100 text-emerald-950 border-emerald-400 font-bold';
                        } else if (optIdx === userAnswer) {
                          style = 'bg-rose-100 text-rose-950 border-rose-300';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectOption(qIdx, optIdx)}
                          className={`p-3 rounded-xl border text-sm text-left font-medium transition cursor-pointer flex items-center justify-between ${style}`}
                        >
                          <span>{opt}</span>
                          {isAnswered && optIdx === q.correctIndex && (
                            <Check className="w-4 h-4 text-emerald-700" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {revealedTips[qIdx] && (
                    <div
                      className={`p-3 rounded-xl text-xs font-semibold border ${
                        isCorrect
                          ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                          : 'bg-amber-50 text-amber-900 border-amber-200'
                      }`}
                    >
                      {isCorrect ? '🎉 ถูกต้องแม่นยำมาก! +2 ⭐ ' : '💡 เคล็ดลับเฉลย: '}
                      {q.tipTh}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
