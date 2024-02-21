import { useState, useRef } from "react"
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {

    const [remainingTime, setRemainingTime] = useState(targetTime * 1000);
    const isTimerActive = remainingTime > 0 && remainingTime < targetTime * 1000;

    let timer = useRef();
    let modal = useRef();

    if (remainingTime <= 0) {
        clearInterval(timer.current);
        modal.current.open();
    }


    function resetTimer() {
        setRemainingTime(targetTime * 1000);
    }
    function handelStart() {
        timer.current = setInterval(() => {
            setRemainingTime(prevRemainingTime => prevRemainingTime - 10);
        }, 10)
    }

    function handelStop() {
        clearInterval(timer.current);
        modal.current.open();
    }


    return (
        <>
            <ResultModal onReset={resetTimer} ref={modal} timeRemaining={remainingTime} targetTime={targetTime}></ResultModal>
            <section className="challenge" >
                <h2>{title}</h2>
                <p className="challenge-time">
                    {targetTime} second{targetTime > 1 ? 's' : ''}
                </p>
                <p>
                    <button onClick={isTimerActive ? handelStop : handelStart}>{isTimerActive ? 'Stop' : 'Start'} Challenge</button>
                </p>
                <p className={isTimerActive ? 'active' : undefined}>
                    {isTimerActive ? 'Time is running...' : 'Timer Inactive!'}
                </p>
            </section >
        </>
    )
}