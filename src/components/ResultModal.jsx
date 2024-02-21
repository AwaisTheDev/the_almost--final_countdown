import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const ResultModal = forwardRef(function ResultModal({ onReset, timeRemaining, targetTime }, ref) {

    let result = '';

    const userLost = (timeRemaining <= 0) ? true : false;
    const userScrore = Math.round((1 - timeRemaining / (targetTime * 1000)) * 100);

    const modal = useRef();
    useImperativeHandle(ref, () => {
        return {
            open() {
                modal.current.showModal();
            }
        }
    })

    return createPortal(
        <dialog ref={modal} className="result-modal">
            {userLost && <h2>You Lost</h2>}
            {!userLost && <h2>You Won!</h2>}
            {!userLost && <p>You score was: {userScrore}</p>}

            <p>You target time was <strong>{targetTime} seconds</strong></p>
            <p>You stopped the time <st>{timeRemaining / 1000} seconds left</st></p>
            <form method="dialog" onSubmit={onReset}>
                <button>Close</button>
            </form>
        </dialog >,
        document.querySelector('#modal')
    );
})

export default ResultModal;