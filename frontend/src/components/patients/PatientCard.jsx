import React, { useState, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Phone, Trash2, ChevronDown, ChevronUp, Activity } from 'lucide-react';

const HighlightedText = ({ text, highlight }) => {
  if (!highlight || !highlight.trim()) {
    return <span>{text}</span>;
  }
  const searchTerm = highlight.trim();
  const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  return (
    <span>
      {parts.map((part, index) => {
        if (part.toLowerCase() === searchTerm.toLowerCase()) {
          return (
            <mark key={index} className="bg-yellow-300 text-slate-900 font-extrabold px-0.5 rounded-sm">
              {part}
            </mark>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </span>
  );
};

const PatientCard = ({ patient, onDelete, isSelected = false, onToggleSelect, searchTerm = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      whileHover={{ y: -6, scale: 1.015 }}
      whileTap={{ y: 2 }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`bg-white rounded-[2rem] p-6 border ${
        isSelected ? 'border-teal-300 ring-2 ring-teal-500/10' : 'border-slate-100'
      } border-b-[6px] ${
        isSelected ? 'border-b-teal-600' : 'border-b-slate-200 hover:border-b-teal-500/80'
      } shadow-[0_10px_20px_-8px_rgba(15,23,42,0.04)] hover:shadow-[0_16px_32px_-10px_rgba(13,122,128,0.12)] transition-all duration-300 relative overflow-hidden group`}
    >
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent z-10" />
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-teal-500/5 to-transparent rounded-full blur-2xl group-hover:from-teal-500/15 transition-all duration-300" />

      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleSelect?.(patient.id);
            }}
            className={`h-9 w-9 rounded-xl border border-b-2 transition-all duration-150 cursor-pointer flex items-center justify-center shadow-sm ${
              isSelected
                ? 'bg-teal-500 text-white border-teal-600 border-b-teal-700 active:translate-y-0.5'
                : 'bg-white text-slate-300 border-slate-200 border-b-slate-300 hover:border-teal-300 hover:text-teal-500 active:translate-y-0.5'
            }`}
            title={isSelected ? 'إلغاء تحديد المريض' : 'تحديد المريض'}
          >
            {isSelected ? (
              <svg className="w-4 h-4 stroke-white fill-none" strokeWidth={3} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <div className="w-3.5 h-3.5 rounded border border-slate-300 bg-slate-50/50" />
            )}
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDelete(patient.id);
            }}
            className="text-slate-400 hover:text-rose-500 hover:bg-rose-50/80 active:translate-y-0.5 p-2 rounded-xl transition-all duration-150 cursor-pointer border border-transparent hover:border-rose-100 border-b-2 hover:border-b-rose-200 shadow-sm relative z-20"
            title="حذف هذا المريض"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-teal-50/70 text-teal-600 p-3 rounded-2xl border border-slate-100 border-b-4 border-b-teal-100/80 shadow-inner flex items-center justify-center">
          <User className="w-6 h-6" />
        </div>
      </div>

      <div className="text-right space-y-3" dir="rtl">
        <div>
          <span className="text-xs font-semibold text-teal-600 bg-teal-50 px-2 py-1 rounded-md mb-1 inline-block">
            مريض نشط
          </span>
          <h3 className="text-xl font-bold text-slate-800 tracking-tight block mt-1">
            الاسم: <HighlightedText text={patient.name} highlight={searchTerm} />
          </h3>
        </div>

        <div className="flex items-center gap-2 justify-start text-slate-500 text-sm bg-slate-50/80 px-3 py-1.5 rounded-xl border border-slate-100/80 w-fit">
          <Phone className="w-4 h-4 text-teal-500/80" />
          <span className="font-mono text-slate-700 font-bold tracking-wider" dir="ltr">
            {patient.phone}
          </span>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex justify-center py-2 text-teal-600/70 hover:text-teal-600 text-xs font-semibold transition-colors mt-2 border-t border-slate-100 pt-3 gap-1 cursor-pointer"
        >
          <span>{isExpanded ? 'عرض تفاصيل أقل' : 'عرض التفاصيل السريرية'}</span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="pt-3 pb-1 border-t border-slate-100 mt-2 space-y-2.5 text-xs text-slate-600">
                <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-100 border-b-2 border-b-slate-200/80 shadow-inner">
                  <span className="font-semibold text-slate-700">العمر الحالي</span>
                  <span className="font-medium text-slate-800 bg-white px-2 py-0.5 rounded-lg shadow-sm border border-slate-100">{patient.age} سنة</span>
                </div>

                <div className="flex items-center justify-between bg-[#f0fbfb]/60 p-2.5 rounded-xl border border-teal-100/50 border-b-2 border-b-teal-200/60 shadow-inner">
                  <span className="font-semibold text-teal-700">الحالة الصحية / التشخيص</span>
                  <div className="flex items-center gap-1.5 text-teal-700 font-extrabold bg-white px-2.5 py-1 rounded-lg shadow-sm border border-teal-100/50">
                    <span>{patient.disease}</span>
                    <Activity className="w-3.5 h-3.5 text-teal-500 animate-pulse" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default memo(PatientCard);