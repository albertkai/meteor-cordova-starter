import React, { PureComponent } from 'react';
import moment from 'moment';

export class Intro extends PureComponent {

  next = () => {
    const {
      onboardNextStep,
    } = this.props;
    const timezone = moment.tz.guess();
    onboardNextStep(timezone);
  };

  render() {
    const { user } = this.props;
    return (
      <div id="intro" className="onboard-card">
        <h3>Привет, {user && user.personalData && user.personalData.firstName}!</h3>
        <p>Мы знаем, что, кем бы ты ни был, каких бы успехов ни добился уже в своей жизни, перед какими бы проблемами ни стоял в настоящее время, тебя привело сюда страсное желание достичь еще больших результатов. Мы обещаем,что если ты станешь «играть по правилам» данного приложения, то будешь вознагражден сверх всяких ожиданий.</p>
        <p>Часто нам в жизни необходим кто-то, кто будет нас постоянно подпинывать, и напоминать, куда мы идем и зачем! И это приложение как раз готово в этом помочь!</p>
        <p>Давай сперва поймем, как это работает!</p>
        <div className="footer">
          <button onClick={this.next}>Вперед!</button>
        </div>
      </div>
    );
  }
}

export default Intro;
