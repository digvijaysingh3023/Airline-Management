import Navbar from '../components/Navbar';

function ScheduleFlight({isLoggedIn,setIsLoggedIn}){
    return (<div>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>

        This is Schedule Flight Page
    </div>)
}
export default ScheduleFlight;