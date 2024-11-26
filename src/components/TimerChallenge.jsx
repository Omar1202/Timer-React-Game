import { useRef, useState } from "react"
import ResultModal from "./ResultModal";

export default function TimerChallenge({
    title,
    targetTime,
    ...props
}) {
    const timer = useRef();
    const modal = useRef();

    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

    if (timeRemaining <= 0) {
        clearInterval(timer.current);
        modal
            .current
            .open();
    }

    function handleReset() {
        setTimeRemaining(targetTime * 1000);
    }

    function handleStart() {
        timer.current = setInterval(() => {
            setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 10);
        }, 10)
    }

    function handleStop() {
        modal
            .current
            .open();
        clearInterval(timer.current);
    }

    return (
        <> 
            <ResultModal ref = {
                modal
            }
            remainingTime = {
                timeRemaining
            }
            targetTime = {
                targetTime
            }
            onReset={handleReset}
            /> 
            <section className="challenge">
                <h2>{title}</h2>
                <p className="challenge-time">
                    {targetTime}
                    second{
                        targetTime > 1
                            ? 's'
                            : ''
                    }
                </p>
                <p>
                    <button
                        onClick={timerIsActive
                            ? handleStop
                            : handleStart}>
                        {
                            timerIsActive
                                ? 'Stop'
                                : 'Start'
                        }
                        Challenge
                    </button>
                </p>
                <p
                    className={timerIsActive
                        ? 'active'
                        : undefined}>
                    {
                        timerIsActive
                            ? 'Time is Running'
                            : 'Timer Inactive'
                    }
                </p>
            </section>
        </>
    )
}