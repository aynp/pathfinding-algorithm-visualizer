import './App.css';
import Nav from './visualizer/Nav';
import Grid from './visualizer/Grid';

function App() {
  const algorithms = ['bfs', 'dfs', 'dijkstra'];
  return (
    <div className="App">
      <Nav />
      <Grid />
    </div>
  );
}

export default App;
