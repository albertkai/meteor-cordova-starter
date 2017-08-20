import React, { PureComponent } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import moment from 'moment';

import { Days, ItemsLoading } from '/imports/core';
import { TextBlock } from '../particles/TextBlock';
import { SimpleBlock } from '../particles/SimpleBlock';
import { TasksBlock } from '../particles/TasksBlock';
import { MeditationBlock } from '../particles/MeditationBlock';
import { SportBlock } from '../particles/SportBlock';
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
    component: SportBlock,
    properties: {
      name: 'Зарядка',
    },
  },
  meditation: {
    sort: 4,
    component: MeditationBlock,
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
    const { today } = this.props;
    const { today: todayNext } = nextProps;
    const todayCached = today || todayNext;
    if (todayCached && this.state.timeLeft === '00:00:00' && !this.interval) {
      const limit = moment(todayCached.createdAt).add(1, 'days').set(0, 'hour').set(0, 'minute');
      let timeLeft = moment.utc(limit.diff(moment(), 'milliseconds')).format('HH:mm:ss');
      this.setState({ timeLeft });
      this.interval = Meteor.setInterval(() => {
        timeLeft = moment.utc(limit.diff(moment(), 'milliseconds')).format('HH:mm:ss');
        this.setState({ timeLeft });
      }, 1000);
    }
  }

  componentDidMount() {
    const { today, user: { blocks: { sport } } } = this.props;
    if (today && this.state.timeLeft === '00:00:00' && !this.interval) {
      const limit = moment(today.createdAt).add(1, 'days').set(0, 'hour').set(0, 'minute');
      let timeLeft = moment.utc(limit.diff(moment(), 'milliseconds')).format('HH:mm:ss');
      this.setState({ timeLeft });
      this.interval = Meteor.setInterval(() => {
        timeLeft = moment.utc(limit.diff(moment(), 'milliseconds')).format('HH:mm:ss');
        this.setState({ timeLeft });
      }, 1000);
    }
    if (sport && sport.enabled) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
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
    return <ItemsLoading />;
  }
}

export const Today = createContainer(() => {
  const handle = Meteor.subs.subscribe('days.getToday');
  const today = Days.findOne({}, { sort: { createdAt: -1 } });
  return { today, todayReady: handle.ready() };
}, TodayComponent);

export default Today;
