import React, { PureComponent } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'underscore';

import { HistoryIcon } from '/imports/onboard';
import { Days, ItemsLoading } from '/imports/core';
import * as actions from '../../api/redux/actions';
import { HistoryItem } from '../particles/HistoryItem';
import { coreConstants } from '/imports/core';

export class HistoryComponent extends PureComponent {

  constructor(props) {
    super(props);
    this.scrolledDown = false;
  }

  componentWillReceiveProps() {
    if (!this.props.history.historyLength) {
      this.props.countUsersHistory();
    }
  }

  // shouldComponentUpdate(nextProps) {
  //   if (
  //     !nextProps.daysReady &&
  //     this.props.daysReady &&
  //     this.props.days
  //   ) {
  //     return false;
  //   }
  //   return true;
  // }

  componentDidUpdate(prevProps) {
    if (
      (
        !this.scrolledDown &&
        this.props.daysReady &&
        this.props.days.length !== prevProps.days.length
      ) ||
      (
        !this.scrolledDown &&
        this.props.days.length === coreConstants.HISTORY_LIMIT
      )
    ) {
      this.cont.scrollTop = this.cont.scrollHeight;
      this.scrolledDown = true;
    }
    if (
      this.props.days.length !== prevProps.days.length ||
      (this.props.daysReady && !prevProps.daysReady)
    ) {
      if (this.props.history.scrollHeight) {
        Meteor.setTimeout(() => {
          this.cont.scrollTop = this.cont.scrollHeight - this.props.history.scrollHeight;
        }, 0);
      }
    }
  }

  componentDidMount() {
    this.cont.scrollTop = this.cont.scrollHeight;
    if (this.props.daysReady) {
      this.scrolledDown = true;
    }
  }

  componentWillUnmount() {
    this.props.resetHistoryLimit();
  }

  checkLoadMore = () => {
    if (this.props.gotMore) {
      this.props.checkLoadMore(this.cont);
    }
  };

  render() {
    const {
      days,
      daysReady,
      user,
      gotMore,
      historyLength,
    } = this.props;
    return (
      <div id="history" className="page">
        <div
          className="container paper scrollable no-padding"
          ref={(ref) => this.cont = ref}
          onScroll={_.throttle(this.checkLoadMore, 100)}
        >
          { !daysReady && !days.length && <ItemsLoading/>}
          {
            days.length
              ? <div>
                {
                  gotMore
                    ? <div className="load-more"><i className="fa fa-spin fa-spinner" /> Загружаем...</div>
                    : <div className="load-more">Все загружено ({historyLength})</div>
                }
                {days.map(d => <HistoryItem key={d._id} day={d} user={user} />)}
              </div>
              : <div className="no-items">
                <HistoryIcon />
                <h3>Здесь будет отображена личная история</h3>
                <p>Вы сможете отслеживать свой прогресс, читать свои ответы на текстовые вопросы, а также редактировать их</p>
              </div>
          }
        </div>
      </div>
    );
  }
}

export const HistoryContainer = createContainer(({ history: { limit, historyLength } }) => {
  // TODO probably here we can get rid of reactivity, and use methods instead
  const yesterday = moment().subtract(24, 'hours').toISOString();
  const handle = Meteor.subs.subscribe('days.getUserDays', limit);
  const days = Days.find({
    createdAt: {
      $lte: yesterday,
    },
  },
    {
      sort: {
        createdAt: -1,
      },
      limit,
    }).fetch().reverse();
  return {
    days,
    daysReady: handle.ready(),
    gotMore: historyLength ? limit < historyLength : null,
    historyLength,
  };
}, HistoryComponent);

const mapStateToProps = state => ({
  history: state.history.toJS(),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(actions, dispatch);

export const History = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HistoryContainer);

export default History;
