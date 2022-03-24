import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      image: '',
      description: '',
      loading: true,
    };
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState({ ...user, loading: false });
  }

  render() {
    const { name, email, image, description, loading } = this.state;

    return (
      <div data-testid="page-profile">
        { loading && <Loading /> }
        { !loading && (
          <>
            <img
              data-testid="profile-image"
              src={ image }
              alt={ `Foto de ${name}` }
            />
            <h3>{ name }</h3>
            <h4>{ email }</h4>
            <p>{ description }</p>
            <Link to="/profile/edit">Editar perfil</Link>
          </>
        ) }
      </div>
    );
  }
}

export default Profile;
