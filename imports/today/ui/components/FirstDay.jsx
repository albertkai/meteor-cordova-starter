import React, { PureComponent } from 'react';

import { ArrowIcon } from '../particles/ArrowIcon';

export class FirstDay extends PureComponent {

  state = {
    animated: false,
  };

  componentDidMount() {
    Meteor.setTimeout(() => {
      this.setState({ animated: true });
    }, 400);
  }

  componentWillUnmount() {
    Meteor.call('users.setIntroductionSeen', 'today');
  }

  render() {
    return (
      <div id="first-day" className={this.state.animated ? '_animated' : ''}>
        <div>
          <ArrowIcon />
          <p>Это ваше первое задание, и единственное на сегодня!</p>
        </div>
        <div>
          <ArrowIcon />
          <p>Здесь вы сможете составить свой ежедневный распорядок. С завтрашнего дня выбранные задания будут добавлены в ваш список задач</p>
        </div>
      </div>
    );
  }
}

export default FirstDay;
