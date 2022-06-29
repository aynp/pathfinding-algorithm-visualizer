import { PropsWithChildren, useEffect, useState } from 'react';
import Node from './node/node';

const NROWS: number = 20;
const NCOLS: number = 50;

interface GridNode {
  row: number;
  col: number;
  isWall: boolean;
}

const gridInit = function () {
  const grid = [];
  for (let row = 0; row < NROWS; row++) {
    const currentRow = [];
    for (let col = 0; col < NCOLS; col++) {
      currentRow.push({
        col,
        row,
        isWall: false,
      });
    }
    grid.push(currentRow);
  }
  return grid;
};

const Grid = function (pros: PropsWithChildren) {
  const [grid, setGrid] = useState<GridNode[][]>([]);
  const [mousePressed, setMousePressed] = useState(false);

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
