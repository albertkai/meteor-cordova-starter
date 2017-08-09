import React, { PureComponent } from 'react';
import moment from 'moment';
import _ from 'underscore';

import { EditableBlock } from '../particles/EditableBlock';
import { HistoryTextBlock } from '../particles/HistoryTextBlock';

const names = {
  dailyTask: 'Задание на день',
  wakeUp: 'Ранний подъем',
  sport: 'Зарядка',
  meditation: 'Медитация',
  water: '2 литра воды',
  taskList: 'Задачи на день',
  report: 'Дневной отчет',
  kind: 'Доброе дело',
};

const textBlocks = ['report', 'kind'];

export class HistoryItem extends PureComponent {
  render() {
    const {
      day: {
        _id,
        name,
        createdAt,
        blocks,
        index,
      },
      user: {
        fees: {
          amount,
        },
      },
    } = this.props;
    const passed = blocks.filter(b => b.passed);
    const failed = blocks.filter(b => !b.passed);
    const dailyTask = blocks.find(b => b.name === 'dailyTask');
    return (
      <div className="history-item">
        <div className="stripe">
          {
            blocks
              .sort((a, b) => (a.passed === b.passed) ? 0 : a.passed ? -1 : 1)
              .map(b => <span key={`stripe-${b.name}`} className={`${b.name} ${b.passed ? 'passed' : 'failed'}`} />)}
        </div>
        <header>
          <p>{moment(createdAt).format('DD.MM.YYYY')}</p>
          {
            !failed.length
              ? <p className="success"><strong><i className="fa fa-check" /> Все выполнено!</strong></p>
              : <p>Выполнено: <span>{passed.length}</span> из <span>{blocks.length}</span></p>
          }
        </header>
        {
          !!failed.length &&
            <div className="fee">Начислен штраф <strong>{failed.length * amount}P</strong></div>
        }
        <HistoryTextBlock
          title={`<strong>День ${dailyTask.options.day}</strong>. Задание`}
          name="dailyTask"
          desc={dailyTask.options.html}
          dayId={_id}
          data={dailyTask.data}
        />
        {
          textBlocks
            .filter(t => blocks.find(b => b.name === t))
            .map(t => {
              const b = blocks.find(b => b.name === t);
              return (
                <HistoryTextBlock
                  title={names[t]}
                  key={`${_id}-${t}`}
                  name={t}
                  dayId={_id}
                  data={b.data}
                />
              );
            })
        }
      </div>
    );
  }
}

export default HistoryItem;
