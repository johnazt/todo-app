import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [serverStatus, setServerStatus] = useState('Checking...');

  useEffect(() => {
    fetch('http://localhost:3000/api/health')
      .then((res) => res.json())
      .then((data) => setServerStatus(data.message))
      .catch((err) =>
        setServerStatus(`Error checking server status: ${err.message}`)
      );
  }, []);

  return (
    <div className="App">
      <h1>Todo App</h1>
      <p>Server Status: {serverStatus}</p>
    </div>
  );
}

export default App;
