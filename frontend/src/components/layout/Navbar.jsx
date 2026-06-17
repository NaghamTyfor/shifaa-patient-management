import React, { useState } from 'react';
import { Menu, LogOut, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AnimatedStethoscope } from '../ui/AnimatedStethoscope';

export const Navbar = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogoutClick = async () => {
    try {
      setIsLoggingOut(true); 
      await logout();       
    } catch (error) {
      console.error("فشل تسجيل الخروج:", error);
      setIsLoggingOut(false); 
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md border-b border-slate-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-row-reverse justify-between items-center">
        <div className="flex flex-row-reverse items-center gap-2">
          <AnimatedStethoscope size={44} />
          <span className="text-2xl font-black bg-gradient-to-l from-slate-800 to-teal-800 bg-clip-text text-transparent tracking-tight">
            Shifaa
          </span>
        </div>

        <div className="flex items-center gap-4">
          {user && (
            <>
              <span className="text-slate-700 font-bold text-sm bg-slate-100 px-3 py-2 rounded-xl border border-slate-200 shadow-sm">
                {user.name}
              </span>
              
              <button
                onClick={handleLogoutClick}
                disabled={isLoggingOut} 
                className={`flex items-center gap-2 font-extrabold text-sm px-4 py-2 rounded-xl border border-b-4 transition-all shadow-sm active:translate-y-0.5
                  ${isLoggingOut 
                    ? 'bg-slate-100 border-slate-300 border-b-slate-400 text-slate-500 cursor-not-allowed' 
                    : 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-200 border-b-rose-300 hover:shadow-md'
                  }`}
              >
                {isLoggingOut ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-slate-500" />
                    <span>جاري تسجيل الخروج...</span>
                  </>
                ) : (
                  <>
                    <LogOut className="w-4 h-4" />
                    <span>تسجيل الخروج</span>
                  </>
                )}
              </button>
            </>
          )}
          <button
            onClick={onMenuClick}
            className="lg:hidden flex items-center justify-center p-2 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <Menu className="w-6 h-6 text-slate-700" />
          </button>
        </div>
      </div>
    </header>
  );
};