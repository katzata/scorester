import styles from "./Icons.module.scss";

/**
 * 
 * @param {Object} props
 * @param {String} props.current
 * @param {Number | String} props.size
 * 
 * @props current - The icon name.
 * @props size - The icon size (all icons will have equal sides).
 */
export default function Icons({ current, size }) {
    const icons = {
        gameTimer: (
            <svg id="gameTimer" className={styles.timerIcon} width="1.2rem" height="1.2rem" xmlns="http://www.w3.org/2000/svg" viewBox="2 2 50 50">
                <path d="m44.4699707 18.7250366h-20.0199585c-3.0500488 0-5.5300293 2.4899902-5.5300293 5.539978v20.0100098c0 3.0499878 2.4799805 5.539978 5.5300293 5.539978h20.0199585c3.0500488 0 5.5300293-2.4899902 5.5300293-5.539978v-20.0100098c0-3.0499877-2.4799805-5.539978-5.5300293-5.539978zm-15.8999634 13.2799683c-2.0100098 0-3.6400146-1.6300049-3.6400146-3.6300049 0-2.0099487 1.6300049-3.6399536 3.6400146-3.6399536 2 0 3.6300049 1.6300049 3.6300049 3.6399536 0 2-1.6300049 3.6300049-3.6300049 3.6300049zm11.7799683 11.790039c-2 0-3.6300049-1.6300049-3.6300049-3.6300049 0-2.0100098 1.6300049-3.6400146 3.6300049-3.6400146 2.0100098 0 3.6300049 1.6300049 3.6300049 3.6400146 0 2.0000001-1.6199951 3.6300049-3.6300049 3.6300049z" fill="#ffffff" />
                <path d="m24.4500122 16.7250366h8.6300049v-9.0100097c0-3.0499878-2.4800415-5.5300293-5.5300293-5.5300293h-20.0200195c-3.0499878 0-5.5299683 2.4800415-5.5299683 5.5300293v20.0200195c0 3.0499878 2.4799805 5.5299683 5.5299683 5.5299683h9.3900146v-9c0-4.1599732 3.3800049-7.5399781 7.5300293-7.5399781zm-1.0100098-8.5300293c2 0 3.6300049 1.6300049 3.6300049 3.6300049 0 2.0100098-1.6300049 3.6300049-3.6300049 3.6300049-2.0100098 0-3.6400146-1.6199951-3.6400146-3.6300049 0-2 1.6300049-3.6300049 3.6400146-3.6300049zm-11.790039 19.0500489c-2.0099487 0-3.6399536-1.6200562-3.6399536-3.6300049 0-2.0100098 1.6300049-3.6300049 3.6399536-3.6300049 2 0 3.6300049 1.6199951 3.6300049 3.6300049 0 2.0099487-1.6300049 3.6300049-3.6300049 3.6300049zm0-11.7900391c-2.0099487 0-3.6399536-1.6199951-3.6399536-3.6300049 0-2 1.6300049-3.6300049 3.6399536-3.6300049 2 0 3.6300049 1.6300049 3.6300049 3.6300049 0 2.0100098-1.6300049 3.6300049-3.6300049 3.6300049z" fill="#ffffff" />
            </svg>
        ),
        userTimer: (
            <svg id="userTimer" className={styles.timerIcon} width="1rem" height="1rem" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <circle cx="50%" cy="50%" r="240" fill="white"/>
                <path d="M437.02,74.981C388.667,26.629,324.38,0,256,0S123.333,26.629,74.98,74.981C26.629,123.333,0,187.62,0,256
                    s26.629,132.667,74.98,181.019C123.333,485.371,187.62,512,256,512s132.667-26.629,181.02-74.981
                    C485.371,388.667,512,324.38,512,256S485.371,123.333,437.02,74.981z M256,482c-66.869,0-127.037-29.202-168.452-75.511
                    C113.223,338.422,178.948,290,256,290c-49.706,0-90-40.294-90-90s40.294-90,90-90s90,40.294,90,90s-40.294,90-90,90
                    c77.052,0,142.777,48.422,168.452,116.489C383.037,452.798,322.869,482,256,482z" fill="#000000"/>
            </svg>
        ),
        user: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M437.02,74.981C388.667,26.629,324.38,0,256,0S123.333,26.629,74.98,74.981C26.629,123.333,0,187.62,0,256
                    s26.629,132.667,74.98,181.019C123.333,485.371,187.62,512,256,512s132.667-26.629,181.02-74.981
                    C485.371,388.667,512,324.38,512,256S485.371,123.333,437.02,74.981z M256,482c-66.869,0-127.037-29.202-168.452-75.511
                    C113.223,338.422,178.948,290,256,290c-49.706,0-90-40.294-90-90s40.294-90,90-90s90,40.294,90,90s-40.294,90-90,90
                    c77.052,0,142.777,48.422,168.452,116.489C383.037,452.798,322.869,482,256,482z" fill="#ffffff"/>
            </svg>
        ),
        cog: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="white" />
                    <stop offset="40%" stopColor="rgba(255, 255, 255, .85)" />
                    <stop offset="100%" stopColor="rgba(255, 255, 255, .8)" />
                </linearGradient>

                <path d="M463.2,256c0,29.3,16.3,54,48.8,74.4c-4.9,16.3-11.8,32.9-20.7,50c-28.4-7.3-56.1,1.6-82.9,26.8
                    c-21.9,23.6-28.9,51.2-20.7,82.9c-16.3,8.1-33.3,15.4-51.2,21.9c-18.7-33.3-45.5-50-80.5-50s-61.8,16.7-80.5,50
                    c-17.9-6.5-34.9-13.8-51.2-21.9c8.1-32.5,1.2-60.1-20.7-82.9c-21.9-21.9-49.6-28.9-82.9-20.7C15,375.9,8.1,359.2,0,336.5
                    c33.3-21.1,50-47.9,50-80.5c0-29.3-16.7-54.5-50-75.6c8.1-22.8,15-39.4,20.7-50c30.1,7.3,57.7-1.6,82.9-26.8
                    c21.9-22.8,28.9-50.4,20.7-82.9c17.1-8.9,34.1-15.8,51.2-20.7c18.7,32.5,45.5,48.8,80.5,48.8S317.8,32.5,336.5,0
                    c17.1,4.9,34.1,11.8,51.2,20.7c-8.1,31.7-1.2,59.3,20.7,82.9c26.8,25.2,54.5,34.1,82.9,26.8c8.9,17.1,15.8,33.7,20.7,50
                    C479.5,200.7,463.2,225.9,463.2,256 M256,366.9c30.9,0,57.1-10.8,78.6-32.3s32.3-47.7,32.3-78.6s-10.8-57.3-32.3-79.2
                    s-47.7-32.9-78.6-32.9s-57.1,11-78.6,32.9s-32.3,48.4-32.3,79.2s10.8,57.1,32.3,78.6S225.1,366.9,256,366.9" fill="#ffffff"
                />
            </svg>
        ),
        plus: (
            <svg className={styles.plusIcon} xmlns="http://www.w3.org/2000/svg" width={ size ? size : "64px"} height={ size ? size : "64px"} viewBox="0,0,256,256">
                <defs>
                    <linearGradient x1="32" y1="5" x2="32" y2="59.259" gradientUnits="userSpaceOnUse" id="color-1p">
                        <stop offset="0" stopColor="#5aff1a"></stop><stop offset="1" stopColor="#22ff71"></stop>
                    </linearGradient><linearGradient x1="32" y1="9" x2="32" y2="55.024" gradientUnits="userSpaceOnUse" id="color-2p">
                        <stop offset="0" stopColor="#b8ff6d"></stop><stop offset="1" stopColor="#abffbd"></stop>
                    </linearGradient>
                </defs>
                <g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ mixBlendMode: "normal"}}>
                    <g transform="scale(4,4)">
                        <path d="M35,58h-6c-1.654,0 -3,-1.346 -3,-3v-17h-17c-1.654,0 -3,-1.346 -3,-3v-6c0,-1.654 1.346,-3 3,-3h17v-17c0,-1.654 1.346,-3 3,-3h6c1.654,0 3,1.346 3,3v17h17c1.654,0 3,1.346 3,3v6c0,1.654 -1.346,3 -3,3h-17v17c0,1.654 -1.346,3 -3,3zM9,28c-0.552,0 -1,0.448 -1,1v6c0,0.552 0.448,1 1,1h19v19c0,0.552 0.448,1 1,1h6c0.552,0 1,-0.448 1,-1v-19h19c0.552,0 1,-0.448 1,-1v-6c0,-0.552 -0.448,-1 -1,-1h-19v-19c0,-0.552 -0.448,-1 -1,-1h-6c-0.552,0 -1,0.448 -1,1v19z" fill="url(#color-1p)"></path><path d="M53,30h-19v-19c0,-0.552 -0.448,-1 -1,-1h-2c-0.552,0 -1,0.448 -1,1v19h-19c-0.552,0 -1,0.448 -1,1v2c0,0.552 0.448,1 1,1h19v19c0,0.552 0.448,1 1,1h2c0.552,0 1,-0.448 1,-1v-19h19c0.552,0 1,-0.448 1,-1v-2c0,-0.552 -0.448,-1 -1,-1z" fill="url(#color-2p)"></path>
                    </g>
                </g>
            </svg>
        ),
        minus: (
            <svg className={styles.minusIcon} xmlns="http://www.w3.org/2000/svg" width={ size ? size : "64px"} height={ size ? size : "64px"} viewBox="0,0,256,256">
                <defs>
                    <linearGradient x1="32" y1="24.5" x2="32" y2="39.054" gradientUnits="userSpaceOnUse" id="color-1m">
                        <stop offset="0" stopColor="#ff1a1a"></stop><stop offset="1" stopColor="#ff6f22"></stop>
                    </linearGradient>
                    <linearGradient x1="32" y1="28" x2="32" y2="36.016" gradientUnits="userSpaceOnUse" id="color-2m">
                        <stop offset="0" stopColor="#ff6d6d"></stop><stop offset="1" stopColor="#ffc1ab"></stop>
                    </linearGradient>
                </defs>
                <g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ mixBlendMode: "normal"}}>
                    <g transform="scale(4,4)">
                        <path d="M58,38h-52c-1.654,0 -3,-1.346 -3,-3v-6c0,-1.654 1.346,-3 3,-3h52c1.654,0 3,1.346 3,3v6c0,1.654 -1.346,3 -3,3zM6,28c-0.552,0 -1,0.448 -1,1v6c0,0.552 0.448,1 1,1h52c0.552,0 1,-0.448 1,-1v-6c0,-0.552 -0.448,-1 -1,-1z" fill="url(#color-1m)"></path><path d="M57,33c0,0.552 -0.448,1 -1,1h-48c-0.552,0 -1,-0.448 -1,-1v-2c0,-0.552 0.448,-1 1,-1h48c0.552,0 1,0.448 1,1z" fill="url(#color-2m)"></path>
                    </g>
                </g>
            </svg>
        ),
        check: (
            <svg className={styles.checkIcon} xmlns="http://www.w3.org/2000/svg" width={ size ? size : "64px"} height={ size ? size : "64px"} viewBox="0,0,256,256">
                <defs>
                    <linearGradient x1="32" y1="12.664" x2="32" y2="52.422" gradientUnits="userSpaceOnUse" id="color-1c">
                        <stop offset="0" stopColor="#1aff1c"></stop><stop offset="1" stopColor="#22ff8b"></stop>
                    </linearGradient>
                    <linearGradient x1="32.013" y1="16.83" x2="32.013" y2="47.526" gradientUnits="userSpaceOnUse" id="color-2c">
                        <stop offset="0" stopColor="#8cff8a"></stop><stop offset="1" stopColor="#92ffbc"></stop>
                    </linearGradient>
                </defs>
                <g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ mixBlendMode: "normal" }}>
                    <g transform="scale(4,4)">
                        <path d="M24.982,51c-1.273,0 -2.547,-0.475 -3.524,-1.429l-14.57,-14.207c-0.573,-0.558 -0.888,-1.303 -0.888,-2.096c0,-0.793 0.315,-1.538 0.889,-2.097l2.82,-2.75c1.166,-1.137 3.063,-1.137 4.228,0.001l10.259,10.003c0.395,0.385 1.058,0.38 1.446,-0.012l24.341,-24.526c1.147,-1.156 3.044,-1.186 4.228,-0.068l2.867,2.705c0.582,0.55 0.91,1.29 0.923,2.083c0.013,0.793 -0.291,1.542 -0.854,2.109l-28.582,28.798c-0.981,0.99 -2.282,1.486 -3.583,1.486zM11.822,29.564c-0.26,0 -0.52,0.097 -0.717,0.29l-2.82,2.75c-0.184,0.179 -0.285,0.414 -0.285,0.664c0,0.25 0.102,0.485 0.285,0.664l14.569,14.208c1.19,1.163 3.116,1.148 4.291,-0.034l28.581,-28.798c0.181,-0.182 0.277,-0.418 0.273,-0.668c-0.004,-0.25 -0.109,-0.485 -0.296,-0.661l-2.867,-2.705c-0.401,-0.381 -1.047,-0.369 -1.435,0.022l-24.34,24.527c-1.166,1.173 -3.079,1.189 -4.263,0.034l-10.258,-10.004c-0.197,-0.193 -0.457,-0.289 -0.718,-0.289z" fill="url(#color-1c)"></path>
                        <path d="M24.977,46.609c-0.489,0 -0.98,-0.181 -1.368,-0.544l-13.291,-12.462l1.367,-1.459l13.292,12.461l27.316,-27.315l1.414,1.414l-27.316,27.315c-0.391,0.392 -0.902,0.59 -1.414,0.59z" fill="url(#color-2c)"></path>
                    </g>
                </g>
            </svg>
        )
    }

    if (current === "userTimer") {
        console.log(icons[current]);
    }
    return icons[current];
};