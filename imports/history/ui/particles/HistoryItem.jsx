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
          {blocks.map(b => <span key={`stripe-${b.name}`} className={`${b.name} ${b.passed ? 'passed' : 'failed'}`} />)}
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
          failed.length &&
            <div className="fee">Начислен штраф <strong>{failed.length * amount}P</strong></div>
        }
        <HistoryTextBlock
          title={`<strong>День ${index}</strong>. Задание`}
          name="dailyTask"
          desc={dailyTask.options.html}
          dayId={dailyTask._id}
          data={dailyTask.data}
        />
        {
          textBlocks
            .filter(t => blocks.find(b => b.name === t))
            .map(b => {
              return (
                <HistoryTextBlock
                  title={names[t]}
                  name={t}
                  dayId={b._id}
                  data={b.data}
                />
              );
            })
        }
      </div>
    );
    // return (
    //   <div className="history-item">
    //     <header>
    //       <p>{moment(createdAt).format('DD.MM.YYYY')}</p>
    //       <p>{isFinished ? <span>Выполнено <span>{passed.length}</span> из <span>{blocks.length}</span></span> : <span>Сегодня</span>}</p>
    //     </header>
    //     <div className="body">
    //       {isFinished && !!passed.length && <div className="success summary">
    //         <div>
    //           <div>
    //             <i className="fa fa-check" />
    //           </div>
    //         </div>
    //         <p>{passed.map(b => <span key={`passed-${b.name}`}>{names[b.name]}</span>)}</p>
    //       </div>}
    //       {isFinished && !!failed.length && <div className="fails summary">
    //         <div>
    //           <div>
    //             <i className="fa fa-times" />
    //           </div>
    //         </div>
    //         <p>{failed.map(b => <span key={`failed-${b.name}`}>{names[b.name]}</span>)}</p>
    //       </div>}
    //     </div>
    //     <EditableBlock
    //       heading={`День ${dailyTask.options.day}. Задание`}
    //       task={dailyTask.options.html}
    //       data={dailyTask.data}
    //       dayId={_id}
    //       name="dailyTask"
    //     />
    //   </div>
    // );
  }
}

export default HistoryItem;
