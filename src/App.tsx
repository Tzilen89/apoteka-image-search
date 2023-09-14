import './App.css';
import React, { useState } from 'react';
import ImageGridComponent from './components/ImageGridComponent';

function App() {
  const [currentSearch, setCurrentSearch] = useState<string>('');

  return (
    <div className="App">
      <h1>Apoteka Image Search</h1>
      <div className="search-container">
        <input
          type="text"
          value={currentSearch}
          onChange={e => setCurrentSearch(e.target.value)}
          placeholder="Search for images..."
        />
        <button onClick={() => setCurrentSearch(currentSearch)}>Search</button>
      </div>
      
      <ImageGridComponent searchTerm={currentSearch} />
    </div>
  );
};

export default App; 
