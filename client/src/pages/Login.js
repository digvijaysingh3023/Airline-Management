import SignIn from "../components/SignIn";
import CreateAccount from "../components/CreateAccount";
import { useState } from "react";
import '../CSS/Login.css'; 

function Login({setIsLoggedIn }) {
    const [signIn, setSignIn] = useState(true);

    return (
        <div className="login-container">
            <div className="login-options">
                <button className={signIn ? "active" : ""} onClick={() => setSignIn(true)}>Sign In</button>
                <button className={!signIn ? "active" : ""} onClick={() => setSignIn(false)}>Create Account</button>
            </div>
            {signIn ? <SignIn setIsLoggedIn={setIsLoggedIn} /> : <CreateAccount setSignIn={setSignIn}/>}
        </div>
    )
}

export default Login;
