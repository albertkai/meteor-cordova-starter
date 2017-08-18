import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import 'moment/locale/ru';

import { coreActions } from '/imports/core';

export class VacationModalComponent extends PureComponent {

  static propTypes = {
    user: PropTypes.object,
    takeVacation: PropTypes.func.isRequired,
    stopVacation: PropTypes.func.isRequired,
    toggle: PropTypes.func.isRequired,
  };

  static defaultProps = {
    user: null,
  };

  submit = () => {
    this.props.takeVacation(this.select.value);
  };

  render() {
    const {
      user: {
        serviceData: {
          vacationUntil,
        },
      },
      stopVacation,
    } = this.props;
    return (
      <div id="vacation-modal" className="popover-modal">
        <div className="modal-overlay" />
        <div className="modal-cont">
          <div className="modal-header">
            <button className="close" onClick={this.props.toggle}>
              <i className="fa fa-times" /> Закрыть
            </button>
          </div>
          <div className="modal-body">
            {
              !vacationUntil
                ? <div>
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
                    <option value="8">8 дней</option>
                    <option value="9">9 дней</option>
                    <option value="10">10 дней</option>
                  </select>
                  <p className="disclaimer">Обращаем ваше внимание, что если вы по каким любо уважительным причинам не смогли выполнить задания, то напишите нам на support@better.me</p>
                </div>
                : <div>
                  <h3>Вы в отпуске!</h3>
                  <h4>Ваш отпуск заканчивается:</h4>
                  <h1>{moment(vacationUntil).locale('ru').calendar()}</h1>
                  <p className="disclaimer">В этот период вам не назначаются штрафы, но все же будут приходить ежедневные задания, которые мы вам рекомендуем выполнить, когда вернетесь.</p>
                </div>
            }
          </div>
          <div className="modal-footer">
            {
              vacationUntil ?
                <button onClick={stopVacation}>Выйти из отпуска!</button> :
                <button onClick={this.submit}>Вперед!</button>
              }
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
