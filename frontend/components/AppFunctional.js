import React, { useState } from "react";
import axios from "axios";

// Suggested initial states
const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4; // the index the "B" is at

const coordinates = [
  [1, 1],
  [2, 1],
  [3, 1],
  [1, 2],
  [2, 2],
  [3, 2],
  [1, 3],
  [2, 3],
  [3, 3],
];

export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  const initialState = {
    message: initialMessage,
    email: initialEmail,
    index: initialIndex,
    steps: initialSteps,
  };

  const [forState, setState] = useState(initialState);

  function getXY() {
    return coordinates[forState.index];
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
  }

  function getXYMessage() {
    const coordinatesValue = getXY();
    return `${coordinatesValue[0]}, ${coordinatesValue[1]}`;

    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
  }

  function reset() {
    // Use this helper to reset all states to their initial values.
    setState(initialState);
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.

    if (direction === "up" && forState.index - 3 >= 0) {
      return {
        ...forState,
        index: forState.index - 3,
        steps: forState.steps + 1,
      };
    }
    if (direction === "down" && forState.index + 3 <= 8) {
      return {
        ...forState,
        index: forState.index + 3,
        steps: forState.steps + 1,
      };
    }
    if (
      direction === "left" &&
      forState.index - 1 >= 0 &&
      forState.index != 3 &&
      forState.index != 6
    ) {
      return {
        ...forState,
        index: forState.index - 1,
        steps: forState.steps + 1,
      };
    }
    if (
      direction === "right" &&
      forState.index + 1 <= 8 &&
      forState.index != 2 &&
      forState.index != 5
    ) {
      return {
        ...forState,
        index: forState.index - 1,
        steps: forState.steps + 1,
      };
    }
    return { ...forState, message: `You can't go ${direction}` };
  }

  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    setState(getNextIndex(evt.target.id));
  }

  function onChange(evt) {
    // You will need this to update the value of the input.
    setState({ ...forState, [evt.target.id]: evt.target.value });
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
    evt.preventDefault();
    //  x = getXY()[0];
    //  y = getXY()[1];
    //  steps = forState.steps;
    //  email = forState.email;

    const post = { x: getXY()[0], y: getXY()[1], steps: steps, email: email };

    axios
      .post("http://localhost:9000/api/result", post)
      .then((res) => {
        setState({ ...this.forState, message: res.data.message });
      })
      .catch((err) => setState({ ...forState, message: err.res.data.message }));

    // const coordinatesValue = getXY();
    // axios
    //   .post("http://localhost:9000/api/result", {
    //     x: coordinatesValue[0],
    //     y: coordinatesValue[1],
    //     email: forState.email,
    //     steps: forState.steps,
    //   })
    //   .then((res) =>
    //     setState({
    //       ...forState,
    //       email: initialEmail,
    //       message: res.data.message,
    //     })
    //   )
    //   .catch((err) => setState({ ...forState, message: err.res.data.message }));
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates: ({getXYMessage()})</h3>
        <h3 id="steps">
          You moved {forState.steps} {forState.steps === 1 ? "time" : "times"}
        </h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div
            key={idx}
            className={`square${idx === forState.index ? " active" : ""}`}
          >
            {idx === forState.index ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{forState.message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={move}>
          LEFT
        </button>
        <button id="up" onClick={move}>
          UP
        </button>
        <button id="right" onClick={move}>
          RIGHT
        </button>
        <button id="down" onClick={move}>
          DOWN
        </button>
        <button id="reset" onClick={reset}>
          reset
        </button>
      </div>
      <form>
        <input
          id="email"
          type="email"
          placeholder="type email"
          value={forState.email}
          onChange={onChange}
        ></input>
        <input id="submit" type="submit" onClick={onSubmit}></input>
      </form>
    </div>
  );
}
