import Navbar from '../components/Navbar';
import '../CSS/Home.css';

function Home({isLoggedIn,setIsLoggedIn}){
    return (<div>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

        This is Home Page
    </div>)
}
export default Home;