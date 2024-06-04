import Navbar from '../components/Navbar';
import '../CSS/About.css';

function About(){
    return (<div>
        <Navbar />
        <div className='h-[60px]'></div>
        <div className="about-container max-w-4xl mx-auto p-8 bg-gradient-to-r from-white to-gray-300 rounded-lg shadow-lg">
            <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800">About Our Airline</h1>
            <p className="text-gray-600 mb-8 leading-relaxed">Welcome to our airline! We are committed to providing the best travel experience for our passengers. Our airline has been operating for over a decade, and we have continuously strived to improve our services to meet the needs of our customers.</p>
            <h2 className="text-3xl font-bold mb-4 text-gray-800 border-b-2 border-gray-200 pb-2">Our Mission</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">Our mission is to connect people and places with the utmost safety, comfort, and reliability. We aim to offer exceptional service and exceed our customers' expectations.</p>
            <h2 className="text-3xl font-bold mb-4 text-gray-800 border-b-2 border-gray-200 pb-2">Our Fleet</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">We have a modern fleet of aircraft equipped with the latest technology to ensure a safe and pleasant journey. Our fleet includes a variety of aircraft to cater to different travel needs, from short domestic flights to long-haul international trips.</p>
            <h2 className="text-3xl font-bold mb-4 text-gray-800 border-b-2 border-gray-200 pb-2">Customer Service</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">We prioritize customer satisfaction and are always here to assist you with any inquiries or issues you may have. Our dedicated customer service team is available 24/7 to ensure you have a seamless travel experience.</p>
            <h2 className="text-3xl font-bold mb-4 text-gray-800 border-b-2 border-gray-200 pb-2">Our Values</h2>
            <ul className="list-disc list-inside text-gray-600 mb-8 space-y-2 pl-4">
                <li>Safety: The safety of our passengers and crew is our top priority.</li>
                <li>Customer Focus: We are committed to providing excellent service and meeting the needs of our customers.</li>
                <li>Integrity: We conduct our business with the highest ethical standards.</li>
                <li>Innovation: We continuously seek to improve our services and adopt the latest technology.</li>
                <li>Sustainability: We are dedicated to reducing our environmental impact and promoting sustainable practices.</li>
            </ul>
            <h2 className="text-3xl font-bold mb-4 text-gray-800 border-b-2 border-gray-200 pb-2">Join Our Team</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">If you are passionate about aviation and customer service, we invite you to join our team. We offer various career opportunities for individuals who share our commitment to excellence.</p>
            <p className="text-gray-600 leading-relaxed">Thank you for choosing our airline. We look forward to serving you and making your journey a memorable one.</p>
        </div>
    </div>)
}
export default About;