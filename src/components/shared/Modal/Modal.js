import styles from "./Modal.module.scss";
import Icons from "../Icons/Icons";

/**
 * Modal component.
 * @param {Object} props
 * @param {Boolean} props.isVisible
 * @param {String} props.position
 * @param {Array} props.children
 * @param {CallableFunction} props.visibilityHandler
 *
 * @component
 * @props isVisible - Set the modal visibility.
 * @props position - Defines the type of positioning that will be applied (absolute, fixed...).
 * @props children - The default react children array.
 * @props visibilityHandler - A callback that closes the modal.
 */
export default function Modal({ id, isVisible, position, children, visibilityHandler }) {
    const scale = !isVisible ? 0 : 1;

    const visibilityStyles = {
        position: isVisible ? position : "absolute",
        transitionDelay: !isVisible ? ".1s" : "0s",
        zIndex: !isVisible ? -1 : 11
    };

    return <div id={id} className={styles.modal} style={visibilityStyles}>
        <div className={styles.modalInternal} style={{ transform: `scale(${scale}, ${scale})` }}>
            {visibilityHandler && <button className={styles.closeButton} onClick={() => {visibilityHandler(false)}}>
                <Icons current="close" />
            </button>}

            {children}
        </div>
    </div>;
};