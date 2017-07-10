import React, { PureComponent } from 'react';

export class Taxes extends PureComponent {

  next = () => {
    this.props.onboardNextStep();
  };

  back = () => {
    this.props.onboardBack();
  };

  render() {
    return (
      <div id="taxes">
        <p>За каждое невыполненное задание, тебе будет начисляться штраф, сумму которого ты сам для себя определишь, но не меньше 500р</p>
        <p>Штрафы нужно будет оплатить в течение 5 суток, иначе ты не сможешь продолжить пользоваться сервисом</p>
        <p>В конце каждого календарного месяца, мы берем всю накопленную сумму штрафов (за вычетом операционных расходов), и перечисляем их на благотворительность</p>
        <p>Каждый месяц мы выкладываем подробные отчеты, о том как и куда были потрачены деньги</p>
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

export default Taxes;
