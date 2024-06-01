import Navbar from '../components/Navbar';

function ViewFlights({isLoggedIn,setIsLoggedIn}){
    return (<div>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>

        This is View Flight Page
    </div>)
}
export default ViewFlights;