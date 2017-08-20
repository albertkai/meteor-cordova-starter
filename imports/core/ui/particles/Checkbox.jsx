import React, { PureComponent } from 'react';

export class Checkbox extends PureComponent {

  onChange = (e) => {
    if (!this.props.enableOnly) {
      this.props.onChange(e);
    } else if (!this.props.checked) {
      this.props.onChange(e);
    }
  };

  render() {
    const {
      status,
      disabled,
      isHalf,
      checked,
      noAnimation,
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
      <div className="checkbox-cont">
        {!noAnimation && <div className={`circle ${checked ? 'checked' : ''}`} />}
        <button
          className={`checkbox ${status} ${disabled ? 'disabled' : ''} ${checked ? 'checked' : ''} ${isHalf ? 'half' : ''}`}
          onClick={this.onChange}
        >
          <i className={`fa fa-${icon}`} />
          {isHalf && <div className="half" />}
        </button>
      </div>
    );
  }
}

export default Checkbox;
