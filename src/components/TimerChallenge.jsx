import {  useState, useRef } from 'react';
import ResultModal from './ResultModal';

export default function TimerChallenge({ tittle, targetTime }) {

    const [remainingTime, setRemainingTime] = useState(targetTime*1000);
    const timerRef = useRef();
    const dialog = useRef();
    const timerIsActive = remainingTime > 0 && remainingTime < targetTime * 1000;

    if(remainingTime <= 0) {
        clearInterval(timerRef.current);
        dialog.current.open();
    }

    function handleStart(){
        timerRef.current = setInterval(() => {
            setRemainingTime(prevRemainingTime => prevRemainingTime - 10)
        }, 10);
    }

    function handleStop() {
        clearInterval(timerRef.current);
        dialog.current.open();
    }

    function handleClose() {
        dialog.current.close();
        setRemainingTime(targetTime * 1000);
    }

    return (
        <>
            <ResultModal 
                targetTime={targetTime} 
                remainingTime={remainingTime} 
                ref={dialog} 
                onClose={handleClose}
            />
            <section className="challenge">
                <h2>{ tittle }</h2>
                <p className="challenge-time">
                    {targetTime} second{targetTime > 1? 's' : ''}
                </p>
                <p>
                    <button onClick={timerIsActive ? handleStop : handleStart}>
                        {timerIsActive ? 'Stop' : 'Start'} Challenge
                    </button>
                </p>
                <p className={timerIsActive ? 'active' : undefined}>
                    {timerIsActive ? 'Time is running...' : 'Timer inactive'}
                </p>
            </section>
        </>
    );

}