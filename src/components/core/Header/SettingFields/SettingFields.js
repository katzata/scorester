// import { useState } from "react";
// import styles from "./SettingFields.module.scss";

// import { register, login, logout, changeSetting } from "../../../../services/userService";

// export default function SettingFields({type, id, section, title, subtype, attr, disabled, callback}) {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [rePassword, setRePassword] = useState("");
//     const [isRegistering, setIsRegistering] = useState(false);
    
//     const loggedStyles = {
//         color: `rgba(255, 255, 255, ${disabled ? ".5" : "1"})`
//     };

//     const fields = {
//         login: ({title}) => {
//             const formType = (toggle) => toggle ? "REGISTER" : "LOGIN";

//             const toggleFormType = (e) => {
//                 e.preventDefault();
//                 setIsRegistering(!isRegistering);
//             };

//             const handleSubmit = (e) => {
//                 e.preventDefault();

//                 const actions = { register, login };
//                 const currentAction = isRegistering ? "register" : "login";

//                 actions[currentAction]({username, password, rePassword, callback});
//             };

//             const inputStyle = { width: isRegistering ? "94%" : "48%" };

//             return <>
//                 <form className={styles.loginForm} onSubmit={handleSubmit}>
//                     <p>{title}</p>
                    
//                     <input type="text" name="username" placeholder="Username" style={inputStyle} value={username} onChange={(e) => setUsername(e.target.value)}/>
//                     <input type="password" name="password" placeholder="Password" style={inputStyle} value={password} onChange={(e) => setPassword(e.target.value)}/>
//                     {isRegistering && <input type="password" name="rePassword" placeholder="Repeat password" style={inputStyle} value={rePassword} onChange={(e) => setRePassword(e.target.value)}/>}
                    
//                     <button>{formType(isRegistering)}</button>
//                 </form>

//                 <p>
//                     <span>Or if you {isRegistering ? "already" : "don't"} have an account you can</span>
//                     <button onClick={toggleFormType}>{formType(!isRegistering).toLocaleLowerCase()}</button>
//                 </p>
//             </>
//         },
//         checkbox: ({id, section, title}) => (
//             <>
//                 <p style={loggedStyles}>{title}</p>
//                 <input type="checkbox" id={id} data-section={section} style={loggedStyles} onChange={changeSetting} disabled={disabled}/>
//             </>
//         ),
//         numberInput: ({id, section, title, subtype, attr}) => {
//             return <>
//                 <p style={loggedStyles}>{title}</p>
//                 <input type="number" id={id} min={attr} data-section={section} style={loggedStyles} onChange={changeSetting}/>
//             </>
//         },
//         button: ({id, title}) => (
//             <button id={id} onClick={changeSetting}>{title}</button>
//         )
//     };

//     return <div className={styles.setting}>
//         {fields[type]({id, section, title})}
//     </div>
// };