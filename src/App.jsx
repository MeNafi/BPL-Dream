import "./App.css";
import SelectedPlayers from "./components/AvailablePlayers/SelectedPlayers/SelectedPlayers";
import AvailablePlayers from "./components/AvailablePlayers/AvailablePlayers";
import Navbar from "./components/Navbar/Navbar";
import { Suspense, useState } from "react";
import { ToastContainer } from "react-toastify";
import Banner from "./components/Banner/Banner"; // Import Banne
import Footer from "./components/Footer/Footer";

const fetchPlayers = async () => {
  const res = await fetch("/players.json");
  return res.json();
};

const playersPromise = fetchPlayers();
function App() {
  const [availableBalance, setAvailableBalance] = useState(600000);
  const [toggle, setToggle] = useState(true);
  const [purchasedPlayers, setPurchasedPlayers] = useState([]);

  const removePlayer = (p) => {
    const fileteredData = purchasedPlayers.filter(
      (ply) => ply["player-name"] !== p["player-name"],
    );
    console.log(fileteredData);
    setPurchasedPlayers(fileteredData);
    setAvailableBalance(
      availableBalance +
        parseInt(p["price"].split("USD").join("").split(",").join("")),
    );
  };

  return (
    <>
      <Navbar availableBalance={availableBalance}></Navbar>

      {/* Banner added here - only shows when toggle is true */}
      {toggle && <Banner />}

      <div className="max-w-[1170px] mx-auto flex justify-between items-center mt-4">
        <h1 className="font-bold text-2xl">
          {toggle === true
            ? "Available Players"
            : `Selected Player (${purchasedPlayers.length}/6)`}
        </h1>

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
            selected <span>{purchasedPlayers.length}</span>
          </button>
        </div>
      </div>

      {toggle === true ? (
        <Suspense
          fallback={
            <span className="loading loading-spinner loading-xl"></span>
          }
        >
          <AvailablePlayers
            purchasedPlayers={purchasedPlayers}
            setPurchasedPlayers={setPurchasedPlayers}
            availableBalance={availableBalance}
            setAvailableBalance={setAvailableBalance}
            playersPromise={playersPromise}
          ></AvailablePlayers>
        </Suspense>
      ) : (
        <SelectedPlayers
          removePlayer={removePlayer}
          purchasedPlayers={purchasedPlayers}
        ></SelectedPlayers>
      )}
      
      {/* This is the footer section part */}
      <main className="max-w-[1170px] mx-auto pb-10">
        {/* Players Grid Here */}
      </main>
      <Footer />
      {/* End Footer section part */}

      <ToastContainer />
    </>
  );
}

export default App;
