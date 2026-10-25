import React, { useState } from 'react';
import { usePWAInstall } from '../utils/usePWAInstall.ts';
import {
  Download,
  Smartphone,
  Laptop,
  CheckCircle2,
  Share2,
  PlusSquare,
  Sparkles,
  WifiOff,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface InstallAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  uiLang: 'th' | 'en';
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({
  isOpen,
  onClose,
  uiLang,
}) => {
  if (!isOpen) return null;

  const { isInstallable, isInstalled, isIOS, isAndroid, install } = usePWAInstall();
  const [selectedDevice, setSelectedDevice] = useState<'ios' | 'android' | 'desktop'>(
    isIOS ? 'ios' : isAndroid ? 'android' : 'desktop'
  );
  const [installSuccess, setInstallSuccess] = useState(false);

  const handleNativeInstall = async () => {
    const success = await install();
    if (success) {
      setInstallSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-white text-2xl shadow-sm">
              🐘
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900">
                {uiLang === 'th' ? 'วิธีดาวน์โหลดและติดตั้งแอป' : 'How to Download & Install App'}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {uiLang === 'th'
                  ? 'ติดตั้งไว้บนหน้าจอมือถือหรือแท็บเล็ต ใช้งานได้เสมือนแอปแท้'
                  : 'Install onto your home screen for quick, offline access'}
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

        {/* Quick Native Install Button if supported by browser */}
        {isInstallable && !isInstalled && (
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-5 rounded-2xl shadow-md text-center space-y-3">
            <div className="flex items-center justify-center gap-2 font-black text-lg">
              <Zap className="w-5 h-5 text-amber-200 fill-amber-200" />
              <span>
                {uiLang === 'th' ? 'อุปกรณ์ของคุณรองรับการติดตั้งใน 1 คลิก!' : '1-Click Install Supported!'}
              </span>
            </div>
            <p className="text-xs text-amber-100 max-w-sm mx-auto">
              {uiLang === 'th'
                ? 'กดปุ่มด้านล่างเพื่อดาวน์โหลดไอคอนแอป Sabai English ไปยังหน้าจอหลักทันที'
                : 'Click below to instantly add Sabai English to your application launcher'}
            </p>
            <button
              onClick={handleNativeInstall}
              className="px-6 py-3 bg-white hover:bg-amber-50 text-slate-900 rounded-xl font-black text-sm shadow-md transition transform hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2 mx-auto"
            >
              <Download className="w-4 h-4 text-amber-600" />
              <span>{uiLang === 'th' ? 'ติดตั้งแอปทันที (Install Now)' : 'Install App Now'}</span>
            </button>
          </div>
        )}

        {installSuccess && (
          <div className="p-4 bg-emerald-50 text-emerald-900 border border-emerald-300 rounded-2xl text-center font-bold text-sm animate-fadeIn">
            🎉 {uiLang === 'th' ? 'ติดตั้งแอปสำเร็จเรียบร้อยแล้ว!' : 'App successfully installed!'}
          </div>
        )}

        {/* Device Platform Tabs */}
        <div>
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            {uiLang === 'th' ? 'เลือกอุปกรณ์ของคุณเพื่อดูขั้นตอน:' : 'Choose your device for instructions:'}
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setSelectedDevice('ios')}
              className={`p-3 rounded-2xl border-2 text-center transition cursor-pointer flex flex-col items-center gap-1 ${
                selectedDevice === 'ios'
                  ? 'bg-amber-400 text-amber-950 border-amber-500 font-black shadow-xs scale-102'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span className="text-xs">iPhone / iPad</span>
            </button>

            <button
              onClick={() => setSelectedDevice('android')}
              className={`p-3 rounded-2xl border-2 text-center transition cursor-pointer flex flex-col items-center gap-1 ${
                selectedDevice === 'android'
                  ? 'bg-amber-400 text-amber-950 border-amber-500 font-black shadow-xs scale-102'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span className="text-xs">Android</span>
            </button>

            <button
              onClick={() => setSelectedDevice('desktop')}
              className={`p-3 rounded-2xl border-2 text-center transition cursor-pointer flex flex-col items-center gap-1 ${
                selectedDevice === 'desktop'
                  ? 'bg-amber-400 text-amber-950 border-amber-500 font-black shadow-xs scale-102'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
              }`}
            >
              <Laptop className="w-4 h-4" />
              <span className="text-xs">Mac / Windows</span>
            </button>
          </div>
        </div>

        {/* Step-by-Step Guide per Device */}
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4">
          {selectedDevice === 'ios' && (
            <div className="space-y-3">
              <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <span>🍎</span>
                <span>{uiLang === 'th' ? 'ขั้นตอนสำหรับ iPhone และ iPad (Safari)' : 'iPhone & iPad (Safari) Instructions'}</span>
              </h4>

              <div className="space-y-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                <div className="flex items-start gap-3 bg-white p-3 rounded-xl border border-slate-200">
                  <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 font-black text-xs flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div>
                    {uiLang === 'th' ? (
                      <>เปิดหน้านี้ในเบราว์เซอร์ <strong>Safari</strong> แล้วแตะที่ปุ่ม <strong>แชร์ (Share ⎋)</strong> ที่แถบเมนูด้านล่าง</>
                    ) : (
                      <>Open this website in <strong>Safari</strong> and tap the <strong>Share</strong> button 📤 in the bottom bar.</>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white p-3 rounded-xl border border-slate-200">
                  <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 font-black text-xs flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div>
                    {uiLang === 'th' ? (
                      <>เลื่อนหน้าต่างขึ้น แล้วแตะเลือก <strong>"เพิ่มไปยังหน้าจอโฮม" (Add to Home Screen ➕)</strong></>
                    ) : (
                      <>Scroll down and tap <strong>"Add to Home Screen" (➕)</strong>.</>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white p-3 rounded-xl border border-slate-200">
                  <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 font-black text-xs flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div>
                    {uiLang === 'th' ? (
                      <>แตะ <strong>"เพิ่ม" (Add)</strong> ที่มุมขวาบน ไอคอนน้องช้างจะปรากฏบนหน้าจอมือถือของคุณทันที!</>
                    ) : (
                      <>Tap <strong>"Add"</strong> in the top-right corner. The Sabai English icon will appear on your home screen!</>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedDevice === 'android' && (
            <div className="space-y-3">
              <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <span>🤖</span>
                <span>{uiLang === 'th' ? 'ขั้นตอนสำหรับ Android (Google Chrome)' : 'Android (Google Chrome) Instructions'}</span>
              </h4>

              <div className="space-y-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                <div className="flex items-start gap-3 bg-white p-3 rounded-xl border border-slate-200">
                  <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 font-black text-xs flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div>
                    {uiLang === 'th' ? (
                      <>เปิดหน้านี้ใน <strong>Google Chrome</strong> แล้วแตะที่จุดสามจุด <strong>(⋮)</strong> ที่มุมบนขวา</>
                    ) : (
                      <>Open this website in <strong>Google Chrome</strong> and tap the three-dot menu <strong>(⋮)</strong> in the top-right corner.</>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white p-3 rounded-xl border border-slate-200">
                  <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 font-black text-xs flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div>
                    {uiLang === 'th' ? (
                      <>เลือกเมนู <strong>"ติดตั้งแอปพลิเคชัน" (Install app)</strong> หรือ <strong>"เพิ่มลงในหน้าจอหลัก"</strong></>
                    ) : (
                      <>Select <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.</>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white p-3 rounded-xl border border-slate-200">
                  <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 font-black text-xs flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div>
                    {uiLang === 'th' ? (
                      <>แตะ <strong>"ติดตั้ง"</strong> แอปจะดาวน์โหลดลงเครื่องและเปิดใช้งานแบบเต็มหน้าจอ (Standalone)</>
                    ) : (
                      <>Tap <strong>"Install"</strong> to confirm. The app will launch in seamless full-screen mode!</>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedDevice === 'desktop' && (
            <div className="space-y-3">
              <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <span>💻</span>
                <span>{uiLang === 'th' ? 'ขั้นตอนสำหรับคอมพิวเตอร์ (Chrome / Edge)' : 'Desktop (Chrome / Edge) Instructions'}</span>
              </h4>

              <div className="space-y-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                <div className="flex items-start gap-3 bg-white p-3 rounded-xl border border-slate-200">
                  <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 font-black text-xs flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div>
                    {uiLang === 'th' ? (
                      <>ที่แถบกรอกที่อยู่เว็บไซต์ (URL Address Bar) ด้านบนขวา จะมีไอคอน <strong>ติดตั้งแอป ⊕</strong></>
                    ) : (
                      <>Look for the <strong>Install App ⊕</strong> icon on the right side of the URL Address Bar.</>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white p-3 rounded-xl border border-slate-200">
                  <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 font-black text-xs flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div>
                    {uiLang === 'th' ? (
                      <>คลิกไอคอนดังกล่าว แล้วกดยืนยัน <strong>"ติดตั้ง" (Install)</strong></>
                    ) : (
                      <>Click the icon and select <strong>"Install"</strong> in the confirmation prompt.</>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white p-3 rounded-xl border border-slate-200">
                  <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 font-black text-xs flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div>
                    {uiLang === 'th' ? (
                      <>แอปจะเปิดเป็นโปรแกรมหน้าต่างแยกอิสระบนเดสก์ท็อป สะดวกต่อการเรียนทุกวัน</>
                    ) : (
                      <>The app will open as an independent desktop window for focused, distraction-free practice.</>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Benefits of Installing PWA */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-amber-50 p-3 rounded-xl border border-amber-200/80 flex items-center gap-2.5">
            <Zap className="w-4 h-4 text-amber-600 shrink-0" />
            <span className="font-bold text-amber-950">
              {uiLang === 'th' ? 'เปิดเร็วใน 1 วินาทีจากหน้าจอ' : 'Instant 1-Second Launch'}
            </span>
          </div>

          <div className="bg-sky-50 p-3 rounded-xl border border-sky-200/80 flex items-center gap-2.5">
            <WifiOff className="w-4 h-4 text-sky-600 shrink-0" />
            <span className="font-bold text-sky-950">
              {uiLang === 'th' ? 'ฝึกคำศัพท์ได้แม้ไม่มีเน็ต' : 'Offline Vocab Practice'}
            </span>
          </div>

          <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200/80 flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-bold text-emerald-950">
              {uiLang === 'th' ? 'ปลอดภัย ไม่เปลืองความจุเครื่อง' : 'Zero Storage Bloat'}
            </span>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
          >
            {uiLang === 'th' ? 'เข้าใจแล้ว / ปิดหน้าต่าง' : 'Got it / Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
