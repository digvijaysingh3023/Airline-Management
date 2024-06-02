import Navbar from '../components/Navbar';
import FlightCard from '../components/FlightCard';

function ViewFlights({viewFlightData, setBookFlightData}){
    return (<div>
        <Navbar />
        {
            viewFlightData.map((flightData)=>{
                return <FlightCard  key={flightData.id} flightData={flightData} setBookFlightData={setBookFlightData}/>
            })
        }
    </div>)
}
export default ViewFlights;