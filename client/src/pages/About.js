import Navbar from '../components/Navbar';

function About({isLoggedIn,setIsLoggedIn}){
    return (<div>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>

        This is About Page
    </div>)
}
export default About;