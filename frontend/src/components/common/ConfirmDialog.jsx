import React from "react";
import { motion } from "motion/react";
import { X, AlertTriangle } from "lucide-react";

export const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "تأكيد",
  cancelText = "إلغاء",
  type = "danger",
  isLoading = false, 
}) => {
  if (!isOpen) return null;

  const colorClasses =
    type === "danger"
      ? "from-rose-500 to-red-500"
      : "from-amber-500 to-orange-500";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
      />
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 15 }}
        transition={{ type: "spring", damping: 25, stiffness: 350 }}
        className="bg-white rounded-[2rem] sm:rounded-[2.5rem] w-full max-w-md p-6 sm:p-8 shadow-2xl relative overflow-hidden z-20 border border-slate-100 mx-4"
        dir="rtl"
      >
        <div
          className={`absolute top-0 inset-x-0 h-2 bg-gradient-to-r ${colorClasses}`}
        />

        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center mx-auto border border-rose-100 text-rose-500">
            <AlertTriangle className="w-8 h-8 text-rose-600" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-black text-slate-800">
              {title}
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed">{message}</p>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row-reverse gap-3">
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`
              w-full sm:flex-1 
              bg-rose-600 hover:bg-rose-700 active:translate-y-0.5 
              text-white font-extrabold py-3.5 px-5 rounded-2xl 
              border-b-4 border-rose-800 transition-all cursor-pointer
              flex items-center justify-center gap-2
              ${isLoading ? "opacity-70 cursor-not-allowed" : ""}
            `}
          >
            {isLoading ? (
              <>
                <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                جاري الحذف...
              </>
            ) : (
              confirmText
            )}
          </button>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="w-full sm:w-auto bg-slate-50 hover:bg-slate-100 text-slate-700 font-extrabold py-3.5 px-6 rounded-2xl border border-slate-200 border-b-4 border-b-slate-300 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {cancelText}
          </button>
        </div>
      </motion.div>
    </div>
  );
};