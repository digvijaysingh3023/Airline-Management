import SignIn from "../components/SignIn";
import Navbar from "../components/Navbar";
import CreateAccount from "../components/CreateAccount";
import { useState } from "react";
import '../CSS/Login.css'; 

function Login({isLoggedIn,setIsLoggedIn }) {
    const [signIn, setSignIn] = useState(true);

    return (<div>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>

        <div className="login-container">
            <div className="login-options">
                <button className={signIn ? "active" : ""} onClick={() => setSignIn(true)}>Sign In</button>
                <button className={!signIn ? "active" : ""} onClick={() => setSignIn(false)}>Create Account</button>
            </div>
            {signIn ? <SignIn setIsLoggedIn={setIsLoggedIn} /> : <CreateAccount setSignIn={setSignIn}/>}
        </div>
    </div>)
}

export default Login;
