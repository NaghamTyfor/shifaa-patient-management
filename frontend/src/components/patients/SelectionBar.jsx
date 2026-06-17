import React, { memo, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Trash2, Search } from 'lucide-react';

const SelectionBar = ({
  selectedIds,
  totalPatients,
  onSelectAll,
  onClearSelection,
  onBulkDelete,
  searchTerm,
  setSearchTerm,
  hasPatients = true,
  loading = false,
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const prevLoadingRef = useRef(loading);
  useEffect(() => {
    if (prevLoadingRef.current === true && loading === false && inputRef.current) {
      inputRef.current.focus();
    }
    prevLoadingRef.current = loading;
  }, [loading]);

  const isAllSelected = selectedIds.length === totalPatients && totalPatients > 0;

  return (
    <motion.div
      className="mb-6 flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-3xl border border-slate-100 border-b-[5px] border-b-slate-200 shadow-sm bg-white"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
    >
      <div className="w-full md:w-auto md:flex-1 flex items-center gap-2 bg-slate-50/80 border border-slate-200 rounded-xl px-3 py-2 transition-all focus-within:border-teal-400 focus-within:ring-2 focus-within:ring-teal-500/20">
        <Search className="w-4 h-4 text-teal-500/60" />
        <input
          ref={inputRef}
          type="text"
          placeholder=" ابحث بالاسم..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-transparent text-slate-700 placeholder:text-slate-400/70 text-sm font-medium outline-none py-1"
          dir="rtl"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="text-slate-400 hover:text-slate-600 transition-colors text-xs font-bold px-1"
          >
            ✕
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
        <button
          onClick={onSelectAll}
          disabled={loading || !hasPatients}
          className={`px-4 py-2.5 rounded-xl border border-b-4 text-xs font-black transition-all cursor-pointer flex items-center gap-2 shadow-sm ${
            isAllSelected
              ? 'bg-teal-50 border-teal-200 border-b-teal-300 text-teal-800 active:translate-y-0.5'
              : 'bg-white border-slate-200 border-b-slate-300 text-slate-700 hover:border-teal-300 hover:text-teal-600 active:translate-y-0.5'
          } ${(loading || !hasPatients) && 'opacity-50 pointer-events-none'}`}
        >
          <div className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${isAllSelected ? 'bg-teal-600 border-teal-700 text-white' : 'border-slate-300 bg-slate-50'}`}>
            {isAllSelected && (
              <svg className="w-2.5 h-2.5 stroke-current fill-none" strokeWidth={3} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
          <span>{isAllSelected ? 'إلغاء تحديد الكل' : 'تحديد الكل'}</span>
        </button>

        {selectedIds.length > 0 && (
          <button
            onClick={onClearSelection}
            disabled={loading}
            className={`bg-white border border-slate-200 border-b-4 border-b-slate-300 text-slate-500 hover:text-slate-700 hover:bg-slate-50 active:translate-y-0.5 text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-sm ${
              loading && 'opacity-50 pointer-events-none'
            }`}
          >
            إلغاء ({selectedIds.length})
          </button>
        )}

        <div className="text-slate-500 text-xs font-bold bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 whitespace-nowrap">
          تم تحديد <span className="text-teal-600 font-extrabold">{selectedIds.length}</span> من{' '}
          <span className="text-slate-800 font-extrabold">{totalPatients}</span>
        </div>

        {selectedIds.length > 0 && (
          <motion.button
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={onBulkDelete}
            disabled={loading}
            className={`bg-rose-50 border border-rose-200 border-b-4 border-b-rose-300 text-rose-700 hover:bg-rose-100/50 active:translate-y-0.5 text-xs font-black px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-sm ${
              loading && 'opacity-50 pointer-events-none'
            }`}
          >
            <Trash2 className="w-4 h-4 text-rose-500" />
            <span>حذف ({selectedIds.length})</span>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default memo(SelectionBar);