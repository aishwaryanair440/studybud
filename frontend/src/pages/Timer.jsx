import { useState, useEffect, useRef } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Play, Pause, RotateCcw, Monitor, MousePointer } from 'lucide-react';
import usePageVisibility from '../hooks/usePageVisibility';
import useIdleTimer from '../hooks/useIdleTimer';
import api from '../utils/api';

const Timer = () => {
    const [secondsLeft, setSecondsLeft] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState('focus'); // focus, break
    const [focusScore, setFocusScore] = useState(100);
    const [pauses, setPauses] = useState(0);
    const [tabSwitches, setTabSwitches] = useState(0);
    const [idleTime, setIdleTime] = useState(0);

    // Smart Focus Detection
    const isPageVisible = usePageVisibility();
    const isIdle = useIdleTimer(10000); // 10s idle check
    const startTimeRef = useRef(null);

    // Audio
    const alarmSound = new Audio('/alarm.mp3'); // Assuming in public folder

    useEffect(() => {
        let interval = null;
        if (isActive && secondsLeft > 0) {
            interval = setInterval(() => {
                setSecondsLeft(secondsLeft => secondsLeft - 1);

                // Idle detection punishment
                if (isIdle && mode === 'focus') {
                    setIdleTime(prev => prev + 1);
                    if (focusScore > 0) setFocusScore(prev => Math.max(0, prev - 0.1));
                }

            }, 1000);
        } else if (secondsLeft === 0) {
            clearInterval(interval);
            setIsActive(false);
            if (mode === 'focus') {
                saveSession();
                alarmSound.play().catch(e => console.log('Audio play failed', e));
                alert("Session Completed! Take a break.");
            }
        }
        return () => clearInterval(interval);
    }, [isActive, secondsLeft, isIdle, mode]);

    // Focus Drop Detection
    useEffect(() => {
        if (isActive && mode === 'focus') {
            if (!isPageVisible) {
                setTabSwitches(prev => prev + 1);
                setFocusScore(prev => Math.max(0, prev - 5));
            }
        }
    }, [isPageVisible]);

    const toggleTimer = () => {
        if (!isActive) {
            // Starting/Resuming
            setIsActive(true);
            if (!startTimeRef.current) startTimeRef.current = new Date();
        } else {
            // Pausing
            setIsActive(false);
            setPauses(prev => prev + 1);
            if (mode === 'focus') {
                setFocusScore(prev => Math.max(0, prev - 2));
            }
        }
    };

    const resetTimer = () => {
        setIsActive(false);
        setSecondsLeft(mode === 'focus' ? 25 * 60 : 5 * 60);
        setFocusScore(100);
        setPauses(0);
        setTabSwitches(0);
        setIdleTime(0);
        startTimeRef.current = null;
    };

    const switchMode = (newMode) => {
        setMode(newMode);
        setIsActive(false);
        setSecondsLeft(newMode === 'focus' ? 25 * 60 : 5 * 60);
        startTimeRef.current = null;
    };

    const saveSession = async () => {
        try {
            const endTime = new Date();
            const duration = (25 * 60 - secondsLeft) / 60; // In minutes, roughly

            await api.post('/sessions', {
                startTime: startTimeRef.current || new Date(),
                endTime,
                duration: 25, // Assuming full completion
                type: 'focus',
                focusScore: Math.round(focusScore),
                pauses,
                tabSwitches,
                idleTime
            });
        } catch (error) {
            console.error('Failed to save session', error);
        }
    };

    const percentage = Math.round((secondsLeft / (mode === 'focus' ? 25 * 60 : 5 * 60)) * 100);
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white dark:bg-secondary-800 rounded-2xl shadow-xl">
            <div className="flex justify-center space-x-4 mb-8">
                <button
                    onClick={() => switchMode('focus')}
                    className={`px-6 py-2 rounded-full font-medium transition-colors ${mode === 'focus' ? 'bg-primary-100 text-primary-700' : 'text-secondary-500 hover:bg-secondary-100 dark:text-secondary-400 dark:hover:bg-secondary-700'}`}
                >
                    Focus
                </button>
                <button
                    onClick={() => switchMode('break')}
                    className={`px-6 py-2 rounded-full font-medium transition-colors ${mode === 'break' ? 'bg-green-100 text-green-700' : 'text-secondary-500 hover:bg-secondary-100 dark:text-secondary-400 dark:hover:bg-secondary-700'}`}
                >
                    Short Break
                </button>
            </div>

            <div className="w-64 h-64 mx-auto mb-8">
                <CircularProgressbar
                    value={percentage}
                    text={`${minutes}:${seconds < 10 ? '0' + seconds : seconds}`}
                    styles={buildStyles({
                        textColor: mode === 'focus' ? '#0ea5e9' : '#10b981',
                        pathColor: mode === 'focus' ? '#0ea5e9' : '#10b981',
                        trailColor: '#e2e8f0',
                    })}
                />
            </div>

            <div className="flex justify-center space-x-6 mb-8">
                <button
                    onClick={toggleTimer}
                    className="p-4 bg-primary-600 rounded-full text-white hover:bg-primary-700 transition-colors shadow-lg"
                >
                    {isActive ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
                </button>
                <button
                    onClick={resetTimer}
                    className="p-4 bg-secondary-200 rounded-full text-secondary-600 hover:bg-secondary-300 transition-colors"
                >
                    <RotateCcw size={32} />
                </button>
            </div>

            {mode === 'focus' && (
                <div className="grid grid-cols-2 gap-4 bg-secondary-50 dark:bg-secondary-700 p-4 rounded-xl">
                    <div className="text-center">
                        <p className="text-sm text-secondary-500 dark:text-secondary-400">Focus Score</p>
                        <p className={`text-2xl font-bold ${focusScore > 80 ? 'text-green-500' : focusScore > 50 ? 'text-yellow-500' : 'text-red-500'}`}>
                            {Math.round(focusScore)}
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="flex items-center justify-center space-x-2 text-sm text-secondary-500 dark:text-secondary-400 mb-1">
                            <Monitor size={16} />
                            <span>Distractions</span>
                        </div>
                        <p className="text-xl font-semibold dark:text-white">{tabSwitches}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Timer;
