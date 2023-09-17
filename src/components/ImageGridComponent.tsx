import React, { useState, useEffect } from 'react';
import { getFlickrImages } from './FlickrAPI';

type Image = {
  url: string;
  title: string;
};

interface ImageGridProps {
  searchTerm: string;
  onSelect: (imageUrl: string) => void;
}

const ImageGridComponent: React.FC<ImageGridProps> = ({ searchTerm, onSelect }) => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const fetchImages = async () => {
      getFlickrImages(searchTerm, 27)
        .then(fetchedImages => {
          setImages(fetchedImages);
          setError(null);
        })
        .catch(error => {
          setError('Failed to fetch images from Flickr. Please check your internet connection or try again later.');
        })
        .finally(() => {
          setLoading(false);
        });
    }

    fetchImages();
  }, [searchTerm]);

  return (
    <div>
      {loading && <div>loading...</div>}
      {error && <div className="error-message">{error}</div>}
      <div className="image-grid">
        {images.map((image, index) => (
          <div key={index} className="image-container">
            <img src={image.url} alt={image.title} onClick={() => onSelect(image.url)} />
          </div>
        ))}
        {loading && Array(27).fill(0).map((_, index) => (
          <div key={index} className="image-placeholder"></div>
        ))}
      </div>
    </div>
  );
};

export default ImageGridComponent;