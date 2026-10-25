import React, { useState } from 'react';
import { AdvancedReadingArticle, AudioSpeed } from '../../types/index.ts';
import { advancedArticles } from '../../data/advancedContent.ts';
import { audioService } from '../../utils/audio.ts';
import { sfx } from '../../utils/soundEffects.ts';
import {
  Volume2,
  BookOpen,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Info,
  ChevronRight,
} from 'lucide-react';

interface AdvancedReadingProps {
  audioSpeed: AudioSpeed;
  onEarnStar: (count: number) => void;
  uiLang: 'th' | 'en';
}

export const AdvancedReading: React.FC<AdvancedReadingProps> = ({
  audioSpeed,
  onEarnStar,
  uiLang,
}) => {
  const [selectedArticleId, setSelectedArticleId] = useState(advancedArticles[0].id);
  const article = advancedArticles.find((a) => a.id === selectedArticleId) || advancedArticles[0];

  const [activeGlossaryWord, setActiveGlossaryWord] = useState<{
    word: string;
    th: string;
    type: string;
    example: string;
  } | null>(null);

  const [selectedAnswers, setSelectedAnswers] = useState<{ [qIdx: number]: number }>({});
  const [showExplanations, setShowExplanations] = useState<{ [qIdx: number]: boolean }>({});

  const handlePlayParagraph = (text: string) => {
    audioService.speak(text, audioSpeed);
  };

  const handleSelectAnswer = (qIdx: number, optionIdx: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [qIdx]: optionIdx }));
    setShowExplanations((prev) => ({ ...prev, [qIdx]: true }));

    const question = article.comprehensionQuestions[qIdx];
    if (optionIdx === question.correctIndex) {
      sfx.playCorrect();
      onEarnStar(2);
    } else {
      sfx.playTryAgain();
    }
  };

  return (
    <div className="space-y-6">
      {/* Article Selector */}
      <div className="flex flex-wrap gap-2">
        {advancedArticles.map((art) => (
          <button
            key={art.id}
            onClick={() => {
              setSelectedArticleId(art.id);
              setSelectedAnswers({});
              setShowExplanations({});
              setActiveGlossaryWord(null);
            }}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              art.id === article.id
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-indigo-50 border border-slate-200'
            }`}
          >
            {uiLang === 'th' ? art.titleTh : art.title}
          </button>
        ))}
      </div>

      {/* Main Article Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              {article.category}
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
              {article.level}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {article.title}
          </h2>
          <p className="text-sm font-medium text-slate-500 mt-1">
            {article.titleTh}
          </p>
        </div>

        {/* Interactive Glossary Banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 text-xs text-amber-900 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <span>
            {uiLang === 'th'
              ? 'คำศัพท์สีน้ำเงินในเนื้อหาคือคำศัพท์สำคัญ สามารถคลิกเพื่อดูคำแปลไทย ประเภทคำ และตัวอย่างการใช้งานได้ทันที'
              : 'Blue highlighted terms are key vocabulary. Click on any to reveal Thai definitions and nuances.'}
          </span>
        </div>

        {/* Paragraphs with sentence audio and inline vocabulary tags */}
        <div className="space-y-6">
          {article.paragraphs.map((p, pIdx) => (
            <div
              key={pIdx}
              className="bg-slate-50/70 hover:bg-slate-50 rounded-2xl p-5 border border-slate-200 transition space-y-3"
            >
              <div className="flex items-start justify-between gap-4">
                <p className="text-base sm:text-lg leading-relaxed text-slate-800 font-normal">
                  {p.en}
                </p>
                <button
                  onClick={() => handlePlayParagraph(p.en)}
                  className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-indigo-50 text-indigo-600 border border-indigo-200 text-xs font-bold shadow-xs cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{uiLang === 'th' ? 'ฟังย่อหน้านี้' : 'Listen'}</span>
                </button>
              </div>

              {/* Thai translation of paragraph */}
              <div className="text-sm text-slate-600 bg-white/80 p-3 rounded-xl border border-slate-200/80 leading-relaxed font-normal">
                {p.th}
              </div>

              {/* Glossary Chips for this paragraph */}
              <div className="flex flex-wrap gap-2 pt-1">
                {p.glossary.map((g, gIdx) => (
                  <button
                    key={gIdx}
                    onClick={() => {
                      setActiveGlossaryWord(g);
                      audioService.speak(g.word, audioSpeed);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 cursor-pointer transition"
                  >
                    <span>{g.word}</span>
                    <span className="text-[10px] text-indigo-400 font-mono">({g.type})</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Active Glossary Modal / Floating Popover */}
        {activeGlossaryWord && (
          <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white rounded-2xl p-5 shadow-lg border border-indigo-500/30 flex items-start justify-between gap-4 animate-fadeIn">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="text-xl font-black text-amber-300">
                  {activeGlossaryWord.word}
                </h4>
                <span className="text-xs font-mono text-indigo-200 px-2 py-0.5 rounded-md bg-white/10">
                  {activeGlossaryWord.type}
                </span>
                <button
                  onClick={() => audioService.speak(activeGlossaryWord.word, audioSpeed)}
                  className="p-1 hover:bg-white/20 rounded-full cursor-pointer"
                >
                  <Volume2 className="w-4 h-4 text-amber-300" />
                </button>
              </div>
              <p className="text-sm font-semibold text-white">
                คำแปล: {activeGlossaryWord.th}
              </p>
              <p className="text-xs text-indigo-200 italic mt-1">
                ตัวอย่าง: "{activeGlossaryWord.example}"
              </p>
            </div>
            <button
              onClick={() => setActiveGlossaryWord(null)}
              className="text-slate-400 hover:text-white text-sm font-bold cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* Comprehension Questions */}
        <div className="border-t border-slate-200 pt-6 space-y-6">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-black text-slate-900">
              {uiLang === 'th' ? 'แบบฝึกหัดตรวจสอบความเข้าใจ (Comprehension Check)' : 'Comprehension Check'}
            </h3>
          </div>

          <div className="space-y-6">
            {article.comprehensionQuestions.map((q, qIdx) => {
              const userAnswer = selectedAnswers[qIdx];
              const isAnswered = userAnswer !== undefined;
              const isCorrect = userAnswer === q.correctIndex;

              return (
                <div
                  key={qIdx}
                  className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4"
                >
                  <div>
                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block mb-1">
                      {uiLang === 'th' ? `คำถามที่ ${qIdx + 1}` : `Question ${qIdx + 1}`}
                    </span>
                    <p className="text-base font-bold text-slate-900">{q.question}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{q.questionTh}</p>
                  </div>

                  {/* Options */}
                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => {
                      let btnStyle = 'bg-white hover:bg-indigo-50/50 text-slate-800 border-slate-200';
                      if (isAnswered) {
                        if (optIdx === q.correctIndex) {
                          btnStyle = 'bg-emerald-100 text-emerald-950 border-emerald-400 font-bold';
                        } else if (optIdx === userAnswer) {
                          btnStyle = 'bg-rose-100 text-rose-950 border-rose-300';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectAnswer(qIdx, optIdx)}
                          className={`w-full text-left p-3 rounded-xl border text-sm transition-all flex items-start gap-3 cursor-pointer ${btnStyle}`}
                        >
                          <span className="w-6 h-6 rounded-full bg-slate-100 font-bold text-xs flex items-center justify-center shrink-0">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation in Thai */}
                  {showExplanations[qIdx] && (
                    <div
                      className={`p-4 rounded-xl text-xs sm:text-sm font-medium border animate-fadeIn ${
                        isCorrect
                          ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                          : 'bg-amber-50 text-amber-900 border-amber-200'
                      }`}
                    >
                      <div className="font-bold mb-1 flex items-center gap-1.5">
                        {isCorrect ? '🎉 ถูกต้อง! +2 ⭐' : '💡 คำอธิบายเฉลย:'}
                      </div>
                      <p className="leading-relaxed">{q.explanationTh}</p>
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
