import { useEffect, useRef, useState } from "react";
import { data } from "./data.tsx";

function App() {
  // const [isLiked, setLiked] = useState(false);
  // const [isDisliked, setDisliked] = useState(false);
  const [isPlaying, setPlaying] = useState(false);
  const [isSuffle, setSuffle] = useState(false);
  const [isRepeat, setRepeat] = useState("repeat-off");
  const [currentPlaylist, setCurrentPlaylist] = useState(data);
  const [currentIndexSong, setCurrentIndexSong] = useState(0);
  const [currentIDsong, setCurrentIDsong] = useState(currentIndexSong + 1);
  const [currentSong, setCurrentSong] = useState(currentPlaylist[currentIndexSong]);
  const [songTotalTime, setSongTotalTime] = useState("00:00");
  const [songRestTime, setSongRestTime] = useState("00:00");
  const [songMaxTime, setSongMaxTime] = useState(0);
  const [songCurrentTime, setSongCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isVolumeDisplay, setIsVolumeDisplay] = useState(false);

  // Created refs to have the current information of each object 👺

  const currentAudioRef = useRef<HTMLMediaElement | any>();
  const isMouseEnteredRef = useRef<Boolean>(false);

  //Updates the audio information to then write it in the DOM 👺

  const setCurrentSongTotalTime = () => {
    if (currentAudioRef.current) {
      const totalMinutes = Math.floor(currentAudioRef.current.duration / 60);
      const totalSeconds = Math.floor(currentAudioRef.current.duration % 60);
      const formattedTotalTime = `${totalMinutes.toString().padStart(2, "0")}:${totalSeconds
        .toString()
        .padStart(2, "0")}`;
      setSongTotalTime(formattedTotalTime);
    }
  };

  const setCurrentSongRestTime = () => {
    if (currentAudioRef.current) {
      const rest = currentAudioRef.current.currentTime;
      const restMinutes = Math.floor(rest / 60);
      const restSeconds = Math.floor(rest % 60);
      const formattedRestTime = `${restMinutes.toString().padStart(2, "0")}:${restSeconds
        .toString()
        .padStart(2, "0")}`;
      setSongRestTime(formattedRestTime);
      setSongCurrentTime(rest);
    }
  };

  const setCurrentSongMaxTime = () => {
    if (currentAudioRef.current) {
      const maxDuration = currentAudioRef.current.duration;
      setSongMaxTime(maxDuration);
    }
  };

  const handleInputRange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (currentAudioRef.current) {
      const audioPosition = parseFloat(event.target.value);
      currentAudioRef.current.currentTime = audioPosition;
      setSongCurrentTime(audioPosition);
      setCurrentSongRestTime();
    }
  };

  useEffect(() => {
    currentAudioRef.current.addEventListener("loadedmetadata", setCurrentSongMaxTime);
    currentAudioRef.current.addEventListener(
      "loadedmetadata",

      setCurrentSongTotalTime
    );
    currentAudioRef.current.addEventListener("timeupdate", setCurrentSongRestTime);
    return () => {
      currentAudioRef.current.removeEventListener("loadedmetadata", setCurrentSongMaxTime);
      currentAudioRef.current.removeEventListener(
        "loadedmetadata",

        setCurrentSongTotalTime
      );
      currentAudioRef.current.removeEventListener("timeupdate", setCurrentSongRestTime);
    };
  }, [currentAudioRef.current]);

  //Updates currentSong object based on index globally👺

  useEffect(() => {
    setCurrentSong(currentPlaylist[currentIndexSong]);
  }, [currentIndexSong]);

  //Controls autoPlay state of audio depending of repeat value 👺

  useEffect(() => {
    const handleAudioEnded = () => {
      if (isRepeat === "repeat-off") {
        if (currentIndexSong === currentPlaylist.length - 1) {
          return;
        } else {
          const updatedIndex = currentIndexSong + 1;
          setCurrentIndexSong(updatedIndex);
          setCurrentIDsong(parseFloat(currentPlaylist[updatedIndex].id));
          currentAudioRef.current.addEventListener("canplay", () => {
            currentAudioRef.current.play();
          });
        }
      } else if (isRepeat === "repeat-all") {
        if (currentIndexSong < currentPlaylist.length - 1) {
          const updatedIndex = currentIndexSong + 1;
          setCurrentIndexSong(updatedIndex);
          setCurrentIDsong(parseFloat(currentPlaylist[updatedIndex].id));
          currentAudioRef.current.addEventListener("canplay", () => {
            currentAudioRef.current.play();
          });
        } else {
          setCurrentIndexSong(0);
          setCurrentIDsong(1);
          currentAudioRef.current.addEventListener("canplay", () => {
            currentAudioRef.current.play();
          });
        }
      } else if (isRepeat === "repeat-1") {
        currentAudioRef.current.currentTime = 0;
        currentAudioRef.current.addEventListener("canplay", () => {
          currentAudioRef.current.play();
        });
      }
    };

    currentAudioRef.current.addEventListener("ended", handleAudioEnded);
    return () => {
      currentAudioRef.current.removeEventListener("ended", handleAudioEnded);
    };
  }, [isRepeat, currentPlaylist, currentAudioRef, currentIndexSong]);

  //Controls Play state of audio 👺

  useEffect(() => {
    if (isPlaying) {
      if (currentIndexSong === 0) {
        currentAudioRef.current?.play();
      } else
        currentAudioRef.current?.addEventListener("canplay", () => {
          currentAudioRef.current?.play();
        });
    } else {
      currentAudioRef.current?.pause();
      setPlaying(false);
    }
  }, [isPlaying, currentAudioRef.current]);

  const handlePlayClick = () => {
    if (isPlaying === false) {
      setPlaying(true);
    } else {
      setPlaying(false);
    }
  };

  const handleBackwardClick = () => {
    if (currentAudioRef.current.currentTime <= 0 && currentIndexSong === 0) {
      return;
    }
    if (currentAudioRef.current.currentTime < 4) {
      if (currentIndexSong !== 0) {
        const updatedIndex = currentIndexSong - 1;
        setCurrentIndexSong(updatedIndex);
        setCurrentIDsong(parseFloat(currentPlaylist[updatedIndex].id));
      } else {
        currentAudioRef.current.currentTime = 0;
      }
    } else {
      currentAudioRef.current.currentTime = 0;
    }
  };

  const handleForwardClick = () => {
    if (isRepeat === "repeat-off" || "repeat-1") {
      if (currentIndexSong < currentPlaylist.length - 1) {
        if (currentAudioRef.current.paused) {
          const updatedIndex = currentIndexSong + 1;
          setCurrentIndexSong(updatedIndex);
          setPlaying(true);
          setCurrentIDsong(parseFloat(currentPlaylist[updatedIndex].id));
        } else {
          const updatedIndex = currentIndexSong + 1;
          setCurrentIndexSong(updatedIndex);
          setCurrentIDsong(parseFloat(currentPlaylist[updatedIndex].id));
        }
      }
    }
    if (isRepeat === "repeat-all") {
      if (currentIndexSong < currentPlaylist.length - 1) {
        if (currentAudioRef.current.paused) {
          const updatedIndex = currentIndexSong + 1;
          setCurrentIndexSong(updatedIndex);
          setPlaying(true);
          setCurrentIDsong(parseFloat(currentPlaylist[updatedIndex].id));
        } else {
          const updatedIndex = currentIndexSong + 1;
          setCurrentIndexSong(updatedIndex);
          setCurrentIDsong(parseFloat(currentPlaylist[updatedIndex].id));
        }
      } else {
        setCurrentIndexSong(0);
        setCurrentIDsong(1);
      }
    }
  };

  const handleRepeatClick = () => {
    if (isRepeat === "repeat-off") {
      setRepeat("repeat-all");
    } else if (isRepeat === "repeat-all") {
      setRepeat("repeat-1");
    } else if (isRepeat === "repeat-1") {
      setRepeat("repeat-off");
    }
  };

  // console.log("playlist?🥸", currentPlaylist);
  // console.log("index?🥸", currentIndexSong);
  // console.log("ID?🚀", currentIDsong);

  const handleSuffleClick = () => {
    if (!isSuffle) {
      console.log("works?------------🤡");
      const clonedPlaylistToShuffle = currentPlaylist.slice();
      const randomizedPlaylist = [
        clonedPlaylistToShuffle[currentIndexSong],
        ...clonedPlaylistToShuffle.slice(0, currentIndexSong),
        ...clonedPlaylistToShuffle.slice(currentIndexSong + 1).sort(() => Math.random() - 0.5),
      ];
      setCurrentPlaylist(randomizedPlaylist);
      setSuffle(true);
    } else {
      setSuffle(false);
      setCurrentPlaylist(data);
      setCurrentIndexSong(currentIDsong - 1);
      console.log("works?------------🤡");
    }
  };

  const handleVolume = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    if (!isNaN(newVolume) && isFinite(newVolume)) {
      currentAudioRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  useEffect(() => {
    currentAudioRef.current.addEventListener("loadedmetadata", handleVolume);
    return () => {
      currentAudioRef.current.removeEventListener("loadedmetadata", handleVolume);
    };
  }, []);

  const handleMouseEnter = () => {
    isMouseEnteredRef.current = true;
    setIsVolumeDisplay(true);
  };

  const handleMouseLeave = () => {
    setIsVolumeDisplay(false);
  };

  //maybe later 🥲
  //
  // const handleLikedClick = () => {
  //   if (isDisliked === false) {
  //     setLiked(!isLiked);
  //   } else {
  //     setLiked(!isLiked);
  //     setDisliked(!isDisliked);
  //   }
  // };

  // const handleDislikedClick = () => {
  //   if (isLiked === false) {
  //     setDisliked(!isDisliked);
  //   } else {
  //     setLiked(!isLiked);
  //     setDisliked(!isDisliked);
  //   }
  // };

  return (
    <section className="background bg-orange-200 h-screen w-screen flex justify-center items-center relative m-0">
      <div className="media-player h-[325px] w-[700px] bg-zinc-900 flex justify-evenly items-center relative  m-0 py-[20px] px-[0px] rounded-[45px] drop-shadow-[0px_0px_15px_rgba(0,0,0,.5)]">
        <div className="song-cover-img  w-[40%] object-cover bg-zinc-600 m-0 rounded-[30px] overflow-hidden">
          <img src={currentSong.cover} alt="song-cover" />
        </div>
        <div className="song-content  w-[50%] h-[100%] m-0 flex justify-center items-center flex-col">
          <div className="song-copy m-0  h-[80%] w-[100%] relative ">
            <button className="h-min w-min ml-auto flex">
              <i className="fa-solid fa-music my-[10px] mx-[10px] text-[30px] hover:scale-105"></i>
            </button>
            <div className="flex w-[100%] h-[70%] ">
              <div>
                <h2 className="text-[30px] font-bold px-[20px]">{currentSong.song}</h2>
                <h3 className="text-[16px] italic px-[20px]">{currentSong.artist}</h3>
              </div>
              <div className="h-[100px] w-[30px] m-[10px] ml-auto mt-auto flex flex-col relative ">
                {isVolumeDisplay && (
                  <div
                    className="h-[100px] w-[30px] absolute  "
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={handleVolume}
                      className="rotate-[-90deg] w-[60px] h-2 accent-white absolute top-[30px] left-[-16px] "
                    ></input>
                  </div>
                )}
                <button
                  className="h-min w-min flex mt-auto"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {volume === 0 ? (
                    <i className="fa-solid fa-volume-xmark hover:scale-105 text-[20px]"></i>
                  ) : (
                    <i className="fa-solid fa-volume-high hover:scale-105 text-[20px]"></i>
                  )}
                </button>
              </div>
              {/* <div className="like-buttons w-[100%] flex gap-[20px] mt-[20px] px-[20px]">
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
            </div> */}
            </div>
          </div>
          <div className="song-range w-[85%]  h-[20%] flex flex-col justify-center items-center ">
            <audio src={currentSong.src} ref={currentAudioRef} />
            <input
              type="range"
              className=" w-full h-0.5 bg-grey rounded outline-none accent-white"
              min={0}
              max={songMaxTime}
              value={songCurrentTime}
              onChange={handleInputRange}
            ></input>
            <div className="w-[100%] flex mt-[10px]">
              <span className=" text-[10px] w-[min] flex  mr-[auto] ">{songRestTime}</span>
              <span className=" text-[10px]  w-[min] flex ml-[auto] ">{songTotalTime}</span>
            </div>
          </div>
          <div className="song-buttons-actions m-0 h-[20%] w-[100%] flex justify-center items-center gap-[40px]">
            <button onClick={handleSuffleClick}>
              <img
                src="../ASSETS/shuffle-icon.png"
                alt="suffle-icon"
                className={
                  isSuffle
                    ? "h-[20px] object-cover invert hover:scale-105"
                    : "h-[20px] object-cover invert hover:scale-105 opacity-50"
                }
              ></img>
            </button>
            <button onClick={handleBackwardClick}>
              <img
                src="../ASSETS/backward-icon.png"
                alt="backward-icon"
                className={
                  currentAudioRef.current?.currentTime === 0 && currentIndexSong === 0
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
                  isRepeat === "repeat-all"
                    ? "h-[20px] object-cover invert hover:scale-105"
                    : currentIndexSong === currentPlaylist.length - 1
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
              ) : isRepeat === "repeat-all" ? (
                <img
                  src="../ASSETS/repeat-icon.png"
                  alt="repeat-icon"
                  className="h-[20px] object-cover invert hover:scale-105"
                ></img>
              ) : isRepeat === "repeat-1" ? (
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
