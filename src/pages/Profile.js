import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

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
        <Header />
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
