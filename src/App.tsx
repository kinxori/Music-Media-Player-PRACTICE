import { useEffect, useState } from "react";
// import "./App.css";

const data = [
  {
    id: "1",
    song: "idk",
    artist: "idk",
    src: "/",
    genre: "idk",
  },
];
function App() {
  useEffect(() => {
    const getData = async () => {
      const response = await fetch("https://api.discogs.com/releases/249504");
      const data = await response.json();
      setData(data);
    };
    getData();
  }, []);

  const [isSuffle, setSuffle] = useState(false);
  const [isPaused, setPaused] = useState(false);
  const [isRepeat, setRepeat] = useState("1");
  const [isData, setData] = useState([{}]);

  console.log(isData);

  const handleSuffle = () => {
    setSuffle(!isSuffle);
  };
  const handlePaused = () => {
    setPaused(!isPaused);
  };
  const handleRepeat = () => {
    setRepeat(isRepeat === "1" ? "2" : isRepeat === "2" ? "3" : "1");
  };
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
            <button onClick={handleSuffle}>
              {isSuffle === false ? (
                <img
                  src="../ASSETS/shuffle-icon.png"
                  alt="suffle-icon"
                  className="h-[25px] object-cover invert hover:scale-105 opacity-50"
                ></img>
              ) : (
                <img
                  src="../ASSETS/shuffle-icon.png"
                  alt="suffle-icon"
                  className="h-[25px] object-cover invert hover:scale-105"
                ></img>
              )}
            </button>
            <button>
              <img
                src="../ASSETS/backward-icon.png"
                alt="backward-icon"
                className="h-[25px] object-cover invert hover:scale-105"
              ></img>
            </button>
            <button onClick={handlePaused}>
              {isPaused === false ? (
                <img
                  src="../ASSETS/play-icon.png"
                  alt="play-icon"
                  className="h-[30px] object-cover invert hover:scale-105"
                ></img>
              ) : (
                <img
                  src="../ASSETS/pause-icon.png"
                  alt="pause-icon"
                  className="h-[30px] object-cover invert hover:scale-105"
                ></img>
              )}
            </button>
            <button>
              <img
                src="../ASSETS/forward-icon.png"
                alt="forward-icon"
                className="h-[25px] object-cover invert hover:scale-105"
              ></img>
            </button>
            <button onClick={handleRepeat}>
              {isRepeat === "1" && (
                <img
                  src="../ASSETS/repeat-icon.png"
                  alt="repeat-icon"
                  className="h-[25px] object-cover invert hover:scale-105 opacity-50"
                ></img>
              )}
              {isRepeat === "2" && (
                <img
                  src="../ASSETS/repeat-icon.png"
                  alt="repeat-icon"
                  className="h-[25px] object-cover invert hover:scale-105"
                ></img>
              )}
              {isRepeat === "3" && (
                <img
                  src="../ASSETS/repeat-1-icon.png"
                  alt="repeat-1-icon"
                  className="h-[25px] object-cover invert hover:scale-105"
                ></img>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
