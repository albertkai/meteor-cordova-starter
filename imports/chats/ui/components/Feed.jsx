import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';

import { Activity, ItemsLoading } from '/imports/core';
import { ActivityItem } from '../particles/ActivityItem';

export class FeedComponent extends PureComponent {

  static propTypes = {
    activity: PropTypes.array,
    activityReady: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    activity: [],
  };

  render() {
    const {
      activity,
      activityReady,
    } = this.props;
    return (
      <div id="feed">
        {
          activityReady
            ? activity.map(a => <ActivityItem key={`feed-item-${a._id}`} item={a} />)
            : <ItemsLoading />
        }
      </div>
    );
  }
}

export const Feed = createContainer(() => {
  const handle = Meteor.subs.subscribe('activity.groupActivity');
  const activity = Activity.find().fetch();
  return {
    activity,
    activityReady: handle.ready(),
  };
}, FeedComponent);

export default Feed;
