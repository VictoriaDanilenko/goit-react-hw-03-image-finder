import React, { Component } from 'react';
import ImageGallery from './imageGallery/ImageGallery';
import Searchbar from './searchbar/Searchbar';
import Button from './button/Button';
import Modal from './modal/Modal';
import Spinner from './loader/Loader';
import ImageFinderStyled from './ImageFinderStyled';

import fetchImagesWithQuery from '../../services/ImagesApi';

class ImageFinder extends Component {
  state = {
    images: [],
    loading: false,
    error: null,
    searchQuery: '',
    page: 1,
    largeImageURL: '',
    largeImageAlt: '',
  };
  componentDidMount() {
    window.addEventListener('keydown', this.closeModalByEsc);
    const { searchQuery, page } = this.state;
    fetchImagesWithQuery(searchQuery, page).then(response => {
      this.setState(prevState => ({
        ...prevState,
        images: [...response],
        page: 2,
      }));
    });
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModalByEsc);
  }

  handleSearchFormSubmit = async (query, page = 1) => {
    try {
      if (query === '') {
        return;
      }
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      this.resetError();
      this.setState(prevState => ({ ...prevState, loading: true }));
      const result = await fetchImagesWithQuery(query, page);
      this.setState(prevState => ({
        ...prevState,
        images: [...result],
        page: 2,
        searchQuery: query,
        loading: false,
      }));
    } catch (error) {
      this.setState(prevState => ({ ...prevState, error: error }));
    } finally {
      this.setState(prevState => ({ ...prevState, loading: false }));
    }
  };

  loadMore = async () => {
    try {
      this.resetError();
      const { searchQuery, page } = this.state;
      this.setState(prevState => ({ ...prevState, loading: true }));
      const result = await fetchImagesWithQuery(searchQuery, page);
      this.setState(prevState => ({
        ...prevState,
        images: [...prevState.images, ...result],
        page: prevState.page + 1,
      }));
      if (this.state.page > 2) {
        this.scrollBy();
      }
    } catch (error) {
      this.setState(prevState => ({ ...prevState, error: error }));
    } finally {
      this.setState(prevState => ({ ...prevState, loading: false }));
    }
  };

  resetError = () => {
    this.setState(prevState => ({ ...prevState, error: '' }));
  };

  toggleModal = e => {
    this.setState({
      largeImageURL: e.target.dataset.url,
      largeImageAlt: e.target.dataset.url,
    });
  };

  closeModalByEsc = e => {
    if (e.code === 'Escape') {
      this.setState({ largeImageURL: null });
    }
  };

  handleClickInModal = e => {
    if (e.target.nodeName !== 'IMG') {
      this.setState({
        largeImageURL: null,
      });
    }
  };

  scrollBy = () => {
    window.scrollBy({
      top:
        document.documentElement.clientHeight -
        document.querySelector('.Button').clientHeight -
        document.querySelector('.Searchbar').clientHeight,
      behavior: 'smooth',
    });
  };

  render() {
    const { images, loading, largeImageURL, largeImageAlt } = this.state;

    return (
      <ImageFinderStyled>
        <Searchbar onSubmit={this.handleSearchFormSubmit} />

        {images.length > 0 && (
          <ImageGallery images={images} onImageClick={this.toggleModal} />
        )}

        {largeImageURL && (
          <Modal
            imgURL={largeImageURL}
            imgAlt={largeImageAlt}
            onHandleClickInModal={this.handleClickInModal}
          />
        )}

        {loading && <Spinner />}

        {images.length > 0 && <Button onFetchImages={this.loadMore} />}
      </ImageFinderStyled>
    );
  }
}

export default ImageFinder;