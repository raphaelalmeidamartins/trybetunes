import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

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
      <div>
        <Header />
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
