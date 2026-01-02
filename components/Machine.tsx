import React, { useMemo } from 'react';
import { MachineState, Ball } from '../types';

interface MachineProps {
  state: MachineState;
  onStart: () => void;
  droppedBallColor: string;
  disabled?: boolean;
}

const Machine: React.FC<MachineProps> = ({ state, onStart, droppedBallColor, disabled }) => {
  // Generate random static balls for the container - Increased count significantly
  const staticBalls = useMemo<Ball[]>(() => {
    const pokeColors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-yellow-400', 'bg-pink-500'];
    
    // Increased from 12 to 28 for a fuller look
    return Array.from({ length: 28 }).map((_, i) => ({
      id: i,
      color: pokeColors[i % pokeColors.length],
      x: 5 + Math.random() * 85, // % position
      y: 15 + Math.random() * 65, // % position
      rotation: Math.random() * 360,
    }));
  }, []);

  // Animation classes
  const isShaking = state === MachineState.CRANKING ? 'animate-shake' : '';
  const isCranking = state === MachineState.CRANKING ? 'rotate-[360deg] transition-transform duration-1000 ease-in-out' : 'rotate-0';
  
  // Helper to render a mini spirit ball
  const renderSpiritBall = (colorClass: string, extraClasses: string = "", style: React.CSSProperties = {}) => (
    <div 
        className={`relative w-12 h-12 rounded-full border-2 border-black/15 shadow-sm overflow-hidden bg-white ${extraClasses}`}
        style={style}
    >
         {/* Top Half */}
         <div className={`absolute top-0 w-full h-[50%] ${colorClass} border-b-2 border-slate-800`}></div>
         {/* Center Button */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white border-2 border-slate-800 rounded-full z-10"></div>
         {/* Shine */}
         <div className="absolute top-1 left-2 w-3 h-1.5 bg-white/40 rounded-full rotate-[-20deg] z-20"></div>
    </div>
  );

  return (
    <div className={`relative flex flex-col items-center scale-90 md:scale-100 transition-transform`}>
      
      {/* --- Machine Top Decoration (Blue Cat/Bear Style) --- */}
      <div className={`relative z-10 ${isShaking}`}>
        {/* Ears */}
        <div className="absolute -top-4 left-6 w-16 h-16 bg-blue-400 rounded-full border-4 border-blue-500 z-0"></div>
        <div className="absolute -top-4 right-6 w-16 h-16 bg-blue-400 rounded-full border-4 border-blue-500 z-0"></div>
        
        {/* Main Lid */}
        <div className="w-64 h-24 bg-blue-400 rounded-t-full relative z-10 border-4 border-b-0 border-blue-500 shadow-lg flex justify-center items-center overflow-hidden">
            <div className="absolute bottom-2 w-full flex justify-center gap-12 opacity-30">
               <div className="w-4 h-4 bg-white rounded-full"></div>
               <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
            <div className="bg-blue-300 px-4 py-1 rounded-full border-2 border-blue-200">
                <span className="text-white font-black tracking-widest text-sm drop-shadow-md">LUCKY</span>
            </div>
        </div>
      </div>

      {/* --- Glass Container --- */}
      <div className={`w-80 h-72 bg-sky-50/40 rounded-3xl border-4 border-blue-200 relative z-20 backdrop-blur-sm overflow-hidden shadow-[inset_0_0_20px_rgba(255,255,255,0.6)] ${isShaking}`}>
        
        {/* Shine effects on glass */}
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-white/40 to-transparent pointer-events-none z-30"></div>
        <div className="absolute top-6 right-8 w-10 h-20 bg-white/50 rounded-full -rotate-12 z-30 blur-md"></div>
        <div className="absolute bottom-6 left-8 w-6 h-6 bg-white/50 rounded-full z-30 blur-sm"></div>

        {/* Balls Inside */}
        <div className="absolute inset-0 z-10 p-4">
             {staticBalls.map((ball) => (
                <div key={ball.id} className="absolute" style={{
                    left: `${ball.x}%`,
                    top: `${ball.y}%`,
                    transform: `scale(0.85)`, // Slightly smaller to fit more
                    transition: 'top 0.5s ease, transform 0.5s ease',
                    zIndex: Math.floor(ball.y) // Simple depth sorting based on Y
                }}>
                    {renderSpiritBall(ball.color, "", { transform: `rotate(${ball.rotation}deg)` })}
                </div>
             ))}
             
             {/* The "Active" ball that disappears when cranking starts */}
             {state !== MachineState.CRANKING && state !== MachineState.DROPPING && state !== MachineState.OPENING && state !== MachineState.RESULT && !disabled && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30">
                    {renderSpiritBall(droppedBallColor, "shadow-lg")}
                </div>
             )}
        </div>
      </div>

      {/* --- Machine Base / Controls --- */}
      <div className="w-72 h-56 bg-blue-400 -mt-8 rounded-b-[3rem] border-4 border-blue-500 relative z-30 shadow-2xl flex flex-col items-center">
        
        {/* Control Panel Plate */}
        <div className="w-56 h-32 bg-blue-300 mt-10 rounded-2xl border-2 border-blue-400/50 flex items-center justify-center relative shadow-inner">
            
            {/* The Crank / Knob */}
            <button 
                onClick={onStart}
                disabled={state !== MachineState.IDLE || disabled}
                className={`relative group active:scale-95 transition-all outline-none ${state !== MachineState.IDLE || disabled ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'}`}
                aria-label="Spin the machine"
            >
                {/* Knob Base */}
                <div className="w-24 h-24 rounded-full bg-white border-b-8 border-blue-100 shadow-xl flex items-center justify-center z-10 relative">
                     {/* Rotating part */}
                     <div className={`w-full h-full rounded-full flex items-center justify-center ${isCranking}`}>
                         <div className="absolute w-24 h-8 bg-blue-200 rounded-full"></div>
                         <div className="absolute w-8 h-24 bg-blue-200 rounded-full"></div>
                         <div className="w-16 h-16 bg-blue-100 rounded-full border-4 border-blue-200 z-10 flex items-center justify-center">
                            <span className="text-blue-400 text-xs font-bold">
                                {disabled ? "EMPTY" : "PUSH"}
                            </span>
                         </div>
                     </div>
                </div>
                
                {/* Pulse effect if Idle */}
                {state === MachineState.IDLE && !disabled && (
                     <div className="absolute inset-0 bg-white/60 rounded-full animate-ping z-0"></div>
                )}
            </button>
            
            {/* Price Tag */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-yellow-300 text-yellow-800 text-xs font-bold px-2 py-1 rounded-full shadow-sm -rotate-12 border border-yellow-400">
                100円
            </div>
        </div>

        {/* Exit Chute */}
        <div className="absolute bottom-5 w-36 h-20 bg-blue-800 rounded-t-3xl overflow-hidden border-4 border-blue-900 shadow-[inset_0_4px_8px_rgba(0,0,0,0.3)] flex justify-center">
             
             {/* Dropping Ball Animation */}
             {state === MachineState.DROPPING && (
                 <div className="animate-drop relative top-4">
                     {renderSpiritBall(droppedBallColor, "w-16 h-16 border-2")}
                 </div>
             )}
        </div>
      </div>
      
      {/* Feet */}
      <div className="absolute -bottom-2 flex w-60 justify-between px-2 z-0">
          <div className="w-10 h-6 bg-blue-600 rounded-b-xl"></div>
          <div className="w-10 h-6 bg-blue-600 rounded-b-xl"></div>
      </div>

    </div>
  );
};

export default Machine;