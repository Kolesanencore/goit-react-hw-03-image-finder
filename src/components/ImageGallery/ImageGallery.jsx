import PropTypes from 'prop-types';
import React from 'react';

import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

import css from './ImageGallery.module.css';

const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ul className={css.ImageGallery}>
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          src={image.webformatURL}
          alt={image.tags}
          openModal={() => onImageClick(image.largeImageURL, image.tags)}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  onImageClick: PropTypes.func.isRequired,
};
