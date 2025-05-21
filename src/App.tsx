import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { GetBlueprintGraph } from './services/blueprintGraphServices';
import { BuildGraph } from './services/graphServices';

function App() {
  const [data, setData] = useState<{}>({});
  useEffect(() => {    
      GetBlueprintGraph().then(data => {
        setData(data);
        const graph = BuildGraph(data.edges);
        console.log(graph);
      });  
         
  },[]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Reactsssss
        </a>
      </header>
    </div>
  );
}

export default App;
