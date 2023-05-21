import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.styled.module.css';

import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
  };

  render() {
    // const { largeImageURL } = this.props.image;

    return createPortal(
      <div className={css.Overlay} onClick={this.handleOverlayClick}>
        <div className={css.Modal}>
          <img src={this.props.src} alt={this.props.alt} />
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
