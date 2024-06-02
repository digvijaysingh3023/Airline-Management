import Navbar from '../components/Navbar';
import FlightCard from '../components/FlightCard';

function ViewFlights({viewFlightData}){
    return (<div>
        <Navbar />

        {
            viewFlightData.map((flightData)=>{
                return <FlightCard  key={flightData.id} flightData={flightData}/>
            })
        }
    </div>)
}
export default ViewFlights;