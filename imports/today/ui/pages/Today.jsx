import React, { PureComponent } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import moment from 'moment';

import { Days } from '/imports/core';
import { TextBlock } from '../particles/TextBlock';
import { SimpleBlock } from '../particles/SimpleBlock';
import { TasksBlock } from '../particles/TasksBlock';
import { WaterBlock } from '../particles/WaterBlock';
import { WakeUpBlock } from '../particles/WakeUpBlock';

const blocksMap = {
  dailyTask: {
    sort: 1,
    component: TextBlock,
    properties: {
      min: 140,
      task: true,
    },
  },
  wakeUp: {
    sort: 2,
    component: WakeUpBlock,
    properties: {},
  },
  sport: {
    sort: 3,
    component: SimpleBlock,
    properties: {
      type: 'video',
      name: 'Зарядка',
      desc: 'Выполните комплекс упражнений в видео. После того, как вы просмотрите все видео без переключений - задание будет отмечено как выполненное.',
    },
  },
  meditation: {
    sort: 4,
    component: SimpleBlock,
    properties: {
      type: 'audio',
      name: 'Медитация',
      desc: '10 минутная медитация. Рекомендуем выполняь как можно раньше. После того, как аудио будет полностью прослушано, задание будет отмечено как выполненное.',
    },
  },
  water: {
    sort: 5,
    component: WaterBlock,
    properties: {},
  },
  taskList: {
    sort: 6,
    component: TasksBlock,
    properties: {},
  },
  report: {
    sort: 8,
    component: TextBlock,
    properties: {
      name: 'Отчет за день',
      min: 140,
      desc: 'Опишите, как ваши действия за сегодня продвинули вас к цели',
    },
  },
  kind: {
    sort: 7,
    component: TextBlock,
    properties: {
      name: 'Доброе дело',
      min: 140,
      desc: 'Какое доброе дело вы сделали сегодня?',
    },
  },
};

export class TodayComponent extends PureComponent {

  constructor(props) {
    super(props);
    this.interval = null;
  }

  state = {
    timeLeft: '00:00:00',
  };

  componentWillUnmount() {
    Meteor.clearInterval(this.interval);
  }

  componentWillReceiveProps(nextProps) {
    const { todayReady } = this.props;
    const { todayReady: nextReady, today: { createdAt } } = nextProps;
    if (!todayReady && nextReady) {
      const limit = moment(createdAt).add('days', 1).set('hour', 5).set('minute', 0);
      console.log(limit);
      this.interval = Meteor.setInterval(() => {
        const timeLeft = moment.utc(moment().diff(limit, 'milliseconds')).format("HH:mm:ss");
        this.setState({ timeLeft });
      }, 1000);
    }
  }

  render() {
    const { today, todayReady } = this.props;
    if (todayReady && today) {
      return (
        <div id="today" className="page">
          <div className="container paper no-padding scroll-wrap">
            <header>
              <h2>
                <span>Выполнено: <strong>{today.blocks.filter(b => b.passed).length}</strong> из <strong>{today.blocks.length}</strong></span>
                <span>Осталось: <strong>{this.state.timeLeft}</strong></span>
              </h2>
            </header>
            <div className="content scrollable">
              {today.blocks
                .sort((a, b) => blocksMap[a.name].sort > blocksMap[b.name].sort)
                .map(b => {
                  const blockData = blocksMap[b.name];
                  const Dynamic = blockData.component;
                  return <Dynamic
                    day={today}
                    block={b}
                    key={`block-${b.name}`}
                    {...blockData.properties}
                  />;
                })}
            </div>
          </div>
        </div>
      );
    }
    return <p><i className="fa fa-spin fa-spinner" /> Loading...</p>
  }
}

export const Today = createContainer(() => {
  const handle = Meteor.subscribe('days.getToday');
  const today = Days.findOne();
  return { today, todayReady: handle.ready() };
}, TodayComponent);

export default Today;
