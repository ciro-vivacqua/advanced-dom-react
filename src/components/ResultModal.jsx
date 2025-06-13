import { useImperativeHandle, useRef } from "react";

export default function ResultModal({ targetTime, ref, remainingTime, onClose }) {
    const dialog = useRef();

    const userLost = remainingTime <= 0;
    const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
    const score = Math.round((remainingTime/targetTime)/10)

    // Use useImperativeHandle to expose methods to the parent component
    // This allows the parent to control the dialog's open and close actions
    useImperativeHandle(ref, () => ({
        open() {
            dialog.current.showModal();
        },
        close() {
            dialog.current.close();
        }
    }));

    return (
        // Without the onClose prop, when using the esc key, the function will not be called
        <dialog ref={dialog} className="result-modal" onClose={onClose}>
            <h2>
                {userLost ? 'You lost!' : `Your score is: ${score}%`}
            </h2>
            <p>
                The target time was <strong>{targetTime} second{targetTime > 1 ? 's' : ''}</strong>.
            </p>
            <p>You stopped the timer with <strong>{formattedRemainingTime} seconds left.</strong></p>
            <form method="dialog">
                <button onClick={onClose}>Close</button>
            </form>
        </dialog>
    );
}