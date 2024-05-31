import Navbar from '../components/Navbar';

function BookFlight({isLoggedIn,setIsLoggedIn}){
    return (<div>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>

        This is Book Flight Page
    </div>)
}
export default BookFlight;