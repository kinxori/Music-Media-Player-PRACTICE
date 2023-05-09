import { ReactNode, useEffect, useState } from "react";
import img1 from "./../ASSETS/cover-imgs/cover-img-song-1.jpg";
import img2 from "./../ASSETS/cover-imgs/cover-img-song-2.jpg";
import img3 from "./../ASSETS/cover-imgs/cover-img-song-3.jpg";
import img4 from "./../ASSETS/cover-imgs/cover-img-song-4.jpg";
import img5 from "./../ASSETS/cover-imgs/cover-img-song-5.jpg";
import img6 from "./../ASSETS/cover-imgs/cover-img-song-6.jpg";
import img7 from "./../ASSETS/cover-imgs/cover-img-song-7.jpg";
import img8 from "./../ASSETS/cover-imgs/cover-img-song-8.jpg";
import img9 from "./../ASSETS/cover-imgs/cover-img-song-9.jpg";
import img10 from "./../ASSETS/cover-imgs/cover-img-song-10.jpg";
import song1 from "./../ASSETS/songs/CustomMelody - Bad Guys.wav";
import song2 from "./../ASSETS/songs/URL Melt - Unicorn Heads.mp3";
import song3 from "./../ASSETS/songs/cyber by liquify Artlist.mp3";
import song4 from "./../ASSETS/songs//cyber-runner by 2050 Artlist.mp3";
import song5 from "./../ASSETS/songs/garage-sale by alex-zado Artlist.wav";
import song6 from "./../ASSETS/songs/mon by brad-cane Artlist.mp3";
import song7 from "./../ASSETS/songs/mythologica by ofrin Artlist.mp3";
import song8 from "./../ASSETS/songs/rising-up by ofrin Artlist.mp3";
import song9 from "./../ASSETS/songs/strength-men by lux-inspira Artlist.mp3";
import song10 from "./../ASSETS/songs/zone by fvmeless Artlist.mp3";

// prettier-ignore
const data = [
  {
    id: "1", song: "Custom Melody", artist: "Bad Guys", src: song1,  cover: img7
  },
  {
    id: "2", song: "URL Melt", artist: "Unicorn Heads", src: song2, cover: img3
  },
  {
    id: "3", song: "Cyber", artist: "Liquify", src: song3, cover: img4
  },
  {
    id: "4", song: "Cyber Runner", artist: "2050", src: song4, cover: img2
  },
  {
    id: "5", song: "Garage Sale", artist: "Alex Zado", src: song5, cover: img10
  },
  {
    id: "6", song: "Mon", artist: "Brad Cane", src:song6, cover: img6
  },
  {
    id: "7", song: "Mythologica", artist: "Ofrin", src: song7, cover: img1  
  },
  {
    id: "8", song: "Rising Up", artist: "Arlist", src: song8, cover: img9
  },
  {
    id: "9", song: "Strenght Men", artist: "Lux Inspira", src: song9, cover: img8
  },
  {
    id: "10", song: "Zone", artist: "Fvmeless", src: song10,  cover: img5
  },
];
// prettier-ignore-end

function App() {
  const [isSuffle, setSuffle] = useState(false);
  const [isPaused, setPaused] = useState(false);
  const [isRepeat, setRepeat] = useState("1");
  const [isTotalTime, setTotalTime] = useState("");
  const [isSong, setSong] = useState({
    id: "",
    song: "",
    artist: "",
    src: "",
    cover: "",
  });

  useEffect(() => {
    setSong(data[1]);
    const defaultPlaylist = () => {
      const index = 0;
      const nextIndex = index === data.length - 1 ? 0 : index + 1;
      const nextSong = data[nextIndex];
      setSong(nextSong);
      setTimeout(defaultPlaylist, nextSong.src.length * 1000);
    };
  }, [data]);

  useEffect(() => {
    const toAudio = new Audio(isSong.src);
    toAudio.addEventListener("loadedmetadata", () => {
      const minutes = Math.floor(toAudio.duration / 60);
      const seconds = Math.floor(toAudio.duration % 60);
      const formattedTotalTime = `${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
      setTotalTime(formattedTotalTime);
    });
  }, [isSong.src]);

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
        <div className="song-cover-img w-[40%] object-cover bg-zinc-600 m-0 rounded-[20px] overflow-hidden">
          <img src={isSong.cover} alt="song-cover" />
        </div>
        <div className="song-content w-[50%] h-[100%] m-0 flex justify-center items-center flex-col">
          <div className="song-copy m-0  h-[65%] w-[100%]">
            <button className="song-copy h-min w-min ml-auto flex">
              <i className="fa-solid fa-music my-[10px] mx-[10px] text-[30px] hover:scale-105"></i>
            </button>
            <h2 className="text-[30px] font-bold mt-[20px] px-[20px]">
              {isSong.song}
            </h2>
            <h3 className="text-[18px] italic px-[20px]">{isSong.artist}</h3>
          </div>
          <div className="song-range m-0 h-[15%] w-[100%] flex justify-center items-center">
            <button className="h-min w-min flex">
              <i className="fa-regular fa-thumbs-down mx-[15px] text-[20px] hover:scale-105"></i>
              {/* <i class="fa-solid fa-thumbs-down"></i> */}
            </button>
            <span className="mx-[10px] text-[12px]">{isSong.song}</span>
            <input type="range"></input>
            <span className="mx-[10px] text-[12px]">{isTotalTime}</span>
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
