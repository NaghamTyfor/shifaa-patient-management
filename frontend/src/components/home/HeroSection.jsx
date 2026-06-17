import React from "react";
import { motion } from "motion/react";
import { Activity } from "lucide-react";
import { TypewriterText } from "../ui/TypewriterText";

const fadeInLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
};

export const HeroSection = ({ heroImageSrc }) => {
  return (
    <section className="bg-transparent pt-10 pb-6 px-6 relative overflow-hidden" dir="rtl">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          className="space-y-6 text-right z-10 order-2 lg:order-1"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInLeft} className="inline-flex items-center gap-2 bg-teal-50 border border-teal-100/50 px-3 py-1.5 rounded-full text-teal-800 text-xs font-semibold">
            <Activity className="w-4 h-4 text-teal-600 animate-pulse" />
            <span>نظام شِفَاء لإدارة المرضى</span>
          </motion.div>
          <motion.h1 variants={fadeInRight} className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#115e59] leading-tight tracking-tight drop-shadow-sm">
            شِفَاء للرعاية الصحية
          </motion.h1>
          <TypewriterText
            text="منصة 'شِفَاء' هي منصة إدارة للمرضى لتنظيم السجلات الصحية في عيادتك."
            delay={300}
            className="text-slate-600 text-base md:text-lg leading-relaxed max-w-2xl"
          />
        </motion.div>

        <motion.div
          className="flex justify-center items-center z-10 order-1 lg:order-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInRight}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-teal-200/20 rounded-full blur-3xl -z-10 scale-150" />
            <motion.img
              src={heroImageSrc}
              alt="شعار شفاء الطبي"
              className="w-full max-w-2xl lg:max-w-3xl object-contain drop-shadow-2xl"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.05 }}
            />
          </div>
        </motion.div>
      </div>
      <div className="absolute top-20 right-[15%] w-32 h-32 bg-teal-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-[10%] w-48 h-48 bg-cyan-200/20 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
};