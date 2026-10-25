import {
  AdvancedReadingArticle,
  AdvancedConversationDialogue,
  GrammarPitfall,
  WritingPrompt,
} from '../types/index.ts';

export const advancedArticles: AdvancedReadingArticle[] = [
  {
    id: 'art_remote_work',
    title: 'The Evolution of Modern Remote Work Culture',
    titleTh: 'วิวัฒนาการของวัฒนธรรมการทำงานระยะไกล (Remote Work) ในยุคปัจจุบัน',
    category: 'Business & Technology',
    level: 'Upper Intermediate (B2)',
    paragraphs: [
      {
        en: 'The global landscape of employment has undergone an unprecedented transformation over the past few years. Flexible working arrangements, once considered a rare luxury, have evolved into an indispensable component of talent acquisition and employee retention.',
        th: 'ภูมิทัศน์การจ้างงานทั่วโลกได้ผ่านการเปลี่ยนแปลงครั้งประวัติศาสตร์อย่างที่ไม่เคยปรากฏมาก่อน รูปแบบการทำงานที่มีความยืดหยุ่น ซึ่งเคยถูกมองว่าเป็นสิทธิพิเศษที่หาได้ยาก ปัจจุบันได้กลายเป็นองค์ประกอบสำคัญที่ขาดไม่ได้ในการดึงดูดและรักษาบุคลากรที่มีความสามารถ',
        glossary: [
          { word: 'unprecedented', th: 'ที่ไม่เคยเกิดขึ้นมาก่อน', type: 'adj.', example: 'The team achieved unprecedented growth.' },
          { word: 'indispensable', th: 'จำเป็นอย่างยิ่ง ขาดไม่ได้', type: 'adj.', example: 'Reliable internet is indispensable for remote workers.' },
          { word: 'talent acquisition', th: 'การสรรหาบุคลากรที่มีศักยภาพ', type: 'noun', example: 'Our HR team focuses on global talent acquisition.' },
        ],
      },
      {
        en: 'However, hybrid models present novel challenges, particularly regarding digital fatigue and cross-cultural communication. Without spontaneous hallway chats, multinational teams must cultivate deliberate, asynchronous collaboration practices to sustain camaraderie.',
        th: 'อย่างไรก็ดี รูปแบบไฮบริดก็นำมาซึ่งความท้าทายใหม่ๆ โดยเฉพาะอย่างยิ่งปัญหาความเหนื่อยล้าจากหน้าจอดิจิทัลและการสื่อสารข้ามวัฒนธรรม การขาดการพูดคุยทักทายอย่างไม่เป็นทางการในออฟฟิศ ทำให้ทีมข้ามชาติต้องสร้างวัฒนธรรมการประสานงานแบบไม่ต้องตอบทันที (Asynchronous) อย่างตั้งใจ เพื่อรักษาความผูกพันและมิตรภาพในทีมไว้',
        glossary: [
          { word: 'digital fatigue', th: 'ความล้าจากการใช้เทคโนโลยีหน้าจอนานเกินไป', type: 'noun', example: 'Frequent video conferences often lead to digital fatigue.' },
          { word: 'asynchronous', th: 'ไม่พร้อมกัน / สื่อสารแบบเว้นช่วงเวลาได้', type: 'adj.', example: 'Email is an asynchronous communication tool.' },
          { word: 'camaraderie', th: 'ความสนิทสนม มิตรภาพและความไว้ใจในหมู่เพื่อนร่วมงาน', type: 'noun', example: 'Virtual coffee breaks foster camaraderie.' },
        ],
      },
    ],
    comprehensionQuestions: [
      {
        question: 'What has flexible working evolved into according to the first paragraph?',
        questionTh: 'จากการอ่านย่อหน้าที่หนึ่ง รูปแบบการทำงานที่มีความยืดหยุ่นได้พัฒนาจนกลายเป็นอะไร?',
        options: [
          'A luxury available only to senior directors',
          'An indispensable element in recruiting and keeping top talent',
          'A temporary measure that is rapidly vanishing',
          'An obstacle that slows down international projects',
        ],
        correctIndex: 1,
        explanationTh: 'ย่อหน้าที่หนึ่งระบุอย่างชัดเจนว่า "evolved into an indispensable component of talent acquisition and employee retention" (กลายเป็นองค์ประกอบสำคัญในการสรรหาและรักษาบุคลากร)',
      },
      {
        question: 'Why do multinational remote teams need asynchronous practices?',
        questionTh: 'ทำไมทีมที่ทำงานข้ามชาติจึงต้องใช้การสื่อสารแบบ Asynchronous?',
        options: [
          'Because all team members reside in the exact same time zone',
          'To compensate for the lack of spontaneous in-person interactions and avoid fatigue',
          'To force employees to respond within sixty seconds',
          'To replace human colleagues with automated chat systems',
        ],
        correctIndex: 1,
        explanationTh: 'ย่อหน้าที่สองชี้แจงว่าเมื่อไม่มีการพูดคุยแบบซึ่งหน้า (hallway chats) และเพื่อลด digital fatigue ทีมจึงต้องใช้การประสานงานแบบ asynchronous เพื่อรักษา camaraderie',
      },
    ],
  },
  {
    id: 'art_cultural_intelligence',
    title: 'Cross-Cultural Nuances in Global Negotiations',
    titleTh: 'ความเข้าใจความต่างทางวัฒนธรรมในการเจรจาธุรกิจระดับสากล',
    category: 'Intercultural Communication',
    level: 'Advanced (C1)',
    paragraphs: [
      {
        en: 'Effective cross-border negotiators recognize that silence is interpreted differently across cultures. In high-context cultures such as Japan and Thailand, a thoughtful pause conveys contemplation and deep respect, whereas low-context counterparts might erroneously perceive it as hesitation or dissent.',
        th: 'นักเจรจาระหว่างประเทศที่มีประสิทธิภาพจะตระหนักดีว่าความเงียบถูกตีความต่างกันในแต่ละวัฒนธรรม ในวัฒนธรรมแบบ High-context เช่น ญี่ปุ่นและไทย การหยุดคิดเงียบๆ สื่อถึงความใคร่ครวญและความเคารพอย่างสูง ในขณะที่คู่เจรจาจากวัฒนธรรม Low-context อาจเข้าใจผิดคิดว่าเป็นความลังเลหรือไม่เห็นด้วย',
        glossary: [
          { word: 'high-context', th: 'วัฒนธรรมที่เน้นบริบท กาลเทศะ และภาษากาย', type: 'adj.', example: 'High-context communication relies heavily on subtle cues.' },
          { word: 'erroneously', th: 'อย่างเข้าใจผิด หรือผิดพลาด', type: 'adv.', example: 'He erroneously believed the deadline was postponed.' },
          { word: 'dissent', th: 'การคัดค้าน ความไม่เห็นพ้อง', type: 'noun', example: 'There was subtle dissent among committee members.' },
        ],
      },
    ],
    comprehensionQuestions: [
      {
        question: 'How do low-context negotiators sometimes misinterpret a silent pause?',
        questionTh: 'นักเจรจาแบบ Low-context มักเข้าใจผิดเกี่ยวกับความเงียบอย่างไร?',
        options: [
          'They see it as an absolute agreement',
          'They view it erroneously as hesitation or disagreement',
          'They assume the meeting has ended early',
          'They believe everyone is celebrating',
        ],
        correctIndex: 1,
        explanationTh: 'ข้อความระบุว่า "erroneously perceive it as hesitation or dissent" ซึ่งหมายถึงการเข้าใจผิดว่าเป็นความลังเลหรือไม่เห็นด้วย',
      },
    ],
  },
];

