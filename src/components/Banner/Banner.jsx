import React from 'react';
// Import images from assets folder
import bgShadow from "../../assets/bg-shadow.png";
import bannerMain from "../../assets/banner-main.png";

const Banner = () => {
  return (
    <div
      className="max-w-[1170px] mx-auto px-4 md:px-0 mx-auto my-8 w-11/12 rounded-3xl bg-black py-16 text-center"
      style={{
        backgroundImage: `url(${bgShadow})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Center Logo */}
      <img src={bannerMain} alt="Banner Main" className="mx-auto mb-6 w-52" />
      
      {/* Text Content */}
      <h1 className="mb-4 text-4xl font-bold text-white">
        Assemble Your Ultimate Dream 11 Cricket Team
      </h1>
      <p className="mb-8 text-xl text-gray-400">
        Beyond Boundaries Beyond Limits
      </p>

      {/* Action Button */}
      <button className="rounded-xl border-2 border-black bg-[#E3FF31] px-6 py-3 font-bold hover:bg-white transition-all">
        Claim Free Credit
      </button>
    </div>
  );
};

export default Banner;