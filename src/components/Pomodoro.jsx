import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

export default function Pomodoro({ initialSeconds, onComplete }) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(s => s - 1);
      }, 1000);
    } else if (seconds === 0 && isActive) {
      setIsActive(false);
      if (onComplete) onComplete();
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, onComplete]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-indigo-900 text-white rounded-2xl p-6 text-center shadow-lg mb-6">
      <h3 className="text-indigo-200 text-sm uppercase tracking-wider mb-2">Focus Timer</h3>
      <div className="text-6xl font-mono font-bold mb-6 tracking-widest">
        {formatTime(seconds)}
      </div>
      <div className="flex justify-center gap-4">
        <button 
          onClick={() => setIsActive(!isActive)}
          className="bg-white text-indigo-900 px-6 py-2 rounded-full font-bold flex items-center gap-2 hover:bg-indigo-50 transition"
        >
          {isActive ? <><Pause size={18}/> Pause</> : <><Play size={18}/> Start</>}
        </button>
        <button 
          onClick={() => { setIsActive(false); setSeconds(initialSeconds); }}
          className="bg-indigo-800 text-indigo-200 p-2 rounded-full hover:bg-indigo-700 transition"
        >
          <RotateCcw size={18}/>
        </button>
      </div>
    </div>
  );
}