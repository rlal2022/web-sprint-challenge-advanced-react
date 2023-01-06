import React from "react";
import axios from "axios";

// Suggested initial states
const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4; // the index the "B" is at

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
};

export default class AppClass extends React.Component {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  constructor() {
    super();
    this.state = {
      message: initialMessage,
      email: initialEmail,
      index: initialIndex,
      steps: initialSteps,
    };
  }
  coordinates = [
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
  getXY = () => {
    return this.coordinates[this.state.index];

    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
  };

  getXYMessage = () => {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    const coordinatesValue = getXY();
    return `${coordinatesValue[0]}, ${coordinatesValue[1]}`;
  };

  reset = () => {
    this.setState({
      message: initialMessage,
      email: initialEmail,
      index: initialIndex,
      steps: initialSteps,
    });
    // Use this helper to reset all states to their initial values.
  };

  getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.

    if (direction === "up" && this.state.index - 3 >= 0) {
      return {
        ...this.state,
        index: this.state.index - 3,
        steps: this.state.steps + 1,
      };
    }
    if (direction === "down" && this.state.index + 3 <= 8) {
      return {
        ...this.state,
        index: this.state.index + 3,
        steps: this.state.steps + 1,
      };
    }
    if (
      direction === "left" &&
      this.state.index - 1 >= 0 &&
      this.state.index != 3 &&
      this.state.index != 6
    ) {
      return {
        ...this.state,
        index: this.state.index - 1,
        steps: this.state.steps + 1,
      };
    }
    if (
      direction === "right" &&
      this.state.index + 1 <= 8 &&
      this.state.index != 2 &&
      this.state.index != 5
    ) {
      return {
        ...this.state,
        index: this.state.index + 1,
        steps: this.state.steps + 1,
      };
    }
    return { ...this.state, message: `You can't go ${direction}` };
  };

  move = (evt) => {
    this.setState({ ...this.state, ...this.getNextIndex(evt.target.id) });
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
  };

  onChange = (evt) => {
    this.setState({ ...this.state, [evt.target.id]: evt.target.value });
  };

  onSubmit = (evt) => {
    // Use a POST request to send a payload to the server.
    evt.preventDefault();
    const x = this.coordinates[this.state.index][0];
    const y = this.coordinates[this.state.index][1];
    const email = this.state.email;
    const steps = this.state.steps;

    const post = {
      x: x,
      y: y,
      steps: steps,
      email: email,
    };

    axios
      .post("http://localhost:9000/api/result", post)
      .then((res) =>
        this.setState({
          message: res.data.message,
        })
      )
      .catch((error) => {
        console.error(error);
        this.setState({
          ...this.state.email,
          message: error.response.data.message,
        });
      });
    this.setState({ ...this.state, email: "" });
  };

  render() {
    const { className } = this.props;
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">
            Coordinates: ({this.getXY()[0]}, {this.getXY()[1]})
          </h3>
          <h3 id="steps">
            {`You moved ${this.state.steps} ${
              this.state.steps === 1 ? "time" : "times"
            }`}
          </h3>
        </div>
        <div id="grid">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
            <div
              key={idx}
              className={`square${idx === this.state.index ? " active" : ""}`}
            >
              {idx === this.state.index ? "B" : null}
            </div>
          ))}
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.move}>
            LEFT
          </button>
          <button id="up" onClick={this.move}>
            UP
          </button>
          <button id="right" onClick={this.move}>
            RIGHT
          </button>
          <button id="down" onClick={this.move}>
            DOWN
          </button>
          <button id="reset" onClick={this.reset}>
            reset
          </button>
        </div>
        <form onClick={this.onSubmit}>
          <input
            id="email"
            type="email"
            placeholder="type email"
            value={this.state.email}
            onChange={this.onChange}
          ></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    );
  }
}
