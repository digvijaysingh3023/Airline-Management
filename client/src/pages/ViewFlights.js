import Navbar from '../components/Navbar';
import FlightCard from '../components/FlightCard';

function ViewFlights({viewFlightData,isLoggedIn,setIsLoggedIn}){
    return (<div>
        <Navbar isLoggedIn={isLoggedIn} 
        setIsLoggedIn={setIsLoggedIn}/>

        {
            viewFlightData.map((flightData,index)=>{
                return <FlightCard isLoggedIn={isLoggedIn} flag={true} key={flightData.id} flightData={flightData}/>
            })
        }
    </div>)
}
export default ViewFlights;