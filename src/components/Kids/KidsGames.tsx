import React, { useState } from 'react';
import { KidsTopic, KidsWord, AudioSpeed } from '../../types/index.ts';
import { audioService } from '../../utils/audio.ts';
import { sfx } from '../../utils/soundEffects.ts';
import { Volume2, Sparkles, RotateCcw, CheckCircle2, Heart, Award } from 'lucide-react';

interface KidsGamesProps {
  topic: KidsTopic;
  audioSpeed: AudioSpeed;
  onEarnStar: (count: number) => void;
  uiLang: 'th' | 'en';
}

export const KidsGames: React.FC<KidsGamesProps> = ({
  topic,
  audioSpeed,
  onEarnStar,
  uiLang,
}) => {
  const [activeGame, setActiveGame] = useState<'spelling' | 'match' | 'detective'>('spelling');

  // Game 1: Balloon Spelling state
  const [spellingIndex, setSpellingIndex] = useState(0);
  const currentWord = topic.words[spellingIndex % topic.words.length];
  const targetLetters = currentWord.english.toUpperCase().split('');
  
  // Shuffled letters + unique IDs for balloon pop
  const [availableBalloons, setAvailableBalloons] = useState<{ id: string; letter: string }[]>(() => {
    return targetLetters
      .map((letter, idx) => ({ id: `${letter}-${idx}-${Math.random()}`, letter }))
      .sort(() => Math.random() - 0.5);
  });
  const [spelledLetters, setSpelledLetters] = useState<string[]>([]);
  const [spellingSuccess, setSpellingSuccess] = useState(false);

  // Game 2: Picture Match state
  const [matchSelectedWord, setMatchSelectedWord] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);

  // Game 3: Listening Detective state
  const [detectiveTargetIndex, setDetectiveTargetIndex] = useState(0);
  const detectiveTarget = topic.words[detectiveTargetIndex % topic.words.length];
  const [detectiveFeedback, setDetectiveFeedback] = useState<string | null>(null);

  // Restart / Reset Spelling Game for next word
  const loadSpellingWord = (nextIdx: number) => {
    const nextWord = topic.words[nextIdx % topic.words.length];
    const letters = nextWord.english.toUpperCase().split('');
    setSpellingIndex(nextIdx);
    setSpelledLetters([]);
    setSpellingSuccess(false);
    setAvailableBalloons(
      letters
        .map((letter, idx) => ({ id: `${letter}-${idx}-${Math.random()}`, letter }))
        .sort(() => Math.random() - 0.5)
    );
  };

  const handlePopBalloon = (item: { id: string; letter: string }) => {
    sfx.playPop();
    const nextIndex = spelledLetters.length;
    const expectedLetter = targetLetters[nextIndex];

    if (item.letter === expectedLetter) {
      // Correct letter
      const nextSpelled = [...spelledLetters, item.letter];
      setSpelledLetters(nextSpelled);
      setAvailableBalloons((prev) => prev.filter((b) => b.id !== item.id));

      if (nextSpelled.length === targetLetters.length) {
        // Finished word!
        setSpellingSuccess(true);
        sfx.playFanfare();
        audioService.speak(currentWord.english, audioSpeed);
        onEarnStar(2);
      }
    } else {
      // Gentle try again
      sfx.playTryAgain();
    }
  };

  // Detective game check
  const handleDetectiveGuess = (word: KidsWord) => {
    if (word.id === detectiveTarget.id) {
      sfx.playCorrect();
      setDetectiveFeedback(uiLang === 'th' ? 'ถูกต้องแล้ว เก่งมาก! 🎉' : 'Correct! Great job! 🎉');
      onEarnStar(1);
      setTimeout(() => {
        setDetectiveFeedback(null);
        setDetectiveTargetIndex((prev) => prev + 1);
        const nextTarget = topic.words[(detectiveTargetIndex + 1) % topic.words.length];
        audioService.speak(nextTarget.english, audioSpeed);
      }, 1400);
    } else {
      sfx.playTryAgain();
      setDetectiveFeedback(
        uiLang === 'th'
          ? `ยังไม่ใช่คำนี้นะครับ ลองฟังอีกรอบแล้วกดใหม่นะ ✨`
          : `Not this one, listen once more and try again! ✨`
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Game Mode Selector */}
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => setActiveGame('spelling')}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-bold text-sm transition-all cursor-pointer ${
            activeGame === 'spelling'
              ? 'bg-amber-400 text-amber-950 shadow-md scale-105'
              : 'bg-white text-slate-700 hover:bg-amber-50 border border-slate-200'
          }`}
        >
          <span>🎈</span>
          <span>{uiLang === 'th' ? 'เกมสะกดคำบอลลูน' : 'Balloon Spelling'}</span>
        </button>

        <button
          onClick={() => setActiveGame('detective')}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-bold text-sm transition-all cursor-pointer ${
            activeGame === 'detective'
              ? 'bg-sky-400 text-sky-950 shadow-md scale-105'
              : 'bg-white text-slate-700 hover:bg-sky-50 border border-slate-200'
          }`}
        >
          <span>🔍</span>
          <span>{uiLang === 'th' ? 'นักสืบฟังเสียง' : 'Listening Detective'}</span>
        </button>

        <button
          onClick={() => setActiveGame('match')}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-bold text-sm transition-all cursor-pointer ${
            activeGame === 'match'
              ? 'bg-emerald-400 text-emerald-950 shadow-md scale-105'
              : 'bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200'
          }`}
        >
          <span>🧩</span>
          <span>{uiLang === 'th' ? 'จับคู่ภาพกับคำ' : 'Picture-Word Match'}</span>
        </button>
      </div>

      {/* GAME 1: BALLOON SPELLING */}
      {activeGame === 'spelling' && (
        <div className="bg-gradient-to-b from-amber-50/80 to-orange-50/60 rounded-3xl p-6 sm:p-8 border-2 border-amber-200 text-center relative overflow-hidden shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-bold px-3 py-1 bg-amber-200 text-amber-900 rounded-full">
              {uiLang === 'th' ? 'แตะลูกโป่งตัวอักษรเพื่อเรียงคำ' : 'Tap balloons in order to spell the word'}
            </span>
            <button
              onClick={() => loadSpellingWord(spellingIndex + 1)}
              className="flex items-center gap-1 text-xs font-bold text-amber-800 hover:text-amber-950 bg-white/80 px-3 py-1.5 rounded-xl border border-amber-200 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{uiLang === 'th' ? 'ข้ามไปคำถัดไป' : 'Next word'}</span>
            </button>
          </div>

          {/* Word Prompt Card */}
          <div className="bg-white rounded-3xl p-6 shadow-md max-w-md mx-auto mb-6 border border-amber-100">
            <div className="text-6xl mb-2 animate-bounce">{currentWord.emoji}</div>
            <div className="text-lg font-bold text-slate-700 mb-1">
              {currentWord.thai} ({currentWord.phoneticThai})
            </div>
            <button
              onClick={() => audioService.speak(currentWord.english, audioSpeed)}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold transition cursor-pointer"
            >
              <Volume2 className="w-4 h-4 text-amber-700" />
              <span>{uiLang === 'th' ? 'กดฟังเสียงคำนี้' : 'Listen'}</span>
            </button>
          </div>

          {/* Spelling Slots */}
          <div className="flex justify-center gap-2 sm:gap-3 mb-8 flex-wrap">
            {targetLetters.map((_, idx) => {
              const letter = spelledLetters[idx];
              return (
                <div
                  key={idx}
                  className={`w-12 h-14 sm:w-14 sm:h-16 rounded-2xl flex items-center justify-center font-black text-2xl border-2 transition-all ${
                    letter
                      ? 'bg-amber-400 text-amber-950 border-amber-500 scale-105 shadow-md'
                      : 'bg-white/90 border-dashed border-amber-300 text-transparent'
                  }`}
                >
                  {letter || '_'}
                </div>
              );
            })}
          </div>

          {/* Available Floating Letter Balloons */}
          {!spellingSuccess && (
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 min-h-[90px]">
              {availableBalloons.map((balloon) => (
                <button
                  key={balloon.id}
                  onClick={() => handlePopBalloon(balloon)}
                  aria-label={`Letter ${balloon.letter}`}
                  className="w-14 h-16 sm:w-16 sm:h-20 rounded-full bg-gradient-to-t from-orange-400 to-amber-300 hover:from-orange-500 hover:to-amber-400 text-white font-extrabold text-2xl sm:text-3xl flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform cursor-pointer border-2 border-white"
                >
                  {balloon.letter}
                </button>
              ))}
            </div>
          )}

          {/* Celebration when spelled */}
          {spellingSuccess && (
            <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-4 max-w-sm mx-auto animate-pulse">
              <div className="text-2xl font-black text-emerald-800 mb-2">
                🎉 {uiLang === 'th' ? 'ยอดเยี่ยมมาก!' : 'Awesome!'} +2 ⭐
              </div>
              <p className="text-sm font-semibold text-emerald-700 mb-3">
                {currentWord.english} = {currentWord.thai}
              </p>
              <button
                onClick={() => loadSpellingWord(spellingIndex + 1)}
                className="px-6 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-md transition cursor-pointer"
              >
                {uiLang === 'th' ? 'เล่นคำต่อไปเลย ➡️' : 'Play Next Word ➡️'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* GAME 2: LISTENING DETECTIVE */}
      {activeGame === 'detective' && (
        <div className="bg-gradient-to-b from-sky-50 to-blue-50/60 rounded-3xl p-6 sm:p-8 border-2 border-sky-200 text-center shadow-sm">
          <div className="max-w-md mx-auto mb-6">
            <span className="text-xs font-bold px-3 py-1 bg-sky-200 text-sky-900 rounded-full inline-block mb-3">
              {uiLang === 'th' ? 'ฟังเสียงแล้วแตะภาพที่ตรงกัน' : 'Listen to the audio, tap the matching picture'}
            </span>
            <div className="p-4 bg-white rounded-2xl shadow-xs border border-sky-100 flex flex-col items-center gap-3">
              <p className="text-sm text-slate-600 font-medium">
                {uiLang === 'th' ? 'น้องช้างกำลังพูดคำว่าอะไรเอ่ย?' : 'Which word is Nong Chang saying?'}
              </p>
              <button
                onClick={() => audioService.speak(detectiveTarget.english, audioSpeed)}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-base shadow-md transition transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Volume2 className="w-5 h-5" />
                <span>{uiLang === 'th' ? 'กดฟังเสียงอีกรอบ 🔊' : 'Listen Again 🔊'}</span>
              </button>
            </div>
          </div>

          {detectiveFeedback && (
            <div className="mb-4 text-base font-bold text-sky-800 animate-bounce">
              {detectiveFeedback}
            </div>
          )}

          {/* 4 Choices */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {topic.words.slice(0, 4).map((word) => (
              <button
                key={word.id}
                onClick={() => handleDetectiveGuess(word)}
                className="bg-white hover:bg-sky-50/80 border-2 border-sky-200 hover:border-sky-400 rounded-2xl p-4 flex flex-col items-center gap-2 shadow-xs transition hover:scale-105 cursor-pointer"
              >
                <span className="text-5xl">{word.emoji}</span>
                <span className="font-bold text-slate-800 text-sm">{word.thai}</span>
                <span className="text-xs text-slate-400 font-medium">{word.phoneticThai}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* GAME 3: PICTURE & WORD MATCH */}
      {activeGame === 'match' && (
        <div className="bg-gradient-to-b from-emerald-50 to-teal-50/60 rounded-3xl p-6 sm:p-8 border-2 border-emerald-200 text-center shadow-sm">
          <p className="text-sm font-bold text-emerald-800 mb-6">
            {uiLang === 'th'
              ? 'แตะเลือกคำศัพท์ภาษาอังกฤษ แล้วแตะภาพที่ตรงกันเพื่อจับคู่!'
              : 'Tap an English word, then tap the matching picture!'}
          </p>

          <div className="grid grid-cols-2 gap-6 max-w-xl mx-auto">
            {/* Word Cards Column */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {uiLang === 'th' ? 'คำศัพท์' : 'Words'}
              </div>
              {topic.words.slice(0, 4).map((w) => {
                const isMatched = matchedPairs.includes(w.id);
                const isSelected = matchSelectedWord === w.id;
                return (
                  <button
                    key={`w-${w.id}`}
                    disabled={isMatched}
                    onClick={() => {
                      setMatchSelectedWord(w.id);
                      audioService.speak(w.english, audioSpeed);
                    }}
                    className={`w-full p-3.5 rounded-2xl font-bold text-sm transition-all border-2 cursor-pointer ${
                      isMatched
                        ? 'bg-emerald-100 text-emerald-700 border-emerald-300 opacity-60'
                        : isSelected
                        ? 'bg-emerald-500 text-white border-emerald-600 scale-102 shadow-md'
                        : 'bg-white hover:bg-emerald-50 text-slate-800 border-slate-200'
                    }`}
                  >
                    <div>{w.english}</div>
                    <div className="text-xs font-normal opacity-80">{w.phoneticThai}</div>
                  </button>
                );
              })}
            </div>

            {/* Picture Cards Column */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {uiLang === 'th' ? 'ภาพความหมาย' : 'Pictures'}
              </div>
              {topic.words.slice(0, 4).map((w) => {
                const isMatched = matchedPairs.includes(w.id);
                return (
                  <button
                    key={`p-${w.id}`}
                    disabled={isMatched}
                    onClick={() => {
                      if (!matchSelectedWord) {
                        return;
                      }
                      if (matchSelectedWord === w.id) {
                        sfx.playCorrect();
                        setMatchedPairs((prev) => [...prev, w.id]);
                        setMatchSelectedWord(null);
                        onEarnStar(1);
                      } else {
                        sfx.playTryAgain();
                      }
                    }}
                    className={`w-full p-3 rounded-2xl font-bold text-sm transition-all border-2 flex items-center justify-center gap-3 cursor-pointer ${
                      isMatched
                        ? 'bg-emerald-100 border-emerald-300 opacity-60'
                        : 'bg-white hover:bg-emerald-50 border-slate-200 hover:border-emerald-400'
                    }`}
                  >
                    <span className="text-3xl">{w.emoji}</span>
                    <span className="text-xs text-slate-700">{w.thai}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {matchedPairs.length === 4 && (
            <div className="mt-6 bg-white p-4 rounded-2xl max-w-sm mx-auto border border-emerald-200">
              <p className="font-extrabold text-emerald-800 text-base mb-2">
                🌟 {uiLang === 'th' ? 'จับคู่ครบทุกคำแล้ว ยอดเยี่ยม!' : 'All matched! Splendid!'}
              </p>
              <button
                onClick={() => setMatchedPairs([])}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold text-xs cursor-pointer"
              >
                {uiLang === 'th' ? 'เล่นใหม่อีกรอบ' : 'Play Again'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
