import styles from "./OptionsModal.module.scss";

export default function Modal({ isVisible, options, visibilityHandler }) {
    // const [isVisible, setIsVisible] = useState(false);
    const scale = !isVisible ? 0 : 1;

    const visibilityStyles = {
        // transform: `translate(-50%, -50%) scale(${scale}, ${scale})`,
        transitionDelay: !isVisible ? ".11s" : "0s",
        zIndex: !isVisible ? -1 : 1
    };

    return <div className={styles.modal} style={visibilityStyles} onTransitionEnd={(e) => {
        console.log(e.target);
    }}>
        <div className={styles.modalInternal} style={{ transform: `scale(${scale}, ${scale})` }}>
            <button className={styles.closeButton} onClick={() => visibilityHandler(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 50 50">
                    <path fill="white" stroke="white" d="M28.228,23.986L47.092,5.122c1.172-1.171,1.172-3.071,0-4.242c-1.172-1.172-3.07-1.172-4.242,0L23.986,19.744L5.121,0.88
                        c-1.172-1.172-3.07-1.172-4.242,0c-1.172,1.171-1.172,3.071,0,4.242l18.865,18.864L0.879,42.85c-1.172,1.171-1.172,3.071,0,4.242
                        C1.465,47.677,2.233,47.97,3,47.97s1.535-0.293,2.121-0.879l18.865-18.864L42.85,47.091c0.586,0.586,1.354,0.879,2.121,0.879
                        s1.535-0.293,2.121-0.879c1.172-1.171,1.172-3.071,0-4.242L28.228,23.986z"/>
                </svg>
            </button>

            <h3>Options title</h3>

            <form className={styles.optionsForm}>
                {options && options.map(el => {
                    return <p key={el}>el</p>
                })}
            </form>
        </div>
    </div>;
};