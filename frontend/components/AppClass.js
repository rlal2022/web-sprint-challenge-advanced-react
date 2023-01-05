import React from "react";

// Suggested initial states
const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4; // the index the "B" is at
const initialX = 0;
const initialY = 0;

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
  x: initialX,
  y: initialY,
};

export default class AppClass extends React.Component {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  constructor() {
    super();
    this.state = initialState;
  }

  getXY = () => {
    return `${this.state.x}, ${this.state.y}`;

    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
  };

  getXYMessage = () => {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
  };

  reset = () => {
    this.setState = initialState;
    // Use this helper to reset all states to their initial values.
  };

  getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.

    if (direction === "up") {
      if (this.state.y - 1 === 0) {
        return { x: this.state.x, y: this.state.y };
      }
      return {
        x: this.state.x,
        y: this.state.y - 1,
        index: this.state.index - 3,
        steps: this.state.steps + 1,
      };
    }
    if (direction === "down") {
      if (this.state.y + 1 === 4) {
        return { x: this.state.x, y: this.state.y };
      }
      return {
        x: this.state.x,
        y: this.state.y + 1,
        index: this.state.index + 3,
        steps: this.state.steps + 1,
      };
    }
    if (direction === "right") {
      if (this.state.x + 1 === 4) {
        return { x: this.state.x, y: this.state.y };
      }
      return {
        x: this.state.x + 1,
        y: this.state.y,
        index: this.state.index + 1,
        steps: this.state.steps + 1,
      };
    }
    if (direction === "left") {
      if (this.state.x - 1 === 0) {
        return { x: this.state.x, y: this.state.y };
      }
      return {
        x: this.state.x - 1,
        y: this.state.y,
        index: this.state.index - 1,
        steps: this.state.steps + 1,
      };
    }
  };

  move = (evt) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
  };

  onChange = (evt) => {
    this.setState({
      ...this.state,
      email: evt.target.value,
    });
  };

  onSubmit = (evt) => {
    // Use a POST request to send a payload to the server.
    evt.preventDefault();

    const submitForm = {
      x: y,
      y: y,
      steps: this.state.steps,
      email: this.state.email,
    };

    axios
      .post("http://localhost:9000/api/result", submitForm)
      .then((res) => this.setState({ message: res.data.message }))
      .catch((err) => {
        console.error(err);
        this.setState({
          ...this.state.emai,
          message: err.response.data.message,
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
            Coordinates ({this.state.x}, {this.state.y})
          </h3>
          <h3 id="steps">You moved 0 times</h3>
        </div>
        <div id="grid">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
            <div key={idx} className={`square${idx === 4 ? " active" : ""}`}>
              {idx === 4 ? "B" : null}
            </div>
          ))}
        </div>
        <div className="info">
          <h3 id="message"></h3>
        </div>
        <div id="keypad">
          <button id="left">LEFT</button>
          <button id="up">UP</button>
          <button id="right">RIGHT</button>
          <button id="down">DOWN</button>
          <button id="reset">reset</button>
        </div>
        <form>
          <input id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    );
  }
}
