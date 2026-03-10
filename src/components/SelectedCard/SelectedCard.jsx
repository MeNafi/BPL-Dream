import React from "react";

const SelectedCard = ({ player }) => {
  console.log(player);

  return (
    <div className="border-2 mt-5 border-gray-100 p-3 flex justify-between items-center rounded-xl">
      <div className="flex items-center">
        <img
          src={player["player-image"]}
          className="h-[50px] w-[50px] rounded-lg"
          alt=""
        />

        <div className="ml-2">
          <h1>{player["player-name"]}</h1>
          <p className="text-xs">{player["player-role"]}</p>
        </div>
      </div>
      <div>
        <img
          className="w-5 h-5"
          src="https://i.ibb.co.com/5xMKcMxD/delete.png"
          alt="delete vector icon"
        />
      </div>
    </div>
  );
};

export default SelectedCard;
