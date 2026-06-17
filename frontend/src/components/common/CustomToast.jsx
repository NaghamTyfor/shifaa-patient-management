import React from "react";
import { motion } from "motion/react";
import { CheckCircle2, X, AlertTriangle } from "lucide-react";

export const CustomToast = ({ toast, onClose }) => {
  if (!toast) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="fixed top-24 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-4"
    >
      <div className={`p-4 rounded-2xl shadow-2xl flex items-center justify-between gap-3 text-right border-t border-x ${toast.type === "success" ? "bg-emerald-50 border-emerald-100 border-b-8 border-b-emerald-200 text-emerald-800" : toast.type === "info" ? "bg-sky-50 border-sky-100 border-b-8 border-b-sky-200 text-sky-800" : "bg-rose-50 border-rose-100 border-b-8 border-b-rose-200 text-rose-800"}`} dir="rtl">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl border-b-2 shadow-sm ${toast.type === "success" ? "bg-emerald-500 border-emerald-600 text-white" : toast.type === "info" ? "bg-sky-500 border-sky-600 text-white" : "bg-rose-500 border-rose-600 text-white"}`}>
            {toast.type === "success" ? <CheckCircle2 className="w-5 h-5" /> : toast.type === "info" ? <X className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
          </div>
          <div>
            <p className="font-extrabold text-sm text-slate-800">{toast.type === "success" ? "تمت العملية بنجاح" : "تأكيد الإجراء"}</p>
            <p className="text-xs text-slate-600 font-semibold">{toast.message}</p>
          </div>
        </div>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 bg-white rounded-lg"><X className="w-4 h-4" /></button>
      </div>
    </motion.div>
  );
};