import { useState, useEffect } from "react";
// import "./App.css";

function App() {
  const [isSuffle, setSuffle] = useState(null);
  const [isPaused, setPaused] = useState(null);
  const [isRepeat, setRepeat] = useState(null);

  return (
    <section className="background bg-orange-200 h-screen w-screen flex justify-center items-center relative m-0">
      <div className="media-player h-[350px] w-[700px] bg-zinc-900 flex justify-evenly items-center relative  m-0 py-[20px] px-[0px] rounded-[20px] drop-shadow-[0px_0px_15px_rgba(0,0,0,.5)]">
        <div className="song-cover-img w-[40%] h-[100%] object-cover bg-zinc-600 m-0 rounded-[20px]">
          <img src="" alt="song-cover" />
        </div>
        <div className="song-content bg-zinc-600 w-[50%] h-[100%] m-0 flex justify-center items-center flex-col">
          <div className="song-copy m-0  h-[65%] w-[100%]">
            <button className="song-copy h-min w-min ml-auto flex">
              <i className="fa-solid fa-music my-[10px] mx-[10px] text-[30px] hover:scale-105"></i>
            </button>
            <h2 className="text-[30px] font-bold mt-[20px] px-[20px]">Song</h2>
            <h3 className="text-[18px] italic px-[20px]">artist</h3>
          </div>
          <div className="song-range m-0 h-[15%] w-[100%] flex justify-center items-center">
            <button className="h-min w-min flex">
              <i className="fa-regular fa-thumbs-down mx-[15px] text-[20px] hover:scale-105"></i>
              {/* <i class="fa-solid fa-thumbs-down"></i> */}
            </button>
            <span className="mx-[10px] text-[12px]">00:00</span>
            <input type="range"></input>
            <span className="mx-[10px] text-[12px]">00:00</span>
            <button>
              <i className="fa-regular fa-thumbs-up mx-[15px] text-[20px] hover:scale-105"></i>
              {/* <i class="fa-solid fa-thumbs-up"></i> */}
            </button>
          </div>
          <div className="song-buttons-actions m-0 h-[20%] w-[100%] flex justify-center items-center gap-[20px]">
            <button>
              <img
                src="../ASSETS/shuffle-icon.png"
                alt="suffle-icon"
                className="h-[25px] object-cover invert hover:scale-105"
              ></img>
            </button>
            <button>
              <img
                src="../ASSETS/backward-icon.png"
                alt="backward-icon"
                className="h-[25px] object-cover invert hover:scale-105"
              ></img>
            </button>
            <button>
              <img
                src="../ASSETS/play-icon.png"
                alt="play-icon"
                className="h-[30px] object-cover invert hover:scale-105"
              ></img>
            </button>
            <button>
              <img
                src="../ASSETS/forward-icon.png"
                alt="forward-icon"
                className="h-[25px] object-cover invert hover:scale-105"
              ></img>
            </button>
            <button>
              <img
                src="../ASSETS/repeat-icon.png"
                alt="repeat-icon"
                className="h-[25px] object-cover invert hover:scale-105"
              ></img>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
