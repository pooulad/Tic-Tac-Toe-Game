"use client"
import { useEffect, useState } from "react";

export default function Home() {
  const [xIsNext, setXIsNext] = useState(true);
  const [showWinner, setShowWinner] = useState(false);
  const [squares, setSquares] = useState(Array(9).fill(null));
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }
  useEffect(() => {
    if (status.startsWith("Winner: ")) {
      setShowWinner(true)
    } else {
      setShowWinner(false)
    }
  }, [status])
  const RestartHandler = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setShowWinner(false);
  }
  return (
    <main className="m-auto w-full bg-red-300 flex flex-col justify-center items-center h-screen">
      <div>{showWinner && (
        <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-200 dark:bg-gray-800 dark:text-green-400" role="alert">
          {status}
        </div>
      )}</div>
      <div className="status font-bold text-lg">{status.startsWith("Winner") ? null : status}</div>
      <div className="board-row">
        <Square index={0} value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square index={1} value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square index={2} value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square index={3} value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square index={4} value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square index={5} value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square index={6} value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square index={7} value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square index={8} value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
      <div className="">
        <button type="button" onClick={RestartHandler} className="m-4 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ">Restart</button>
        <a target="_blank" href="https://github.com/pooulad/Tic-Tac-Toe-Game" type="button" className="m-4 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Star in github</a>
      </div>
    </main>
  )
}


function Square({ value, onSquareClick, index }) {
  return (
    <button className={`square bg-white ${index === 0 ? "rounded-tl-xl" : index === 2 ? "rounded-tr-xl" : index === 6 ? "rounded-bl-xl" : index === 8 ? "rounded-br-xl" : ""}`} onClick={onSquareClick}>
      {value}
    </button>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}