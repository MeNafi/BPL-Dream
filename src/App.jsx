import './App.css'
import navImg from "./assets/logo.png"


function App() {
  

  return (
    <>
     <div className="navbar bg-base-100 shadow-sm">
  <div className="flex-1">
    <a className="text-xl">
      <img className = "w-[60px] h-[60px]"src={navImg} alt="" />
    </a>
  </div>
  <div className="flex-none">
    <span>6000000000</span>
    <span>Coin</span>
  </div>
</div>
    </>
  )
}

export default App