export const advancedDialogues: AdvancedConversationDialogue[] = [
  {
    id: 'conv_coffee_shop',
    title: 'Navigating a Specialty Coffee Shop in London',
    titleTh: 'สั่งกาแฟและสอบถามรายละเอียดในคาเฟ่ต่างประเทศอย่างมั่นใจ',
    scenarioEn: 'You are visiting an artisanal cafe in London and want to order with dairy-free milk and clarify preparation.',
    scenarioTh: 'คุณอยู่ที่ร้านกาแฟในลอนดอน ต้องการสั่งกาแฟใส่นมข้าวโอ๊ต และปรับระดับความหวาน',
    speakers: [
      { name: 'Barista', avatar: '☕', role: 'Staff' },
      { name: 'You (Korn)', avatar: '💼', role: 'Customer' },
    ],
    turns: [
      {
        speaker: 'Barista',
        en: 'Hi there! What can I get started for you today?',
        th: 'สวัสดีครับ วันนี้รับอะไรดีครับ?',
      },
      {
        speaker: 'You (Korn)',
        en: 'Could I please get a regular flat white with oat milk, take away?',
        th: 'ขอแฟลตไวท์แก้วปกติ นมโอ๊ต 1 แก้ว ใส่แก้วกลับบ้านครับ',
        notes: 'คนไทยมักพูด "take home" แต่สำหรับอาหาร/เครื่องดื่มในร้าน ให้ใช้ "take away" (UK/Australia) หรือ "to go" (US)',
      },
      {
        speaker: 'Barista',
        en: 'Certainly! Would you like that with an extra espresso shot, or standard single origin?',
        th: 'ได้เลยครับ ต้องการเพิ่มช็อตกาแฟ หรือใช้เมล็ดซิงเกิ้ลออริจินปกติครับ?',
      },
      {
        speaker: 'You (Korn)',
        en: 'Standard is perfect. Also, does this blend have notes of chocolate or citrus?',
        th: 'แบบปกติเลยครับ แล้วตัวนี้รสชาติออกไปทางช็อกโกแลตหรือผลไม้รสเปรี้ยวครับ?',
        notes: '"notes of..." ใช้เมื่อถามถึงกลิ่นหรือรสสัมผัสแฝงของกาแฟหรือไวน์',
      },
      {
        speaker: 'Barista',
        en: 'It has rich dark cocoa undertones. That will be £3.80, contactless card preferred!',
        th: 'มีกลิ่นอายโกโก้เข้มข้นครับ ทั้งหมด 3.80 ปอนด์ แตะจ่ายด้วยบัตรได้เลยครับ',
      },
    ],
    keyExpressions: [
      {
        en: 'Could I please get... ?',
        th: 'ขอสั่ง... ได้ไหมครับ/ค่ะ (สุภาพและเป็นธรรมชาติกว่า "I want...")',
        usageNoteTh: 'การใช้ "Could I get..." หรือ "May I have..." สุภาพและนิยมใช้มากที่สุด',
      },
      {
        en: 'Take away / To go',
        th: 'ใส่แก้ว/ถุงกลับบ้าน (ไม่ควรใช้ "take home")',
        usageNoteTh: 'ในสหราชอาณาจักรและออสเตรเลียนิยม "take away" ส่วนในสหรัฐอเมริกานิยม "to go"',
      },
      {
        en: 'Contactless card',
        th: 'บัตรแตะจ่ายเงิน (PayWave / Apple Pay / Google Pay)',
        usageNoteTh: 'ในต่างประเทศ แทบทุกร้านรองรับ Contactless tap-to-pay',
      },
    ],
  },
  {
    id: 'conv_business_meeting',
    title: 'Polite Disagreement & Clarification in a Meeting',
    titleTh: 'การแสดงความคิดเห็นแย้งอย่างสุภาพและขอความชัดเจนในการประชุม',
    scenarioEn: 'You disagree with a proposed timeline and want to propose an alternative gently.',
    scenarioTh: 'คุณไม่เห็นด้วยกับกำหนดส่งงานที่กระชั้นชิดเกินไป และต้องการเสนอแผนสำรองอย่างมืออาชีพ',
    speakers: [
      { name: 'Marcus (Project Lead)', avatar: '📊', role: 'Project Lead' },
      { name: 'You (Ploy)', avatar: '👩‍💻', role: 'Senior Analyst' },
    ],
    turns: [
      {
        speaker: 'Marcus (Project Lead)',
        en: 'We are aiming to launch the updated payment portal by next Friday. Any objections?',
        th: 'เราตั้งเป้าจะปล่อยระบบชำระเงินเวอร์ชันปรับปรุงภายในวันศุกร์หน้านี้ มีใครมีความเห็นแย้งไหมครับ?',
      },
      {
        speaker: 'You (Ploy)',
        en: 'I see where you are coming from, Marcus, but I have a slight reservation regarding the QA testing buffer.',
        th: 'เข้าใจมุมมองของคุณมาร์คัสเลยค่ะ แต่พลอยมีความกังวลใจเล็กน้อยเกี่ยวกับระยะเวลาสำรองสำหรับทดสอบระบบ (QA)',
        notes: 'คนไทยมักเกรงใจจนไม่กล้าค้าน การขึ้นต้นด้วย "I see where you are coming from, but..." ช่วยรักษาความสัมพันธ์และเปิดประเด็นอย่างสร้างสรรค์',
      },
      {
        speaker: 'Marcus (Project Lead)',
        en: 'Good point, Ploy. What do you suggest we adjust?',
        th: 'ข้อสังเกตดีมากครับพลอย คุณเสนอแนะให้ปรับตรงไหนดีครับ?',
      },
      {
        speaker: 'You (Ploy)',
        en: 'If we could push the release by four days, that would allow our security team to conduct comprehensive penetration testing.',
        th: 'หากเราสามารถเลื่อนวันปล่อยระบบออกไปอีก 4 วัน จะเปิดโอกาสให้ทีมความปลอดภัยได้ทำการทดสอบเจาะระบบอย่างรอบด้านค่ะ',
      },
    ],
    keyExpressions: [
      {
        en: 'I see where you are coming from, but...',
        th: 'ฉันเข้าใจมุมมองและเหตุผลของคุณนะ แต่ว่า...',
        usageNoteTh: 'ประโยคทองในการค้านอย่างสุภาพในบริบทสากล แสดงว่าเราฟังเขาเข้าใจดี',
      },
      {
        en: 'I have a slight reservation regarding...',
        th: 'ฉันมีข้อกังวล/ข้อสังเกตเล็กน้อยเกี่ยวกับ...',
        usageNoteTh: 'ดูเป็นมืออาชีพกว่าการพูดว่า "I don\'t agree with this"',
      },
    ],
  },
  {
    id: 'conv_job_interview',
    title: 'Executive Job Interview with CEO Talha Afridi',
    titleTh: 'จำลองการสัมภาษณ์งานระดับสากลกับ อ.ทัลฮา อาฟรีดี (CEO & Lead Instructor)',
    scenarioEn: 'You are interviewing for a global remote position. Instructor Talha is asking behavioral and experience questions.',
    scenarioTh: 'คุณกำลังสัมภาษณ์งานตำแหน่งระดับนานาชาติ อาจารย์ทัลฮากำลังทดสอบทักษะและการตอบคำถามเชิงพฤติกรรม',
    speakers: [
      { name: 'Talha Afridi (CEO)', avatar: '👨‍🏫', role: 'Interviewer & CEO' },
      { name: 'You (Candidate)', avatar: '💼', role: 'Candidate' },
    ],
    turns: [
      {
        speaker: 'Talha Afridi (CEO)',
        en: 'Welcome! It is a true pleasure to meet you. To kick things off, could you walk me through your background and what drove you to apply?',
        th: 'ยินดีต้อนรับครับ! เพื่อเป็นการเริ่มต้น ช่วยเล่าถึงภูมิหลังการทำงานและสิ่งที่ผลักดันให้คุณสมัครตำแหน่งนี้หน่อยได้ไหมครับ?',
        notes: '"To kick things off" เป็นสำนวนที่ใช้บ่อยมาก แปลว่า "เพื่อเป็นการเริ่มต้น"',
      },
      {
        speaker: 'You (Candidate)',
        en: 'Thank you, Khun Talha. Over the past four years, I have spearheaded cross-functional product launches, which honed my problem-solving and communication skills.',
        th: 'ขอบคุณครับคุณทัลฮา ตลอด 4 ปีที่ผ่านมา ผมเป็นผู้นำการเปิดตัวผลิตภัณฑ์ข้ามสายงาน ซึ่งช่วยขัดเกลาทักษะการแก้ปัญหาและการสื่อสารของผมอย่างมาก',
        notes: '"Spearheaded" (เป็นหัวหอก/แกนนำ) และ "honed" (ขัดเกลาทักษะ) เป็นกริยาพลังสูงที่สร้างความประทับใจใน Resume และ Interview',
      },
      {
        speaker: 'Talha Afridi (CEO)',
        en: 'Impressive track record! How do you handle high-pressure deadlines when unexpected bottlenecks arise?',
        th: 'ผลงานน่าประทับใจมากครับ! แล้วคุณจัดการกับกำหนดการที่กดดันอย่างไรเมื่อเกิดปัญหาคอขวดที่คาดไม่ถึง?',
      },
      {
        speaker: 'You (Candidate)',
        en: 'I prioritize radical transparency and proactive recalibration, ensuring stakeholders remain updated while we iterate quickly.',
        th: 'ผมให้ความสำคัญกับความโปร่งใสอย่างตรงไปตรงมา และการปรับแผนงานล่วงหน้า โดยดูแลให้ผู้มีส่วนได้ส่วนเสียได้รับข้อมูลอัปเดตตลอดเวลาในขณะที่เราเร่งแก้ไขอย่างรวดเร็วครับ',
      },
      {
        speaker: 'Talha Afridi (CEO)',
        en: 'Spot on! That proactive mindset is precisely what high-performing international teams look for.',
        th: 'ตรงประเด็นเป๊ะเลยครับ! ทัศนคติเชิงรุกแบบนี้คือสิ่งที่ทีมทำงานระดับโลกกำลังมองหา',
      },
    ],
    keyExpressions: [
      {
        en: 'To kick things off',
        th: 'เพื่อเป็นการเริ่มต้น / เพื่อเปิดประเด็น',
        usageNoteTh: 'มักใช้ในที่ประชุมหรือการสัมภาษณ์งาน แทนคำว่า "To begin with"',
      },
      {
        en: 'Spearheaded the initiative',
        th: 'เป็นหัวหอก/เป็นแกนนำในการริเริ่มโครงการ',
        usageNoteTh: 'คำกริยาทรงพลังใน Resume และการสัมภาษณ์งาน แสดงถึงภาวะผู้นำ (Leadership)',
      },
      {
        en: 'Spot on!',
        th: 'ถูกต้องเป๊ะเลย / โดนใจมาก',
        usageNoteTh: 'สำนวนใช้ชมเมื่ออีกฝ่ายตอบได้ตรงจุด ชัดเจน และตรงเป้าหมาย',
      },
    ],
  },
];

