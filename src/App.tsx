import { useState, useEffect } from "react";
// import "./App.css";

function App() {
  return (
    <section className="background">
      <div className="media-player">
        <div className="song-cover-img">
          <img src="" alt="song-cover" />
        </div>
        <div className="song-content">
          <div className="song-copy">
            <button>
              <i className="fa-solid fa-circle"></i>
            </button>
            <h2>Song</h2>
            <h3>artist</h3>
          </div>
          <div className="song-range">
            <button>
              <i className="fa-solid fa-circle"></i>
            </button>
            <span>00:00</span>
            <input type="range"></input>
            <span>00:00</span>
            <button>
              <i className="fa-solid fa-circle"></i>
            </button>
          </div>
          <div className="song-buttons-actions">
            <button>
              <i className="fa-solid fa-circle"></i>
            </button>
            <button>
              <i className="fa-solid fa-circle"></i>
            </button>
            <button>
              <i className="fa-solid fa-circle"></i>
            </button>
            <button>
              <i className="fa-solid fa-circle"></i>
            </button>
            <button className="bg-blue-500 font-bold py-5 px-5 rounded-full">
              <i className="fa-solid fa-circle"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
