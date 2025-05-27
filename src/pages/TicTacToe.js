import React, { useState, useEffect } from "react";
import "./TicTacToe.css";

// Winning combinations (rows, columns, diagonals)
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Check if a given player has a winning combination
function checkWinner(board, symbol) {
  return WINNING_COMBINATIONS.some((combo) =>
    combo.every((index) => board[index] === symbol)
  );
}

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isUserTurn, setIsUserTurn] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  // Alert whose turn it is
  useEffect(() => {
    if (!gameOver) {
      alert(isUserTurn ? "Your turn!" : "Computer's turn...");
    }
  }, [isUserTurn, gameOver]);

  // Handle user move
  const handleClick = (index) => {
    if (!isUserTurn || board[index] || gameOver) return;

    const newBoard = [...board];
    newBoard[index] = "X";

    if (checkWinner(newBoard, "X")) {
      setBoard(newBoard);
      setGameOver(true);
      alert("You win! 🎉");
      return;
    }

    setBoard(newBoard);
    setIsUserTurn(false);
  };

  // Handle computer move with 2-second delay
  useEffect(() => {
    if (!isUserTurn && !gameOver) {
      const timer = setTimeout(() => {
        const emptyIndices = board
          .map((val, idx) => (val === null ? idx : null))
          .filter((v) => v !== null);

        if (emptyIndices.length === 0) return;

        const randomIndex =
          emptyIndices[Math.floor(Math.random() * emptyIndices.length)];

        const newBoard = [...board];
        newBoard[randomIndex] = "O";

        if (checkWinner(newBoard, "O")) {
          setBoard(newBoard);
          setGameOver(true);
          alert("Computer wins! 💻");
          return;
        }

        setBoard(newBoard);
        setIsUserTurn(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isUserTurn, board, gameOver]);

  // Render each square
  const renderSquare = (i) => (
    <button className="square" onClick={() => handleClick(i)}>
      {board[i]}
    </button>
  );

  return (
    <main>
      <h1>Tic-Tac-Toe: User vs. Computer</h1>
      <div className="board">
        {[0, 1, 2].map((row) => (
          <div key={row} className="board-row">
            {renderSquare(row * 3)}
            {renderSquare(row * 3 + 1)}
            {renderSquare(row * 3 + 2)}
          </div>
        ))}
      </div>
    </main>
  );
}
