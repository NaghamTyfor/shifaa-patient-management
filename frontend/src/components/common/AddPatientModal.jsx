import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { X, UserPlus, CheckCircle2 } from "lucide-react";
import api from "../../api/axios"; 

export const AddPatientModal = ({ isOpen, onClose, onAdd }) => {
  const [formName, setFormName] = useState("");
  const [formAge, setFormAge] = useState("");
  const [formDisease, setFormDisease] = useState("");
  const [formPhone, setFormPhone] = useState("");

  const [diseases, setDiseases] = useState([]);
  const [loadingDiseases, setLoadingDiseases] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setLoadingDiseases(true);
      api
        .get("/diseases")
        .then((response) => {
          setDiseases(response.data);
          if (response.data.length > 0) {
            setFormDisease(response.data[0].name);
          }
        })
        .catch((error) => console.error("خطأ في جلب الأمراض:", error))
        .finally(() => setLoadingDiseases(false));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePhoneChange = (e) => {
    const input = e.target.value.replace(/\D/g, "");
    const size = input.length;
    let formatted = "";

    if (size === 0) {
      formatted = "";
    } else if (size <= 3) {
      formatted = input;
    } else if (size <= 6) {
      formatted = `${input.slice(0, 3)} ${input.slice(3)}`;
    } else {
      formatted = `${input.slice(0, 3)} ${input.slice(3, 6)} ${input.slice(6, 9)}`;
    }

    setFormPhone(formatted);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let cleanPhone = formPhone.replace(/\s+/g, "");
    if (cleanPhone.startsWith("0")) {
      cleanPhone = cleanPhone.substring(1);
    }

    const finalFormattedPhone = `+963 ${cleanPhone.slice(0, 3)} ${cleanPhone.slice(3, 6)} ${cleanPhone.slice(6, 9)}`;

    const newPatient = {
      name: formName.trim(),
      age: parseInt(formAge) || 30,
      disease: formDisease,
      phone: finalFormattedPhone,
    };

    onAdd(newPatient);
    setFormName("");
    setFormAge("");
    setFormPhone("");
    setFormDisease(diseases.length > 0 ? diseases[0].name : "");
    onClose();
  };

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
        className="bg-white rounded-[2rem] sm:rounded-[2.5rem] w-full max-w-lg p-6 sm:p-8 shadow-2xl relative overflow-hidden z-20 border border-slate-100 mx-4"
        dir="rtl"
      >
        <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-teal-500 to-cyan-500" />

        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100 p-2 rounded-xl transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2.5">
            <div className="bg-teal-50 text-teal-600 p-2 rounded-xl">
              <UserPlus className="w-5 h-5" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-800">تسجيل مريض جديد</h3>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5 text-right">
            <label className="text-xs font-bold text-slate-600 block">اسم المريض الثلاثي</label>
            <input
              type="text"
              required
              placeholder="مثال: ريم حسن التميمي"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 shadow-inner rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:bg-white text-right font-medium"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5 text-right group">
              <label className="text-xs font-bold text-slate-600 block">رقم الهاتف الجوال</label>
              <div className="relative rounded-xl shadow-inner">
                <input
                  type="text"
                  required
                  maxLength={13}
                  placeholder="9XX XXX XXX"
                  value={formPhone}
                  onChange={handlePhoneChange}
                  className="w-full pr-4 pl-16 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:bg-white text-right font-mono tracking-wider outline-none"
                  dir="ltr"
                />
                <div className="absolute left-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1 bg-slate-200/60 border border-slate-300/40 px-2 py-0.5 rounded-lg text-[10px] font-black text-slate-500 pointer-events-none select-none" dir="ltr">
                  <span>🇸🇾</span>
                  <span>+963</span>
                </div>
              </div>
            </div>

            <div className="space-y-1.5 text-right">
              <label className="text-xs font-bold text-slate-600 block">العمر بالسنوات</label>
              <input
                type="number"
                required
                min="1"
                max="120"
                placeholder="مثال: 32"
                value={formAge}
                onChange={(e) => setFormAge(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 shadow-inner rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:bg-white text-right font-mono"
              />
            </div>
          </div>

          <div className="space-y-1.5 text-right">
            <label className="text-xs font-bold text-slate-600 block">التشخيص الحالي / المرض</label>
            {loadingDiseases ? (
              <div className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-500">
                جاري تحميل الأمراض...
              </div>
            ) : (
              <select
                value={formDisease}
                onChange={(e) => setFormDisease(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 shadow-inner rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:bg-white text-right text-slate-700 cursor-pointer font-bold"
              >
                {diseases.map((disease) => (
                  <option key={disease.id} value={disease.name}>
                    {disease.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="pt-4 flex flex-col sm:flex-row-reverse gap-3">
            <button
              type="submit"
              className="w-full sm:flex-1 bg-[#0d7a80] hover:bg-[#0f8c93] active:translate-y-0.5 text-white font-extrabold py-3.5 px-5 rounded-2xl border-b-4 border-[#074f53] transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#0d7a80]/15"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>إضافة المريض</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};