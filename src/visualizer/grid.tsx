import { useEffect, useState } from 'react';
import Node from './node/node';
import GridNode from '../types/GridNode';

import dfs from '../algorithms/pathfinding/dfs';
import bfs from '../algorithms/pathfinding/bfs';

const NROWS: number = 3;
const NCOLS: number = 3;

/**
 * Creates a new grid
 */
const gridInit = function () {
  const grid: GridNode[][] = [];
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

/**
 * Clears Grid
 */

const Grid = function () {
  const [grid, setGrid] = useState<GridNode[][]>([]);
  const [mousePressed, setMousePressed] = useState(false);
  const [showReset, setShowReset] = useState(true);

  const clearGrid = function () {
    const newGrid = grid.slice();
    for (let row = 0; row < NROWS; row++) {
      for (let col = 0; col < NCOLS; col++) {
        const curNode = document.getElementById(`node-${row}-${col}`);
        if (curNode) curNode.className = 'node';
        newGrid[row][col].isVisited = false;
        newGrid[row][col].isWall = false;
        newGrid[row][col].parent = {} as GridNode;
      }
    }
    setGrid(newGrid);
  };

  useEffect(() => {
    const newGrid = gridInit();
    setGrid(newGrid);
    console.log('Grid Init Done');
  }, []);

  const toggleNode = function (row: number, col: number) {
    const newGrid = grid.slice();
    newGrid[row][col] = {
      ...newGrid[row][col],
      isWall: !newGrid[row][col].isWall,
    };
    console.log(newGrid[row][col].isVisited);
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
          dfs(grid, grid[0][0], grid[2][2], setShowReset);
        }}>
        Start DFS
      </button>
      <button
        onClick={() => {
          bfs(grid, grid[0][0], grid[2][2], setShowReset);
        }}>
        Start BFS
      </button>

      <button
        onClick={() => {
          clearGrid();
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
