import React, { useState } from 'react';
import { WritingPrompt, WritingFeedbackResult, AudioSpeed } from '../../types/index.ts';
import { advancedWritingPrompts } from '../../data/advancedContent.ts';
import { analyzeWriting } from '../../utils/rules.ts';
import { sfx } from '../../utils/soundEffects.ts';
import {
  PenTool,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  RotateCcw,
  BookOpen,
} from 'lucide-react';

interface AdvancedWritingProps {
  audioSpeed: AudioSpeed;
  onEarnStar: (count: number) => void;
  onIncrementWritingCount: () => void;
  uiLang: 'th' | 'en';
}

export const AdvancedWriting: React.FC<AdvancedWritingProps> = ({
  audioSpeed,
  onEarnStar,
  onIncrementWritingCount,
  uiLang,
}) => {
  const [selectedPromptId, setSelectedPromptId] = useState(advancedWritingPrompts[0].id);
  const prompt =
    advancedWritingPrompts.find((p) => p.id === selectedPromptId) || advancedWritingPrompts[0];

  const [text, setText] = useState(prompt.starterSentenceEn);
  const [feedback, setFeedback] = useState<WritingFeedbackResult | null>(null);

  const words = text.trim() ? text.trim().split(/\s+/).filter(Boolean) : [];
  const wordCount = words.length;

  const handleSubmitForFeedback = () => {
    const result = analyzeWriting(text, prompt);
    setFeedback(result);
    sfx.playFanfare();
    onEarnStar(3);
    onIncrementWritingCount();
  };

  const handleInsertKeyword = (keyword: string) => {
    setText((prev) => (prev ? `${prev} ${keyword}` : keyword));
  };

  const handleResetToStarter = () => {
    setText(prompt.starterSentenceEn);
    setFeedback(null);
  };

  return (
    <div className="space-y-6">
      {/* Prompt Tabs */}
      <div className="flex flex-wrap gap-2">
        {advancedWritingPrompts.map((p) => (
          <button
            key={p.id}
            onClick={() => {
              setSelectedPromptId(p.id);
              setText(p.starterSentenceEn);
              setFeedback(null);
            }}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              p.id === prompt.id
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-purple-50 border border-slate-200'
            }`}
          >
            {uiLang === 'th' ? p.titleTh : p.titleEn}
          </button>
        ))}
      </div>

      {/* Editor Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-bold mb-2">
            <PenTool className="w-3.5 h-3.5" />
            <span>{uiLang === 'th' ? 'ฝึกเขียนภาษาอังกฤษพร้อมผลวิเคราะห์' : 'Writing Studio'}</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900">{prompt.titleEn}</h2>
          <p className="text-sm font-bold text-slate-600 mt-1">{prompt.titleTh}</p>
        </div>

        {/* Task Instructions */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
          <p className="text-sm text-slate-800 font-medium">{prompt.instructionsEn}</p>
          <p className="text-xs text-slate-500">{prompt.instructionsTh}</p>
        </div>

        {/* Suggested Vocabulary Bank */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            {uiLang === 'th' ? '💡 คำศัพท์และสำนวนแนะนำ (คลิกเพื่อแทรก)' : 'Recommended Keywords (Click to Insert):'}
          </div>
          <div className="flex flex-wrap gap-2">
            {prompt.suggestedKeywords.map((kw, idx) => (
              <button
                key={idx}
                onClick={() => handleInsertKeyword(kw.en)}
                className="px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
              >
                <span>+</span>
                <span className="font-bold">{kw.en}</span>
                <span className="text-[10px] text-purple-500 font-normal">({kw.th})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Textarea */}
        <div className="space-y-2">
          <div className="relative">
            <textarea
              rows={8}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write your response in English here..."
              className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none text-base text-slate-800 font-sans leading-relaxed transition"
            />
          </div>

          <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-1">
            <span>
              จำนวนคำ: <strong className="text-slate-900">{wordCount}</strong> / ขั้นต่ำ {prompt.minWords} คำ
            </span>
            <button
              onClick={handleResetToStarter}
              className="text-slate-400 hover:text-slate-700 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>เริ่มใหม่จากประโยคตั้งต้น</span>
            </button>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSubmitForFeedback}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-black text-sm shadow-md transition transform hover:scale-102 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>{uiLang === 'th' ? 'ส่งตรวจและรับคำแนะนำเชิงบวก' : 'Analyze & Get Feedback'}</span>
          </button>
        </div>

        {/* Smart Feedback Panel */}
        {feedback && (
          <div className="mt-8 border-t-2 border-purple-100 pt-6 space-y-6 animate-fadeIn">
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-purple-700 uppercase tracking-wider block mb-1">
                  ผลการประเมินการเขียน
                </span>
                <h3 className="text-xl font-black text-slate-900">
                  {uiLang === 'th' ? feedback.encouragementTh : feedback.encouragementEn}
                </h3>
              </div>
              <div className="flex items-center gap-2 bg-white px-5 py-3 rounded-2xl shadow-xs border border-purple-100">
                <span className="text-3xl font-black text-purple-600">
                  {feedback.scoreOutOf10}
                </span>
                <span className="text-xs font-bold text-slate-400">/ 10</span>
              </div>
            </div>

            {/* Detected Thai-English Pitfalls if any */}
            {feedback.spellingGrammarNotes.length > 0 ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>จุดที่สามารถปรับให้เป็นธรรมชาติมากขึ้น (Thai Interference Notes):</span>
                </div>
                <div className="space-y-3">
                  {feedback.spellingGrammarNotes.map((note, idx) => (
                    <div
                      key={idx}
                      className="bg-rose-50/60 border border-rose-200 rounded-2xl p-4 text-xs sm:text-sm space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="line-through decoration-rose-500 font-bold text-rose-800">
                          {note.issue}
                        </span>
                        <span className="font-extrabold text-emerald-700 bg-white px-2 py-0.5 rounded-md border border-emerald-200">
                          แนะนำ: {note.suggestion}
                        </span>
                      </div>
                      <p className="text-slate-700">{note.explanationTh}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-emerald-900 text-sm font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>
                  {uiLang === 'th'
                    ? 'ไม่พบข้อผิดพลาดไวยากรณ์หรือการแปลตรงตัวที่พบบ่อย ยอดเยี่ยมมากครับ!'
                    : 'No common grammar or direct-translation pitfalls detected! Excellent!'}
                </span>
              </div>
            )}

            {/* Elevated Vocabulary Suggestions */}
            {feedback.vocabularyUpgrades.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span>คำศัพท์ยกระดับให้ดูมืออาชีพยิ่งขึ้น (Vocabulary Upgrades):</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {feedback.vocabularyUpgrades.map((up, idx) => (
                    <div
                      key={idx}
                      className="bg-indigo-50/50 border border-indigo-200 rounded-2xl p-3.5 space-y-1 text-xs"
                    >
                      <div className="font-semibold text-slate-500">
                        แทนคำว่า <strong className="text-slate-800">"{up.original}"</strong>
                      </div>
                      <div className="font-bold text-indigo-800 text-sm">
                        ✨ {up.elevated}
                      </div>
                      <div className="text-slate-600">{up.reasonTh}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
