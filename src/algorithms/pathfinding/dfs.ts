import GridNode from '../../types/GridNode';

// node-visited => whichever node is visited
// node-shortest => whichever node is present in the shortest path

const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];

const Isvalid = (grid: GridNode[][], row: number, col: number) => {
  if (row < 0 || row >= grid.length) return false;
  if (col < 0 || col >= grid[0].length) return false;
  if (grid[row][col].isVisited || grid[row][col].isWall) return false;
  return true;
};

const rec = function (grid: GridNode[][], row: number, col: number) {
  grid[row][col].isVisited = true;

  document.getElementById(`node-${row}-${col}`)?.classList.add('node-visited');

  for (let i = 0; i < 4; i++) {
    if (!Isvalid(grid, row + dx[i], col + dy[i])) continue;
    grid[row + dx[i]][col + dy[i]].parent = grid[row][col];
    rec(grid, row + dx[i], col + dy[i]);
  }
};

const path: GridNode[] = [];

const backtrack = function (start: GridNode, cur: GridNode) {
  if (!cur.isVisited) return;
  while (!(cur.row === start.row && cur.col === start.col)) {
    path.unshift(cur);
    cur = cur.parent;
  }
  path.unshift(start);
  path.forEach(({ row, col }) => {
    document
      .getElementById(`node-${row}-${col}`)
      ?.classList.add('node-shortest');
  });
};

const dfs = function (grid: GridNode[][], start: any, end: any) {
  rec(grid, start.row, start.col);
  backtrack(start, end);

  return;
};

export default dfs;
