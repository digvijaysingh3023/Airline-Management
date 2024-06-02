import Navbar from '../components/Navbar';
import FlightCard from '../components/FlightCard';

function ViewFlights({viewFlightData}){
    return (<div>
        <Navbar />

        {
            viewFlightData.map((flightData,index)=>{
                return <FlightCard flag={true} key={flightData.id} flightData={flightData}/>
            })
        }
    </div>)
}
export default ViewFlights;