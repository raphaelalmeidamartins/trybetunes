import React, { Component } from 'react';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Favorites extends Component {
  constructor() {
    super();

    this.updateFavSongs = this.updateFavSongs.bind(this);

    this.state = {
      loading: false,
      favSongs: [],
    };
  }

  componentDidMount() {
    this.updateFavSongs();
  }

  async updateFavSongs() {
    this.setState({ loading: true });
    const favSongs = await getFavoriteSongs();
    this.setState({ loading: false, favSongs });
  }

  render() {
    const { loading, favSongs } = this.state;

    return (
      <div data-testid="page-favorites">
        { loading && <Loading /> }
        { !loading
          && favSongs.map((song) => (
            <MusicCard
              key={ song.trackId }
              { ...song }
              isFavorite
              updateFavSongs={ this.updateFavSongs }
            />
          )) }
      </div>
    );
  }
}

export default Favorites;
