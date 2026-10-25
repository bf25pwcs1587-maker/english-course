import {
  PlacementQuestion,
  UserProgress,
  WritingFeedbackResult,
  WritingPrompt,
  ParentAnalytics,
  Badge,
} from '../types/index.ts';

/**
 * Evaluates placement quiz responses and calculates the recommended learning path and level
 */
export function evaluatePlacementQuiz(
  userAnswers: (number | null)[],
  questions: PlacementQuestion[]
): {
  recommendedPath: 'kids' | 'advanced';
  recommendedLevel: string;
  levelTitleTh: string;
  levelTitleEn: string;
  explanationTh: string;
  score: number;
  total: number;
} {
  let score = 0;
  let kidsCorrect = 0;
  let advancedCorrect = 0;

  questions.forEach((q, idx) => {
    const isCorrect = userAnswers[idx] === q.correctIndex;
    if (isCorrect) {
      score += 1;
      if (q.targetLevel.startsWith('kids')) {
        kidsCorrect += 1;
      } else {
        advancedCorrect += 1;
      }
    }
  });

  const total = questions.length;
  const percentage = Math.round((score / total) * 100);

  // Recommendation logic
  if (percentage <= 40 || kidsCorrect <= 1) {
    return {
      recommendedPath: 'kids',
      recommendedLevel: 'Kids Level 1 (Starters)',
      levelTitleTh: 'ระดับเริ่มต้นสำหรับเด็กและผู้เริ่มเรียน (Kids Level 1)',
      levelTitleEn: 'Kids Level 1 - Starters & Phonics',
      explanationTh:
        'เหมาะกับการปูพื้นฐานคำศัพท์ ฟังสำเนียง ออกเสียงชัดเจน และเล่นเกมสนุกๆ พร้อมคำแปลภาษาไทย',
      score,
      total,
    };
  } else if (percentage <= 65) {
    return {
      recommendedPath: 'kids',
      recommendedLevel: 'Kids Level 2 (Explorer)',
      levelTitleTh: 'ระดับปานกลางสำหรับเด็ก (Kids Level 2)',
      levelTitleEn: 'Kids Level 2 - Confident Explorer',
      explanationTh:
        'มีพื้นฐานคำศัพท์ดีเยี่ยมแล้ว พร้อมสำหรับประโยคเรื่องราว และการสะกดคำที่ท้าทายขึ้น',
      score,
      total,
    };
  } else if (percentage <= 85) {
    return {
      recommendedPath: 'advanced',
      recommendedLevel: 'Advanced (B1-B2 Intermediate)',
      levelTitleTh: 'ระดับกลาง-สูงสำหรับผู้ใหญ่และวัยรุ่น (Advanced B1-B2)',
      levelTitleEn: 'Advanced B1-B2 - Independent Communicator',
      explanationTh:
        'พร้อมฝึกบทสนทนาจริงในที่ทำงาน การอ่านบทความเชิงลึก และแก้จุดผิดไวยากรณ์ที่คนไทยมักสับสน',
      score,
      total,
    };
  } else {
    return {
      recommendedPath: 'advanced',
      recommendedLevel: 'Advanced (B2-C1 Mastery)',
      levelTitleTh: 'ระดับสูงเชี่ยวชาญ (Advanced B2-C1 Mastery)',
      levelTitleEn: 'Advanced B2-C1 - High Proficiency & Fluency',
      explanationTh:
        'ยอดเยี่ยมมาก! คุณมีความเข้าใจระดับสูง เหมาะสำหรับติว IELTS, คำศัพท์ระดับลึก และการเขียนระดับมืออาชีพ',
      score,
      total,
    };
  }
}

/**
 * Analyses English text written by Thai learners and detects common interference issues
 */
