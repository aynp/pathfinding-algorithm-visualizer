interface GridNode {
  row: number;
  col: number;
  isVisited: boolean;
  isWall: boolean;
  parent: {
    row: number;
    col: number;
  };
}

export default GridNode;
