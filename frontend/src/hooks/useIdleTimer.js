import { useState, useEffect } from 'react';

const useIdleTimer = (timeout = 60000) => { // Default 1 minute
    const [isIdle, setIsIdle] = useState(false);

    useEffect(() => {
        let timer;

        const resetTimer = () => {
            setIsIdle(false);
            clearTimeout(timer);
            timer = setTimeout(() => setIsIdle(true), timeout);
        };

        window.addEventListener('mousemove', resetTimer);
        window.addEventListener('keypress', resetTimer);
        window.addEventListener('scroll', resetTimer);
        window.addEventListener('click', resetTimer);

        resetTimer(); // Init

        return () => {
            window.removeEventListener('mousemove', resetTimer);
            window.removeEventListener('keypress', resetTimer);
            window.removeEventListener('scroll', resetTimer);
            window.removeEventListener('click', resetTimer);
            clearTimeout(timer);
        };
    }, [timeout]);

    return isIdle;
};

export default useIdleTimer;
