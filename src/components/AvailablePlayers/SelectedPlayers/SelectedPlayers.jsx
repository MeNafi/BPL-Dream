import React from "react";
import SelectedCard from "../../SelectedCard/SelectedCard";

const SelectedPlayers = ({ purchasedPlayers, removePlayer }) => {
  return (
    /* Responsive horizontal padding for mobile/tablet */
    <div className="max-w-[1170px] mx-auto px-4 md:px-6 lg:px-0">
      {purchasedPlayers.map((player) => (
        <SelectedCard
          removePlayer={removePlayer}
          player={player}
          key={player["player-name"]}
        />
      ))}
    </div>
  );
};

export default SelectedPlayers;