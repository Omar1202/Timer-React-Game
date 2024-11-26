import { useState, useRef } from "react";


export default function Player() {
  const definedPlayerName = useRef();
  
  const [playerName, setPlayerName] = useState(null);

  function handleClick() {
    setPlayerName(definedPlayerName.current.value);
    definedPlayerName.current.value = "";
  }
  
  return (
    <section id="player">
      <h2>Welcome {playerName ?? "unknown entity"}</h2>
      <p>
        <input 
          ref={definedPlayerName}
          type="text"
        />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
