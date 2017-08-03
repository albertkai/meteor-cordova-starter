import React, { PureComponent } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { HistoryIcon } from '/imports/onboard';
import _ from 'underscore';

import { Checkbox, Days } from '/imports/core';
import { HistoryItem } from '../particles/HistoryItem';

export class HistoryComponent extends PureComponent {

  componentDidUpdate() {
    if (this.props.daysReady) {
      this.cont.scrollTop = this.cont.scrollHeight;
    }
  }

  render() {
    const { days, daysReady, user } = this.props;
    return (
      <div id="history" className="page">
        <div
          className="container paper scrollable no-padding"
          ref={(ref) => this.cont = ref}
        >
          {
            daysReady
              ? days.length
                ? days.map(d => <HistoryItem key={d._id} day={d} user={user} />)
                : <div className="no-items">
                  <HistoryIcon />
                  <h3>Здесь будет отображена личная история</h3>
                  <p>Вы сможете отслеживать свой прогресс, читать свои ответы на текстовые вопросы, а также редактировать их</p>
                </div>
              : <p><i className="fa fa-spinner fa-spin" /> Загрузка</p>
          }
        </div>
      </div>
    );
  }
}

export const History = createContainer(() => {
  const handle = Meteor.subs.subscribe('days.getUserDays');
  const days = Days.find({}, { sort: { createdAt: -1 } }).fetch();
  return {
    days,
    daysReady: handle.ready(),
  };
}, HistoryComponent);

export default History;
