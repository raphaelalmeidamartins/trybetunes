import React, { Component } from 'react';
import AlbumCard from '../components/AlbumCard';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();

    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);

    this.state = {
      searchValue: '',
      prevSearchValue: '',
      btnDisabled: true,
      searchResults: [],
      searching: false,
    };
  }

  handleSearchInput({ target }) {
    const searchValue = target.value;
    const btnDisabled = searchValue.length < 2;

    this.setState({ searchValue, btnDisabled });
  }

  async handleSearchClick() {
    this.setState({ searching: true });

    const { searchValue } = this.state;
    const searchResults = await searchAlbumsAPI(searchValue);

    this.setState({
      searchValue: '',
      prevSearchValue: searchValue,
      searchResults,
      searching: false,
    });
  }

  render() {
    const {
      searchValue,
      prevSearchValue,
      searchResults,
      btnDisabled,
      searching,
    } = this.state;

    return (
      <div>
        <Header />
        <form>
          { searching && <Loading /> }
          { !searching && (
            <>
              <input
                type="text"
                value={ searchValue }
                onChange={ this.handleSearchInput }
              />
              <button
                type="button"
                disabled={ btnDisabled }
                onClick={ this.handleSearchClick }
              >
                Search
              </button>
              { Boolean(prevSearchValue.length) && (
                searchResults.length > 0
                  ? <p>{ `Albums of: ${prevSearchValue}` }</p>
                  : <p>No album was found</p>
              ) }
              { Boolean(!prevSearchValue.length) && (
                <p>No album was found</p>
              ) }
              { Boolean(searchResults.length) && searchResults.map((album) => (
                <AlbumCard
                  key={ album.collectionId }
                  { ...album }
                />
              )) }
            </>
          ) }
        </form>
      </div>
    );
  }
}

export default Search;
