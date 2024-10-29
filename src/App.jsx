import React, { useState } from "react";
import "./App.css"; // Import styles

const GRID_SIZE = 6;

const initialGrid = Array(GRID_SIZE)
  .fill(null)
  .map(() => Array(GRID_SIZE).fill(""));

const App = () => {
  const [grid, setGrid] = useState(initialGrid);
  const [error, setError] = useState("");

  const toggleSymbol = (row, col) => {
    const newGrid = grid.map((r) => [...r]);
    newGrid[row][col] =
      newGrid[row][col] === "🌞"
        ? "🌜"
        : newGrid[row][col] === "🌜"
        ? ""
        : "🌞";

    if (checkRules(newGrid)) {
      setError("");
      setGrid(newGrid);
    } else {
      setError("Rule violation! Please follow the rules.");
    }
  };

  const checkRules = (grid) => {
    // Check if each row and column has equal number of 🌞 and 🌜
    for (let i = 0; i < GRID_SIZE; i++) {
      let rowCount = { sun: 0, moon: 0 };
      let colCount = { sun: 0, moon: 0 };

      for (let j = 0; j < GRID_SIZE; j++) {
        if (grid[i][j] === "🌞") rowCount.sun++;
        if (grid[i][j] === "🌜") rowCount.moon++;
        if (grid[j][i] === "🌞") colCount.sun++;
        if (grid[j][i] === "🌜") colCount.moon++;
      }

      if (rowCount.sun > GRID_SIZE / 2 || rowCount.moon > GRID_SIZE / 2)
        return false;
      if (colCount.sun > GRID_SIZE / 2 || colCount.moon > GRID_SIZE / 2)
        return false;
    }

    // Check no more than 2 adjacent 🌞 or 🌜 in rows and columns
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE - 2; j++) {
        if (
          grid[i][j] === grid[i][j + 1] &&
          grid[i][j] === grid[i][j + 2] &&
          grid[i][j] !== ""
        )
          return false;
        if (
          grid[j][i] === grid[j + 1][i] &&
          grid[j][i] === grid[j + 2][i] &&
          grid[j][i] !== ""
        )
          return false;
      }
    }

    return true;
  };

  return (
    <div className="App">
      <h1>Sun and Moon Game</h1>
      {error && <p className="error">{error}</p>}
      <div className="grid">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="cell"
              onClick={() => toggleSymbol(rowIndex, colIndex)}
            >
              {cell}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default App;
