import GridNode from '../../types/GridNode';

// node-visited => whichever node is visited
// node-shortest => whichever node is present in the shortest path

const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];

const isValid = (grid: GridNode[][], row: number, col: number) => {
  if (row < 0 || row >= grid.length) return false;
  if (col < 0 || col >= grid[0].length) return false;
  if (grid[row][col].isVisited || grid[row][col].isWall) return false;
  return true;
};

const visited: GridNode[] = [];
const path: GridNode[] = [];

const rec = function (grid: GridNode[][], row: number, col: number) {
  grid[row][col].isVisited = true;

  visited.push(grid[row][col]);
  for (let i = 0; i < 4; i++) {
    if (!isValid(grid, row + dx[i], col + dy[i])) continue;
    grid[row + dx[i]][col + dy[i]].parent = grid[row][col];
    rec(grid, row + dx[i], col + dy[i]);
  }
};

const backtrack = function (
  grid: GridNode[][],
  start: GridNode,
  cur: GridNode
) {
  console.log('Running backtrack');
  if (!cur.isVisited) return;
  while (!(cur.row === start.row && cur.col === start.col)) {
    path.unshift(cur);
    const { row: prow, col: pcol } = cur.parent;
    cur = grid[prow][pcol];
  }
  path.unshift(start);
};

const animateShortest = function (setShowReset: any) {
  for (let i = 0; i < path.length; i++) {
    const { row, col } = path[i];
    setTimeout(() => {
      document
        .getElementById(`node-${row}-${col}`)
        ?.classList.add('node-shortest');
    }, 10 * i);
  }
  setTimeout(() => {
    setShowReset(true);
  }, 10 * path.length);
};

const animateVisited = function (setShowReset: any) {
  console.log(visited);
  for (let i = 0; i < visited.length; i++) {
    const element = visited[i];
    setTimeout(() => {
      document
        .getElementById(`node-${element.row}-${element.col}`)
        ?.classList.add('node-visited');
    }, 10 * i);
  }
  setTimeout(() => {
    animateShortest(setShowReset);
  }, 10 * visited.length);
};

const dfs = function (
  grid: GridNode[][],
  start: any,
  end: any,
  setShowReset: any
) {
  setShowReset(false);
  rec(grid, start.row, start.col);
  backtrack(grid, start, end);
  animateVisited(setShowReset);
  return;
};

export default dfs;
