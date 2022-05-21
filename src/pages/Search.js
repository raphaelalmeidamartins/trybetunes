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
      <div data-testid="page-search">
        <Header />
        <form>
          { searching && <Loading /> }
          { !searching && (
            <>
              <input
                data-testid="search-artist-input"
                type="text"
                value={ searchValue }
                onChange={ this.handleSearchInput }
              />
              <button
                data-testid="search-artist-button"
                type="button"
                disabled={ btnDisabled }
                onClick={ this.handleSearchClick }
              >
                Pesquisar
              </button>
              { Boolean(prevSearchValue.length) && (
                searchResults.length > 0
                  ? <p>{ `Resultado de álbuns de: ${prevSearchValue}` }</p>
                  : <p>Nenhum álbum foi encontrado</p>
              ) }
              { Boolean(!prevSearchValue.length) && (
                <p>Nenhum álbum foi encontrado</p>
              ) }
              { Boolean(searchResults.length) && searchResults.map((album) => (
                <AlbumCard
                  data-testid={ `link-to-album-${album.collectionId}` }
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
