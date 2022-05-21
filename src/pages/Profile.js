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
      <div>
        <Header />
        { loading && <Loading /> }
        { !loading && (
          <>
            <img
              src={ image }
              alt="profile avatar"
            />
            <h3>{ name }</h3>
            <h4>{ email }</h4>
            <p>{ description }</p>
            <Link to="/profile/edit">Edit profile</Link>
          </>
        ) }
      </div>
    );
  }
}

export default Profile;
