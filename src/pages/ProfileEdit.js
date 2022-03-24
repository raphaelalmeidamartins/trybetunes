import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';

class ProfileEdit extends Component {
  constructor() {
    super();

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSaveButton = this.handleSaveButton.bind(this);

    this.state = {
      name: '',
      email: '',
      image: '',
      description: '',
      loading: true,
      updateDone: false,
    };
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState({ ...user, loading: false });
  }

  handleInputChange({ target }, name) {
    this.setState({ [name]: target.value });
  }

  async handleSaveButton(event) {
    event.preventDefault();

    const updatedUser = { ...this.state };
    delete updatedUser.loading;
    delete updatedUser.updateDone;

    this.setState({ loading: true });
    await updateUser(updatedUser);
    this.setState({ loading: false, updateDone: true });
  }

  render() {
    const { name, email, image, description, loading, updateDone } = this.state;

    return (
      <div data-testid="page-profile-edit">
        { updateDone && <Redirect to="/profile" /> }
        { loading && <Loading /> }
        { !loading && (
          <form>
            <input
              data-testid="edit-input-name"
              type="text"
              name="name"
              value={ name }
              onChange={ (event) => this.handleInputChange(event, 'name') }
            />
            <input
              data-testid="edit-input-email"
              type="text"
              name="email"
              value={ email }
              onChange={ (event) => this.handleInputChange(event, 'email') }
            />
            <input
              data-testid="edit-input-description"
              type="text"
              name="description"
              value={ description }
              onChange={ (event) => this.handleInputChange(event, 'description') }
            />
            <input
              data-testid="edit-input-image"
              type="text"
              value={ image }
              onChange={ (event) => this.handleInputChange(event, 'image') }
            />
            <button
              data-testid="edit-button-save"
              type="button"
              disabled={ [name, email, description, image].some(
                (value) => value.length === 0,
              ) }
              onClick={ this.handleSaveButton }
            >
              Salvar
            </button>
          </form>
        ) }
      </div>
    );
  }
}

export default ProfileEdit;
