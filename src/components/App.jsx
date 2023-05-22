import React, { Component } from 'react';

import { fetchImages } from './services/pixabayAPI';

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
    isLoading: false,
    showModal: false,
    selectedImage: null,
    loaderVisible: true,
    hasMoreImages: true,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.fetchImages();
    }
  }

  updateStateAfterSubmittingForm = query => {
    this.setState({
      query,
      page: 1,
      images: [],
      isLoading: true,
      hasMoreImages: true,
    });
  };

  handleLoadMore = () => {
    const { hasMoreImages } = this.state;
    if (hasMoreImages) {
      this.setState(prevState => ({
        page: prevState.page + 1,
        isLoading: true,
      }));
    }
  };

  fetchImages = async () => {
    const { query, page } = this.state;
    try {
      const newImages = await fetchImages(query, page);
      if (newImages.length < 10) {
        this.setState({ loaderVisible: false, hasMoreImages: false });
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...newImages],
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error fetching images:', error);
      this.setState({ isLoading: false });
    }
  };

  openModal = (src, alt) => {
    this.setState({ showModal: true, selectedImage: { src, alt } });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const {
      images,
      isLoading,
      showModal,
      selectedImage,
      loaderVisible,
      hasMoreImages,
    } = this.state;

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: 16,
          paddingBottom: 24,
        }}
      >
        <Searchbar onSubmit={this.updateStateAfterSubmittingForm} />

        <ImageGallery images={images} onImageClick={this.openModal} />

        {isLoading && <Loader visible={loaderVisible} />}

        {images.length > 0 && !isLoading && hasMoreImages && (
          <Button onClick={this.handleLoadMore} />
        )}

        {showModal && (
          <Modal image={selectedImage} closeModal={this.closeModal} />
        )}
      </div>
    );
  }
}

export default App;
