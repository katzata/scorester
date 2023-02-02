import styles from "./SvgTimer.module.scss";

/**
 * Component displaying a properly formated svg clock.
 * 
 * @param {Object} props
 * @param {String} props.id
 * @param {Array.<number>} props.digits
 * @param {Object} props.style
 * 
 * @component
 * @param {String} props.id Used to set the individual gradient id.
 * @param {Array.<number>} props.digits The three digits that a digital clock consists of.
 * @param {Object} props.style Used to add additional styles to the component.
 */
export default function SvgTimer({ id, digits, style }) {
    const formatTimer = (time) => Number(time) < 10 ? `0${time}` : time;
    const hours = Math.floor(digits / 3600);
    const minutes = Math.floor(digits / 60);
    const seconds = digits - minutes * 60;

    return <svg className={styles.svgTimer} height="60px" viewBox="0 0 210 60" style={{pointerEvents: "none", ...style}}>
        <defs>
            <linearGradient id={`${id}gradient`} x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 1)" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, .5)" />
            </linearGradient>
        </defs>

        {[hours, minutes, seconds].map((time, idx) => {
            const digitsOffset = [-68, 0, 68];
            const dividersOffset = [-34, 34];

            return <g
                dominantBaseline="center"
                textAnchor="middle"
                fill={`url(#${id}gradient)`}
                fontSize={ style && style.fontSize ? style.fontSize : "74"}
                key={`mainDigit${idx}`}
            >
                {idx > 0 && <text x="50%" y="78%" transform={`translate(${dividersOffset[idx - 1]})`}>:</text>}
                <text x="50%" y="90%" transform={`translate(${digitsOffset[idx]})`}>
                    {formatTimer(time)}
                </text>
            </g>
        })}
    </svg>;
};