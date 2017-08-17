import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as coreActions from '../../api/redux/actions';

export class PayFeesModalComponent extends PureComponent {

  propTypes = {
    user: React.PropTypes.object,
    core: React.PropTypes.object,
    toggle: React.PropTypes.func,
    payFee: React.PropTypes.func,   // Initialize Braintree UI
    getPaymentToken: React.PropTypes.func,   // Get token on mount
    resetPaymentToken: React.PropTypes.func,   // Remove token on unmount
  };

  componentDidMount() {
    const {
      user: {
        fees: {
          toPay,
        },
      },
      getPaymentToken,
    } = this.props;
    getPaymentToken(toPay);
  }

  componentWillUnmount() {
    this.props.resetPaymentToken();
  }

  pay = () => {
    const {
      user: {
        fees: {
          toPay,
        },
      },
      payFee,
    } = this.props;
    payFee(toPay);
  };

  render() {
    const {
      core: {
        paymentToken,
      },
      user: {
        fees: {
          toPay,
        },
      },
    } = this.props;
    return (
      <div id="pay-fees-modal" className="popover-modal">
        <div className="modal-overlay" />
        <div className="modal-cont">
          <div className="modal-header">
            <button onClick={this.props.toggle} className="close"><i className="fa fa-times" /> Закрыть</button>
          </div>
          <div className="modal-body">
            <div className="icon">
              <i className="fa fa-money" />
            </div>
            <h3>Оплата:</h3>
            <p className="amount">Сумма: <strong>{toPay}p</strong></p>
            <p className="desc">Пока мы не подключили оплату, так что плиз переведи Гале на счет как обычно, я вручную добавлю в базу данных. Постараюсь автоматизировать этот момент как только утрясем с поставщиком услуг онлайн оплаты</p>
          </div>
          <div className="modal-footer">
            <button onClick={this.pay} disabled={!paymentToken}>
              {paymentToken ? 'Оплатить!' : <i className="fa fa-spinner fa-spin" />}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    core: state.core.toJS(),
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(coreActions, dispatch);

export const PayFeesModal = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PayFeesModalComponent);

export default PayFeesModal;
