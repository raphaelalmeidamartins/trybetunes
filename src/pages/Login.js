import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends Component {
  constructor() {
    super();

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCreateUser = this.handleCreateUser.bind(this);

    this.state = {
      name: '',
      btnDisabled: true,
      loading: false,
      userCreated: false,
    };
  }

  handleInputChange({ target }) {
    const name = target.value;
    const minLength = 3;
    if (name.length >= minLength) {
      this.setState({ name, btnDisabled: false });
    } else {
      this.setState({ name, btnDisabled: true });
    }
  }

  async handleCreateUser() {
    this.setState({ loading: true });

    const { name } = this.state;
    await createUser({ name });

    this.setState({
      userCreated: true,
    });
  }

  render() {
    const { btnDisabled, loading, userCreated } = this.state;

    return (
      <div data-testid="page-login">
        { userCreated && <Redirect to="/search" /> }
        { loading && <Loading /> }
        { !loading && (
          <form>
            <input
              data-testid="login-name-input"
              type="text"
              onChange={ this.handleInputChange }
            />
            <button
              data-testid="login-submit-button"
              type="button"
              disabled={ btnDisabled }
              onClick={ this.handleCreateUser }
            >
              Entrar
            </button>
          </form>
        ) }
      </div>
    );
  }
}

export default Login;