export const grammarPitfalls: GrammarPitfall[] = [
  {
    id: 'pitfall_articles',
    titleTh: 'การใช้ Articles (a, an, the หรือไม่ต้องใส่)',
    titleEn: 'Articles: A, An, The vs Zero Article',
    thaiMistakePattern: 'คนไทยมักลืมใส่ a/an หน้านามนับได้เอกพจน์ หรือใช้ the เกินความจำเป็นเพราะภาษาไทยไม่มีคำนำหน้านาม',
    incorrectExample: 'I bought new laptop yesterday. Computer is very fast.',
    correctExample: 'I bought a new laptop yesterday. The computer is very fast.',
    explanationTh:
      'กฎง่ายๆ: 1. กล่าวถึงสิ่งนับได้เป็นครั้งแรก -> ใช้ "a / an" (a laptop)\n2. กล่าวซ้ำเป็นครั้งที่สอง หรือผู้ฟังรู้แน่ชัดว่าเป็นอันไหน -> ใช้ "the" (the computer)\n3. พูดถึงสิ่งทั่วไปพหูพจน์ ไม่ต้องใส่ article เช่น "Elephants are smart" (ไม่ใช่ The elephants)',
    practiceQuestions: [
      {
        prompt: 'She is looking for ______ apartment in downtown Bangkok.',
        promptTh: 'เลือกคำนำหน้านามที่ถูกต้องหน้า apartment',
        options: ['a', 'an', 'the (specific already)', 'no article required'],
        correctIndex: 1,
        tipTh: 'apartment ขึ้นต้นด้วยเสียงสระ /æ/ และเป็นการกล่าวถึงทั่วไปครั้งแรก จึงใช้ "an"',
      },
      {
        prompt: '______ knowledge is power.',
        promptTh: 'คำว่า knowledge ต้องมี article หรือไม่?',
        options: ['A', 'An', 'The', 'No article (Zero article)'],
        correctIndex: 3,
        tipTh: 'knowledge เป็นคำนามนับไม่ได้ (uncountable) และกล่าวถึงความรู้โดยทั่วไป จึงไม่ใส่ article ใดๆ',
      },
    ],
  },
  {
    id: 'pitfall_countables',
    titleTh: 'นามนับได้ vs นับไม่ได้ที่คนไทยชอบเผลอเติม -s',
    titleEn: 'Countable vs Uncountable Noun Pitfalls',
    thaiMistakePattern: 'เผลอเติม -s ให้กับคำนามนับไม่ได้ยอดฮิต เช่น information, equipment, luggage, advice, feedback',
    incorrectExample: 'Our manager gave us many useful advices and feedbacks.',
    correctExample: 'Our manager gave us a lot of useful advice and feedback.',
    explanationTh:
      'คำเหล่านี้ในภาษาอังกฤษเป็นนามนับไม่ได้เสมอ:\n- Information (ข้อมูล) ไม่ใช่ informations\n- Equipment (อุปกรณ์) ไม่ใช่ equipments\n- Advice (คำแนะนำ) ไม่ใช่ advices\n- Furniture (เฟอร์นิเจอร์) ไม่ใช่ furnitures\nถ้าต้องการนับเป็นชิ้น ให้ใช้ "a piece of advice" หรือ "an item of luggage"',
    practiceQuestions: [
      {
        prompt: 'Can you provide me with more ______ regarding the new policy?',
        promptTh: 'เลือกรูปคำศัพท์ที่ถูกต้อง',
        options: ['information', 'informations', 'an information', 'few information'],
        correctIndex: 0,
        tipTh: 'information เป็นนามนับไม่ได้ ห้ามเติม -s และห้ามใช้ "an information"',
      },
    ],
  },
  {
    id: 'pitfall_prepositions',
    titleTh: 'คำบุพบท (Prepositions) ที่แปลตรงตัวจากภาษาไทยไม่ได้',
    titleEn: 'Tricky Prepositions (Listen to, Congratulate on, In/On/At)',
    thaiMistakePattern: 'คนไทยชอบแปลตามคำไทย เช่น "แสดงความยินดีกับ" -> congratulate to (ผิด) หรือ "ฟังเพลง" -> listen music (ผิด)',
    incorrectExample: 'I congratulated to him for his promotion, and then we listened music.',
    correctExample: 'I congratulated him on his promotion, and then we listened to music.',
    explanationTh:
      'คู่คำที่ต้องจำพิเศษ:\n- Congratulate [someone] ON [something]\n- Listen TO [music / podcast]\n- Look forward TO [doing something]\n- Married TO [someone] (ไม่ใช่ married with)',
    practiceQuestions: [
      {
        prompt: 'Everyone called to congratulate Sarah ______ her tremendous achievement.',
        promptTh: 'เลือกบุพบทที่ใช้คู่กับ congratulate',
        options: ['to', 'for', 'on', 'with'],
        correctIndex: 2,
        tipTh: 'หลักการ: congratulate someone "on" something เสมอ',
      },
      {
        prompt: 'She has been married ______ an architect for ten years.',
        promptTh: 'เลือกบุพบทที่ใช้คู่กับ married',
        options: ['with', 'to', 'by', 'of'],
        correctIndex: 1,
        tipTh: 'ภาษาไทยพูดว่า "แต่งงานกับ" แต่ในภาษาอังกฤษใช้ "married to someone"',
      },
    ],
  },
  {
    id: 'pitfall_false_friends',
    titleTh: 'คำไทย-อังกฤษที่คนไทยใช้กันจนคิดว่าเป็นภาษาอังกฤษแท้ (Tinglish)',
    titleEn: 'Common Tinglish vs Authentic English',
    thaiMistakePattern: 'การนำคำทับศัพท์ที่คนไทยคุ้นเคยไปพูดกับชาวต่างชาติแล้วสื่อสารไม่ตรงความหมาย',
    incorrectExample: 'Waiter, check bill please! Afterwards I will play phone in the lobby.',
    correctExample: 'Could we get the bill (UK) / the check (US), please? Afterwards I will check my phone in the lobby.',
    explanationTh:
      'เปรียบเทียบคำคุ้นหูคนไทย:\n- "Check bill" -> ชาวต่างชาติจะงง เพราะอังกฤษใช้ "The bill, please" ส่วนอเมริกันใช้ "The check, please" ไม่พูดผสมกัน!\n- "Play phone / play internet" -> ให้ใช้ "use my phone" หรือ "browse the web"\n- "In trend" -> ฝรั่งใช้ "trendy" หรือ "fashionable"\n- "Over" (เวอร์) -> ฝรั่งใช้ "exaggerated" หรือ "dramatic"',
    practiceQuestions: [
      {
        prompt: 'When finishing a meal in New York, the most natural way to ask to pay is:',
        promptTh: 'เมื่อทานอาหารเสร็จในนิวยอร์ก วิธีขอเก็บเงินที่เป็นธรรมชาติที่สุดคือข้อใด?',
        options: ['Check bill please!', 'Could we get the check, please?', 'Let me pay the money bill now', 'Open the bill for me'],
        correctIndex: 1,
        tipTh: 'ในสหรัฐฯ นิยม "Could we get the check, please?"',
      },
    ],
  },
];

