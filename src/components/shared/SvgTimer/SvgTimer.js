import styles from "./SvgTimer.module.scss";

export default function SvgTimer({ id, digits, style }) {

    const formatTimer = (time) => time < 10 ? `0${time}` : time;

    return <svg className={styles.svgTimer} height="60px" viewBox="0 0 192 60" style={{pointerEvents: "none", ...style}}>
        <defs>
            <linearGradient id={`${id}gradient`} x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 1)" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, .5)" />
            </linearGradient>
        </defs>

        {digits && digits.map((time, idx) => {
            const digitsOffset = [-68, 0, 68];
            const dividersOffset = [-34, 34];

            return <g
                dominantBaseline="hanging"
                textAnchor="middle"
                fill={`url(#${id}gradient)`}
                fontSize="74"
                key={`mainDigit${idx}`}
            >
                {idx > 0 && <text x="50%" y="-8" transform={`translate(${dividersOffset[idx - 1]})`}>:</text>}

                <text x="50%" y="0%" transform={`translate(${digitsOffset[idx]})`}>
                    {formatTimer(time)}
                </text>
            </g>
        })}
    </svg>;
};