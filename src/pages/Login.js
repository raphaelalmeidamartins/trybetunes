import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

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
      <div>
        { userCreated && <Redirect to="/search" /> }
        { loading && <Loading /> }
        { !loading && (
          <form onSubmit={ this.handleCreateUser }>
            <input
              type="text"
              placeholder="Enter your name"
              onChange={ this.handleInputChange }
            />
            <button
              type="submit"
              disabled={ btnDisabled }
              onSubmit={ this.handleCreateUser }
            >
              Enter
            </button>
          </form>
        ) }
      </div>
    );
  }
}

export default Login;
