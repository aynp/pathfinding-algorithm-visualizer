import { useState } from 'react';

const Nav = function () {
  const [algorithm, setAlgorithm] = useState('');
  return (
    <div>
      <h1>Nav</h1>
      <select onChange={(e) => setAlgorithm(e.target.value)}>
        <option value="" selected disabled hidden>
          Select Algorithm
        </option>
        <option value="bfs">BFS</option>
        <option value="dfs">DFS</option>
        <option value="dijkstra ">Dijkstra</option>
      </select>
    </div>
  );
};

export default Nav;
