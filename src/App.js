import React from 'react';
import './App.css';

import Store from './Store';
import Dashboard from './Dashboard';

function App() {
  return (
    <div className="App">
      <Store>
        <Dashboard />
      </Store>
    </div>
  );
}

export default App;
