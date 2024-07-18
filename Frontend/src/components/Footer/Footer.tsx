import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-3 w-full fixed bottom-0 left-0 z-10">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="text-center mt-4">
          <p>&copy; 2024 GrowPro. All rights reserved.</p>
        </div>
          
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 md:ml-auto">
            <Link to="/About" className="hover:text-gray-400">About Us</Link>
            <Link to="/Services" className="hover:text-gray-400">Services</Link>
            <Link to="/Contact" className="hover:text-gray-400">Contact</Link>
            <Link to="/PrivacyPolicy" className="hover:text-gray-400">Privacy Policy</Link>
          </div>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
