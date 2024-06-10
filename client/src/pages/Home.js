import { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from '../components/Navbar';
import '../CSS/Home.css';
import AuthContext from '../authContext';
import Loading from '../components/Loading';
import Hero from '../components/Hero';
import ViewFlights from '../components/ViewFlights';
import Avilable from '../components/Avilable';
import Travel from '../components/Travel';
import Achievements from '../components/Achievements';
import Testimonial from '../components/Testimonial';
import Footer from '../components/Footer';
const data=[
    {
      'img':'/testimonial1.jpeg',
      'review':'Lorem ipsum dolor sit amet consectetur. Sed leo sit semper sed facilisis ultrices urna eu In tellus interdum vel ac massa interdum viverra elementum auctor. Lorem ipsum dolor sit amet consectetur. Sed leo sit semper sed facilisis ultrices urna eu In tellus interdum vel ac massa interdum viverra elementum auctor. Lorem ipsum dolor sit amet consectetur. Sed leo sit semper sed facilisis ultrices urna eu In tellus interdum vel ac massa interdum viverra elementum auctor.',
      'name':'Mr John Deo',
      'des':'Ceo At Fly Now'
    },
    {
      'img':'/testimonial3.jpeg',
      'review':'Lorem ipsum dolor sit amet consectetur. Sed leo sit semper sed facilisis ultrices urna eu In tellus interdum vel ac massa interdum viverra elementum auctor.',
      'name':'Mr John Deo',
      'des':'Ceo At Fly Now'
    },
    {
      'img':'/testimonial2.jpeg',
      'review':'Lorem ipsum dolor sit amet consectetur. Sed leo sit semper sed facilisis ultrices urna eu In tellus interdum vel ac massa interdum viverra elementum auctor.',
      'name':'Mr John Deo',
      'des':'Ceo At Fly Now'
    },
    {
      'img':'/testimonial4.jpeg',
      'review':'Lorem ipsum dolor sit amet consectetur. Sed leo sit semper sed facilisis ultrices urna eu In tellus interdum vel ac massa interdum viverra elementum auctor.',
      'name':'Mr John Deo',
      'des':'Ceo At Fly Now'
    }
  ]

function Home({ setViewFlightData }) {
    
    const isAuthenticated = useContext(AuthContext)
    const [isLoading,setIsLoading] = useState(true);
    setTimeout(() => {
      setIsLoading(false)
    }, 1500);

    return (
    <div className={isLoading ? 'loading' : 'loaded'}>
      <Loading isLoading={isLoading} />
      <div className="content_">
        
        <div>

        <Navbar/>
        <Hero/>
        <ViewFlights props={setViewFlightData} />
        <Avilable/>
        <Travel/>
        <Achievements/>
        <Testimonial data={data} />
        <Footer/>
            
        </div>
    </div>
    </div>
    
    );
}

export default Home;
