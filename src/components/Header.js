import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

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
            <h1 data-testid="header-user-name">{ user.name }</h1>
            <ul>
              <Link to="/search" data-testid="link-to-search">
                <li>Busca</li>
              </Link>
              <Link to="/favorites" data-testid="link-to-favorites">
                <li>Biblioteca</li>
              </Link>
              <Link to="/profile" data-testid="link-to-profile">
                <li>Perfil</li>
              </Link>
            </ul>
          </>
        ) }
      </header>
    );
  }
}

export default Header;
