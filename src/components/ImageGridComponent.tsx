import React, { useState } from 'react';
import { getFlickrImages } from './FlickrAPI';

type Image = {
  url: string;
  title: string;
};

const ImageGridComponent: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);

  useState(() => {
    const fetchImages = async () => {
      const fetchedImages = await getFlickrImages('test', 15);
      setImages(fetchedImages);
    };

    fetchImages();
  }, );

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