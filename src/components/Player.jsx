import { useRef, useState } from "react";


export default function Player() {

  const playerName = useRef();
  const [enteredValue, setEnteredValue] = useState();

  function submitClickHandeler() {
    setEnteredValue(playerName.current.value);
    playerName.current.value = "";
  }
  return (
    <section id="player">
      <h2>Welcome {enteredValue ?? 'unknown entity'}</h2>
      <p>
        <input ref={playerName} type="text" />
        <button onClick={submitClickHandeler}>Set Name</button>
      </p>
    </section>
  );
}
