import React, { use } from "react";
import PlayerCard from "../PlayerCard/PlayerCard";

const AvailablePlayers = ({ playersPromise, setAvailableBalance, availableBalance, purchasedPlayers, setPurchasedPlayers }) => {
  const playerData = use(playersPromise);

  return (
    /* 1 col mobile → 2 col tablet → 3 col desktop */
    <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mt-10 p-4">
      {playerData.map((player) => (
        <PlayerCard
          key={player["player-name"]}
          purchasedPlayers={purchasedPlayers}
          setPurchasedPlayers={setPurchasedPlayers}
          availableBalance={availableBalance}
          setAvailableBalance={setAvailableBalance}
          player={player}
        />
      ))}
    </div>
  );
};

export default AvailablePlayers;