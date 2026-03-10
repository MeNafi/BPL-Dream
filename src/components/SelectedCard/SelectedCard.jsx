import React from 'react';

const SelectedCard = ({player}) => {
    console.log(player)
    return (
         <div className="border-2 border-gray-100 p-3 flex justify-between items-center rounded-xl">
     
     <div className="flex items-center">
        <img src= {} className="h-[50px] w-[50px] rounded-xl" alt="" />
    
     <div className="ml-2">
        <h1>{}</h1>
        <p className="text-xs">Left-hand bat</p>
     </div>
      </div>
      <div>
      <img src="https://i.ibb.co.com/5xMKcMxD/delete.png" alt="delete vector icon" />
      </div>
      </div>
    );
};

export default SelectedCard;