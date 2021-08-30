import React from 'react';
import ImageGalleryItemStyled from './ImageGalleryItemStyled';

const ImageGalleryItem = ({ image, onImageClick }) => {
  const { id, tags, webformatURL, largeImageURL } = image;
  return (
    <ImageGalleryItemStyled data-id={id} onClick={onImageClick}>
      <img
        src={webformatURL}
        alt={tags}
        data-url={largeImageURL}
        data-alt={tags}
        className="ImageGalleryItem-image"
      />
    </ImageGalleryItemStyled>
  );
};

export default ImageGalleryItem;
