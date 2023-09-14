import React, { useState, useEffect } from 'react';
import { getFlickrImages } from './FlickrAPI';

type Image = {
  url: string;
  title: string;
};

interface ImageGridProps {
  searchTerm: string;
}

const ImageGridComponent: React.FC<ImageGridProps> = ({ searchTerm }) => {
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const fetchedImages = await getFlickrImages(searchTerm, 15);
      setImages(fetchedImages);
    };

    fetchImages();
  }, [searchTerm]);

  return (
    <div className="image-grid">
      {images.map((image, index) => (
        <div key={index} className="image-container">
          <img src={image.url}/>
        </div>
      ))}
    </div>
  );
};

export default ImageGridComponent;