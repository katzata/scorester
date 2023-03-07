// import { useEffect } from "react";
import styles from "./SvgTimer.module.scss";

/**
 * Component displaying a properly formatted svg clock.
 * 
 * @param {Object} props
 * @param {String} props.id
 * @param {Number} props.digits
 * @param {Number | String} props.style
 * 
 * @component
 * @param {String} props.id Used to set the individual gradient id.
 * @param {Number} props.digits A timer in seconds.
 * @param {Number | String} props.style Set the desired font size.
 */
export default function SvgTimer({ id, digits, fontSize, style }) {
    const seconds = parseInt((digits / 1000) % 60);
    const minutes = parseInt((digits / (1000 * 60)) % 60);
    const hours = parseInt((digits / (1000* 60 * 60)) % 24);
    const formatTimer = (time) => Number(time) < 10 ? `0${time}` : time;

    return <svg id={id} className={styles.svgTimer} style={style || {}} height="60px" viewBox="0 0 210 60">
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
                fontSize={ fontSize ? fontSize : "74"}
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