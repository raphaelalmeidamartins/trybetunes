import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Loading from './Loading';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor(props) {
    super(props);

    this.handleFavCheckbox = this.handleFavCheckbox.bind(this);

    const { isFavorite } = props;

    this.state = {
      favorite: isFavorite,
      loading: false,
    };
  }

  async handleFavCheckbox({ target: { checked } }) {
    const currSong = { ...this.props };
    delete currSong.key;
    delete currSong.isFavorite;
    delete currSong.updateFavSongs;

    const { updateFavSongs } = this.props;

    this.setState({ loading: true });

    if (checked) {
      await addSong(currSong);
    } else {
      await removeSong(currSong);
    }

    this.setState({ favorite: checked, loading: false });

    updateFavSongs();
  }

  render() {
    const { trackId, trackName, previewUrl } = this.props;
    const { loading, favorite } = this.state;

    return (
      <section>
        { loading && <Loading /> }
        { !loading && (
          <>
            <h3>{trackName}</h3>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
              .
            </audio>
            <label htmlFor={ trackName }>
              <input
                id={ trackName }
                data-testid={ `checkbox-music-${trackId}` }
                type="checkbox"
                checked={ favorite }
                onChange={ this.handleFavCheckbox }
              />
              Favorita
            </label>
          </>
        ) }
      </section>
    );
  }
}

MusicCard.defaultProps = {
  updateFavSongs: () => {},
};

MusicCard.propTypes = {
  trackId: PropTypes.number.isRequired,
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  updateFavSongs: PropTypes.func,
};

export default MusicCard;
