import logo from './logo.svg';
import './App.css';
import Maze from './components/Maze.jsx';

function App() {
  return (
    <div className="App">
      <Maze width={10} height={10}/>
    </div>
  );
}

export default App;
