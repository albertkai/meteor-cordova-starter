import React, { PureComponent } from 'react';

export class Description extends PureComponent {

  next = () => {
    this.props.onboardNextStep();
  };

  back = () => {
    this.props.onboardBack();
  };

  render() {
    return (
      <div id="description" className="onboard-card">
        <p>Путь к грандиозным целям по-настощему строится как из кирпичиков, из маленьких ежедневных действий</p>
        <p>Мы предлагаем тебе на выбор ряд каждодневных ритуалов, таких как ранний подъем, постановка 3х задач, медитация и т.д. Из них ты сам формируешь свой распорядок дня.</p>
        <p>Также, каждый день тебе будет приходить одно обязательное задание, которое нужно будет прочесть, осмыслить, записать свою реакцию на прочитанное, и главное, выполнить соответствующее действие.</p>
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

export default Description;
