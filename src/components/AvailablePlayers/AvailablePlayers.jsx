import React, { use } from "react";
import userImg from "../../assets/user-1.png";
import flagImg from "../../assets/report-1.png";

const AvailablePlayers = ({ playersPromise }) => {
  const playerData = use(playersPromise);
  console.log(playerData);
 
  return (
    <div className="max-w-[1000px] mx-auto">
      
      
    {
      playerData.map(player=> <div className="card bg-base-100 w-96 shadow-sm p-4">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes"
          />
        </figure>
        <div className="mt-4">
          <div className="flex">
            <img src={userImg} alt="" />
            <h2 className="card-title ml-2">Virat Kohli</h2>
          </div>

          <div className="flex justify-between mt-4 border-b-2 border-gray-200 pb-1">
            <div className="flex item-center ">
              <img className="w-[20px] h-[20px]" src={flagImg} alt="" />
              <span className="ml-2">India</span>
            </div>
            <button className="btn">All rounder</button>
          </div>

          <div className="flex justify-between font-bold">
            <span>Rating</span>
            <span>5</span>
          </div>

          <div className="flex justify-between mt-4">
            <span className="font-bold">Left hand bat</span>
            <span>Right hand ball</span>
          </div>
         
          <div className="card-actions mt-4 flex justify-between-items-center">
            <p className="font-bold">Price: $1500000</p>
            <button className="btn btn-primary">Choose player</button>
          </div>
        </div>
      </div>)
    }  
      
      
      
      
    </div>
  );
};

export default AvailablePlayers;
