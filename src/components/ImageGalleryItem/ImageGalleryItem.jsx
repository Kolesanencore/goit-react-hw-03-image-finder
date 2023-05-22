import PropTypes from 'prop-types';

import { motion } from 'framer-motion';

import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ src, alt, openModal }) => {
  return (
    <motion.li
      className={css.ImageGalleryItem}
      whileHover={{ scale: 1 }}
      onClick={openModal}
    >
      <img src={src} alt={alt} className={css['ImageGalleryItem-image']} />
    </motion.li>
  );
};

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
