import './App.css';
import React, { useState } from 'react';
import ImageGridComponent from './components/ImageGridComponent';

function App() {
  const [currentSearch, setCurrentSearch] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
      </div>
      
      <ImageGridComponent searchTerm={currentSearch} onSelect={setSelectedImage}/>
      {selectedImage && (
        <div className="large-image-view">
          <img src={selectedImage} alt="Selected" onClick={() => setSelectedImage(null)} />
        </div>
      )}
    </div>
  );
};

export default App; 
