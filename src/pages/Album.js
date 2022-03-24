import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

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
    const { location: { pathname } } = this.props;
    const collectionId = pathname.split('/')[2];
    const songs = await getMusics(collectionId);
    const favSongs = await getFavoriteSongs();

    this.setState({ loading: false, songs, favSongs });
  }

  render() {
    const { songs, favSongs, loading } = this.state;
    const songsArray = [...songs];
    songsArray.shift();

    return (
      <div data-testid="page-album">
        { loading && <Loading /> }
        { Boolean(songs.length) && (
          <>
            <h1 data-testid="artist-name">{ songs[0].artistName }</h1>
            <p data-testid="album-name">{ songs[0].collectionName }</p>
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
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default Album;
