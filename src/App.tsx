import { useState, useEffect } from "react";
import "./App.css";

function App() {
  return (
    <section className="background">
      <div className="media-player">
        <div className="song-cover-img">
          <img src="" alt="song-cover" />
        </div>
        <div className="song-content">
          <div className="song-copy">
            <button>icon</button>
            <h2>Song</h2>
            <h3>artist</h3>
          </div>
          <div className="song-range">
            <span>current time</span>
            <input type="range"></input>
            <span>total time</span>
          </div>
          <div className="song-buttons-actions">
            <button>
              <i>dislike</i>
            </button>
            <button>
              <i>go back</i>
            </button>
            <button>
              <i>resume</i>
            </button>
            button
            <button>
              <i>next song</i>
            </button>
            <button>
              <i>like</i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
