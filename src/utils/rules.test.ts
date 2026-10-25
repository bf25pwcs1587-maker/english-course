import test from 'node:test';
import assert from 'node:assert/strict';
import {
  evaluatePlacementQuiz,
  analyzeWriting,
  calculateParentAnalytics,
  checkBadgeUnlocks,
} from './rules.ts';
import { PlacementQuestion, UserProgress, Badge } from '../types/index.ts';

const mockQuestions: PlacementQuestion[] = [
  {
    id: 'q1',
    type: 'vocab',
    questionEn: 'What animal says "meow"?',
    questionTh: 'สัตว์ชนิดใดร้อง "เหมียว"?',
    targetLevel: 'kids-basic',
    options: [{ text: 'Dog' }, { text: 'Cat' }, { text: 'Bird' }],
    correctIndex: 1,
  },
  {
    id: 'q2',
    type: 'vocab',
    questionEn: 'Which color is an apple?',
    questionTh: 'แอปเปิ้ลมักมีสีอะไร?',
    targetLevel: 'kids-basic',
    options: [{ text: 'Blue' }, { text: 'Red' }, { text: 'Black' }],
    correctIndex: 1,
  },
  {
    id: 'q3',
    type: 'grammar',
    questionEn: 'She ______ to school every day.',
    questionTh: 'เติมคำกริยาให้ถูกต้อง',
    targetLevel: 'kids-intermediate',
    options: [{ text: 'go' }, { text: 'goes' }, { text: 'going' }],
    correctIndex: 1,
  },
  {
    id: 'q4',
    type: 'grammar',
    questionEn: 'Neither the manager nor the employees ______ ready.',
    questionTh: 'เลือกคำที่ถูกต้องตามหลักไวยากรณ์ขั้นสูง',
    targetLevel: 'advanced-b1',
    options: [{ text: 'is' }, { text: 'are' }, { text: 'be' }],
    correctIndex: 1,
  },
  {
    id: 'q5',
    type: 'reading',
    questionEn: 'What does "hit the nail on the head" mean?',
    questionTh: 'สำนวนนี้หมายความว่าอะไร?',
    targetLevel: 'advanced-b2',
    options: [
      { text: 'To do construction work' },
      { text: 'To say something exactly right' },
      { text: 'To make an accidental mistake' },
    ],
    correctIndex: 1,
  },
];

test('evaluatePlacementQuiz recommends Kids Level 1 for low scores', () => {
  // Answer only 1 correctly
  const answers = [1, 0, 0, 0, 0];
  const result = evaluatePlacementQuiz(answers, mockQuestions);
  assert.equal(result.recommendedPath, 'kids');
  assert.equal(result.recommendedLevel, 'Kids Level 1 (Starters)');
  assert.equal(result.score, 1);
});

test('evaluatePlacementQuiz recommends Advanced for high scores', () => {
  // Answer all correctly
  const answers = [1, 1, 1, 1, 1];
  const result = evaluatePlacementQuiz(answers, mockQuestions);
  assert.equal(result.recommendedPath, 'advanced');
  assert.equal(result.score, 5);
});

test('analyzeWriting catches Thai-English pitfalls (very like, play phone, listen music)', () => {
  const sample = "I very like reading and I also play phone in bed. Then I listen music.";
  const feedback = analyzeWriting(sample);

  assert.ok(feedback.thaiEnglishPitfallsDetected.includes('Very Like (ฉันชอบมาก)'));
  assert.ok(feedback.thaiEnglishPitfallsDetected.includes('Play Phone (เล่นโทรศัพท์)'));
  assert.ok(feedback.thaiEnglishPitfallsDetected.includes('Listen to (ลืมเติม to หลัง listen)'));
  assert.ok(feedback.spellingGrammarNotes.length >= 3);
});

test('analyzeWriting catches open/close air-conditioner & suggests turn on/off', () => {
  const sample = "Please open air because the room is too hot.";
  const feedback = analyzeWriting(sample);

  assert.ok(feedback.thaiEnglishPitfallsDetected.includes('Open/Close electronic devices (เปิด/ปิดเครื่องใช้ไฟฟ้า)'));
});

test('calculateParentAnalytics produces valid stats and strengths', () => {
  const mockProgress: UserProgress = {
    selectedPath: 'kids',
    uiLang: 'th',
    audioSpeed: 1.0,
    stars: 25,
    xp: 250,
    streakDays: 4,
    lastActiveDate: '2026-10-25',
    completedLessonIds: ['animals', 'food'],
    completedQuizIds: ['q1'],
    wordsMastered: ['dog', 'cat', 'elephant', 'apple', 'banana', 'orange', 'red', 'blue', 'green', 'mom', 'dad'],
    badges: ['first_step'],
    writingSubmissionsCount: 2,
    totalStudyMinutes: 35,
    quizScores: [
      { quizId: 'q1', score: 5, total: 5, date: '2026-10-25' },
    ],
  };

  const analytics = calculateParentAnalytics(mockProgress, 'น้องมิ้นท์');
  assert.equal(analytics.childName, 'น้องมิ้นท์');
  assert.equal(analytics.streakDays, 4);
  assert.equal(analytics.overallAccuracyRate, 100);
  assert.ok(analytics.totalWordsLearned >= 10);
  assert.ok(analytics.topStrengths.length > 0);
});

test('checkBadgeUnlocks discovers newly qualified badges', () => {
  const mockBadges: Badge[] = [
    {
      id: 'first_step',
      titleTh: 'ก้าวแรก',
      titleEn: 'First Step',
      descriptionTh: 'เรียนจบบทเรียนแรก',
      descriptionEn: 'Complete first lesson',
      icon: '🌱',
      condition: 'lessons',
    },
    {
      id: 'streak_3',
      titleTh: 'นักเรียนต่อเนื่อง 3 วัน',
      titleEn: '3-Day Streak',
      descriptionTh: 'เรียนต่อเนื่อง 3 วัน',
      descriptionEn: 'Study 3 days in a row',
      icon: '🔥',
      condition: 'streak',
    },
  ];

  const progress: UserProgress = {
    selectedPath: 'kids',
    uiLang: 'th',
    audioSpeed: 1.0,
    stars: 10,
    xp: 100,
    streakDays: 3,
    lastActiveDate: '2026-10-25',
    completedLessonIds: ['animals'],
    completedQuizIds: [],
    wordsMastered: [],
    badges: [], // none yet
    writingSubmissionsCount: 0,
    totalStudyMinutes: 10,
    quizScores: [],
  };

  const unlocked = checkBadgeUnlocks(progress, mockBadges);
  assert.deepEqual(unlocked.sort(), ['first_step', 'streak_3'].sort());
});

test('instructorTalha profile and masterclass tips are complete', async () => {
  const { instructorTalha, dailyEnglishDrills } = await import('../data/instructorData.ts');
  assert.equal(instructorTalha.name, 'Talha Afridi');
  assert.equal(instructorTalha.role, 'CEO & Master English Instructor');
  assert.ok(instructorTalha.masterclassTips.length >= 4);
  assert.ok(dailyEnglishDrills.length >= 3);
});

