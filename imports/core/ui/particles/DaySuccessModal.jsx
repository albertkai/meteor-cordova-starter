import React, { PureComponent } from 'react';

export class DaySuccessModal extends PureComponent {
  render() {
    return (
      <div id="day-success-modal" className="popover-modal">
        <div className="modal-overlay" />
        <div className="modal-cont">
          <div className="modal-header">
            <button onClick={this.props.toggle} className="close"><i className="fa fa-times" /> Закрыть</button>
          </div>
          <div className="modal-body">
            <div className="icon">
              <i className="fa fa-flag-checkered" />
            </div>
            <h3>Отлично!</h3>
            <p>Ты выполнил все задания за день! Не так уж и сложно, правда?</p>
            <p className="accent">Но ты даже не представляешь, какой колоссальный позитивный эффект это даст в перспективе!</p>
          </div>
          <div className="modal-footer">
            <button onClick={this.props.toggle}>Идем дальше!</button>
          </div>
        </div>
      </div>
    );
  }
}

export default DaySuccessModal;
