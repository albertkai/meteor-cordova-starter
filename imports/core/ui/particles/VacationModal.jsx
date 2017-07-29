import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { coreActions } from '/imports/core';

export class VacationModalComponent extends PureComponent {

  submit = () => {
    this.props.takeVacation(this.select.value);
  };

  render() {
    const now = moment().format('YYYY-MM-DD');
    return (
      <div id="vacation-modal" className="popover-modal">
        <div className="modal-overlay"/>
        <div className="modal-cont">
          <div className="modal-header">
            <button className="close" onClick={this.props.toggle}>
            {/*<button className="close" onClick={this.props.toggle}>*/}
              <i className="fa fa-times"/> Закрыть
            </button>
          </div>
          <div className="modal-body">
            <h3>Взять отпуск!</h3>
            <h4>С завтрашнего дня на</h4>
            <select ref={(ref) => this.select = ref}>
              <option value="1">1 день</option>
              <option value="2">2 дня</option>
              <option value="3">3 дня</option>
              <option value="4">4 дня</option>
              <option value="5">5 дней</option>
              <option value="6">6 дней</option>
              <option value="7">7 дней</option>
            </select>
          </div>
          <p className="disclaimer">Обращаем ваше внимание, что если вы по каким любо уважительным причинам не смогли выполнить задания, то напишите нам на support@metter.me</p>
          <div className="modal-footer">
            <button onClick={this.submit}>Вперед!</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch =>
  bindActionCreators(coreActions, dispatch);

export const VacationModal = connect(
  mapStateToProps,
  mapDispatchToProps,
)(VacationModalComponent);

export default VacationModal;
