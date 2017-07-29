import React, { PureComponent } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
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
            daysReady ?
              days.map(d => <HistoryItem key={d._id} day={d} user={user} />) :
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
