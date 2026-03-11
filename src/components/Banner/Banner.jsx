import React from 'react';
import bgShadow from "../../assets/bg-shadow.png";
import bannerMain from "../../assets/banner-main.png";

const Banner = () => {
  return (
    <div
      className="max-w-[1170px] mx-auto my-8 w-11/12 rounded-3xl bg-black py-10 md:py-16 text-center border border-gray-800"
      style={{
        backgroundImage: `url(${bgShadow})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Center Logo - Smaller on mobile */}
      <img src={bannerMain} alt="Banner Main" className="mx-auto mb-6 w-40 md:w-52" />
      
      {/* Text Content - Responsive font sizes */}
      <h1 className="mb-4 text-2xl md:text-4xl font-bold text-white px-4">
        Assemble Your Ultimate Dream 11 Cricket Team
      </h1>
      
      <p className="mb-8 text-lg md:text-xl text-gray-400 px-4">
        Beyond Boundaries Beyond Limits
      </p>

      {/* Action Button */}
      <button className="rounded-xl border-2 border-black bg-[#E3FF31] px-6 py-3 font-bold hover:bg-white transition-all active:scale-95">
        Claim Free Credit
      </button>
    </div>
  );
};

export default Banner;