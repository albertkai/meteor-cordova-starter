import { Meteor } from 'meteor/meteor';
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

  componentDidMount() {
    this.props.setStatusBar('default');
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {
      email,
      password,
    } = this.state;
    if (!email) {
      this.setState({ error: 'Пожалуйста, введите Email' });
    } else if (!password) {
      this.setState({ error: 'Пожалуйста, введите пароль' });
    } else {
      Meteor.loginWithPassword(email, password, (err) => {
        if (err) {
          this.setState({ error: err.message });
        } else {
          this.setState({
            email: '',
            password: '',
            error: '',
          });
          browserHistory.push('/today');
        }
      });
    }
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const {
      loginWithFacebook,
      loginWithVk,
      loginWithTwitter,
    } = this.props;
    return (
      <div id="login" className="login-page">
        <div className="ovrl" />
        <div className="form-cont paper no-padding">
          <div className="logo">
            <img src="/images/logo.png" alt="logo" />
          </div>
          <div className="stick-down">
            <p className="no-account">Еще нет аккаунта? <Link to="/sign-up">Регистрация</Link></p>
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
                <a href="/recover-password">Забыли?</a>
              </div>
              {this.state.error && <p className="error">{this.state.error}</p>}
              <button>Войти</button>
            </form>
            <h5 className="divide">или</h5>
          </div>
          <div className="circles">
            <div />
            <div />
            <div />
            <div />
          </div>
          <div className="enter-with">
            {
              Meteor.isCordova
                ? <div className="social-networks">
                  <button className="facebook" onClick={loginWithFacebook}><i className="fa fa-facebook" /> Войти с <span>Facebook</span></button>
                </div>
                : <div className="social-networks">
                <button className="facebook" onClick={loginWithFacebook}><i className="fa fa-facebook" /></button>
                <button className="twitter" onClick={loginWithTwitter}><i className="fa fa-twitter" /></button>
                <button className="vk" onClick={loginWithVk}><i className="fa fa-vk" /></button>
              </div>
            }
          </div>
        </div>
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
