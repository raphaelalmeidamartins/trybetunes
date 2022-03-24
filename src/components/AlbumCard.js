import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class AlbumCard extends Component {
  render() {
    const {
      collectionId,
      artistName,
      collectionName,
      artworkUrl100,
    } = this.props;

    return (
      <section>
        <img src={ artworkUrl100 } alt={ `${collectionName} - ${artistName}` } />
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          { collectionName }
        </Link>
        <p>{ artistName }</p>
      </section>
    );
  }
}

AlbumCard.propTypes = {
  collectionId: PropTypes.number.isRequired,
  artistName: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
  artworkUrl100: PropTypes.string.isRequired,
};

export default AlbumCard;
