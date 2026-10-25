import React, { useState } from 'react';
import { KidsTopic, KidsWord, AudioSpeed } from '../../types/index.ts';
import { audioService, startVoiceRecognition } from '../../utils/audio.ts';
import { sfx } from '../../utils/soundEffects.ts';
import {
  Volume2,
  ChevronLeft,
  ChevronRight,
  Mic,
  MicOff,
  Sparkles,
  HelpCircle,
  ThumbsUp,
} from 'lucide-react';

interface KidsFlashcardsProps {
  topic: KidsTopic;
  audioSpeed: AudioSpeed;
  onEarnStar: (count: number) => void;
  uiLang: 'th' | 'en';
}

export const KidsFlashcards: React.FC<KidsFlashcardsProps> = ({
  topic,
  audioSpeed,
  onEarnStar,
  uiLang,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentWord = topic.words[currentIndex % topic.words.length];

  const [isRecording, setIsRecording] = useState(false);
  const [voiceFeedback, setVoiceFeedback] = useState<string | null>(null);
  const [activeRecService, setActiveRecService] = useState<{ stop: () => void } | null>(null);

  const handlePlayWord = (word: KidsWord, speed = audioSpeed) => {
    audioService.speak(word.english, speed);
  };

  const handlePlaySentence = (sentence: string) => {
    audioService.speak(sentence, audioSpeed);
  };

  const handleStartSpeakingPractice = () => {
    if (isRecording) {
      if (activeRecService) activeRecService.stop();
      setIsRecording(false);
      return;
    }

    setIsRecording(true);
    setVoiceFeedback(uiLang === 'th' ? 'กำลังฟังเสียงน้อง... พูดเลยครับ 🎤' : 'Listening... Say the word! 🎤');

    const rec = startVoiceRecognition(
      (transcript) => {
        setIsRecording(false);
        const cleanRec = transcript.toLowerCase();
        const cleanTarget = currentWord.english.toLowerCase();

        if (cleanRec.includes(cleanTarget) || cleanTarget.includes(cleanRec)) {
          sfx.playFanfare();
          setVoiceFeedback(
            uiLang === 'th'
              ? `เก่งมาก! ออกเสียงได้ชัดเจนมาก ("${transcript}") 🎉`
              : `Wonderful! Super clear pronunciation ("${transcript}") 🎉`
          );
          onEarnStar(1);
        } else {
          sfx.playTryAgain();
          setVoiceFeedback(
            uiLang === 'th'
              ? `ได้ยินว่า "${transcript}" — ยอดเยี่ยมที่กล้าพูด! ลองฟังอีกรอบแล้วพูดใหม่นะ ✨`
              : `Heard "${transcript}" — Proud of you for trying! Listen and try again ✨`
          );
        }
      },
      (err) => {
        setIsRecording(false);
        // Gentle fallback if microphone is blocked or not available in environment
        sfx.playCorrect();
        setVoiceFeedback(
          uiLang === 'th'
            ? `เยี่ยมมากครับ! ฝึกออกเสียงตามในใจหรือพูดออกเสียงดังๆ ได้เลย 👍`
            : `Great job! Keep practicing saying it out loud! 👍`
        );
        onEarnStar(1);
      }
    );

    setActiveRecService(rec);
  };

  const handleNext = () => {
    setVoiceFeedback(null);
    setCurrentIndex((prev) => (prev + 1) % topic.words.length);
    const nextWord = topic.words[(currentIndex + 1) % topic.words.length];
    handlePlayWord(nextWord);
  };

  const handlePrev = () => {
    setVoiceFeedback(null);
    setCurrentIndex((prev) => (prev - 1 + topic.words.length) % topic.words.length);
    const prevWord = topic.words[(currentIndex - 1 + topic.words.length) % topic.words.length];
    handlePlayWord(prevWord);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Big Word Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-amber-200 shadow-md text-center relative overflow-hidden transition-all">
        {/* Background playful blur blob */}
        <div className="absolute -top-16 -right-16 w-40 h-40 bg-amber-100 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-orange-100 rounded-full blur-2xl pointer-events-none" />

        {/* Word Progress Indicator */}
        <div className="flex justify-between items-center mb-4 text-xs font-bold text-amber-800">
          <span className="bg-amber-100 px-3 py-1 rounded-full">
            {currentIndex + 1} / {topic.words.length}
          </span>
          <span className="text-slate-400">
            {uiLang === 'th' ? 'โหมดออกเสียงและคำศัพท์' : 'Vocabulary & Sounds'}
          </span>
        </div>

        {/* Emoji Visual */}
        <div className="text-8xl my-4 hover:scale-110 transition-transform cursor-pointer select-none" onClick={() => handlePlayWord(currentWord)}>
          {currentWord.emoji}
        </div>

        {/* English Word */}
        <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-2">
          {currentWord.english}
        </h2>

        {/* Thai Phonetic & IPA */}
        <div className="flex items-center justify-center gap-3 mb-4 flex-wrap">
          <span className="text-base sm:text-lg font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-xl border border-amber-200">
            🗣️ {currentWord.phoneticThai}
          </span>
          <span className="text-xs text-slate-400 font-mono">
            {currentWord.ipa}
          </span>
        </div>

        {/* Thai Translation */}
        <div className="text-2xl font-bold text-slate-700 mb-6">
          {currentWord.thai}
        </div>

        {/* Audio Controls */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <button
            onClick={() => handlePlayWord(currentWord, audioSpeed)}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-black text-base shadow-md transition transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Volume2 className="w-5 h-5" />
            <span>{uiLang === 'th' ? 'ฟังเสียงคำนี้' : 'Listen'}</span>
          </button>

          <button
            onClick={() => handlePlayWord(currentWord, 0.5)}
            className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-sm transition cursor-pointer"
          >
            <span>🐢</span>
            <span>{uiLang === 'th' ? 'ฟังแบบช้าๆ (0.5x)' : 'Slow Audio'}</span>
          </button>

          {/* Speak & Repeat Practice */}
          <button
            onClick={handleStartSpeakingPractice}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-sm shadow-md transition transform hover:scale-105 active:scale-95 cursor-pointer ${
              isRecording
                ? 'bg-rose-500 text-white animate-pulse'
                : 'bg-emerald-500 hover:bg-emerald-600 text-white'
            }`}
          >
            {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            <span>
              {isRecording
                ? uiLang === 'th'
                  ? 'กำลังบันทึก...'
                  : 'Listening...'
                : uiLang === 'th'
                ? 'ฝึกพูดตาม 🎤'
                : 'Speak & Repeat 🎤'}
            </span>
          </button>
        </div>

        {/* Feedback message from speaking practice */}
        {voiceFeedback && (
          <div className="bg-amber-50 border border-amber-300 rounded-2xl p-3 mb-6 text-sm font-bold text-amber-900 animate-fadeIn">
            {voiceFeedback}
          </div>
        )}

        {/* Example Sentence Box */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {uiLang === 'th' ? 'ตัวอย่างประโยคในชีวิตประจำวัน' : 'Example Sentence'}
            </span>
            <button
              onClick={() => handlePlaySentence(currentWord.exampleSentence)}
              className="text-amber-600 hover:text-amber-800 text-xs font-bold flex items-center gap-1 cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>{uiLang === 'th' ? 'ฟังประโยค' : 'Listen'}</span>
            </button>
          </div>
          <p className="text-base font-bold text-slate-800">
            {currentWord.exampleSentence}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            {currentWord.exampleSentenceThai}
          </p>
        </div>
      </div>

      {/* Navigation Controls: Prev & Next */}
      <div className="flex items-center justify-between px-2">
        <button
          onClick={handlePrev}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-white hover:bg-amber-50 text-slate-700 font-bold text-sm border border-slate-200 shadow-xs transition cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{uiLang === 'th' ? 'คำก่อนหน้า' : 'Previous'}</span>
        </button>

        <button
          onClick={handleNext}
          className="flex items-center gap-1.5 px-6 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-black text-sm shadow-md transition transform hover:scale-105 cursor-pointer"
        >
          <span>{uiLang === 'th' ? 'คำถัดไป ➡️' : 'Next Word ➡️'}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
