interface GridNode {
  row: number;
  col: number;
  isVisited: boolean;
  isWall: boolean;
  parent: GridNode;
}

export default GridNode;
