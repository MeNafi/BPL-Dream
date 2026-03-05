import React, { use } from "react";
import userImg from "../../assets/user-1.png";
import flagImg from "../../assets/report-1.png";

const AvailablePlayers = ({ playersPromise }) => {
  const playerData = use(playersPromise);
  console.log(playerData);

  return (
    <div className="max-w-[1000px] mx-auto grid grid-col-1 md:grid-cols-3 gap-8 mt-10">
      {playerData.map((player) => (
        <div className="card bg-base-100 shadow-sm p-4">
          <figure>
            <img
              src={player["player-image"]}
              alt="Shoes"
              className="w-full h-[400px] object-cover"
            />
          </figure>
          <div className="mt-4">
            <div className="flex w-[20px h-[20px]">
              <img src={userImg} alt="" />
              <h2 className="card-title ml-2">{player["player-name"]}</h2>
            </div>

            <div className="flex justify-between mt-4 border-b-2 border-gray-200 pb-1">
              <div className="flex item-center ">
                <img className="w-[20px] h-[20px]" src={flagImg} alt="" />
                <span className="ml-2">{player["player-country"]}</span>
              </div>
              <button className="btn">{player["player-role"]}</button>
            </div>

            <div className="flex justify-between font-bold">
              <span>Rating</span>
              <span>{player.rating}</span>
            </div>

            <div className="flex justify-between mt-4">
              <span className="font-bold">{player["batting-style"]}</span>
              <span>{player["bowling-style"]}</span>
            </div>

            <div className="card-actions mt-4 flex justify-between-items-center">
              <p className="font-bold">Price: ${player.price}</p>
              <button className="btn btn-primary">Choose player</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AvailablePlayers;
