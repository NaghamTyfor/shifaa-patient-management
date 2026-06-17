import React from "react";
import { motion } from "motion/react";
import { Plus } from "lucide-react";
import { AnimatedStethoscope } from "../ui/AnimatedStethoscope";

export const PatientsHeader = ({ onAddClick }) => {
  return (
    <motion.div
      id="patients-section"
      className="scroll-mt-24 bg-white rounded-[2.5rem] p-8 border border-slate-100 border-b-[6px] border-b-slate-200 shadow-md mb-10 text-right flex flex-col sm:flex-row-reverse justify-between items-center gap-6"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <button
        id="add-patient-trigger"
        onClick={onAddClick}
        className="w-full sm:w-auto bg-[#0d7a80] hover:bg-[#0f8c93] active:translate-y-1 active:border-b-0 text-white font-extrabold text-sm px-6 py-3.5 rounded-2xl shadow-lg border-b-4 border-[#074f53] transition-all duration-150 cursor-pointer flex items-center justify-center gap-2"
      >
        <Plus className="w-5 h-5" />
        <span>إضافة مريض جديد</span>
      </button>
      <div className="w-full sm:w-auto flex flex-row-reverse items-center gap-4">
        <AnimatedStethoscope size={56} className="hidden sm:block shrink-0" />
        <div className="text-right space-y-1">
          <h2 className="text-2xl font-black text-slate-800">سجل المرضى</h2>
          <p className="text-slate-500 text-sm"> عرض الملفات الطبية</p>
        </div>
      </div>
    </motion.div>
  );
};