import SignIn from "../components/SignIn";
import Navbar from "../components/Navbar";
import CreateAccount from "../components/CreateAccount";
import { useState } from "react";
import '../CSS/Login.css';
import Loading from "../components/Loading";

function Login() {
    const [signIn, setSignIn] = useState(true);
    const [isLoading,setIsLoading] = useState(true);
    setTimeout(() => {
      setIsLoading(false)
    }, 1500);

    return (<div>
        <div className={isLoading ? 'loading' : 'loaded'}>
            <Loading isLoading={isLoading} />
            <div className="content_">
                <Navbar />

                <div className="login-container">
                    <div className="login-options">
                        <button className={signIn ? "active" : ""} onClick={() => setSignIn(true)}>Sign In</button>
                        <button className={!signIn ? "active" : ""} onClick={() => setSignIn(false)}>Create Account</button>
                    </div>
                    {signIn ? <SignIn /> : <CreateAccount setSignIn={setSignIn} />}
                </div>
            </div>
        </div>
    </div>)
}

export default Login;
