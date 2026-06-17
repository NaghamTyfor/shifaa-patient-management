import React from "react";
import { motion } from "motion/react";
import { ChevronLeft, ShieldCheck, LayoutDashboard } from "lucide-react";
import { AnimatedStethoscope } from "../ui/AnimatedStethoscope";

export const Footer = () => {
  return (
    <motion.footer
      className="bg-[#0b1315] text-slate-400 pt-16 pb-12 px-6 border-t border-slate-800/60 relative overflow-hidden font-sans"
      dir="rtl"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-950/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-950/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1.5fr] gap-x-16 gap-y-10 pb-12 border-b border-slate-800/60">
          
          <div className="space-y-4 text-right">
            <div className="flex items-center gap-3 select-none">
              <div className="bg-slate-900/80 p-2 rounded-2xl border border-slate-800 shadow-inner flex items-center justify-center">
                <AnimatedStethoscope size={38} />
              </div>
              <div className="flex flex-col text-right">
                <span className="font-black text-white text-xl tracking-wide bg-gradient-to-l from-white to-slate-300 bg-clip-text text-transparent">
                  شفاء للرعاية الصحية
                </span>
                <span className="text-[10px] text-teal-400 font-black tracking-wider uppercase mt-0.5">
                  Shifaa Healthcare
                </span>
              </div>
            </div>
            <p className="text-slate-400/90 text-xs leading-relaxed font-medium max-w-md">
              منصة متكاملة ومتقدمة لإدارة ملفات السجلات الطبية التفاعلية للمرضى، مصممة بأعلى معايير الدقة السريرية وتجربة مستخدم متميزة تقدم استجابة لحظية مذهلة.
            </p>
          </div>

          <div className="space-y-4 md:mr-4">
            <h4 className="text-sm font-black text-white border-r-4 border-teal-500 pr-2 flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4 text-teal-400" />
              <span>أقسام المنصة</span>
            </h4>
            <ul className="space-y-3 text-xs font-bold">
              <li>
                <button 
                  onClick={() => document.getElementById("patients-section")?.scrollIntoView({ behavior: "smooth", block: "start" })} 
                  className="text-slate-400 hover:text-teal-400 hover:translate-x-[-6px] transition-all duration-200 cursor-pointer flex items-center gap-2 group"
                >
                  <span className="text-teal-500/60 group-hover:text-teal-400 transition-colors">•</span>
                  <span>سجل المرضى المشمولين</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById("add-patient-trigger")?.click()} 
                  className="text-slate-400 hover:text-teal-400 hover:translate-x-[-6px] transition-all duration-200 cursor-pointer flex items-center gap-2 group"
                >
                  <span className="text-teal-500/60 group-hover:text-teal-400 transition-colors">•</span>
                  <span>إضافة مريض جديد</span>
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-black text-white border-r-4 border-teal-500 pr-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>الأمن وسلامة البيانات</span>
            </h4>
            <p className="text-slate-400/90 text-xs leading-relaxed font-medium max-w-sm">
              نحن نأخذ خصوصية المرضى على محمل الجد. يتم تشفير كافة البيانات محلياً وبشكل آمن متوافق مع معايير الحماية العالمية لضمان سرية السجلات السريرية.
            </p>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row-reverse justify-between items-center gap-6 text-xs font-medium">
          <motion.button 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} 
            className="text-teal-400 hover:text-teal-300 font-bold cursor-pointer bg-slate-900/80 hover:bg-slate-850 px-5 py-2.5 rounded-xl border border-slate-800/80 transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-teal-950/20 active:scale-98"
            whileHover={{ y: -2 }}
          >
            <span>العودة لأعلى الصفحة</span>
            <ChevronLeft className="w-4 h-4 transform rotate-90 text-teal-400" />
          </motion.button>
          
          <div className="text-center sm:text-right space-y-1.5 select-none">
            <p className="text-slate-500 font-semibold">
              كل الحقوق محفوظة © منصة شفاء الطبية {new Date().getFullYear()} م.
            </p>
            <p className="text-slate-600 font-mono text-[10px] tracking-wider">
              نظام إدارة المعلومات الطبية المتطور v2.4
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};