import { InstructorProfile, DailyEnglishDrill } from '../types/index.ts';

export const instructorTalha: InstructorProfile = {
  name: 'Talha Afridi',
  role: 'CEO & Master English Instructor',
  roleTh: 'ประธานเจ้าหน้าที่บริหาร (CEO) & หัวหน้าทีมผู้สอนภาษาอังกฤษ',
  title: 'Founder & CEO, Sabai English Global',
  avatarEmoji: '👨‍🏫',
  bioEn:
    'Talha Afridi is the CEO and Master English Instructor at Sabai English. With years of experience coaching professionals, university students, and young learners across Asia, Talha empowers Thai speakers to speak English with authentic rhythm, natural confidence, and zero stress.',
  bioTh:
    'ทัลฮา อาฟรีดี (Talha Afridi) ประธานเจ้าหน้าที่บริหาร (CEO) และหัวหน้าทีมผู้สอนภาษาอังกฤษระดับมาสเตอร์ ผู้เปี่ยมด้วยความมุ่งมั่นในการช่วยให้ผู้เรียนชาวไทยก้าวข้ามความประหม่า พูดภาษาอังกฤษได้อย่างเป็นธรรมชาติ ชัดเจน และคล่องแคล่วในระดับสากล',
  greetingAudioEn:
    'Hello everyone! I am Talha Afridi, CEO and Master English Instructor. Welcome to Sabai English! Remember: practice with joy and celebrate every step you take.',
  greetingAudioTh:
    'สวัสดีครับทุกคน ผมทัลฮา อาฟรีดี ยินดีต้อนรับสู่ สบาย อิงลิช นะครับ ขอให้สนุกกับการเรียนรู้ภาษาอังกฤษในทุกๆ วันครับ!',
  coreMotto:
    'Fluency is never about perfection. It is about clarity, connection, and the courage to speak up.',
  coreMottoTh:
    'ความคล่องแคล่วไม่ได้หมายถึงความสมบูรณ์แบบ 100% แต่อยู่ที่ความชัดเจน ความกล้าพูด และความสุขในการเชื่อมโยงกับผู้คน',
  masterclassTips: [
    {
      id: 'tip_connected_speech',
      titleEn: 'Connected Speech: Why Native Speakers Sound So Fast',
      titleTh: 'ทำไมชาวต่างชาติถึงพูดเร็ว? เคล็ดลับการเชื่อมเสียง (Connected Speech)',
      category: 'pronunciation',
      englishText:
        'Native English speakers do not speak word-by-word. When a word ends with a consonant and the next starts with a vowel, link them together! For example, "pick it up" sounds like "pi-ki-tup". Practice linking sounds to sound 10x more natural.',
      thaiExplanation:
        'คนไทยมักออกเสียงแยกทีละคำ ทำให้ฟังดูแข็งเกร็ง แต่เจ้าของภาษาจะเชื่อมเสียงท้ายของคำหน้าเข้ากับสระของคำถัดไป เช่น "Check it out" จะออกเสียงว่า "เช็ค-กิ-เดาท์"',
      audioScript: 'Pick it up. Check it out. Turn it on.',
      practicalDrill: {
        promptEn: 'Practice saying: "Hold on a second" with connected speech.',
        promptTh: 'ลองออกเสียง: "Hold on a second" (โฮล-ดอน-เนอะ-เซค-เกินด์)',
        sampleAnswerEn: 'Hold on a second.',
        thaiMeaning: 'รอสักครู่นะครับ',
      },
    },
    {
      id: 'tip_stop_translating',
      titleEn: 'Think in English: Break Free from Direct Mental Translation',
      titleTh: 'เลิกแปลทีละคำในหัว: วิธีฝึกคิดเป็นภาษาอังกฤษโดยตรง',
      category: 'confidence',
      englishText:
        'When you want to say something, do not form the Thai sentence first and translate every word. Instead, anchor your mind to the key English phrase or chunks. For example, instead of translating "ฉันไม่ค่อยแน่ใจเท่าไหร่", immediately recall the chunk: "I am not quite sure."',
      thaiExplanation:
        'การแปลทีละคำทำให้พูดช้าและเกิด Tinglish ให้ฝึกจำเป็น "กลุ่มคำพร้อมใช้" (Collocations / Chunks) เช่น "To be honest", "As far as I know", "Would you mind..."',
      audioScript: 'I am not quite sure. As far as I know. To be honest.',
      practicalDrill: {
        promptEn: 'Say: "To be completely honest with you..." without pausing.',
        promptTh: 'ฝึกพูดก้อนคำ: "To be completely honest with you..."',
        sampleAnswerEn: 'To be completely honest with you, that sounds fantastic.',
        thaiMeaning: 'ถ้าพูดตามตรงอย่างจริงใจเลยนะ สิ่งนั้นฟังดูยอดเยี่ยมมาก',
      },
    },
    {
      id: 'tip_th_sounds',
      titleEn: 'Mastering the "TH" Sound: Voice vs Unvoiced',
      titleTh: 'เทคนิคการวางลิ้นออกเสียง TH สำหรับคนไทย',
      category: 'pronunciation',
      englishText:
        'Thai language has no exact TH sound, so learners often substitute it with T, D, or S. To make the authentic TH sound, place the tip of your tongue gently between your upper and lower teeth, and blow gentle air: "Think", "Thank you", "Together".',
      thaiExplanation:
        'แตะปลายลิ้นเบาๆ ระหว่างฟันบนและฟันล่าง แล้วพ่นลมเบาๆ ไม่ต้องกัดแรง อย่าเปลี่ยน Think เป็น ซิ้งค์ หรือ ติ้งค์!',
      audioScript: 'Think, thank, thirty, through, together, weather.',
      practicalDrill: {
        promptEn: 'Say: "Thank you for thinking of me."',
        promptTh: 'ฝึกออกเสียงประโยคที่มี TH คู่: "Thank you for thinking of me."',
        sampleAnswerEn: 'Thank you for thinking of me.',
        thaiMeaning: 'ขอบคุณมากนะครับที่นึกถึงฉัน',
      },
    },
    {
      id: 'tip_professional_politeness',
      titleEn: 'Softening Your English: Sounding Polite in International Business',
      titleTh: 'การปรับน้ำเสียงภาษาอังกฤษให้สุภาพนุ่มนวลอย่างมืออาชีพ',
      category: 'fluency',
      englishText:
        'Thai speakers use "Kha" and "Khrub" to show politeness. In English, we use modal verbs like "Could", "Would", and softeners like "I was wondering if...". Instead of saying "Send me the file now", say "Could you please send over the file when you get a chance?"',
      thaiExplanation:
        'ในภาษาอังกฤษไม่มีคำลงท้ายอย่างค่ะ/ครับ ความสุภาพจึงมาจากการใช้ Modal verbs เช่น Could you..., Would you mind..., I was wondering if... ซึ่งช่วยให้ผู้ฟังรู้สึกสบายใจ',
      audioScript: 'Could you please send over the file when you get a chance?',
      practicalDrill: {
        promptEn: 'Turn "I want to talk to you" into a polite executive request.',
        promptTh: 'ปรับประโยค "I want to talk to you" ให้สุภาพเป็นมืออาชีพ',
        sampleAnswerEn: 'Would you happen to have a few minutes for a quick chat?',
        thaiMeaning: 'พอจะสะดวกสัก 2-3 นาทีสำหรับการพูดคุยสั้นๆ ไหมครับ?',
      },
    },
  ],
  dailyQuotes: [
    {
      en: 'Every single word you speak is a building block toward your global future.',
      th: 'ทุกคำภาษาอังกฤษที่คุณเปล่งเสียง คือก้อนอิฐที่สร้างอนาคตอันกว้างไกลระดับสากล',
      keyVocab: 'Building block = องค์ประกอบพื้นฐานที่สำคัญ',
    },
    {
      en: 'Mistakes are simply proof that you are practicing and growing.',
      th: 'ความผิดพลาดคือหลักฐานที่ยืนยันว่าคุณกำลังลงมือฝึกฝนและเติบโตขึ้นทุกวัน',
      keyVocab: 'Proof = หลักฐาน / ข้อพิสูจน์',
    },
    {
      en: 'Consistency beats intensity. Ten mindful minutes every day changes your brain.',
      th: 'ความสม่ำเสมอชนะความหักโหม วันละ 10 นาทีอย่างมีสมาธิจะเปลี่ยนวิธีคิดของคุณ',
      keyVocab: 'Consistency = ความสม่ำเสมอ',
    },
  ],
};

