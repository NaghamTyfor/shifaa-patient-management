import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Home, Users } from "lucide-react";
import { AnimatedStethoscope } from "../ui/AnimatedStethoscope";

export const Sidebar = ({ isOpen, onClose }) => {
  const menuItems = [
    { name: "الرئيسية", icon: Home, onClick: () => { window.scrollTo({ top: 0, behavior: "smooth" }); onClose(); } },
    { name: "سجل المرضى", icon: Users, onClick: () => { document.getElementById("patients-section")?.scrollIntoView({ behavior: "smooth", block: "start" }); onClose(); } },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-72 bg-white shadow-2xl z-50 lg:hidden flex flex-col"
            dir="rtl"
          >
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <AnimatedStethoscope size={36} />
                <span className="text-xl font-black bg-gradient-to-l from-slate-800 to-teal-800 bg-clip-text text-transparent">
                  Shifaa
                </span>
              </div>
              <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 transition-colors">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <div className="flex-1 py-6">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={item.onClick}
                  className="w-full flex items-center gap-3 px-6 py-4 text-right hover:bg-teal-50 transition-colors group"
                >
                  <item.icon className="w-5 h-5 text-slate-500 group-hover:text-teal-600 transition-colors" />
                  <span className="text-slate-700 group-hover:text-teal-700 font-medium">{item.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};