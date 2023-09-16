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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const fetchedImages = await getFlickrImages(searchTerm, 27);
        setImages(fetchedImages);
        setError(null);
      } catch (error) {
        setError('Failed to fetch images from Flickr. Please check your internet connection or try again later.');
      }
    };

    fetchImages();
  }, [searchTerm]);

  return (
    <div>
      {error && <div className="error-message">{error}</div>}
      <div className="image-grid">
        {images.map((image, index) => (
          <div key={index} className="image-container">
            <img src={image.url} onClick={() => onSelect(image.url)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGridComponent;