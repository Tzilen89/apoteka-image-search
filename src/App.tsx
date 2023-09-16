import './App.css';
import React, { useState, useCallback } from 'react';
import debounce from 'lodash/debounce';
import ImageGridComponent from './components/ImageGridComponent';

function App() {
  const [currentSearch, setCurrentSearch] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>(currentSearch);

  const debouncedSetSearchTerm = useCallback(
    debounce((value: string) => setDebouncedSearchTerm(value), 300),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCurrentSearch(value);
    debouncedSetSearchTerm(value);
  };

  return (
    <div className="App">
      <h1>Apoteka Image Search</h1>
      <div className="search-container">
        <input
          type="text"
          value={currentSearch}
          onChange={handleSearchChange}
          placeholder="Search for images..."
        />
      </div>
      
      <ImageGridComponent searchTerm={debouncedSearchTerm} onSelect={setSelectedImage}/>
      {selectedImage && (
        <div className="large-image-view" onClick={() => setSelectedImage(null)}>
          <img src={selectedImage} alt="Selected" />
        </div>
      )}
    </div>
  );
};

export default App; 
