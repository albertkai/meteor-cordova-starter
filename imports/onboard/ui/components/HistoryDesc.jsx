import React, { PureComponent } from 'react';

export class HistoryDesc extends PureComponent {

  next = () => {
    this.props.onboardNextStep();
  };

  render() {
    return (
      <div id="history-desc" className="onboard-card">
        <p>Весь твой каждодневный прогресс будет сохраняться в истории, так что постарайся делать все на совесть</p>
        <p>Ты всегда сможешь вернуться, чтобы проследить свой прогресс</p>
        <p>Обманывать и жульничать нет смысла, так как ты обманываешь самого себя!</p>
        <div className="footer">
          <button onClick={this.next}>Вперед!</button>
        </div>
      </div>
    );
  }
}

export default HistoryDesc;