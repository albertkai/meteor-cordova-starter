import React, { PureComponent } from 'react';

export class Blocked extends PureComponent {
  render() {
    return (
      <div id="blocked">
        <h3>Пожалуйтста, оплатите штраф</h3>
        <p>Иначе вы не сможете пользоваться сервисом</p>
        <h1>5000р</h1>
        <p className="disclaimer">Если вы считаете, что произошла какая-то ошибка, или у вас есть уважительная причина по пропуску заданий, то напишите в службу поддержки</p>
      </div>
    );
  }
}

export default Blocked;
