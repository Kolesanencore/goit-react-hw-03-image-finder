import PropTypes from 'prop-types';
import React from 'react';

import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

import { motion, AnimatePresence } from 'framer-motion';
import css from './ImageGallery.module.css';

const ImageGallery = ({ images, onImageClick }) => {
  return (
    <motion.ul
      className={css.ImageGallery}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <AnimatePresence>
        {images.map(image => (
          <ImageGalleryItem
            key={image.id}
            src={image.webformatURL}
            alt={image.tags}
            openModal={() => onImageClick(image.largeImageURL, image.tags)}
          />
        ))}
      </AnimatePresence>
    </motion.ul>
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
