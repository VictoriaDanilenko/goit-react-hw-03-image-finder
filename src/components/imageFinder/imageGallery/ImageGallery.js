import React from 'react';
import ImageGalleryItem from './imageGalleryItem/ImageGalleryItem';
import ImageGalleryStyled from './ImageGalleryStyled';

const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ImageGalleryStyled>
      {images.map(image => (
        <ImageGalleryItem
          image={image}
          key={image.id}
          onImageClick={onImageClick}
        />
      ))}
    </ImageGalleryStyled>
  );
};
export default ImageGallery;