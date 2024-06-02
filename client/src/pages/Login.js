import SignIn from "../components/SignIn";
import Navbar from "../components/Navbar";
import CreateAccount from "../components/CreateAccount";
import { useState } from "react";
import '../CSS/Login.css'; 

function Login() {
    const [signIn, setSignIn] = useState(true);

    return (<div>
        <Navbar/>

        <div className="login-container">
            <div className="login-options">
                <button className={signIn ? "active" : ""} onClick={() => setSignIn(true)}>Sign In</button>
                <button className={!signIn ? "active" : ""} onClick={() => setSignIn(false)}>Create Account</button>
            </div>
            {signIn ? <SignIn /> : <CreateAccount setSignIn={setSignIn}/>}
        </div>
    </div>)
}

export default Login;
