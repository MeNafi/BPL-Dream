import "./App.css";
import SelectedPlayers from "./components/AvailablePlayers/SelectedPlayers/SelectedPlayers";
import AvailablePlayers from "./components/AvailablePlayers/AvailablePlayers";
import Navbar from "./components/Navbar/Navbar";
import { Suspense, useState } from "react";

const fetchPlayers = async () => {
  const res = await fetch("/players.json");
  return res.json();
};

const playersPromise = fetchPlayers();
function App() {
  const [availableBalance, setAvailableBalance] = useState(600000);
  const [toggle, setToggle] = useState(true);
  const [purchasedPlayers, setPurchasedPlayers] = useState([]);
  console.log(purchasedPlayers)
  
  return (
    <>
      <Navbar availableBalance={availableBalance}></Navbar>

      <div className="max-w-[1170px] mx-auto flex justify-between items-center mt-4">
        <h1 className="font-bold text-2xl">Available players</h1>

        <div className="font-bold">
          <button
            onClick={() => setToggle(true)}
            className={`py-3 px-4 border-1 border-gray-400 rounded-l-2xl border-r-0 ${toggle === true ? "bg-[#E7FE29]" : ""}`}
          >
            Available
          </button>
          <button
            onClick={() => setToggle(false)}
            className={`py-3 px-4 border-1 border-gray-400 rounded-r-2xl border-l-0 ${toggle === false ? "bg-[#E7FE29]" : ""}`}
          >
            selected <span>{0}</span>
          </button>
        </div>
      </div>

      {toggle === true ? (
        <Suspense
          fallback={
            <span className="loading loading-spinner loading-xl"></span>
          }
        >
          <AvailablePlayers purchasedPlayers={purchasedPlayers} setPurchasedPlayers={setPurchasedPlayers} availableBalance={availableBalance} setAvailableBalance={setAvailableBalance} playersPromise={playersPromise}></AvailablePlayers>
        </Suspense>
      ) : (
        <SelectedPlayers purchasedPlayers={purchasedPlayers}></SelectedPlayers>
      )}
    </>
  );
}

export default App;
