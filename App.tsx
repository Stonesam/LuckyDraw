import React, { useState, useCallback, useMemo } from 'react';
import { MachineState } from './types.ts';
import Machine from './components/Machine.tsx';
import ResultModal from './components/ResultModal.tsx';
import { Settings, Users, Hash, X } from 'lucide-react';

// Define the presets based on user request
const CLASS_PRESETS = [
  { name: '1A', max: 26 },
  { name: '1D', max: 23 },
  { name: '4E', max: 32 },
  { name: '5D', max: 21 },
  { name: '6D', max: 22 },
];

const App: React.FC = () => {
  const [gameState, setGameState] = useState<MachineState>(MachineState.IDLE);
  const [resultNumber, setResultNumber] = useState<number | null>(null);
  const [droppedBallColor, setDroppedBallColor] = useState<string>('bg-blue-400');
  
  // Settings State
  const [maxNumber, setMaxNumber] = useState<number>(20);
  const [showSettings, setShowSettings] = useState<boolean>(false); // Default hidden
  
  // Track drawn numbers
  const [history, setHistory] = useState<number[]>([]);

  // Calculate available numbers based on dynamic maxNumber
  const availableNumbers = useMemo(() => {
    // Generate numbers from 1 to maxNumber
    const all = Array.from({ length: maxNumber }, (_, i) => i + 1);
    return all.filter(n => !history.includes(n));
  }, [history, maxNumber]);

  const isGameOver = availableNumbers.length === 0;

  const handleStart = useCallback(() => {
    if (gameState !== MachineState.IDLE || isGameOver) return;

    // 1. Pick a random number from available ones
    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    const selectedNumber = availableNumbers[randomIndex];

    // 2. Start Cranking
    setGameState(MachineState.CRANKING);
    setResultNumber(selectedNumber);

    // Pick a random color for the dropping ball
    const colors = [
      'bg-red-500', 'bg-blue-500', 'bg-green-500', 
      'bg-purple-500', 'bg-yellow-400', 'bg-pink-500'
    ];
    setDroppedBallColor(colors[Math.floor(Math.random() * colors.length)]);

    // 3. Animation Sequence
    setTimeout(() => {
      setGameState(MachineState.DROPPING);
      
      setTimeout(() => {
        setGameState(MachineState.OPENING);
        
        setTimeout(() => {
            setGameState(MachineState.RESULT);
            // Add to history when result is revealed
            setHistory(prev => [...prev, selectedNumber]);
        }, 600);

      }, 800);
    }, 1200);
  }, [gameState, availableNumbers, isGameOver]);

  const handleCloseModal = useCallback(() => {
    setGameState(MachineState.IDLE);
    setResultNumber(null);
  }, []);

  const handleResetGame = useCallback(() => {
    setHistory([]);
    setGameState(MachineState.IDLE);
    setResultNumber(null);
  }, []);

  // Handle changing the max number (Manual or Preset)
  const handleSetRange = (newMax: number) => {
    if (newMax < 1) return;
    if (window.confirm(`切換範圍至 ${newMax} 將會重置目前的抽籤紀錄，確定嗎？`)) {
      setMaxNumber(newMax);
      handleResetGame();
      setShowSettings(false); // Close settings after selection
    }
  };

  // Quick set without confirm if history is empty
  const quickSetRange = (newMax: number) => {
    if (history.length === 0) {
      setMaxNumber(newMax);
      setShowSettings(false); // Close settings after selection
    } else {
      handleSetRange(newMax);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 pb-20">
      
      <header className="mb-6 mt-4 text-center relative z-20">
        <div 
            onClick={() => setShowSettings(!showSettings)}
            className="inline-block bg-white/80 backdrop-blur-sm px-8 py-3 rounded-3xl border-4 border-blue-300 shadow-xl transform -rotate-2 cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 hover:border-blue-400 group select-none"
            title="點擊設定範圍 (Click to Settings)"
        >
          <h1 className="text-3xl md:text-5xl font-extrabold text-blue-500 drop-shadow-sm tracking-wider mb-1 relative flex items-center justify-center gap-2">
            幸運扭蛋機
            <Settings size={24} className="text-blue-300 opacity-0 group-hover:opacity-100 transition-opacity absolute -right-8" />
          </h1>
          <p className="text-blue-400 font-bold text-sm md:text-lg flex items-center justify-center gap-2">
            <span>✨</span> 
            {maxNumber === 20 ? 'Lucky Number 1-20' : `Range: 1 - ${maxNumber}`}
            <span>✨</span>
          </p>
          <div className="text-[10px] text-blue-300 mt-1 font-bold opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-4 left-0 w-full text-center">
            點擊切換班級/範圍
          </div>
        </div>
      </header>

      {/* Settings Panel (Toggle via Title) */}
      <div className={`w-full max-w-lg z-20 transition-all duration-300 ease-out overflow-hidden ${showSettings ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0 mb-0'}`}>
        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 border-2 border-blue-200 shadow-lg animate-drop mx-1">
            <div className="flex justify-between items-center mb-3 pb-2 border-b border-blue-100">
                 <label className="flex items-center gap-2 text-blue-800 font-bold text-sm">
                    <Users size={16} /> 選擇班級或範圍 (Settings):
                </label>
                <button 
                    onClick={() => setShowSettings(false)}
                    className="text-blue-400 hover:text-blue-600 p-1 rounded-full hover:bg-blue-50 transition"
                >
                    <X size={18} />
                </button>
            </div>

            {/* Class Presets */}
            <div className="mb-4">
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {CLASS_PRESETS.map((preset) => (
                        <button
                            key={preset.name}
                            onClick={() => quickSetRange(preset.max)}
                            className={`py-2 px-1 rounded-lg font-bold text-sm transition border-b-4 active:border-b-0 active:translate-y-1 ${maxNumber === preset.max ? 'bg-blue-500 text-white border-blue-700' : 'bg-blue-100 text-blue-600 border-blue-200 hover:bg-blue-200'}`}
                        >
                            {preset.name}
                            <span className="block text-[10px] opacity-80">Max: {preset.max}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Custom Input */}
            <div>
                <label className="flex items-center gap-2 text-blue-800 font-bold mb-2 text-sm">
                    <Hash size={16} /> 自訂最大數字 (Custom Max):
                </label>
                <div className="flex gap-2">
                    <input 
                        type="number" 
                        min="1"
                        max="999"
                        value={maxNumber}
                        onChange={(e) => {
                            setMaxNumber(parseInt(e.target.value) || 0);
                        }}
                        onBlur={(e) => {
                            const val = parseInt(e.target.value);
                            if (val > 0 && val !== maxNumber) {
                                    quickSetRange(val);
                            }
                        }}
                        className="flex-1 px-4 py-2 rounded-lg border-2 border-blue-200 bg-blue-50 focus:outline-none focus:border-blue-400 text-blue-800 font-bold"
                    />
                    <button 
                        onClick={() => handleResetGame()}
                        className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg font-bold border-2 border-gray-200 hover:bg-gray-200 text-sm whitespace-nowrap"
                    >
                        重置紀錄
                    </button>
                </div>
            </div>
        </div>
      </div>

      <main className="relative w-full max-w-lg flex flex-col items-center z-10">
        <Machine 
          state={gameState} 
          onStart={handleStart} 
          droppedBallColor={droppedBallColor}
          disabled={isGameOver}
        />
        
        {isGameOver && (
             <div className="mt-4 px-6 py-2 bg-red-100 text-red-600 rounded-full font-bold border-2 border-red-200 animate-bounce">
                {maxNumber} 個號碼已全部抽完！
             </div>
        )}
      </main>

      {/* History Section */}
      <section className="relative z-20 mt-12 w-full max-w-2xl bg-white/60 backdrop-blur-md rounded-3xl p-6 border-4 border-blue-200 shadow-lg">
        <div className="flex justify-between items-center mb-4 border-b-2 border-blue-100 pb-2">
            <h3 className="text-xl font-bold text-blue-600 flex items-center gap-2">
                 已獲得 (Collected) {history.length}/{maxNumber}
            </h3>
            {history.length > 0 && (
                <button 
                    onClick={handleResetGame}
                    className="cursor-pointer bg-blue-100 hover:bg-blue-200 text-blue-600 px-4 py-2 rounded-full font-bold transition shadow-sm active:scale-95 border-2 border-blue-200"
                >
                    重置 Reset
                </button>
            )}
        </div>
        
        {history.length === 0 ? (
            <div className="text-center text-gray-400 py-8 font-bold">
                還沒有扭蛋喔，快去抽一顆吧！
            </div>
        ) : (
            <div className="flex flex-wrap gap-3 justify-center">
                {history.sort((a,b) => a-b).map((num) => (
                    <div key={num} className="w-10 h-10 rounded-full bg-yellow-300 text-yellow-800 border-2 border-yellow-500 flex items-center justify-center font-black shadow-sm transform hover:scale-110 transition cursor-default">
                        {num}
                    </div>
                ))}
            </div>
        )}
      </section>

      {gameState === MachineState.RESULT && resultNumber !== null && (
        <ResultModal 
          number={resultNumber} 
          color={droppedBallColor}
          maxNumber={maxNumber}
          onClose={handleCloseModal} 
        />
      )}
      
      <footer className="mt-8 text-blue-400/80 font-bold text-sm relative z-10">
         
      </footer>
    </div>
  );
};

export default App;