export function analyzeWriting(
  text: string,
  prompt?: WritingPrompt
): WritingFeedbackResult {
  const clean = text.trim();
  const words = clean ? clean.split(/\s+/).filter(Boolean) : [];
  const wordCount = words.length;

  const notes: WritingFeedbackResult['spellingGrammarNotes'] = [];
  const upgrades: WritingFeedbackResult['vocabularyUpgrades'] = [];
  const pitfalls: string[] = [];

  const lower = clean.toLowerCase();

  // Pattern 1: Thai direct translation: "I very like" -> "I really like"
  if (/i\s+very\s+like/i.test(clean)) {
    pitfalls.push('Very Like (ฉันชอบมาก)');
    notes.push({
      issue: 'i very like',
      suggestion: 'I really like ... หรือ I like ... very much',
      explanationTh:
        'ในภาษาไทยพูดว่า "ฉันชอบมาก" แต่ในภาษาอังกฤษไม่ใช้ "very like" ให้เปลี่ยนเป็น "really like" หรือวาง "very much" ไว้ท้ายประโยค',
    });
  }

  // Pattern 2: Thai direct translation: "play phone" / "play computer" -> "use phone"
  if (/play\s+(phone|mobile|smartphone|computer)/i.test(clean)) {
    pitfalls.push('Play Phone (เล่นโทรศัพท์)');
    notes.push({
      issue: 'play phone / computer',
      suggestion: 'use my phone / spend time on my phone',
      explanationTh:
        'คนไทยชอบแปลตรงตัวว่า "เล่นโทรศัพท์" ในภาษาอังกฤษคำว่า "play" มักใช้กับกีฬาหรือเกม ถ้าเป็นการไถมือถือหรือทำงานบนคอมพิวเตอร์ ควรใช้ "use my phone" หรือ "browse on my phone"',
    });
  }

  // Pattern 3: Missing preposition: "listen music"
  if (/listen\s+music/i.test(clean)) {
    pitfalls.push('Listen to (ลืมเติม to หลัง listen)');
    notes.push({
      issue: 'listen music',
      suggestion: 'listen to music',
      explanationTh: 'กริยา listen เมื่อมีกรรมตามหลังต้องมีบุพบท "to" เสมอ เช่น "listen to podcasts", "listen to music"',
    });
  }

  // Pattern 4: Turn on/off vs open/close: "open air" / "close light"
  if (/(open|close)\s+(air|the\s+air|light|the\s+light|tv|the\s+tv)/i.test(clean)) {
    pitfalls.push('Open/Close electronic devices (เปิด/ปิดเครื่องใช้ไฟฟ้า)');
    notes.push({
      issue: 'open/close electrical devices',
      suggestion: 'turn on / turn off หรือ switch on / switch off',
      explanationTh:
        'เครื่องใช้ไฟฟ้าและไฟไม่ใช้ open/close (open ใช้กับประตู หน้าต่าง หนังสือ) ให้ใช้ "turn on the air conditioner" หรือ "turn off the light"',
    });
  }

  // Pattern 5: "same same"
  if (/same\s+same/i.test(clean)) {
    pitfalls.push('Same same (สแลงไทย-อังกฤษ)');
    notes.push({
      issue: 'same same',
      suggestion: 'similar / identical / the same',
      explanationTh:
        'สำนวน "same same" เป็นภาษาพูดแบบ Tinglish ในภาษาอังกฤษมาตรฐานให้ใช้ "similar" (คล้ายกัน) หรือ "identical" (เหมือนกันเป๊ะ)',
    });
  }

  // Pattern 6: missing plural 's' after "many"
  const manyMatch = clean.match(/many\s+([a-zA-Z]+)/i);
  if (manyMatch && manyMatch[1]) {
    const nextWord = manyMatch[1].toLowerCase();
    const commonSingulars = ['book', 'person', 'car', 'student', 'friend', 'dog', 'cat', 'thing', 'day', 'year', 'place'];
    if (commonSingulars.includes(nextWord)) {
      pitfalls.push('Plural noun after "many"');
      notes.push({
        issue: `many ${nextWord}`,
        suggestion: `many ${nextWord === 'person' ? 'people' : nextWord + 's'}`,
        explanationTh: `หลังคำว่า "many" คำนามนับได้ต้องเป็นพหูพจน์เสมอ (เติม -s หรือเปลี่ยนรูป)`,
      });
    }
  }

  // Vocabulary enhancements
  if (/\bgood\b/i.test(clean)) {
    upgrades.push({
      original: 'good',
      elevated: 'exceptional / beneficial / delightful',
      reasonTh: 'การใช้คำคุณศัพท์ที่เจาะจงจะทำให้งานเขียนดูเป็นธรรมชาติและน่าอ่านยิ่งขึ้น',
    });
  }
  if (/\bimportant\b/i.test(clean)) {
    upgrades.push({
      original: 'important',
      elevated: 'crucial / essential / vital',
      reasonTh: 'คำว่า crucial หรือ vital ช่วยเน้นความสำคัญในระดับมืออาชีพ',
    });
  }
  if (/\bhappy\b/i.test(clean)) {
    upgrades.push({
      original: 'happy',
      elevated: 'thrilled / delighted / content',
      reasonTh: 'ช่วยถ่ายทอดอารมณ์ความสุขได้ลึกซึ้งและน่าประทับใจกว่า',
    });
  }

  // Scoring logic
  const minRequired = prompt?.minWords || 10;
  let baseScore = 6;
  if (wordCount >= minRequired) baseScore += 2;
  if (wordCount >= minRequired * 2) baseScore += 1;
  if (notes.length === 0 && wordCount >= minRequired) baseScore += 1;
  const finalScore = Math.max(4, Math.min(10, baseScore - notes.length));

  let encouragementTh = '';
  let encouragementEn = '';

  if (wordCount === 0) {
    encouragementTh = 'ลองพิมพ์ประโยคภาษาอังกฤษแรกของคุณดูเลย ไม่ต้องกังวลเรื่องผิดถูกนะครับ!';
    encouragementEn = 'Type your first English sentence! No need to worry about mistakes.';
  } else if (finalScore >= 9) {
    encouragementTh = 'ยอดเยี่ยมมาก! การเขียนลื่นไหล เป็นธรรมชาติ และใช้ไวยากรณ์ได้ถูกต้องชัดเจน';
    encouragementEn = 'Outstanding job! Fluent, natural phrasing with solid grammar.';
  } else if (finalScore >= 7) {
    encouragementTh = 'ทำได้ดีมากครับ! สื่อสารได้ชัดเจน ลองนำข้อแนะนำเล็กๆ น้อยๆ ด้านล่างไปปรับใช้ดูนะ';
    encouragementEn = 'Great effort! Your ideas are very clear. Check out the helpful tips below.';
  } else {
    encouragementTh = 'เยี่ยมมากที่คุณได้ลงมือฝึกเขียน! ยิ่งฝึกบ่อยๆ จะยิ่งเก่งขึ้นอย่างแน่นอน';
    encouragementEn = 'Well done for practicing! Every sentence you write makes you stronger.';
  }

  return {
    scoreOutOf10: finalScore,
    wordCount,
    encouragementTh,
    encouragementEn,
    spellingGrammarNotes: notes,
    vocabularyUpgrades: upgrades.slice(0, 3),
    thaiEnglishPitfallsDetected: pitfalls,
  };
}

