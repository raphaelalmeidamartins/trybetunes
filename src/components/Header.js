import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      user: null,
    };
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <header data-testid="header-component">
        { !user && <Loading /> }
        { user && (
          <>
            <h1>{ user.name }</h1>
            <ul>
              <Link to="/search">
                <li>Search</li>
              </Link>
              <Link to="/favorites">
                <li>Library</li>
              </Link>
              <Link to="/profile">
                <li>Profile</li>
              </Link>
            </ul>
          </>
        ) }
      </header>
    );
  }
}

export default Header;
