import React, { PureComponent } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import _ from 'underscore';

import { Checkbox, Days } from '/imports/core';
import { HistoryItem } from '../particles/HistoryItem';

export class HistoryComponent extends PureComponent {
  render() {
    const { days, daysReady } = this.props;
    return (
      <div id="history" className="page">
        <div className="container paper scrollable no-padding">
          {/*{*/}
            {/*daysReady ?*/}
              {/*days.map(d => <HistoryItem key={d._id} day={d} />) :*/}
              {/*<p><i className="fa fa-spinner fa-spin" /> Загрузка</p>*/}
          {/*}*/}
          <div className="historyy-item">
            <div className="stripe">
              <span></span><span></span><span></span><span></span><span></span><span></span><span></span>
            </div>
            <header>
              <p>22 августа 2012</p>
              <p className="success"><strong><i className="fa fa-check" /> Все выполнено!</strong> <span><i className="fa fa-chevron-down" /></span></p>
            </header>
            <div className="text-task daily-task">
              <span><strong>День 1.</strong> Задание</span>
              <button><i className="fa fa-chevron-down" /></button>
            </div>
            <div className="text-task">
                <span><strong>Вечерний отчет</strong></span>
                <button><i className="fa fa-chevron-down" /></button>
            </div>
          </div>
          <div className="historyy-item">
            <div className="stripe">
              <span></span><span></span><span></span><span></span><span></span><span></span><span></span>
            </div>
            <header>
              <p>22 августа 2012</p>
              <p className="success"><strong><i className="fa fa-check" /> Все выполнено!</strong> <span><i className="fa fa-chevron-down" /></span></p>
            </header>
            <div className="text-task daily-task">
              <span><strong>День 1.</strong> Задание</span>
              <button><i className="fa fa-chevron-down" /></button>
            </div>
            <div className="text-task">
              <span><strong>Вечерний отчет</strong></span>
              <button><i className="fa fa-chevron-down" /></button>
            </div>
          </div>
          <div className="historyy-item">
            <div className="stripe">
              <span></span><span></span><span></span><span></span><span></span><span></span><span></span>
            </div>
            <header>
              <p>22 августа 2012</p>
              <p className="success"><strong><i className="fa fa-check" /> Все выполнено!</strong> <span><i className="fa fa-chevron-down" /></span></p>
            </header>
            <div className="text-task daily-task">
              <span><strong>День 1.</strong> Задание</span>
              <button><i className="fa fa-chevron-down" /></button>
            </div>
            <div className="text-task">
              <span><strong>Вечерний отчет</strong></span>
              <button><i className="fa fa-chevron-down" /></button>
            </div>
          </div>
          <div className="historyy-item">
            <div className="stripe">
              <span></span><span></span><span></span><span></span><span></span><span></span><span></span>
            </div>
            <header>
              <p>22 августа 2012</p>
              <p>Выполнено: 4 из 4 <span><i className="fa fa-chevron-down" /></span></p>
            </header>
            <div className="fee">
              <p><i className="fa fa-times" /> Штраф 1200p</p>
            </div>
            <div className="text-task daily-task">
              <span><strong>День 1.</strong> Задание</span>
              <button><i className="fa fa-chevron-down" /></button>
            </div>
          </div>
          <div className="historyy-item">
            <div className="stripe">
              <span></span><span></span><span></span><span></span><span></span><span></span><span></span>
            </div>
            <header>
              <p>22 августа 2012</p>
              <p>Выполнено: <span>4</span> из <span>4</span> <i className="fa fa-chevron-down" /></p>
            </header>
            <div className="text-task daily-task">
                <span><strong>День 1.</strong> Задание</span>
                <button><i className="fa fa-chevron-down" /></button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export const History = createContainer(() => {
  const handle = Meteor.subscribe('days.getUserDays');
  const days = Days.find().fetch();
  return {
    days,
    daysReady: handle.ready(),
  };
}, HistoryComponent);

export default History;
