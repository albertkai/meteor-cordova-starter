import React, { PureComponent } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

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
  render() {
    const { today, todayReady } = this.props;
    if (todayReady && today) {
      return (
        <div id="today">
          <div className="container paper">
            <header>
              <h2>
                Выполнено: {today.blocks.filter(b => b.passed).length} из {today.blocks.length}
              </h2>
            </header>
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
      );
      // return (
      //   <div id="today">
      //     <div className="container paper">
      //       <header>
      //         <h2>
      //           Выполнено: {today.blocks.filter(b => b.passed).length} из {today.blocks.length}
      //         </h2>
      //       </header>
      //       <TextBlock
      //         name="День 1. Задание"
      //         day={today}
      //         blockName="dailyTask"
      //         min={200}
      //         task="Вы часто задумываетесь оглавном? Что в вашей жизни произошло интересного за последние годы? Возможно есть смысл рассказать об этом? Запишите себе главные мысли на сегодня, и вы посмотрите, как все изменилось"
      //       />
      //       <WakeUpBlock
      //         name="Ранний подъем"
      //         desc="Вам необходимо поставить отметку здесь не позже 7:05"
      //         day={today}
      //       />
      //       <SimpleBlock
      //         type="video"
      //         name="Зарядка"
      //         blockName="sport"
      //         day={today}
      //         desc="Выполните комплекс упражнений в видео. После того, как вы просмотрите все видео без переключений - задание будет отмечено как выполненное."
      //       />
      //       <SimpleBlock
      //         type="audio"
      //         name="Медитация"
      //         blockName="meditation"
      //         day={today}
      //         desc="10 минутная медитация. Рекомендуем выполняь как можно раньше. После того, как аудио будет полностью прослушано, задание будет отмечено как выполненное."
      //       />
      //       <WaterBlock
      //         day={today}
      //       />
      //       <TasksBlock
      //         name="3 задачи на день"
      //         desc="Спланируйте 3 задачи, приближающие вас к вашим целям!"
      //         day={today}
      //       />
      //       <TextBlock
      //         name="Отчет за день"
      //         day={today}
      //         blockName="report"
      //         min={200}
      //         task="Опишите, как ваши действия за сегодня продвинули вас к цели"
      //       />
      //     </div>
      //   </div>
      // );
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
