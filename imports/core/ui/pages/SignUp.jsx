import React, { PureComponent } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory, Link } from 'react-router';

import { coreActions } from '/imports/core';

export class SignUpComponent extends PureComponent {

  state = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    passwordRepeat: '',
    error: '',
  };

  onSubmit = (e) => {
    const {
      email,
      firstName,
      lastName,
      password,
      passwordRepeat,
    } = this.state;
    e.preventDefault();
    if (email && firstName && lastName && password && passwordRepeat) {
      if (password !== passwordRepeat) {
        this.setState({ error: 'Пароли не совпадают' });
      } else {
        Accounts.createUser({
          email,
          password,
          profile: {
            firstName,
            lastName,
          },
        }, () => {
          this.setState({
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            passwordRepeat: '',
            error: '',
          });
          browserHistory.push('/');
        });
      }
    } else {
      this.setState({ error: 'Пожалуйста, заполните все поля' });
    }
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div id="sign-up" className="login-page">
        <div className="ovrl" />
        <div className="form-cont paper">
          <div className="logo">BETTER:ME<span>beta</span></div>
          <h5>Зарегистрироваться:</h5>
          <form action="" onSubmit={this.onSubmit}>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              placeholder="Email"
            />
            <input
              type="text"
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleChange}
              placeholder="Имя"
            />
            <input
              type="text"
              placeholder="Фамилия"
              name="lastName"
              value={this.state.lastName}
              onChange={this.handleChange}
            />
            <input
              type="password"
              placeholder="Пароль"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <input
              type="password"
              placeholder="Повторите пароль"
              name="passwordRepeat"
              value={this.state.passwordRepeat}
              onChange={this.handleChange}
            />
            {this.state.error && <p className="error">{this.state.error}</p>}
            <button>Зарегистироваться</button>
          </form>
          <div className="links">
            <Link to="/login">Уже есть аккаунт? Войдите</Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch =>
  bindActionCreators(coreActions, dispatch);

export const SignUp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUpComponent);

export default SignUp;
