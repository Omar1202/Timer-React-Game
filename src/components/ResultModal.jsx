import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const ResultModal = forwardRef(function ResultModal({
    remainingTime,
    targetTime,
    onReset
}, ref) {
    const dialog = useRef();

    const result = remainingTime <= 0
        ? 'Lost'
        : 'Won';
    const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

    useImperativeHandle(ref = ref, () => {
        return {
            open() {
                dialog
                    .current
                    .showModal();
            }
        }
    })
    //Esto permite colocar el código generado en el DOM dentro de un espacio definido, en este caso el div#modal
    return createPortal(
        <dialog ref={dialog} className="result-modal" onClose={onReset}>
            <h2>You {
                    result === 'Won'
                        ? 'Won, Your score is:' + score
                        : 'Lost'
                }</h2>
            <p>
                The target time was <strong>{targetTime} seconds.</strong>
            </p>
            <p>You stopped the timer with <strong>{formattedRemainingTime} seconds left.</strong>
            </p>
            <form method="dialog">
                <button>Close</button>
            </form>
        </dialog>,
        document.getElementById('modal')
    )
});

export default ResultModal;