import React, { PureComponent } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import moment from 'moment';

import { Days } from '/imports/core';
import { TextBlock } from '../particles/TextBlock';
import { SimpleBlock } from '../particles/SimpleBlock';
import { TasksBlock } from '../particles/TasksBlock';
import { WaterBlock } from '../particles/WaterBlock';
import { WakeUpBlock } from '../particles/WakeUpBlock';
import { FirstDay } from '../components/FirstDay';

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
      desc: '15 минутный комплекс',
    },
  },
  meditation: {
    sort: 4,
    component: SimpleBlock,
    properties: {
      type: 'audio',
      name: 'Медитация',
      desc: '10 минут',
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
      desc: 'Опишите, как ваши действия сегодня продвинули вас к цели',
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
      let timeLeft = moment.utc(limit.diff(moment(), 'milliseconds')).format('HH:mm:ss');
      this.setState({ timeLeft });
      this.interval = Meteor.setInterval(() => {
        timeLeft = moment.utc(limit.diff(moment(), 'milliseconds')).format('HH:mm:ss');
        this.setState({ timeLeft });
      }, 1000);
    }
  }

  render() {
    const {
      today,
      todayReady,
      user: {
        serviceData: {
          introduction: {
            today: todaySeen,
          },
        },
      },
    } = this.props;
    if (todayReady && today) {
      const itemWidth = window.innerWidth / today.blocks.length;
      const passedBlocks = today.blocks.filter(b => b.passed);
      const allPassed = passedBlocks.length === today.blocks.length;
      return (
        <div id="today" className="page">
          <div className="container paper no-padding scroll-wrap">
            <header>
              <h2>
                {
                  allPassed
                    ? <span className="success"><i className="fa fa-check" /> Все выполнено!</span>
                    : <span>Выполнено: <strong>{passedBlocks.length}</strong> из <strong>{today.blocks.length}</strong></span>}
                {!allPassed && <span>Осталось: <strong>{this.state.timeLeft}</strong></span>}
              </h2>
              <div className="status-stripe">
                {today.blocks.filter(b => b.passed).map(b => (
                  <span
                      className={`${b.name} ${b.passed ? '_passed' : ''}`}
                      style={{ width: `${itemWidth}px` }}
                      key={`status-${b.name}`}
                  />
                ))}
              </div>
            </header>
            <div className="content scrollable">
              {today.blocks
                .sort((a, b) => blocksMap[a.name].sort > blocksMap[b.name].sort)
                .map(b => {
                  const blockData = blocksMap[b.name];
                  const Dynamic = blockData.component;
                  return <Dynamic
                    type={b.name}
                    day={today}
                    block={b}
                    key={`block-${b.name}`}
                    {...blockData.properties}
                  />;
                })}
              {!todaySeen && <FirstDay />}
            </div>
          </div>
        </div>
      );
    }
    return <p><i className="fa fa-spin fa-spinner" /> Loading...</p>
  }
}

export const Today = createContainer(() => {
  const handle = Meteor.subs.subscribe('days.getToday');
  const today = Days.findOne();
  return { today, todayReady: handle.ready() };
}, TodayComponent);

export default Today;
