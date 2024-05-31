import Navbar from '../components/Navbar';

function Contact({isLoggedIn,setIsLoggedIn}){
    return (<div>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>

        This is Contact Page
    </div>)
}
export default Contact;