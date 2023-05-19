import { useEffect, useRef, useState } from "react";
import { data } from "./data.tsx";

function App() {
  const [isPlaying, setPlaying] = useState(false);
  const [isSuffle, setSuffle] = useState(false);
  const [isLiked, setLiked] = useState(false);
  const [isDisliked, setDisliked] = useState(false);
  const [isRepeat, setRepeat] = useState("repeat-off");
  const [currentPlaylist, setCurrentPlaylist] = useState(data);
  const [pastPlaylist, setPastPlaylist] = useState<any>([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentSong, setCurrentSong] = useState<any>(
    currentPlaylist[currentSongIndex]
  );
  const [totalTimeString, setTotalTime] = useState("00:00");
  const [restTimeString, setRestTime] = useState("00:00");
  const [maxRangeNumber, setMaxRange] = useState(0);
  const [currentRangeNumber, setCurrentRange] = useState(0);

  // Created refs to have the current information of each object -----------

  const currentAudioRef = useRef<HTMLAudioElement | any>();
  const currentSongId = useRef<any>({});

  //Updates the audio information to then write it in the DOM -----------

  const setCurrentSongTotalTime = () => {
    const totalMinutes = Math.floor(currentAudioRef.current.duration / 60);
    const totalSeconds = Math.floor(currentAudioRef.current.duration % 60);
    const formattedTotalTime = `${totalMinutes
      .toString()
      .padStart(2, "0")}:${totalSeconds.toString().padStart(2, "0")}`;
    setTotalTime(formattedTotalTime);
  };

  const setCurrentSongRestTime = () => {
    const rest = currentAudioRef.current.currentTime;
    const restMinutes = Math.floor(rest / 60);
    const restSeconds = Math.floor(rest % 60);
    const formattedRestTime = `${restMinutes
      .toString()
      .padStart(2, "0")}:${restSeconds.toString().padStart(2, "0")}`;
    setRestTime(formattedRestTime);
    setCurrentRange(rest);
  };

  const setCurrentSongMaxTime = () => {
    const maxDuration = currentAudioRef.current.duration;
    setMaxRange(maxDuration);
  };

  const handleInputRange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const audioPosition = parseFloat(event.target.value);
    currentAudioRef.current.currentTime = audioPosition;
    setCurrentRange(audioPosition);
    setCurrentSongRestTime();
  };

  useEffect(() => {
    currentAudioRef.current.addEventListener(
      "loadedmetadata",
      setCurrentSongMaxTime
    );
    currentAudioRef.current.addEventListener(
      "loadedmetadata",

      setCurrentSongTotalTime
    );
    currentAudioRef.current.addEventListener(
      "timeupdate",
      setCurrentSongRestTime
    );
    return () => {
      currentAudioRef.current.removeEventListener(
        "loadedmetadata",
        setCurrentSongMaxTime
      );
      currentAudioRef.current.removeEventListener(
        "loadedmetadata",

        setCurrentSongTotalTime
      );
      currentAudioRef.current.removeEventListener(
        "timeupdate",
        setCurrentSongRestTime
      );
    };
  }, [currentAudioRef.current]);

  //Updates currentSong object based on index -----------

  useEffect(() => {
    setCurrentSong(currentPlaylist[currentSongIndex]);
  }, [currentSongIndex]);

  //Controls Play state of audio -----------

  useEffect(() => {
    if (isPlaying) {
      currentAudioRef.current.play();
      currentAudioRef.current.addEventListener("canplay", () => {
        currentAudioRef.current.play();
      });
    } else {
      currentAudioRef.current.pause();
    }
    if (currentSongIndex < currentPlaylist.length - 1) {
      currentAudioRef.current.addEventListener("ended", () => {
        setAutoNextSongPlaying();
      });
    }
  }, [isPlaying, currentAudioRef.current, currentSongIndex]);

  const setAutoNextSongPlaying = () => {
    const updatedIndex = currentSongIndex + 1;
    setCurrentSongIndex(updatedIndex);
  };

  const handlePlayClick = () => {
    if (isPlaying === false) {
      setPlaying(true);
    } else {
      setPlaying(false);
    }
  };

  // const song = useMemo(()=>currentPlaylist[currentSongIndex]
  // ,[currentSongIndex]) // computar valores autom

  const handleBackwardClick = () => {
    if (currentAudioRef.current.currentTime <= 0 && currentSongIndex === 0) {
      return;
    }
    if (currentAudioRef.current.currentTime < 4) {
      if (currentSongIndex !== 0) {
        setCurrentSongIndex(currentSongIndex - 1);
      } else {
        currentAudioRef.current.currentTime = 0;
      }
    } else {
      currentAudioRef.current.currentTime = 0;
    }
  };

  const handleForwardClick = () => {
    if (currentSongIndex < currentPlaylist.length - 1) {
      if (currentAudioRef.current.paused) {
        const updatedIndex = currentSongIndex + 1;
        setCurrentSongIndex(updatedIndex);
        setPlaying(true);
      } else {
        const updatedIndex = currentSongIndex + 1;
        setCurrentSongIndex(updatedIndex);
      }
    }
  };

  const handleSuffleClick = () => {
    const clonedPlaylistToShuffle = currentPlaylist.slice();
    if (currentSongIndex < currentPlaylist.length - 1) {
      if (isSuffle === false) {
        const randomizedPlaylist = [
          ...clonedPlaylistToShuffle.slice(0, currentSongIndex + 1),
          ...clonedPlaylistToShuffle
            .slice(currentSongIndex + 1)
            .sort(() => Math.random() - 0.5),
        ];
        currentSongId.current = parseFloat(currentSong.id);
        console.log("random", randomizedPlaylist);

        setPastPlaylist(clonedPlaylistToShuffle);
        setCurrentPlaylist(randomizedPlaylist);
        setSuffle(!isSuffle);
      } else {
        console.log("original😲", pastPlaylist);
        setCurrentPlaylist(pastPlaylist);
        setCurrentSong(pastPlaylist[currentSongId.current - 1]);
        setSuffle(!isSuffle);
      }
    }
  };

  const handleRepeatClick = () => {
    setRepeat(
      isRepeat === "repeat-off"
        ? "repeat-on"
        : isRepeat === "repeat-on"
        ? "repeat-1-on"
        : "repeat-off"
    );
    if (isRepeat === "repeat-off") {
      console.log("off");
    } else if (
      isRepeat === "repeat-on" &&
      currentSongIndex < currentPlaylist.length - 1
    ) {
      console.log("repeat all");
    } else if (isRepeat === "repeat-1-on") {
      console.log("repeat 1");
    }
  };

  const handleLikedClick = () => {
    if (isDisliked === false) {
      setLiked(!isLiked);
    } else {
      setLiked(!isLiked);
      setDisliked(!isDisliked);
    }
  };

  const handleDislikedClick = () => {
    if (isLiked === false) {
      setDisliked(!isDisliked);
    } else {
      setLiked(!isLiked);
      setDisliked(!isDisliked);
    }
  };

  return (
    <section className="background bg-orange-200 h-screen w-screen flex justify-center items-center relative m-0">
      <div className="media-player h-[325px] w-[700px] bg-zinc-900 flex justify-evenly items-center relative  m-0 py-[20px] px-[0px] rounded-[45px] drop-shadow-[0px_0px_15px_rgba(0,0,0,.5)]">
        <div className="song-cover-img  w-[40%] object-cover bg-zinc-600 m-0 rounded-[30px] overflow-hidden">
          <img src={currentSong.cover} alt="song-cover" />
        </div>
        <div className="song-content  w-[50%] h-[100%] m-0 flex justify-center items-center flex-col">
          <div className="song-copy m-0  h-[90%] w-[100%]">
            <button className="song-copy h-min w-min ml-auto flex">
              <i className="fa-solid fa-music my-[10px] mx-[10px] text-[30px] hover:scale-105"></i>
            </button>
            <h2 className="text-[30px] font-bold px-[20px]">
              {currentSong.song}
            </h2>
            <h3 className="text-[16px] italic px-[20px]">
              {currentSong.artist}
            </h3>
            <div className="like-buttons w-[100%] flex gap-[20px] mt-[20px] px-[20px]">
              <button className="h-min w-min" onClick={handleDislikedClick}>
                {isDisliked === false ? (
                  <i className="fa-regular fa-thumbs-down text-[20px] hover:scale-105"></i>
                ) : (
                  <i className="fa-solid fa-thumbs-down text-[20px] hover:scale-105"></i>
                )}
              </button>
              <button className="h-min w-min " onClick={handleLikedClick}>
                {isLiked === false ? (
                  <i className="fa-regular fa-thumbs-up  text-[20px] hover:scale-105"></i>
                ) : (
                  <i className="fa-solid fa-thumbs-up text-[20px] hover:scale-105"></i>
                )}
              </button>
            </div>
          </div>
          <div className="song-range w-[85%]  h-[10%] flex flex-col justify-center items-center ">
            <audio
              src={currentSong.src}
              ref={currentAudioRef}
              onPlay={(event: any) => {
                event.target.volume = 0.1;
              }}
            />
            <input
              type="range"
              className=" w-full h-0.5 bg-grey rounded outline-none accent-white"
              min={0}
              max={maxRangeNumber}
              value={currentRangeNumber}
              onChange={handleInputRange}
            ></input>
            <div className="w-[100%] flex mt-[10px]">
              <span className=" text-[10px] w-[min] flex  mr-[auto] ">
                {restTimeString}
              </span>
              <span className=" text-[10px]  w-[min] flex ml-[auto] ">
                {totalTimeString}
              </span>
            </div>
          </div>
          <div className="song-buttons-actions m-0 h-[20%] w-[100%] flex justify-center items-center gap-[40px]">
            <button onClick={handleSuffleClick}>
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
            <button onClick={handleBackwardClick}>
              <img
                src="../ASSETS/backward-icon.png"
                alt="backward-icon"
                className={
                  currentAudioRef.current?.currentTime === 0 &&
                  currentSongIndex === 0
                    ? "h-[20px] object-cover invert opacity-50 cursor-default"
                    : "h-[20px] object-cover invert hover:scale-105"
                }
              ></img>
            </button>
            <button onClick={handlePlayClick}>
              {isPlaying === false ? (
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
            <button onClick={handleForwardClick}>
              <img
                src="../ASSETS/forward-icon.png"
                alt="forward-icon"
                className={
                  currentSongIndex === currentPlaylist.length - 1
                    ? "h-[20px] object-cover invert opacity-50 cursor-default"
                    : "h-[20px] object-cover invert hover:scale-105"
                }
              ></img>
            </button>
            <button onClick={handleRepeatClick}>
              {isRepeat === "repeat-off" ? (
                <img
                  src="../ASSETS/repeat-icon.png"
                  alt="repeat-icon"
                  className="h-[20px] object-cover invert hover:scale-105 opacity-50"
                ></img>
              ) : isRepeat === "repeat-on" ? (
                <img
                  src="../ASSETS/repeat-icon.png"
                  alt="repeat-icon"
                  className="h-[20px] object-cover invert hover:scale-105"
                ></img>
              ) : isRepeat === "repeat-1-on" ? (
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