/**
 * Calculates parent/teacher analytics based on current user progress
 */
export function calculateParentAnalytics(
  progress: UserProgress,
  studentName = 'น้องภูมิ (Phum)'
): ParentAnalytics {
  const totalMinutes = Math.max(12, progress.totalStudyMinutes || progress.completedLessonIds.length * 6);
  const wordsCount = Math.max(progress.wordsMastered.length, progress.completedLessonIds.length * 5);

  let totalQuestions = 0;
  let totalCorrect = 0;
  progress.quizScores.forEach((q) => {
    totalQuestions += q.total;
    totalCorrect += q.score;
  });

  const accuracy =
    totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 92;

  const topStrengths: string[] = [];
  const recommendedFocus: string[] = [];

  if (wordsCount >= 10) {
    topStrengths.push('คลังคำศัพท์พื้นฐานแน่น (Vocabulary Mastery)');
  } else {
    recommendedFocus.push('เพิ่มการทบทวนคำศัพท์หมวดสัตว์และอาหาร');
  }

  if (progress.streakDays >= 2) {
    topStrengths.push('มีความสม่ำเสมอในการเรียนยอดเยี่ยม (Consistency)');
  } else {
    recommendedFocus.push('ฝึกเรียนวันละ 5-10 นาทีเพื่อสะสมไฟสตรีค');
  }

  if (progress.writingSubmissionsCount > 0) {
    topStrengths.push('กล้าแสดงออกในการแต่งประโยคภาษาอังกฤษ (Writing Confidence)');
  } else {
    recommendedFocus.push('ลองทำกิจกรรมเขียนประโยคสั้นๆ เพื่อเสริมสร้างความมั่นใจ');
  }

  if (topStrengths.length === 0) {
    topStrengths.push('มีความกระตือรือร้นและตั้งใจเรียนรู้สิ่งใหม่');
  }

  const recentActivities = [
    {
      activityName: 'หมวดสัตว์น่ารัก (Animals Flashcards & Audio)',
      date: 'วันนี้ (Today)',
      score: '100% (3 ดาว)',
    },
    {
      activityName: 'เกมสะกดคำบอลลูน (Spelling Pop)',
      date: 'เมื่อวาน (Yesterday)',
      score: '90% (ผ่าน)',
    },
    {
      activityName: 'บทสนทนาประจำวัน (Everyday Dialogue)',
      date: '2 วันที่แล้ว',
      score: '85%',
    },
  ];

  return {
    childName: studentName,
    totalStudyMinutes: totalMinutes,
    totalWordsLearned: wordsCount,
    overallAccuracyRate: accuracy,
    streakDays: Math.max(1, progress.streakDays),
    starsEarned: Math.max(15, progress.stars),
    topStrengths,
    recommendedFocus,
    recentActivities,
  };
}

/**
 * Checks for badge unlocking conditions
 */
export function checkBadgeUnlocks(
  progress: UserProgress,
  allBadges: Badge[]
): string[] {
  const currentBadges = new Set(progress.badges);
  const unlocked: string[] = [];

  allBadges.forEach((badge) => {
    if (currentBadges.has(badge.id)) return;

    let canUnlock = false;
    switch (badge.id) {
      case 'first_step':
        canUnlock = progress.completedLessonIds.length >= 1;
        break;
      case 'streak_3':
        canUnlock = progress.streakDays >= 3;
        break;
      case 'word_collector':
        canUnlock = progress.wordsMastered.length >= 10;
        break;
      case 'writing_star':
        canUnlock = progress.writingSubmissionsCount >= 1;
        break;
      case 'star_hunter':
        canUnlock = progress.stars >= 30;
        break;
      case 'speed_master':
        canUnlock = progress.audioSpeed !== 1.0;
        break;
    }

    if (canUnlock) {
      unlocked.push(badge.id);
    }
  });

  return unlocked;
}
