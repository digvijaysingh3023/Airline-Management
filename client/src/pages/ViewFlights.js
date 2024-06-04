import { useState } from 'react';
import Navbar from '../components/Navbar';
import FlightCard from '../components/FlightCard';
import Loading from '../components/Loading';

function ViewFlights({ viewFlightData, setBookFlightData }) {
    const [isLoading,setIsLoading] = useState(true);
    setTimeout(() => {
      setIsLoading(false)
    }, 1500);
    return (<div>
        <div className={isLoading ? 'loading' : 'loaded'}>
            <Loading isLoading={isLoading} />
            <div className="content_">
                <Navbar />
                {
                    viewFlightData.map((flightData) => {
                        return <FlightCard key={flightData.id} flightData={flightData} setBookFlightData={setBookFlightData} />
                    })
                }
            </div>
        </div>
    </div>
    )
}
export default ViewFlights;