import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]} // Board needs get props squares and onClick from Game component
        onClick={() => this.props.onClick(i)} //  our Board component no longer stores  handleClick(i), We moved it to Game.
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{ squares: Array(9).fill(null) }],
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice(); // copy of state after last move (array[]) / copy of last state
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "0";
    this.setState({
      history: history.concat([{ squares: squares }]), // squares: squares - we assigned squares copy of last state
      xIsNext: !this.state.xIsNext,
    }); // it all the time changes current state to opposite
  }

  render() {
    const history = this.state.history;
    const current = history[history.length - 1]; //last move
    const winner = calculateWinner(current.squares); // it is the same as current. why we accsess a squares?
    console.log(current);

    let status;
    if (winner) {
      status = "Won " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "0");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], //a,b,c
    [3, 4, 5], //a,b,c
    [6, 7, 8], //a,b,c
    [0, 3, 6], //a,b,c
    [1, 4, 7], //a,b,c
    [2, 5, 8], //a,b,c
    [0, 4, 8], //a,b,c
    [2, 4, 6], //a,b,c
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      console.log(squares[b]);
      console.log(squares[a]);
      return squares[a]; //  is it winner? (X or 0)
    }
  }
  return null;
}
