import { useEffect, useState } from 'react';
import Node from './node/node';
import GridNode from '../types/GridNode';

import dfs from '../algorithms/pathfinding/dfs';
import bfs from '../algorithms/pathfinding/bfs';

const NROWS: number = 20;
const NCOLS: number = 50;

const gridInit = function () {
  const grid = [];
  for (let row = 0; row < NROWS; row++) {
    const currentRow: GridNode[] = [];
    for (let col = 0; col < NCOLS; col++) {
      currentRow.push({
        col,
        row,
        isWall: false,
        isVisited: false,
        parent: {} as GridNode,
      });
    }
    grid.push(currentRow);
  }
  return grid;
};

const clearGrid = function (grid: GridNode[][], setGrid: any) {
  for (let row = 0; row < NROWS; row++) {
    for (let col = 0; col < NCOLS; col++) {
      const curNode = document.getElementById(`node-${row}-${col}`);
      if (curNode) curNode.className = 'node';
    }
  }
  const newGrid = gridInit();
  setGrid(newGrid);
};

const Grid = function () {
  const [grid, setGrid] = useState<GridNode[][]>([]);
  const [mousePressed, setMousePressed] = useState(false);
  const [showReset, setShowReset] = useState(true);

  useEffect(() => {
    const newGrid = gridInit();
    setGrid(newGrid);
    console.log('Grid Init Done');
  }, []);

  const toggleNode = function (row: number, col: number) {
    // grid[row][col] = {
    //   ...grid[row][col],
    //   isWall: !grid[row][col].isWall,
    // };

    const newGrid = grid.slice();
    newGrid[row][col] = {
      ...newGrid[row][col],
      isWall: !newGrid[row][col].isWall,
    };
    setGrid(newGrid);
  };

  const handleMouseDown = function (row: number, col: number) {
    setMousePressed(true);
    toggleNode(row, col);
  };

  const handleMouseEnter = function (row: number, col: number) {
    if (!mousePressed) return;
    if (grid[row][col].isWall === false) toggleNode(row, col);
  };

  const handleMouseUp = function (row: number, col: number) {
    setMousePressed(false);
  };

  return (
    <div className="grid">
      <button
        onClick={() => {
          dfs(grid, grid[0][0], grid[10][15], setShowReset);
        }}>
        Start DFS
      </button>
      <button
        onClick={() => {
          bfs(grid, grid[0][0], grid[10][25], setShowReset);
        }}>
        Start BFS
      </button>

      <button
        onClick={() => {
          clearGrid(grid, setGrid);
        }}
        disabled={!showReset}>
        Reset Grid
      </button>
      {grid.map((row, i) => {
        return (
          <div key={i}>
            {row.map((node, j) => {
              return (
                <Node
                  key={j}
                  row={node.row}
                  col={node.col}
                  isStart={false}
                  isFinish={false}
                  isWall={node.isWall}
                  onMouseDown={handleMouseDown}
                  onMouseEnter={handleMouseEnter}
                  onMouseUp={handleMouseUp}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Grid;
