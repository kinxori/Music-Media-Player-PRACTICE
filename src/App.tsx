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
  const [currentSong, setCurrentSong] = useState(
    currentPlaylist[currentSongIndex]
  );
  const [totalTimeString, setTotalTime] = useState("00:00");
  const [restTimeString, setRestTime] = useState("00:00");
  const [maxRangeNumber, setMaxRange] = useState(0);
  const [currentRangeNumber, setCurrentRange] = useState(0);

  const currentAudioRef = useRef<HTMLAudioElement | any>();
  const currentSongId = useRef<number>(0);

  const setCurrentSongTotalTime = () => {
    currentAudioRef.current.addEventListener("loadedmetadata", () => {
      const totalMinutes = Math.floor(currentAudioRef.current.duration / 60);
      const totalSeconds = Math.floor(currentAudioRef.current.duration % 60);
      const formattedTotalTime = `${totalMinutes
        .toString()
        .padStart(2, "0")}:${totalSeconds.toString().padStart(2, "0")}`;
      setTotalTime(formattedTotalTime);
    });
  };

  const setCurrentSongRestTime = () => {
    currentAudioRef.current.addEventListener("timeupdate", () => {
      const rest = currentAudioRef.current.currentTime;
      const restMinutes = Math.floor(rest / 60);
      const restSeconds = Math.floor(rest % 60);
      const formattedRestTime = `${restMinutes
        .toString()
        .padStart(2, "0")}:${restSeconds.toString().padStart(2, "0")}`;
      setRestTime(formattedRestTime);
      setCurrentRange(rest);
    });
  };

  const setCurrentSongMaxTime = () => {
    currentAudioRef.current.addEventListener("loadedmetadata", () => {
      const maxDuration = currentAudioRef.current.duration;
      setMaxRange(maxDuration);
    });
  };

  useEffect(() => {
    setCurrentSongTotalTime();
    setCurrentSongMaxTime();
    setCurrentSongRestTime();
  }, [currentAudioRef.current]);

  const setAutoNextSongPlaying = () => {
    const updatedIndex = currentSongIndex + 1;
    setCurrentSongIndex(updatedIndex);
    setCurrentSong(currentPlaylist[updatedIndex]);
    currentAudioRef.current.addEventListener("canplay", () => {
      currentAudioRef.current.play();
    });
  };

  if (currentAudioRef.current) {
    currentAudioRef.current.addEventListener("timeupdate", () => {
      if (
        currentAudioRef.current.currentTime === currentAudioRef.current.duration
      ) {
        if (currentSongIndex < currentPlaylist.length - 1) {
          setAutoNextSongPlaying();
        } else {
          setPlaying(!isPlaying);
        }
      }
    });
  }

  const handleInputRange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const audioPosition = parseFloat(event.target.value);
    currentAudioRef.current.currentTime = audioPosition;
    setCurrentRange(audioPosition);
    setCurrentSongRestTime();
  };

  const handlePlayClick = () => {
    if (currentAudioRef.current.paused) {
      currentAudioRef.current.play();
      setPlaying(!isPlaying);
    } else {
      currentAudioRef.current.pause();
      setPlaying((prev) => !prev);
    }
  };

  const handleBackwardClick = () => {
    if (currentSongIndex > 0) {
      if (currentAudioRef.current.currentTime > 4) {
        currentAudioRef.current.currentTime = 0;
        currentAudioRef.current.pause(); //mmmmmh 😵‍💫
      }
      if (
        currentAudioRef.current.paused &&
        currentAudioRef.current.currentTime < 4
      ) {
        const updatedIndex = currentSongIndex - 1;
        setCurrentSongIndex(updatedIndex);
        setCurrentSong(currentPlaylist[updatedIndex]);
        setPlaying(!isPlaying);
      }
      if (
        !currentAudioRef.current.paused &&
        currentAudioRef.current.currentTime < 4
      ) {
        const updatedIndex = currentSongIndex - 1;
        setCurrentSongIndex(updatedIndex);
        setCurrentSong(currentPlaylist[updatedIndex]);
      }
    }
    if (currentAudioRef.current.currentTime > 0 && currentSongIndex === 0) {
      currentAudioRef.current.currentTime = 0;
    }
  };

  // console.log("id", currentSongId.current);
  // console.log("playlist", currentPlaylist);
  // console.log("id??", currentSong.id);

  const handleForwardClick = () => {
    const updatedIndex = currentSongIndex + 1;

    if (currentSongIndex < currentPlaylist.length - 1) {
      if (currentAudioRef.current.paused) {
        setCurrentSongIndex(updatedIndex);
        setCurrentSong(currentPlaylist[updatedIndex]);
        currentAudioRef.current.addEventListener("canplay", () => {
          currentAudioRef.current.play();
        });
        setPlaying(!isPlaying);

        const idSongToNumber = parseFloat(currentSong.id);
        currentSongId.current = idSongToNumber;
        console.log("id??", currentSongId.current);
      } else {
        setCurrentSongIndex(updatedIndex);
        setCurrentSong(currentPlaylist[updatedIndex]);
        currentAudioRef.current.addEventListener("canplay", () => {
          currentAudioRef.current.play();
        });
      }
    }
  };

  const handleSuffleClick = () => {
    if (currentSongIndex < currentPlaylist.length - 1) {
      if (isSuffle === false) {
        const clonedPlaylistToShuffle = currentPlaylist.slice();
        const randomizedPlaylist = [
          ...clonedPlaylistToShuffle.slice(0, currentSongIndex + 1),
          ...clonedPlaylistToShuffle
            .slice(currentSongIndex + 1)
            .sort(() => Math.random() - 0.5),
        ];
        const currentId = () => {
          currentSongId.current = idSongToNumber;
        };
        setPastPlaylist(clonedPlaylistToShuffle);
        setCurrentPlaylist(randomizedPlaylist);
        setSuffle(!isSuffle);
        console.log("random", randomizedPlaylist);
      } else {
        setCurrentPlaylist(pastPlaylist);
        setCurrentSong(pastPlaylist[currentSongId.current]);
        setSuffle(!isSuffle);
        console.log("original😲", pastPlaylist);
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
  };

  const handleLikedClick = () => {
    setLiked(!isLiked);
  };

  const handleDislikedClick = () => {
    setDisliked(!isDisliked);
  };

  return (
    <section className="background bg-orange-200 h-screen w-screen flex justify-center items-center relative m-0">
      <div className="media-player h-[325px] w-[700px] bg-zinc-900 flex justify-evenly items-center relative  m-0 py-[20px] px-[0px] rounded-[45px] drop-shadow-[0px_0px_15px_rgba(0,0,0,.5)]">
        <div className="song-cover-img  w-[40%] object-cover bg-zinc-600 m-0 rounded-[30px] overflow-hidden">
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
          <div className="song-range w-[85%]  h-[auto] flex flex-col justify-center items-center ">
            <audio src={currentSong.src} ref={currentAudioRef} />
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
                className="h-[20px] object-cover invert hover:scale-105"
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
                className="h-[20px] object-cover invert hover:scale-105"
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
