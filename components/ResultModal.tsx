import React, { useEffect, useState } from 'react';

interface ResultModalProps {
  number: number;
  color: string;
  onClose: () => void;
}

const ResultModal: React.FC<ResultModalProps> = ({ number, color, onClose }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Delay showing the content slightly to sync with the "Pop" animation
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-blue-900/60 backdrop-blur-md transition-opacity duration-500"
        onClick={onClose}
      ></div>

      {/* Capsule Content */}
      <div className="relative z-10 flex flex-col items-center animate-pop">
        
        {/* The Spirit Ball Opening */}
        <div className="relative w-64 h-64 flex items-center justify-center perspective-800">
            
            {/* Aura effect */}
            <div className="absolute inset-0 bg-cyan-100/30 rounded-full blur-2xl animate-pulse scale-150"></div>
            
            {/* Top Half of Spirit Ball */}
            <div 
                className={`absolute top-0 w-56 h-28 rounded-t-full ${color} transition-all duration-700 ease-in-out border-4 border-black border-b-[12px] shadow-xl overflow-hidden z-20`}
                style={{ 
                    transform: showContent ? 'translateY(-80px) rotate(-15deg)' : 'translateY(0)',
                    transformOrigin: 'bottom center'
                }}
            >
                {/* Highlight */}
                <div className="absolute top-4 left-6 w-16 h-8 bg-white/30 rounded-full rotate-[-20deg]"></div>
            </div>

            {/* Bottom Half of Spirit Ball */}
            <div 
                className={`absolute bottom-0 w-56 h-28 rounded-b-full bg-white transition-all duration-700 ease-in-out border-4 border-black border-t-[12px] shadow-xl flex items-center justify-center overflow-hidden z-20`}
                style={{ 
                    transform: showContent ? 'translateY(80px) rotate(15deg)' : 'translateY(0)',
                    transformOrigin: 'top center'
                }}
            >
                {/* Button Mechanism (Attached to bottom half) */}
                 <div className="absolute -top-[22px] left-1/2 -translate-x-1/2 w-16 h-16 bg-white border-[6px] border-black rounded-full z-30 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full border-2 border-black/20 bg-gray-100"></div>
                 </div>
            </div>

            {/* The Result Number (Hidden inside then pops out) */}
            <div 
                className={`absolute z-10 transition-all duration-500 delay-300 transform ${showContent ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
            >
                {/* Pokemon-style Badge/Number */}
                <div className="bg-yellow-300 text-yellow-900 w-48 h-48 rounded-full flex flex-col items-center justify-center shadow-[0_0_30px_rgba(253,224,71,0.8)] border-4 border-white rotate-6 relative">
                    <span className="text-xs font-bold uppercase tracking-widest mb-2 opacity-70">Lucky No.</span>
                    <span className="text-8xl font-black font-mono tracking-tighter drop-shadow-sm">
                        {number}
                    </span>
                    {/* Stars decoration */}
                    <div className="absolute -top-4 -right-4 text-4xl animate-bounce">✨</div>
                    <div className="absolute -bottom-2 -left-2 text-3xl animate-bounce delay-100">⭐</div>
                </div>
            </div>
            
        </div>

        {/* Message */}
        <div className={`mt-24 text-center transition-all duration-1000 delay-500 transform ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
             <h2 className="text-3xl font-extrabold text-white mb-6 drop-shadow-md stroke-black" style={{ textShadow: '2px 2px 0px #0ea5e9' }}>
                獲得 {number} 號!
             </h2>
             <button 
                onClick={onClose}
                className="px-10 py-4 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-black rounded-full shadow-[0_6px_0_#b45309] active:shadow-none active:translate-y-1 transition-all text-xl"
             >
                OK
             </button>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;