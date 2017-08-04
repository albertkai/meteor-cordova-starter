import React, { PureComponent } from 'react';

import { FinishIcon } from '/imports/onboard';

export class OnboardFinal extends PureComponent {

  next = () => {
    this.props.onboardNextStep();
  };

  back = () => {
    this.props.onboardBack();
  };

  render() {
    return (
      <div id="onboard-final">
        <div className="icon">
          <FinishIcon />
        </div>
        <h3>И так, начнем!</h3>
        <p>Попробуй играть по правилам, и мы гарантируем, что результат превзойдет все твои ожидания!</p>
        <p>Готов? Дай себе слово, что нажав на эту кнопку снизу, ты уже не отступишь назад, и будешь строить лучшего себя каждый день! Ты готов идти вперед?</p>
        <div className="footer">
          <button
            className="back"
            onClick={this.back}
          >
            <i className="fa fa-arrow-left" />
          </button>
          <button onClick={this.next}>Да, я готов!</button>
        </div>
      </div>
    );
  }
}

export default OnboardFinal;
