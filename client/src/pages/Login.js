import SignIn from "../components/SignIn";
import Navbar from "../components/Navbar";
import CreateAccount from "../components/CreateAccount";
import { useState } from "react";
import '../CSS/Login.css'; 

function Login() {
    const [signIn, setSignIn] = useState(true);

    const backgroundStyle = {
        backgroundImage: 'url(/loginImage.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };

    return (<div>
        <Navbar/>
        <div className="wrapper flex items-center h-screen justify-start" style={backgroundStyle}>
            <div className="login-container min-w-[25rem]" style={{marginLeft:'20%'}}>
                <div className="login-options flex items-center h-[40px] justify-around">
                    <button className={signIn ? "active h-full w-[4.3rem] rounded bg-blue-500" : "h-full w-[4.3rem] rounded bg-[#ebe8e8]"} onClick={() => setSignIn(true)}>Sign In</button>
                    <button className={!signIn ? "active h-full w-[8rem] rounded bg-blue-500" : "h-full w-[8rem] rounded bg-[#ebe8e8]"} onClick={() => setSignIn(false)}>Create Account</button>
                </div>
                {signIn ? <SignIn /> : <CreateAccount setSignIn={setSignIn}/>}
            </div>


        </div>
        
    </div>)
}

export default Login;
