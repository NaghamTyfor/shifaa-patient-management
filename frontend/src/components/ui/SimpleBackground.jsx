import React from 'react';

export const SimpleBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none">
      <div className="absolute top-10 right-[5%] w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-teal-500/10 rounded-full filter blur-[80px]" />
      <div className="absolute bottom-10 left-[-10%] w-[280px] h-[280px] md:w-[350px] md:h-[350px] bg-cyan-400/9 rounded-full filter blur-[80px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full filter blur-[100px]" />
    </div>
  );
};