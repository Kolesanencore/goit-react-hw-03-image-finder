import React, { Component } from 'react';

import { fetchImages } from 'services/pixabayAPI';

import Searchbar from './Searchbar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    showButton: false,
    isLoading: false,
    showModal: false,
    selectedImage: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.setState({ isLoading: true, showButton: false });
      fetchImages(this.state.query, this.state.page)
        .then(({ images, totalHits }) => {
          this.setState(prevState => ({
            images: [...prevState.images, ...images],
            showButton: prevState.page < Math.ceil(totalHits / 12),
          }));
        })
        .catch(error => {
          console.error('Error fetching images:', error);
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  handleSearchSubmit = query => {
    this.setState({ query, page: 1, images: [] });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
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
    const { images, isLoading, showModal, selectedImage, showButton } =
      this.state;

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

        {isLoading && <Loader visible={isLoading} />}

        {images.length > 0 && !isLoading && showButton && (
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
