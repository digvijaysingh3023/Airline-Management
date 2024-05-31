import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import '../CSS/Home.css';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const decodeToken = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken;
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  };


function Home({isLoggedIn,setIsLoggedIn}){
    const navigate = useNavigate()
    const [username,setusername] = useState('');
    
    useEffect(()=>{
        const token = localStorage.getItem('token')
        const decodedToken = decodeToken(token);
        if(token){
            if(!decodeToken){
                localStorage.removeItem('token')
                navigate('/login')
            }
            else{
                console.log();
                const username_ = decodedToken['username'];
                setusername(username_)
            }
        }
        else{
            navigate('/login',{replace:true})
        }
    },[])

    return (<div>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        This is Home Page
        this is your username :- {username}
    </div>)
}
export default Home;