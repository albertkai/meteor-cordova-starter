import React, { PureComponent } from 'react';

export class WakeUpModal extends PureComponent {
  render() {
    return (
      <div id="wake-up-modal" className="popover-modal">
        <div className="modal-overlay" />
        <div className="modal-cont">
          <div className="modal-header">
            <button className="close" onClick={this.props.toggle}>
              <i className="fa fa-times" /> Закрыть
            </button>
          </div>
          <div className="modal-body">
            <div className="icon">
              <i className="fa fa-clock-o" />
            </div>
            <h3>Доброе утро!</h3>
            <p>Вся наша жищнь - это набор из коротких отрезков между тем, когда мы ложимся, и когда просыпаемся.</p>
            <p className="accent">Дайте себе слово провести этот день с пользой!</p>
          </div>
          <div className="modal-footer">
            <button onClick={this.props.toggle}>Даю слово!</button>
          </div>
        </div>
      </div>
    );
  }
}

export default WakeUpModal;
