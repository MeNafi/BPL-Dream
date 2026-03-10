import React from "react";

const SelectedPlayers = ({ purchasedPlayers }) => {
  console.log(purchasedPlayers);

  return (
    <div className="max-w-[1170px] mx-auto">
      selected players
      <div className="border-2 border-red-500 flex justify-between items-center">
     
     <div className="flex items-center">
        <img src="https://i.ibb.co.com/6JBG8rFW/Shoriful-islam.jpg" className="h-[50px] w-[50px] rounded-xl" alt="" />
    
     <div>
        <h1>Shoriful Islam</h1>
        <p>Left-hand bat</p>
     </div>
      </div>
      <div>
      <img src="https://i.ibb.co.com/5xMKcMxD/delete.png" alt="delete vector icon" />
      </div>
      </div>
    </div>
  );
};

export default SelectedPlayers;
