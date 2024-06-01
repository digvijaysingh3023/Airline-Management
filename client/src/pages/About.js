import Navbar from '../components/Navbar';
import '../CSS/About.css';

function About({isLoggedIn,setIsLoggedIn}){
    return (<div>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>

        <div className="about-container">
            <h1>About Our Airline</h1>
            <p>Welcome to our airline! We are committed to providing the best travel experience for our passengers. Our airline has been operating for over a decade, and we have continuously strived to improve our services to meet the needs of our customers.</p>
            <h2>Our Mission</h2>
            <p>Our mission is to connect people and places with the utmost safety, comfort, and reliability. We aim to offer exceptional service and exceed our customers' expectations.</p>
            <h2>Our Fleet</h2>
            <p>We have a modern fleet of aircraft equipped with the latest technology to ensure a safe and pleasant journey. Our fleet includes a variety of aircraft to cater to different travel needs, from short domestic flights to long-haul international trips.</p>
            <h2>Customer Service</h2>
            <p>We prioritize customer satisfaction and are always here to assist you with any inquiries or issues you may have. Our dedicated customer service team is available 24/7 to ensure you have a seamless travel experience.</p>
            <h2>Our Values</h2>
            <ul>
                <li>Safety: The safety of our passengers and crew is our top priority.</li>
                <li>Customer Focus: We are committed to providing excellent service and meeting the needs of our customers.</li>
                <li>Integrity: We conduct our business with the highest ethical standards.</li>
                <li>Innovation: We continuously seek to improve our services and adopt the latest technology.</li>
                <li>Sustainability: We are dedicated to reducing our environmental impact and promoting sustainable practices.</li>
            </ul>
            <h2>Join Our Team</h2>
            <p>If you are passionate about aviation and customer service, we invite you to join our team. We offer various career opportunities for individuals who share our commitment to excellence.</p>
            <p>Thank you for choosing our airline. We look forward to serving you and making your journey a memorable one.</p>
        </div>
    </div>)
}
export default About;