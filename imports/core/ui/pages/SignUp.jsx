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
          <div className="heading">
            <div className="betterme-logo">
              <img src="/images/logo.jpg" alt="logo" />
            </div>
          </div>
          <div className="main-cont">
            <h5>Регистрация:</h5>
            <form action="" onSubmit={this.onSubmit}>
              <div className="form-item">
                <div className="label">
                  <i className="fa fa-envelope" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  placeholder="Email"
                />
              </div>
              <div className="form-item">
                <div className="label">
                  <i className="fa fa-user" />
                </div>
                <input
                  type="text"
                  name="firstName"
                  value={this.state.firstName}
                  onChange={this.handleChange}
                  placeholder="Имя"
                />
              </div>
              <div className="form-item">
                <div className="label">
                  <i className="fa fa-user" />
                </div>
                <input
                  type="text"
                  placeholder="Фамилия"
                  name="lastName"
                  value={this.state.lastName}
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
              </div>
              <div className="form-item">
                <div className="label">
                  <i className="fa fa-lock" />
                </div>
                <input
                  type="password"
                  placeholder="Повторите пароль"
                  name="passwordRepeat"
                  value={this.state.passwordRepeat}
                  onChange={this.handleChange}
                />
              </div>
              {this.state.error && <p className="error">{this.state.error}</p>}
              <button>Зарегистироваться</button>
            </form>
            <div className="links">
              <Link to="/login">Уже есть аккаунт? <strong>Войдите</strong></Link>
            </div>
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
