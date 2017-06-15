import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../api/redux/actions';

export class LoginComponent extends PureComponent {
  render() {
    const {
      loginWithFacebook,
      loginWithVk,
      loginWithTwitter,
    } = this.props;
    return (
      <div id="login">
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
          <form action="">
            <input type="email" placeholder="Email:" />
            <input type="password" placeholder="Пароль:" />
            <button>Войти</button>
            <div className="links">
              <a href="">Забыли пароль?</a>
              <a href="">Регистрация</a>
            </div>
          </form>
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
