import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      songs: [],
      favSongs: [],
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const songs = await getMusics(id);
    const favSongs = await getFavoriteSongs();

    this.setState({ loading: false, songs, favSongs });
  }

  render() {
    const { songs, favSongs, loading } = this.state;
    const songsArray = [...songs];
    songsArray.shift();

    return (
      <div>
        <Header />
        { loading && <Loading /> }
        { Boolean(songs.length) && (
          <>
            <h1>{ songs[0].artistName }</h1>
            <p>{ songs[0].collectionName }</p>
          </>
        ) }
        { Boolean(songs.length)
          && songsArray
            .map((song) => (
              <MusicCard
                key={ song.trackId }
                { ...song }
                isFavorite={ favSongs.some((fav) => fav.trackId === song.trackId) }
              />
            )) }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  }).isRequired,
};

export default Album;
