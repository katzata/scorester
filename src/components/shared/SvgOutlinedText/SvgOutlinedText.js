/**
 * A component that renders an outlined svg text.
 * The width, height, text color and outline can be modified.
 * @param {Object} props
 * @param {String} props.text
 * @param {Number|String} props.width
 * @param {Number|String} props.height
 * 
 * @component
 * @param props.text The text that will be visualised.
 * @param props.width The desired svg width !!!WILL BE CONVERTED TO PIXELS!!!.
 * @param props.height The desired svg height !!!WILL BE CONVERTED TO PIXELS!!!. 
 */
export default function SvgOutlinedText({ text, width, height, strokeWidth, textColor, outlineColor }) {
    return <svg width={`${width}px`} height={`${height}px`} viewBox={`0 0 ${width} ${height}`}>
        <use href={`#${text}`} stroke={outlineColor || "rgb(180, 0, 0)"} strokeWidth={strokeWidth || "3"}></use>
        <text id={text} x="48%" y="58%" fill={textColor || "white"} dominantBaseline="middle" textAnchor="middle">{text}</text>
    </svg>;
};