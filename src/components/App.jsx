import React, { Component } from 'react';
// import axios from 'axios';
import Searchbar from './Searchbar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

import { fetchImages } from './services/pixabayAPI';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: false,
    showModal: false,
    selectedImage: null,
  };

  handleSearchSubmit = async query => {
    try {
      this.setState({ query, page: 1, images: [], isLoading: true });

      const images = await fetchImages(query);
      this.setState({ images, isLoading: false });
    } catch (error) {
      console.error('Error fetching images:', error);
      this.setState({ isLoading: false });
    }
  };

  handleLoadMore = async () => {
    try {
      const { query, page } = this.state;

      this.setState({ isLoading: true });

      const newImages = await fetchImages(query, page + 1);
      this.setState(prevState => ({
        images: [...prevState.images, ...newImages],
        page: prevState.page + 1,
        isLoading: false,
      }));

      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    } catch (error) {
      console.error('Error fetching more images:', error);
      this.setState({ isLoading: false });
    }
  };

  openModal = (src, alt) => {
    this.setState({ showModal: { src, alt } });
  };

  closeModal = () => {
    this.setState({
      showModal: null,
    });
  };

  render() {
    const { images, isLoading, showModal, selectedImage } = this.state;

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: 16,
          paddingBottom: 24,
        }}
      >
        <Searchbar onSubmit={this.handleSearchSubmit} />

        <ImageGallery images={images} onImageClick={this.openModal} />

        {isLoading && <Loader />}

        {images.length > 0 && !isLoading && (
          <Button onClick={this.handleLoadMore} />
        )}

        {showModal && (
          <Modal
            image={selectedImage}
            openModal={this.openModal}
            closeModal={this.closeModal}
            src={showModal.src}
            alt={showModal.alt}
          />
        )}
      </div>
    );
  }
}

export default App;
