import React, { useState } from 'react';
import userImg from "../../assets/user-1.png";
import flagImg from "../../assets/report-1.png";
import { toast } from 'react-toastify';

const PlayerCard = ({player, setAvailableBalance, availableBalance, purchasedPlayers, setPurchasedPlayers}) => {
   const [isSelected, setIsSelected] = useState(false)
    
   const handleSelected = (playerData) => {
    const playerPrice = parseInt(playerData.price.split("USD").join("").split(",").join(""))
            
            if(availableBalance < playerPrice){
                toast("You have not enough coin!!")
                return
            }
                    if(purchasedPlayers.length === 6){
                        toast("You can only select 6 players!!")
                        return
                    }
                    setIsSelected(true)
                    setAvailableBalance(availableBalance-playerPrice)
                    setPurchasedPlayers([...purchasedPlayers, playerData])
                  }
           
   return (
       <div className="card bg-base-100 border border-gray-200 shadow-sm p-4 rounded-xl">
          {/* Main Player Image */}
          <figure>
            <img
              src={player["player-image"]}
              alt={player["player-name"]}
              className="w-full h-[400px] object-cover rounded-xl"
            />
          </figure>

          <div className="mt-5">
            {/* Player Name and User Icon Alignment */}
            <div className="flex items-center gap-3">
              <img src={userImg} alt="" className="w-6 h-6 object-contain" />
              <h2 className="text-xl font-bold text-gray-800">{player["player-name"]}</h2>
            </div>

            {/* FIXED ALIGNMENT: Flag and Country Name Row */}
            <div className="flex justify-between items-center mt-4 border-b border-gray-100 pb-4">
              {/* This flex container ensures the flag and text sit perfectly on the same horizontal line */}
              <div className="flex items-center gap-2"> 
                <img 
                  className="w-5 h-5 object-contain opacity-70" 
                  src={flagImg} 
                  alt="flag" 
                />
                <span className="text-gray-500 text-base leading-none">
                  {player["player-country"]}
                </span>
              </div>
              
              {/* Player Role Badge */}
              <span className="bg-gray-100 px-4 py-1.5 rounded-lg text-sm font-medium text-gray-700">
                {player["player-role"]}
              </span>
            </div>

            {/* Rating and Style Details */}
            <div className="mt-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-800">Rating</span>
                <span className="text-gray-500">{player.rating}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-800">{player["batting-style"]}</span>
                <span className="text-gray-500">{player["bowling-style"]}</span>
              </div>

              {/* Price and Action Button */}
              <div className="flex justify-between items-center pt-2">
                <p className="font-bold text-gray-800">Price: ${player.price}</p>
                <button disabled={isSelected} onClick={()=>{handleSelected(player)
                 
                    }} className="btn btn-outline btn-sm border-gray-300 hover:bg-yellow-400 hover:text-black transition-all rounded-lg normal-case">
                  {isSelected === true?"Selected":"Choose player"}
                </button>
              </div>
            </div>
          </div>
        </div>
    );
};

export default PlayerCard;