import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { BsSearch } from 'react-icons/bs';
import css from './SearchBar.module.module.css';
export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = event => {
    this.setState({ query: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    const { query } = this.state;

    return (
      <header className={css.Searchbar}>
        <form className={css['SearchForm']} onSubmit={this.handleSubmit}>
          <button type="submit" className="button">
            <span className="button-label">
              <BsSearch />
            </span>
          </button>

          <input
            className={css['SearchForm-input']}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
