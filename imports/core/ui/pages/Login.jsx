import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory, Link } from 'react-router';

import * as actions from '../../api/redux/actions';

export class LoginComponent extends PureComponent {

  state = {
    email: '',
    password: '',
    error: '',
  };

  onSubmit = (e) => {
    e.preventDefault();
    const {
      email,
      password,
    } = this.state;
    if (!email) {
      this.setState({ error: 'Please, type in your password' });
    } else if (!password) {
      this.setState({ error: 'Please, type in your password' });
    } else {
      console.log('Email', email);
      console.log('Password', password);
    }
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div id="login" className="login-page">
        <h1>Welcome to the basic Meteor + React + Cordova app</h1>
        <h3>Please log in!</h3>
        <form action="" onSubmit={this.onSubmit}>
          <div className="form-item">
            <div className="label">
              <i className="fa fa-envelope" />
            </div>
            <input
                type="email"
                placeholder="Email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
            />
          </div>
          <div className="form-item">
            <div className="label">
              <i className="fa fa-lock" />
            </div>
            <input
                type="password"
                placeholder="Пароль"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
            />
            <a href="/recover-password">Forgotten your pass?</a>
          </div>
          {this.state.error && <p className="error">{this.state.error}</p>}
          <button>Log in</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch =>
  bindActionCreators(actions, dispatch);

export const Login = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginComponent);


export default Login;
