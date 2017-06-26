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
        <div className="form-cont paper">
          <div className="logo">BETTER:ME<span>beta</span></div>
          <h5>Войдите через:</h5>
          <div className="social-networks">
            <button className="facebook" onClick={loginWithFacebook}><i className="fa fa-facebook" /></button>
            <button className="twitter" onClick={loginWithTwitter}><i className="fa fa-twitter" /></button>
            <button className="vk" onClick={loginWithVk}><i className="fa fa-vk" /></button>
          </div>
          <h5 className="divide">или</h5>
          <form action="" onSubmit={this.onSubmit}>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
             />
            <input
              type="password"
              placeholder="Пароль"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            {this.state.error && <p className="error">{this.state.error}</p>}
            <button>Войти</button>
          </form>
          <div className="links">
            <a href="/recover-password">Забыли пароль?</a>
            <Link to="/sign-up">Регистрация</Link>
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