export const advancedWritingPrompts: WritingPrompt[] = [
  {
    id: 'wp_email_followup',
    titleEn: 'Professional Follow-up Email After a Client Meeting',
    titleTh: 'เขียนอีเมลสรุปและติดตามผลหลังการประชุมลูกค้า',
    level: 'advanced',
    instructionsEn: 'Write a concise, professional follow-up email thanking a prospective client for their time, summarizing key discussion points, and proposing next steps.',
    instructionsTh: 'เขียนอีเมลสั้นๆ แต่เป็นมืออาชีพ ขอบคุณลูกค้าที่สละเวลาเข้าประชุม สรุปประเด็นหลักที่คุยกัน และเสนอขั้นตอนถัดไป',
    starterSentenceEn: 'Dear Khun Somchai,\n\nThank you for taking the time to speak with our team today regarding the upcoming cloud migration initiative.',
    suggestedKeywords: [
      { en: 'appreciate your time', th: 'ซาบซึ้งในเวลาของคุณ' },
      { en: 'as discussed', th: 'ตามที่ได้พูดคุยกัน' },
      { en: 'next milestone', th: 'เป้าหมายสำคัญถัดไป' },
      { en: 'deliverables', th: 'ผลงานที่จะส่งมอบ' },
    ],
    minWords: 30,
  },
  {
    id: 'wp_opinion_ai',
    titleEn: 'Opinion Essay: The Impact of AI in Thai Education',
    titleTh: 'บทความแสดงความคิดเห็น: บทบาทของ AI ในการศึกษาไทย',
    level: 'advanced',
    instructionsEn: 'Share your perspective on how artificial intelligence tools could support students and teachers in Thailand. Mention both potential advantages and critical considerations.',
    instructionsTh: 'เขียนแสดงมุมมองว่าปัญญาประดิษฐ์ (AI) จะช่วยพัฒนาการเรียนรู้ของนักเรียนและครูไทยได้อย่างไร โดยกล่าวถึงทั้งข้อดีและสิ่งที่ควรระมัดระวัง',
    starterSentenceEn: 'In recent years, artificial intelligence has emerged as a transformative catalyst in modern classrooms.',
    suggestedKeywords: [
      { en: 'personalized learning', th: 'การเรียนรู้ที่เหมาะกับแต่ละคน' },
      { en: 'critical thinking', th: 'การคิดเชิงวิพากษ์' },
      { en: 'ethical considerations', th: 'ประเด็นด้านจริยธรรม' },
      { en: 'digital literacy', th: 'ทักษะความเข้าใจและใช้เทคโนโลยีดิจิทัล' },
    ],
    minWords: 35,
  },
];
