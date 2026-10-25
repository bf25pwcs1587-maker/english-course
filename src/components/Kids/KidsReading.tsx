import React, { useState } from 'react';
import { KidsTopic, AudioSpeed } from '../../types/index.ts';
import { audioService } from '../../utils/audio.ts';
import { sfx } from '../../utils/soundEffects.ts';
import { Volume2, BookOpen, Star, HelpCircle } from 'lucide-react';

interface KidsReadingProps {
  topic: KidsTopic;
  audioSpeed: AudioSpeed;
  onEarnStar: (count: number) => void;
  uiLang: 'th' | 'en';
}

export const KidsReading: React.FC<KidsReadingProps> = ({
  topic,
  audioSpeed,
  onEarnStar,
  uiLang,
}) => {
  const story = topic.story || {
    id: `story_${topic.id}`,
    titleTh: `นิทานแสนสนุก: ${topic.titleTh}`,
    titleEn: `Fun Story: ${topic.titleEn}`,
    sentences: topic.words.slice(0, 3).map((w) => ({
      en: w.exampleSentence,
      th: w.exampleSentenceThai,
      words: [
        { en: w.english, th: w.thai, phonetic: w.phoneticThai },
      ],
      imageHint: w.emoji,
    })),
  };

  const [selectedWord, setSelectedWord] = useState<{
    en: string;
    th: string;
    phonetic: string;
  } | null>(null);

  const [completedSentences, setCompletedSentences] = useState<number[]>([]);

  const handlePlaySentence = (index: number, text: string) => {
    audioService.speak(text, audioSpeed);
    if (!completedSentences.includes(index)) {
      setCompletedSentences((prev) => [...prev, index]);
      onEarnStar(1);
      sfx.playCorrect();
    }
  };

  return (
    <div className="bg-gradient-to-b from-amber-50/50 to-orange-50/40 rounded-3xl p-6 sm:p-8 border-2 border-amber-200 shadow-xs space-y-6">
      {/* Story Title */}
      <div className="text-center max-w-xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-bold mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          <span>{uiLang === 'th' ? 'นิทานภาพและการอ่าน' : 'Storybook Time'}</span>
        </div>
        <h3 className="text-2xl font-black text-slate-800">
          {uiLang === 'th' ? story.titleTh : story.titleEn}
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          {uiLang === 'th'
            ? '💡 แตะที่คำศัพท์แต่ละคำเพื่อดูคำแปลไทย หรือกดปุ่มลำโพงเพื่อฟังเสียงประโยค'
            : '💡 Tap any word to see its Thai meaning, or press the speaker to listen'}
        </p>
      </div>

      {/* Story Cards */}
      <div className="space-y-4 max-w-2xl mx-auto">
        {story.sentences.map((sentence, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-5 border-2 border-amber-100 hover:border-amber-300 transition shadow-xs flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <div className="text-5xl self-center sm:self-auto p-2 bg-amber-50 rounded-2xl">
              {sentence.imageHint}
            </div>

            <div className="flex-1 space-y-2">
              {/* English Sentence with clickable words */}
              <div className="text-lg font-bold text-slate-900 flex flex-wrap gap-1.5 items-center">
                {sentence.words ? (
                  sentence.words.map((w, wIdx) => (
                    <button
                      key={wIdx}
                      onClick={() => {
                        setSelectedWord(w);
                        audioService.speak(w.en, audioSpeed);
                      }}
                      className="hover:text-amber-600 hover:underline decoration-amber-400 decoration-2 underline-offset-4 font-extrabold cursor-pointer transition text-left"
                    >
                      {w.en}
                    </button>
                  ))
                ) : (
                  <span>{sentence.en}</span>
                )}
              </div>

              {/* Thai Translation */}
              <div className="text-sm text-slate-600 font-medium bg-amber-50/60 px-3 py-1.5 rounded-xl border border-amber-100/80">
                {sentence.th}
              </div>
            </div>

            {/* Listen Button */}
            <button
              onClick={() => handlePlaySentence(idx, sentence.en)}
              className="self-end sm:self-auto flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-amber-950 text-xs font-bold shadow-xs transition cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>{uiLang === 'th' ? 'ฟังเสียง' : 'Listen'}</span>
            </button>
          </div>
        ))}
      </div>

      {/* Word Detail Popup / Callout */}
      {selectedWord && (
        <div className="max-w-md mx-auto bg-amber-400 text-amber-950 p-4 rounded-2xl shadow-lg border-2 border-white flex items-center justify-between animate-fadeIn">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider opacity-80">
              {uiLang === 'th' ? 'คำแปลศัพท์' : 'Vocabulary Gloss'}
            </div>
            <div className="text-xl font-black">
              {selectedWord.en}{' '}
              <span className="text-base font-normal">({selectedWord.phonetic})</span>
            </div>
            <div className="text-sm font-semibold">{selectedWord.th}</div>
          </div>
          <button
            onClick={() => setSelectedWord(null)}
            className="px-3 py-1 rounded-xl bg-white/30 hover:bg-white/50 text-xs font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};
