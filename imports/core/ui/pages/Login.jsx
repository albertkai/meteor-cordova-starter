import React, { PureComponent } from 'react';

export class Login extends PureComponent {
  render() {
    return (
      <div id="login">
        <div className="ovrl" />
        <div className="form-cont paper">
          <div className="logo">BETTER:ME<span>beta</span></div>
          <h5>Войдите через:</h5>
          <div className="social-networks">
            <button className="facebook"><i className="fa fa-facebook" /></button>
            <button className="twitter"><i className="fa fa-twitter" /></button>
            <button className="vk"><i className="fa fa-vk" /></button>
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

export default Login;
