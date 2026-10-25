export type LearningPath = 'kids' | 'advanced';
export type UILanguage = 'th' | 'en';
export type AudioSpeed = 0.5 | 0.75 | 1.0 | 1.25;

export interface Badge {
  id: string;
  titleTh: string;
  titleEn: string;
  descriptionTh: string;
  descriptionEn: string;
  icon: string;
  unlockedAt?: string;
  condition: 'lessons' | 'streak' | 'games' | 'writing' | 'score' | 'speed';
}

export interface UserProgress {
  selectedPath: LearningPath;
  uiLang: UILanguage;
  audioSpeed: AudioSpeed;
  stars: number;
  xp: number;
  streakDays: number;
  lastActiveDate: string;
  completedLessonIds: string[];
  completedQuizIds: string[];
  wordsMastered: string[];
  badges: string[];
  recommendedLevel?: string;
  writingSubmissionsCount: number;
  totalStudyMinutes: number;
  quizScores: { quizId: string; score: number; total: number; date: string }[];
}

export interface KidsTopic {
  id: string;
  titleTh: string;
  titleEn: string;
  icon: string;
  color: string;
  descriptionTh: string;
  descriptionEn: string;
  words: KidsWord[];
  story?: KidsStory;
}

export interface KidsWord {
  id: string;
  english: string;
  phoneticThai: string; // e.g. "เอล-ลิ-เฟินท์"
  ipa: string;
  thai: string;
  category: string;
  emoji: string;
  exampleSentence: string;
  exampleSentenceThai: string;
  audioText?: string;
}

export interface KidsStory {
  id: string;
  titleTh: string;
  titleEn: string;
  sentences: {
    en: string;
    th: string;
    words: { en: string; th: string; phonetic: string }[];
    imageHint: string;
  }[];
}

export interface AdvancedTopic {
  id: string;
  category: 'reading' | 'conversation' | 'grammar' | 'writing';
  titleTh: string;
  titleEn: string;
  level: 'Intermediate (B1)' | 'Upper Intermediate (B2)' | 'Advanced (C1)';
  estimatedMinutes: number;
  summaryTh: string;
  summaryEn: string;
}

export interface AdvancedReadingArticle {
  id: string;
  title: string;
  titleTh: string;
  category: string;
  level: string;
  paragraphs: {
    en: string;
    th: string;
    glossary: { word: string; th: string; type: string; example: string }[];
  }[];
  comprehensionQuestions: {
    question: string;
    questionTh: string;
    options: string[];
    correctIndex: number;
    explanationTh: string;
  }[];
}

export interface AdvancedConversationDialogue {
  id: string;
  title: string;
  titleTh: string;
  scenarioEn: string;
  scenarioTh: string;
  speakers: { name: string; avatar: string; role: string }[];
  turns: {
    speaker: string;
    en: string;
    th: string;
    notes?: string;
  }[];
  keyExpressions: {
    en: string;
    th: string;
    usageNoteTh: string;
  }[];
}

export interface GrammarPitfall {
  id: string;
  titleTh: string;
  titleEn: string;
  thaiMistakePattern: string; // e.g., "ลืมเติม -s เมื่อประธานเป็นเอกพจน์"
  incorrectExample: string;
  correctExample: string;
  explanationTh: string;
  practiceQuestions: {
    prompt: string;
    promptTh: string;
    options: string[];
    correctIndex: number;
    tipTh: string;
  }[];
}

export interface WritingPrompt {
  id: string;
  titleEn: string;
  titleTh: string;
  level: 'kids' | 'advanced';
  instructionsEn: string;
  instructionsTh: string;
  starterSentenceEn: string;
  suggestedKeywords: { en: string; th: string }[];
  minWords: number;
}

export interface WritingFeedbackResult {
  scoreOutOf10: number;
  wordCount: number;
  encouragementTh: string;
  encouragementEn: string;
  spellingGrammarNotes: {
    issue: string;
    suggestion: string;
    explanationTh: string;
  }[];
  vocabularyUpgrades: {
    original: string;
    elevated: string;
    reasonTh: string;
  }[];
  thaiEnglishPitfallsDetected: string[];
}

export interface PlacementQuestion {
  id: string;
  type: 'vocab' | 'grammar' | 'reading' | 'listening';
  questionEn: string;
  questionTh: string;
  audioPrompt?: string;
  targetLevel: 'kids-basic' | 'kids-intermediate' | 'advanced-b1' | 'advanced-b2' | 'advanced-c1';
  options: { text: string; textTh?: string }[];
  correctIndex: number;
}

export interface ParentAnalytics {
  childName: string;
  totalStudyMinutes: number;
  totalWordsLearned: number;
  overallAccuracyRate: number;
  streakDays: number;
  starsEarned: number;
  topStrengths: string[];
  recommendedFocus: string[];
  recentActivities: {
    activityName: string;
    date: string;
    score: string;
  }[];
}

export interface MasterclassTip {
  id: string;
  titleEn: string;
  titleTh: string;
  category: 'pronunciation' | 'confidence' | 'idiom' | 'grammar' | 'fluency';
  englishText: string;
  thaiExplanation: string;
  audioScript: string;
  practicalDrill: {
    promptEn: string;
    promptTh: string;
    sampleAnswerEn: string;
    thaiMeaning: string;
  };
}

export interface InstructorProfile {
  name: string;
  role: string;
  roleTh: string;
  title: string;
  avatarEmoji: string;
  bioEn: string;
  bioTh: string;
  greetingAudioEn: string;
  greetingAudioTh: string;
  coreMotto: string;
  coreMottoTh: string;
  masterclassTips: MasterclassTip[];
  dailyQuotes: { en: string; th: string; keyVocab: string }[];
}

export interface DailyEnglishDrill {
  id: string;
  titleEn: string;
  titleTh: string;
  sentenceEn: string;
  sentenceTh: string;
  challengeType: 'repeat' | 'cloze' | 'accent' | 'reorder';
  targetWord: string;
  explanationEn: string;
  explanationTh: string;
}

