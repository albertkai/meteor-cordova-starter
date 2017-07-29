import React, { PureComponent } from 'react';

export class PayFeesModal extends PureComponent {
  render() {
    const {
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
            <button onClick={this.props.toggle}>Оплатить!</button>
          </div>
        </div>
      </div>
    );
  }
}

export default PayFeesModal;
