import React, { PureComponent } from 'react';

export class Checkbox extends PureComponent {
  render() {
    const {
      status,
      disabled,
      checked
    } = this.props;
    const icon = (() => {
      if (!status || checked) {
        return 'check';
      } else if (status === 'missed') {
        return 'times';
      } else if (status === 'play') {
        return 'play';
      } else if (status === 'tint') {
        return 'tint';
      }
      return '';
    })();
    return (
      <button
        className={`checkbox ${status} ${disabled ? 'disabled' : ''} ${checked ? 'checked' : ''}`}
      >
        <i className={`fa fa-${icon}`} />
      </button>
    );
  }
}

export default Checkbox;
