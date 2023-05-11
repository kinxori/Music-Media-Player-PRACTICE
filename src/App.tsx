import { useEffect, useState } from "react";
import { data } from "./data.tsx";

function App() {
  const [isPausedBtn, setPausedBtn] = useState(false);
  const [isSuffle, setSuffle] = useState(false);
  const [isLiked, setLiked] = useState(false);
  const [isDisliked, setDisliked] = useState(false);
  const [isRepeat, setRepeat] = useState("1");
  const [currentPlaylist, setCurrentPlaylist] = useState(data);
  const [currentSong, setCurrentSong] = useState(currentPlaylist[0]);
  const [currentAudio, setCurrentAudio] = useState<any>(
    new Audio(currentPlaylist[0].src)
  );
  const [isTotalTime, setTotalTime] = useState("");
  const [isRestTime, setRestTime] = useState("00:00");
  const [isMaxRange, setMaxRange] = useState(0);
  const [isCurrentRange, setCurrentRange] = useState(0);

  // console.log("max", isMaxRange);
  // console.log("CurrentRange", isCurrentRange);

  const setCurrentSongTotalTime = (audio: HTMLAudioElement) => {
    audio.addEventListener("loadedmetadata", () => {
      const totalMinutes = Math.floor(audio.duration / 60);
      const totalSeconds = Math.floor(audio.duration % 60);
      const formattedTotalTime = `${totalMinutes
        .toString()
        .padStart(2, "0")}:${totalSeconds.toString().padStart(2, "0")}`;
      setTotalTime(formattedTotalTime);
    });
  };

  const setCurrentSongRestTime = (audio: HTMLAudioElement) => {
    audio.addEventListener("timeupdate", () => {
      const rest = audio.currentTime;
      const restMinutes = Math.floor(rest / 60);
      const restSeconds = Math.floor(rest % 60);
      const formattedRestTime = `${restMinutes
        .toString()
        .padStart(2, "0")}:${restSeconds.toString().padStart(2, "0")}`;
      setRestTime(formattedRestTime);
      setCurrentRange(rest);
    });
  };

  const setCurrentSongMaxTime = (audio: HTMLAudioElement) => {
    audio.addEventListener("loadedmetadata", () => {
      const maxDuration = audio.duration;
      setMaxRange(maxDuration);
    });
  };

  useEffect(() => {
    setCurrentSongTotalTime(currentAudio);
    setCurrentSongMaxTime(currentAudio);
    setCurrentSongRestTime(currentAudio);
  }, [currentAudio]);

  const handleInputRange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const position = parseFloat(event.target.value);
    currentAudio.currentTime = position;
    setCurrentRange(position);
    setCurrentSongRestTime(currentAudio);
  };

  const handlePaused = () => {
    if (currentAudio.paused) {
      currentAudio.play();
      setPausedBtn(!isPausedBtn);
    } else {
      currentAudio.pause();
      setPausedBtn(!isPausedBtn);
    }
  };

  const handleNextSong = () => {
    const findIndex = currentPlaylist.indexOf(currentSong) + 1;
    if (findIndex !== currentPlaylist.length) {
      const sumIndex = findIndex;
      setCurrentSong(currentPlaylist[sumIndex]);
      setCurrentRange(0);
      setRestTime("00:00");
      setCurrentAudio(new Audio(currentPlaylist[sumIndex].src));
      setCurrentSongTotalTime(new Audio(currentPlaylist[sumIndex].src));
      setCurrentSongRestTime(new Audio(currentPlaylist[sumIndex].src));
      setCurrentSongMaxTime(new Audio(currentPlaylist[sumIndex].src));
    }
  };

  const handleSuffle = () => {
    setSuffle(!isSuffle);
  };

  const handleRepeat = () => {
    setRepeat(isRepeat === "1" ? "2" : isRepeat === "2" ? "3" : "1");
  };

  const handleLiked = () => {
    setLiked(!isLiked);
  };

  const handleDisliked = () => {
    setDisliked(!isDisliked);
  };

  return (
    <section className="background bg-orange-200 h-screen w-screen flex justify-center items-center relative m-0">
      <div className="media-player h-[350px] w-[700px] bg-zinc-900 flex justify-evenly items-center relative  m-0 py-[20px] px-[0px] rounded-[20px] drop-shadow-[0px_0px_15px_rgba(0,0,0,.5)]">
        <div className="song-cover-img w-[40%] object-cover bg-zinc-600 m-0 rounded-[20px] overflow-hidden">
          <img src={currentSong.cover} alt="song-cover" />
        </div>
        <div className="song-content  w-[50%] h-[100%] m-0 flex justify-center items-center flex-col">
          <div className="song-copy m-0  h-[80%] w-[100%]">
            <button className="song-copy h-min w-min ml-auto flex">
              <i className="fa-solid fa-music my-[10px] mx-[10px] text-[30px] hover:scale-105"></i>
            </button>
            <h2 className="text-[30px] font-bold mt-[20px] px-[20px]">
              {currentSong.song}
            </h2>
            <h3 className="text-[18px] italic px-[20px]">
              {currentSong.artist}
            </h3>
            <div className="like-buttons w-[100%] flex gap-[20px] mt-[20px] px-[20px]">
              <button className="h-min w-min" onClick={handleDisliked}>
                {isDisliked === false ? (
                  <i className="fa-regular fa-thumbs-down text-[20px] hover:scale-105"></i>
                ) : (
                  <i className="fa-solid fa-thumbs-down text-[20px] hover:scale-105"></i>
                )}
              </button>
              <button className="h-min w-min " onClick={handleLiked}>
                {isLiked === false ? (
                  <i className="fa-regular fa-thumbs-up  text-[20px] hover:scale-105"></i>
                ) : (
                  <i className="fa-solid fa-thumbs-up text-[20px] hover:scale-105"></i>
                )}
              </button>
            </div>
          </div>
          <div className="song-range w-[85%]  h-[auto] flex flex-col justify-center items-center ">
            <input
              type="range"
              className=" w-full h-0.5 bg-grey rounded outline-none accent-white"
              min={0}
              max={isMaxRange}
              value={isCurrentRange}
              onChange={handleInputRange}
            ></input>
            <div className="w-[100%] flex mt-[10px]">
              <span className=" text-[10px] w-[min] flex  mr-[auto] ">
                {isRestTime}
              </span>
              <span className=" text-[10px]  w-[min] flex ml-[auto] ">
                {isTotalTime}
              </span>
            </div>
          </div>
          <div className="song-buttons-actions m-0 h-[20%] w-[100%] flex justify-center items-center gap-[40px]">
            <button onClick={handleSuffle}>
              {isSuffle === false ? (
                <img
                  src="../ASSETS/shuffle-icon.png"
                  alt="suffle-icon"
                  className="h-[20px] object-cover invert hover:scale-105 opacity-50"
                ></img>
              ) : (
                <img
                  src="../ASSETS/shuffle-icon.png"
                  alt="suffle-icon"
                  className="h-[20px] object-cover invert hover:scale-105"
                ></img>
              )}
            </button>
            <button>
              <img
                src="../ASSETS/backward-icon.png"
                alt="backward-icon"
                className="h-[20px] object-cover invert hover:scale-105"
              ></img>
            </button>
            <button onClick={handlePaused}>
              {isPausedBtn === false ? (
                <img
                  src="../ASSETS/play-icon.png"
                  alt="play-icon"
                  className="h-[25px] object-cover invert hover:scale-105"
                ></img>
              ) : (
                <img
                  src="../ASSETS/pause-icon.png"
                  alt="pause-icon"
                  className="h-[25px] object-cover invert hover:scale-105"
                ></img>
              )}
            </button>
            <button>
              <img
                src="../ASSETS/forward-icon.png"
                alt="forward-icon"
                className="h-[20px] object-cover invert hover:scale-105"
                onClick={handleNextSong}
              ></img>
            </button>
            <button onClick={handleRepeat}>
              {isRepeat === "1" ? (
                <img
                  src="../ASSETS/repeat-icon.png"
                  alt="repeat-icon"
                  className="h-[20px] object-cover invert hover:scale-105 opacity-50"
                ></img>
              ) : isRepeat === "2" ? (
                <img
                  src="../ASSETS/repeat-icon.png"
                  alt="repeat-icon"
                  className="h-[20px] object-cover invert hover:scale-105"
                ></img>
              ) : isRepeat === "3" ? (
                <img
                  src="../ASSETS/repeat-1-icon.png"
                  alt="repeat-1-icon"
                  className="h-[20px] object-cover invert hover:scale-105"
                ></img>
              ) : (
                <img
                  src="../ASSETS/repeat-icon.png"
                  alt="repeat-icon"
                  className="h-[20px] object-cover invert hover:scale-105 opacity-50"
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
