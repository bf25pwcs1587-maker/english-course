import React, { useState } from 'react';
import { AdvancedConversationDialogue, AudioSpeed } from '../../types/index.ts';
import { advancedDialogues } from '../../data/advancedContent.ts';
import { audioService } from '../../utils/audio.ts';
import { sfx } from '../../utils/soundEffects.ts';
import { Volume2, MessageSquare, Play, Sparkles, BookOpen, User } from 'lucide-react';

interface AdvancedConversationProps {
  audioSpeed: AudioSpeed;
  onEarnStar: (count: number) => void;
  uiLang: 'th' | 'en';
}

export const AdvancedConversation: React.FC<AdvancedConversationProps> = ({
  audioSpeed,
  onEarnStar,
  uiLang,
}) => {
  const [selectedDialogueId, setSelectedDialogueId] = useState(advancedDialogues[0].id);
  const dialogue = advancedDialogues.find((d) => d.id === selectedDialogueId) || advancedDialogues[0];

  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const [activeTurnIdx, setActiveTurnIdx] = useState<number | null>(null);
  const [showThaiSubtitle, setShowThaiSubtitle] = useState(true);

  const handlePlayLine = (index: number, text: string) => {
    setActiveTurnIdx(index);
    audioService.speak(text, audioSpeed, undefined, () => {
      setActiveTurnIdx(null);
    });
  };

  const handlePlayEntireDialogue = () => {
    if (isPlayingAll) {
      audioService.stop();
      setIsPlayingAll(false);
      setActiveTurnIdx(null);
      return;
    }

    setIsPlayingAll(true);
    let currentIdx = 0;

    const playNext = () => {
      if (currentIdx >= dialogue.turns.length) {
        setIsPlayingAll(false);
        setActiveTurnIdx(null);
        onEarnStar(2);
        sfx.playFanfare();
        return;
      }

      setActiveTurnIdx(currentIdx);
      const turn = dialogue.turns[currentIdx];
      currentIdx++;

      audioService.speak(turn.en, audioSpeed, undefined, () => {
        setTimeout(playNext, 600);
      });
    };

    playNext();
  };

  return (
    <div className="space-y-6">
      {/* Dialogue Selection */}
      <div className="flex flex-wrap gap-2">
        {advancedDialogues.map((d) => (
          <button
            key={d.id}
            onClick={() => {
              setSelectedDialogueId(d.id);
              setActiveTurnIdx(null);
              setIsPlayingAll(false);
              audioService.stop();
            }}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              d.id === dialogue.id
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-indigo-50 border border-slate-200'
            }`}
          >
            {uiLang === 'th' ? d.titleTh : d.title}
          </button>
        ))}
      </div>

      {/* Main Dialogue Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        {/* Header & Scenario */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold mb-2">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{uiLang === 'th' ? 'บทสนทนาสถานการณ์จริง' : 'Real-Life Scenario'}</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900">{dialogue.title}</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {uiLang === 'th' ? dialogue.scenarioTh : dialogue.scenarioEn}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowThaiSubtitle(!showThaiSubtitle)}
              className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
            >
              {showThaiSubtitle ? '🇹🇭 ซ่อนคำแปลไทย' : '🇹🇭 แสดงคำแปลไทย'}
            </button>

            <button
              onClick={handlePlayEntireDialogue}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-xs transition cursor-pointer ${
                isPlayingAll
                  ? 'bg-rose-500 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{isPlayingAll ? 'หยุดเล่น' : 'เล่นบทสนทนาต่อเนื่อง'}</span>
            </button>
          </div>
        </div>

        {/* Conversation Chat Stream */}
        <div className="space-y-4 max-w-2xl mx-auto py-2">
          {dialogue.turns.map((turn, idx) => {
            const isSpeakerRight = turn.speaker.startsWith('You');
            const isActive = activeTurnIdx === idx;

            return (
              <div
                key={idx}
                className={`flex gap-3 items-start ${
                  isSpeakerRight ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                {/* Speaker Avatar */}
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-base shrink-0 shadow-xs ${
                    isSpeakerRight
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {isSpeakerRight ? 'You' : turn.speaker[0]}
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-[85%] rounded-2xl p-4 transition-all ${
                    isActive
                      ? 'ring-2 ring-indigo-500 scale-102 shadow-md'
                      : 'border border-slate-200'
                  } ${
                    isSpeakerRight
                      ? 'bg-indigo-50/70 text-slate-900'
                      : 'bg-slate-50 text-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 mb-1">
                    <span className="text-xs font-bold text-slate-500">
                      {turn.speaker}
                    </span>
                    <button
                      onClick={() => handlePlayLine(idx, turn.en)}
                      className="text-indigo-600 hover:text-indigo-800 p-1 rounded-md hover:bg-white cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-base font-semibold text-slate-800 leading-snug">
                    {turn.en}
                  </p>

                  {showThaiSubtitle && (
                    <p className="text-xs text-slate-600 mt-1.5 pt-1.5 border-t border-slate-200/60 font-medium">
                      {turn.th}
                    </p>
                  )}

                  {turn.notes && (
                    <div className="mt-2 text-[11px] font-medium bg-amber-50 text-amber-900 p-2 rounded-lg border border-amber-200">
                      💡 <strong>ข้อสังเกต:</strong> {turn.notes}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Key Expressions Summary */}
        <div className="border-t border-slate-200 pt-6">
          <h3 className="text-lg font-black text-slate-900 mb-3 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span>
              {uiLang === 'th' ? 'ประโยคทองและสำนวนสำคัญในบทสนทนานี้' : 'Key Expressions & Nuances'}
            </span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dialogue.keyExpressions.map((exp, expIdx) => (
              <div
                key={expIdx}
                className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-indigo-700 text-sm">
                    {exp.en}
                  </div>
                  <button
                    onClick={() => audioService.speak(exp.en, audioSpeed)}
                    className="p-1 hover:bg-slate-200 rounded-md text-slate-600 cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="text-xs font-bold text-slate-800">{exp.th}</div>
                <div className="text-xs text-slate-600 leading-relaxed font-normal">
                  {exp.usageNoteTh}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
