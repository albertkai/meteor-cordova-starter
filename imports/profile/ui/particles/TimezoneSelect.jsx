import React, { PureComponent } from 'react';
import moment from 'moment';
import 'moment-timezone';

export class TimezoneSelect extends PureComponent {

  state = { localTime: '' };

  componentDidMount() {
    this.timeInterval = Meteor.setInterval(() => {
      this.setState({
        localTime: moment().tz(this.props.timezone).format('HH:mm:ss'),
      });
    }, 1000);
  }

  componentWillUnmount() {
    Meteor.clearInterval(this.timeInterval);
  }

  render() {
    const names = moment.tz.names();
    const {
      timezone,
      setTimezone,
    } = this.props;
    return (
      <div className="timezone">
        <select
          defaultValue={timezone}
          onChange={setTimezone}
        >
          {names.map(n => <option key={`upload-tz-${n}`} value={n}>{n}</option>)}
        </select>
        <span className="time"> {this.state.localTime}</span>
      </div>
    )
  }
}

export default TimezoneSelect;