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
        <div className="container paper scrollable">
          {
            daysReady ?
              days.map(d => <HistoryItem key={d._id} day={d} />) :
              <p><i className="fa fa-spinner fa-spin" /> Загрузка</p>
          }
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
