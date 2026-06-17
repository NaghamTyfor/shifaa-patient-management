import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, LogIn, AlertCircle, Eye, EyeOff } from 'lucide-react'; 
import { useAuth } from '../context/AuthContext';
import { AnimatedStethoscope } from '../components/ui/AnimatedStethoscope';
import { HeartbeatBackground } from '../components/ui/HeartbeatBackground';
import { useNavigate } from 'react-router-dom';
import loginVector from '/shifa_hero_image_1780337209822-removebg-preview.png';

const FloatingParticles = () => {
  const particles = [
    { id: 1, size: 40, color: 'bg-teal-400/20', top: '10%', left: '5%', duration: 20, delay: 0 },
    { id: 2, size: 60, color: 'bg-cyan-400/15', top: '20%', right: '8%', duration: 25, delay: 2 },
    { id: 3, size: 80, color: 'bg-emerald-400/15', bottom: '15%', left: '12%', duration: 18, delay: 4 },
    { id: 4, size: 50, color: 'bg-purple-400/15', top: '60%', right: '5%', duration: 22, delay: 1 },
    { id: 5, size: 70, color: 'bg-rose-400/15', bottom: '30%', right: '20%', duration: 28, delay: 3 },
    { id: 6, size: 45, color: 'bg-amber-400/15', top: '5%', left: '30%', duration: 16, delay: 5 },
    { id: 7, size: 90, color: 'bg-teal-400/10', bottom: '5%', right: '40%', duration: 30, delay: 0.5 },
    { id: 8, size: 55, color: 'bg-cyan-400/20', top: '40%', left: '45%', duration: 19, delay: 3.5 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute rounded-full ${p.color} blur-2xl`}
          style={{
            width: p.size,
            height: p.size,
            top: p.top,
            left: p.left,
            right: p.right,
            bottom: p.bottom,
          }}
          animate={{
            x: [0, 60, -30, 40, 0],
            y: [0, -50, 30, -20, 0],
            scale: [1, 1.2, 0.9, 1.1, 1],
            opacity: [0.6, 1, 0.7, 0.9, 0.6],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // 🛠️ حالة إظهار وإخفاء كلمة المرور
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'حدث خطأ، حاول مرة أخرى');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4fbfc] flex items-center justify-center p-4 md:p-8 relative overflow-hidden font-sans">
      <HeartbeatBackground />
      <FloatingParticles />

      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10 bg-white/40 backdrop-blur-md rounded-[3rem] p-4 md:p-8 shadow-xl border border-white/60 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-cyan-500/5 pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="hidden lg:flex lg:col-span-7 flex-col items-center justify-center p-8 bg-gradient-to-br from-teal-500/10 to-cyan-500/5 rounded-[2.5rem] h-full min-h-[600px] relative overflow-hidden text-center"
          dir="rtl"
        >
          <div className="absolute w-72 h-72 bg-gradient-to-tr from-teal-400/20 to-cyan-400/20 rounded-full blur-3xl pointer-events-none -z-10" />

          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="w-full flex justify-center items-center relative z-10"
          >
            <img 
              src={loginVector} 
              alt="Shifaa Hero Illustration" 
              className="w-full max-w-lg md:max-w-xl h-auto object-contain drop-shadow-[0_15px_30px_rgba(13,122,128,0.15)]"
            />
          </motion.div>

          <motion.div 
            className="mt-8 select-none w-full max-w-xl flex flex-col items-center gap-4"
            animate={{ scale: [1, 1.01, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          >
            <h2 className="flex items-center gap-4 text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-teal-800 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              <span>Shifaa</span>
              <span className="font-extrabold text-teal-600 border-r-2 border-teal-500/20 pr-4 leading-none pt-1">شِفاء</span>
            </h2>
            
            <p className="text-slate-600 text-base md:text-lg font-bold tracking-wide max-w-md leading-relaxed">
              منصتك الطبيّة المتكاملة لإدارة عيادتك وتحسين رحلة المرضى
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, x: 60 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.6, type: 'spring', damping: 25 }}
          className="w-full lg:col-span-5 max-w-md mx-auto"
        >
          <div className="bg-white/75 backdrop-blur-xl rounded-[2.5rem] p-6 md:p-8 shadow-2xl relative overflow-hidden border border-white/50">
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-teal-500/5 to-cyan-500/5 pointer-events-none" />

            <div className="text-center mb-8 relative">
              <motion.div
                className="flex justify-center mb-3"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <AnimatedStethoscope size={65} />
              </motion.div>
              <motion.h1
                className="text-2xl md:text-3xl font-black text-slate-800"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                مرحباً بِك في شِفَاء
              </motion.h1>
              <motion.p
                className="text-slate-500 text-sm md:text-base mt-1 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                سجّل الدخول للوصول إلى لوحة التحكم
              </motion.p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-right" dir="rtl">
              {error && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-rose-50 border border-rose-200 border-b-4 border-b-rose-300 text-rose-700 p-3 rounded-xl flex items-center gap-3 text-sm font-bold"
                >
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}

              <div className="space-y-1.5 group">
                <label className="text-xs font-bold text-slate-600 block mr-1">البريد الإلكتروني</label>
                <div className="relative transition-all duration-300 rounded-xl focus-within:ring-4 focus-within:ring-teal-500/20 focus-within:shadow-lg focus-within:shadow-teal-500/10">
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-500/60 group-focus-within:text-teal-600 transition-colors" />
                  <input
                    type="email"
                    required
                    dir="ltr"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="doctor@shifaa.com"
                    className="w-full pr-12 pl-4 py-3.5 bg-slate-50/70 border-2 border-slate-200 focus:border-teal-400 focus:bg-white/90 transition-all rounded-xl text-sm focus:outline-none text-right font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1.5 group">
                <div className="flex justify-between items-center px-1">
                  <label className="text-xs font-bold text-slate-600 block">كلمة المرور</label>
                  <a href="#forgot" className="text-xs font-bold text-teal-600 hover:text-teal-700 hover:underline transition-all">
                    نسيت كلمة المرور؟
                  </a>
                </div>
                <div className="relative transition-all duration-300 rounded-xl focus-within:ring-4 focus-within:ring-teal-500/20 focus-within:shadow-lg focus-within:shadow-teal-500/10">
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-500/60 group-focus-within:text-teal-600 transition-colors" />
                  <input
                    type={showPassword ? "text" : "password"} // 🛠️ تغيير النوع ديناميكياً
                    required
                    dir="ltr"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pr-12 pl-12 py-3.5 bg-slate-50/70 border-2 border-slate-200 focus:border-teal-400 focus:bg-white/90 transition-all rounded-xl text-sm focus:outline-none text-right font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-teal-600 transition-colors p-1 rounded-md"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0d7a80] hover:bg-[#119ea5] active:translate-y-0.5 active:border-b-0 text-white font-extrabold py-3.5 px-5 rounded-2xl border-b-4 border-[#074f53] transition-all duration-150 flex items-center justify-center gap-2 shadow-lg shadow-[#0d7a80]/20 disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden group text-sm mt-2"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <LogIn className="w-5 h-5" />
                      <span>تسجيل الدخول للوحة التحكم</span>
                    </>
                  )}
                </span>
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                />
              </motion.button>
            </form>

            <div className="mt-6 text-center text-xs text-slate-400 font-medium select-none">
              &copy; {new Date().getFullYear()} منصة شفاء الطبية. جميع الحقوق محفوظة.
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;