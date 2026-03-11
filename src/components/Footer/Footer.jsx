import React from 'react';
import footerLogo from '../../assets/logo-footer.png';
import bgShadow from '../../assets/bg-shadow.png';

const Footer = () => {
  return (
   
    <footer className="relative bg-[#06091A] text-white pt-48 pb-8 mt-60">
      
      {/* 1. Floating Newsletter Card Wrapper */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-[1170px] z-10">
        <div className="bg-white/10 p-4 rounded-3xl border border-white/20 backdrop-blur-sm">
          <div 
            className="bg-white rounded-2xl py-10 md:py-16 px-4 text-center shadow-xl"
            style={{ 
              backgroundImage: `url(${bgShadow})`, 
              backgroundSize: 'cover', 
              backgroundPosition: 'center' 
            }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-2">Subscribe to our Newsletter</h2>
            <p className="text-gray-500 mb-6 font-medium text-sm md:text-base">Get the latest updates and news right in your inbox!</p>
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="px-6 py-3 rounded-xl border border-gray-300 w-full md:w-96 text-black outline-none focus:border-orange-300 transition-all"
              />
              <button className="w-full md:w-auto px-8 py-3 rounded-xl font-bold text-black bg-gradient-to-r from-pink-300 via-orange-200 to-yellow-200 hover:opacity-90 transition-opacity">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1170px] mx-auto px-2">
       
        {/* 2. Footer Logo */}
        <div className="flex justify-center mb-12">
          <img src={footerLogo} alt="Cricket Logo" className="h-24 md:h-32 object-contain" />
        </div>

        {/* 3. Footer Links Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
          {/* About Us */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold mb-4">About Us</h3>
            <p className="text-gray-400 leading-relaxed mx-auto md:mx-0 max-w-xs">
              We are a passionate team dedicated to providing the best services to our customers.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="text-gray-400 space-y-3 list-inside">
              <li><a href="#" className="hover:text-white transition-colors">• Home</a></li>
              <li><a href="#" className="hover:text-white transition-colors">• Services</a></li>
              <li><a href="#" className="hover:text-white transition-colors">• About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">• Contact</a></li>
            </ul>
          </div>

          {/* Subscribe Footer Section */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold mb-4">Subscribe</h3>
            <p className="text-gray-400 mb-6">Subscribe to our newsletter for the latest updates.</p>
            <div className="flex flex-col sm:flex-row rounded-xl overflow-hidden shadow-sm max-w-sm mx-auto md:mx-0">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="px-4 py-3 w-full text-black bg-white outline-none"
              />
              <button className="px-6 py-3 font-bold text-white bg-gradient-to-r from-orange-300 to-pink-400 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* 4. Bottom Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>©2026 All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;