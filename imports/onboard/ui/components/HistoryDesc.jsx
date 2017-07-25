import React, { PureComponent } from 'react';

import { HistoryIcon } from '/imports/onboard';

export class HistoryDesc extends PureComponent {

  next = () => {
    this.props.onboardNextStep();
  };

  back = () => {
    this.props.onboardBack();
  };

  render() {
    return (
      <div id="history-desc" className="onboard-card">
        <div className="icon">
          <HistoryIcon />
        </div>
        <h3>Отслеживай изменения</h3>
        <p>Весь твой каждодневный прогресс будет сохраняться в истории, так что постарайся делать все на совесть</p>
        <p>Ты всегда сможешь вернуться, чтобы проследить свой прогресс</p>
        <p>Обманывать и жульничать нет смысла, так как ты обманываешь самого себя!</p>
        <div className="footer">
          <button
            className="back"
            onClick={this.back}
          >
            <i className="fa fa-arrow-left" />
          </button>
          <button onClick={this.next}>Вперед!</button>
        </div>
      </div>
    );
  }
}

export default HistoryDesc;
