import "./styles.css";

import * as React from "react";
import { render } from "react-dom";
import { useRef } from "react";
import { YTPlayer, PlayerAPI } from "./YTPlayer";

function App() {
  const playerRef = useRef(null as PlayerAPI);
  return (
    <div className="App">
      <button
        onClick={() => {
          const player = playerRef.current;

          // player.getCurrentTime()
          // player.getDuration()
          player.seekTo(player.getCurrentTime() + 1);
        }}
      >
        Jump
      </button>
      <YTPlayer apiRef={playerRef} videoId="_Sf3vMMErwg" />
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