export const dailyEnglishDrills: DailyEnglishDrill[] = [
  {
    id: 'drill_1',
    titleEn: 'Everyday Idiom: Break a leg',
    titleTh: 'สำนวนประจำวัน: Break a leg (ขอให้โชคดี)',
    sentenceEn: 'You have your job interview today, break a leg!',
    sentenceTh: 'วันนี้คุณมีสัมภาษณ์งาน ขอให้โชคดีนะ ทำให้เต็มที่เลย!',
    challengeType: 'repeat',
    targetWord: 'Break a leg',
    explanationEn: 'In English theater and general culture, "break a leg" is a friendly way to say "good luck!"',
    explanationTh: 'อย่าแปลว่า "หักขา" เด็ดขาด! เป็นสำนวนอวยพรให้ประสบความสำเร็จและโชคดี',
  },
  {
    id: 'drill_2',
    titleEn: 'Action Collocation: Make a decision',
    titleTh: 'กลุ่มคำคู่กริยา: Make a decision (ไม่ใช่ Do a decision)',
    sentenceEn: 'We need to make a firm decision before Friday.',
    sentenceTh: 'เราจำเป็นต้องตัดสินใจอย่างเด็ดขาดก่อนวันศุกร์นี้',
    challengeType: 'cloze',
    targetWord: 'make',
    explanationEn: 'Decisions always collocate with "make", never with "do".',
    explanationTh: 'คำว่า decision (การตัดสินใจ) ใช้คู่กับกริยา "make" เสมอ ไม่ใช้ "do a decision"',
  },
  {
    id: 'drill_3',
    titleEn: 'Professional Email Starter: I hope this email finds you well',
    titleTh: 'ประโยคเปิดอีเมลสุดคลาสสิก: I hope this email finds you well',
    sentenceEn: 'I hope this email finds you well and having a productive week.',
    sentenceTh: 'หวังเป็นอย่างยิ่งว่าคุณจะสบายดีและมีสัปดาห์ที่ราบรื่นและมีประสิทธิภาพ',
    challengeType: 'repeat',
    targetWord: 'finds you well',
    explanationEn: 'A universal, polite opening for professional correspondence worldwide.',
    explanationTh: 'ประโยคทักทายมาตรฐานระดับสากลในอีเมลธุรกิจ แปลว่า "หวังว่าคุณจะสบายดี"',
  },
];
