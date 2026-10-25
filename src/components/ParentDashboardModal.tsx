import React, { useState } from 'react';
import { UserProgress } from '../types/index.ts';
import { calculateParentAnalytics } from '../utils/rules.ts';
import {
  Users,
  Award,
  Clock,
  BookOpen,
  CheckCircle,
  Flame,
  Star,
  Printer,
  HeartHandshake,
  Sparkles,
} from 'lucide-react';

interface ParentDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
  uiLang: 'th' | 'en';
}

export const ParentDashboardModal: React.FC<ParentDashboardModalProps> = ({
  isOpen,
  onClose,
  progress,
  uiLang,
}) => {
  if (!isOpen) return null;

  const [childName, setChildName] = useState('น้องภูมิ (Phum)');
  const [showCertificate, setShowCertificate] = useState(false);

  const analytics = calculateParentAnalytics(progress, childName);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900">
                {uiLang === 'th'
                  ? 'มุมผู้ปกครองและคุณครู (Parent & Teacher View)'
                  : 'Parent & Teacher Dashboard'}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {uiLang === 'th'
                  ? 'ติดตามพัฒนาการความมั่นใจ และการใช้เวลาเรียนรู้ของบุตรหลาน'
                  : 'Track learning milestones, consistency, and joyful progress'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-sm cursor-pointer"
          >
            ✕
          </button>
        </div>

        {!showCertificate ? (
          <div className="space-y-6">
            {/* Student Name Input */}
            <div className="bg-purple-50/70 border border-purple-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-purple-800 uppercase tracking-wider block">
                  ชื่อนักเรียน / บุตรหลาน:
                </span>
                <input
                  type="text"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  placeholder="พิมพ์ชื่อน้อง..."
                  className="mt-1 font-black text-slate-900 bg-white px-3 py-1.5 rounded-xl border border-purple-200 outline-none focus:ring-2 focus:ring-purple-400 text-sm"
                />
              </div>

              <button
                onClick={() => setShowCertificate(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xs transition cursor-pointer self-start sm:self-auto"
              >
                <Award className="w-4 h-4 text-amber-300" />
                <span>พิมพ์เกียรติบัตรคนเก่ง 🏆</span>
              </button>
            </div>

            {/* Core Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
                <Clock className="w-5 h-5 text-indigo-500 mx-auto mb-1" />
                <span className="text-xs text-slate-500 font-bold block">เวลาเรียนรวม</span>
                <span className="text-xl font-black text-slate-900">
                  {analytics.totalStudyMinutes} นาที
                </span>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
                <BookOpen className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
                <span className="text-xs text-slate-500 font-bold block">คำศัพท์ที่รู้</span>
                <span className="text-xl font-black text-slate-900">
                  {analytics.totalWordsLearned} คำ
                </span>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
                <CheckCircle className="w-5 h-5 text-sky-500 mx-auto mb-1" />
                <span className="text-xs text-slate-500 font-bold block">ความแม่นยำ</span>
                <span className="text-xl font-black text-slate-900">
                  {analytics.overallAccuracyRate}%
                </span>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
                <Star className="w-5 h-5 text-amber-500 mx-auto mb-1" />
                <span className="text-xs text-slate-500 font-bold block">ดาวสะสม</span>
                <span className="text-xl font-black text-amber-600">
                  {analytics.starsEarned} ⭐
                </span>
              </div>
            </div>

            {/* Strengths & Encouragement */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-1.5 font-extrabold text-emerald-900 text-sm">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>จุดเด่นที่น่าภาคภูมิใจ</span>
                </div>
                <ul className="text-xs text-emerald-800 space-y-1.5 list-disc list-inside font-medium">
                  {analytics.topStrengths.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-1.5 font-extrabold text-amber-900 text-sm">
                  <HeartHandshake className="w-4 h-4 text-amber-600" />
                  <span>แนวทางส่งเสริมต่อยอด</span>
                </div>
                <ul className="text-xs text-amber-800 space-y-1.5 list-disc list-inside font-medium">
                  {analytics.recommendedFocus.map((f, idx) => (
                    <li key={idx}>{f}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Positive Coaching Advice for Parents */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                💡 เคล็ดลับช่วยลูกฝึกภาษาอังกฤษที่บ้านแบบไร้ความกดดัน
              </h4>
              <div className="text-xs text-slate-600 space-y-1 leading-relaxed">
                <p>1. <strong>ชมความพยายาม:</strong> กล่าวชื่นชมเมื่อน้องกล้าออกเสียง แม้จะยังไม่เป๊ะ 100%</p>
                <p>2. <strong>ใช้เสียงเต่า (0.5x หรือ 0.75x):</strong> เพื่อให้น้องจับเสียงลงท้าย (-s, -ed, -t) ได้ชัดเจน</p>
                <p>3. <strong>สม่ำเสมอวันละนิด:</strong> การเล่นเกมสะกดคำวันละ 5-10 นาที ได้ผลดีกว่าการเรียนนานๆ สัปดาห์ละครั้ง</p>
              </div>
            </div>
          </div>
        ) : (
          /* Printable Certificate of Achievement */
          <div className="space-y-6 animate-fadeIn text-center">
            <div className="p-8 rounded-3xl border-4 border-amber-300 bg-gradient-to-b from-amber-50/80 via-white to-amber-50/80 shadow-md relative overflow-hidden">
              <div className="absolute top-2 left-2 text-2xl">🌟</div>
              <div className="absolute top-2 right-2 text-2xl">🌟</div>
              <div className="absolute bottom-2 left-2 text-2xl">🐘</div>
              <div className="absolute bottom-2 right-2 text-2xl">🎉</div>

              <div className="space-y-2 mb-6">
                <span className="text-xs font-black tracking-widest text-amber-700 uppercase">
                  SABAI ENGLISH ACADEMY
                </span>
                <h2 className="text-3xl font-black text-slate-900">
                  ใบประกาศนียบัตรคนเก่ง 🏆
                </h2>
                <p className="text-xs text-slate-500">Certificate of Diligence & Joyful Learning</p>
              </div>

              <p className="text-sm text-slate-600">ขอมอบประกาศนียบัตรฉบับนี้เพื่อแสดงว่า</p>
              <div className="text-3xl font-black text-purple-700 my-3 underline decoration-amber-400 decoration-wavy decoration-2">
                {childName}
              </div>

              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                ได้แสดงความมุ่งมั่น ตั้งใจ และมีความสุขในการเรียนรู้ภาษาอังกฤษ สะสมดาวครบ{' '}
                <strong className="text-amber-600 font-black">{analytics.starsEarned} ดวง</strong>{' '}
                และเชี่ยวชาญคำศัพท์กว่า{' '}
                <strong className="text-slate-900 font-black">{analytics.totalWordsLearned} คำ</strong>
              </p>

              <div className="mt-8 pt-4 border-t border-amber-200/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4 px-2">
                <div className="text-center sm:text-left">
                  <div className="text-slate-400">วันที่: {new Date().toLocaleDateString('th-TH')}</div>
                  <div className="font-bold text-amber-700">🐘 น้องช้าง & สบาย อิงลิช</div>
                </div>

                {/* CEO & Master Instructor Signature */}
                <div className="text-center sm:text-right">
                  <div className="font-serif italic font-bold text-base text-indigo-950 tracking-wider">
                    Talha Afridi
                  </div>
                  <div className="w-36 h-0.5 bg-indigo-300 mx-auto sm:ml-auto my-0.5" />
                  <div className="font-black text-slate-800 text-xs">Talha Afridi</div>
                  <div className="text-[10px] text-amber-800 font-bold">
                    CEO & Master English Instructor
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-2.5 sm:gap-3 pt-2">
              <button
                onClick={handlePrint}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-black text-sm shadow-md transition cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>สั่งพิมพ์ / บันทึกเป็น PDF</span>
              </button>

              <button
                onClick={() => setShowCertificate(false)}
                className="w-full sm:w-auto px-4 py-3 rounded-2xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs cursor-pointer text-center"
              >
                กลับสู่หน้าสรุปผล
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
