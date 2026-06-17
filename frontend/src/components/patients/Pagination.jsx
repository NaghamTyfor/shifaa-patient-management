import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <motion.div
      className="flex items-center justify-center gap-2 mt-4 bg-white/70 p-3.5 rounded-3xl border border-slate-100 border-b-[6px] border-b-slate-200 shadow-md max-w-sm sm:max-w-md mx-auto"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3.5 py-2.5 rounded-xl border border-slate-200 border-b-4 border-b-slate-300 bg-white text-slate-700 disabled:opacity-40 disabled:pointer-events-none hover:bg-slate-50 hover:text-teal-700 active:translate-y-0.5 transition-all flex items-center gap-1.5 font-extrabold text-xs cursor-pointer shadow-sm"
      >
        <span>السابق</span>
        <ChevronRight className="w-4 h-4" />
      </button>
      <div className="flex items-center gap-1.5 px-1">
        {Array.from({ length: totalPages }).map((_, idx) => {
          const p = idx + 1;
          return (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`w-10 h-10 rounded-xl font-black text-sm transition-all duration-150 flex items-center justify-center cursor-pointer border ${
                p === currentPage
                  ? 'bg-[#0d7a80] text-white border-[#074f53] border-b-4 shadow-md'
                  : 'bg-white text-slate-600 border-slate-200 border-b-4 hover:border-b-teal-500 hover:text-teal-600 active:translate-y-0.5 shadow-sm'
              }`}
            >
              {p}
            </button>
          );
        })}
      </div>
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3.5 py-2.5 rounded-xl border border-slate-200 border-b-4 border-b-slate-300 bg-white text-slate-700 disabled:opacity-40 disabled:pointer-events-none hover:bg-slate-50 hover:text-teal-700 active:translate-y-0.5 transition-all flex items-center gap-1.5 font-extrabold text-xs cursor-pointer shadow-sm"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>التالي</span>
      </button>
    </motion.div>
  );
};