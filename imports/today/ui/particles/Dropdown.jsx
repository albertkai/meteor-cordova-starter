import React, { PureComponent } from 'react';

export class Dropdown extends PureComponent {

  constructor(props) {
    super(props);
    this.isValueSet = false;
  }

  render() {
    const {
      value,
      onChange,
      options,
      disabled,
    } = this.props;
    const name = (() => {
      const target = options.find(o => o.value === value);
      if (target) {
        return target.name;
      }
      return '';
    })();
    return (
      <div className={`dropdown ${disabled ? '_disabled' : ''}`}>
        <div className="cont">
          {name}
          <i className="fa fa-caret-down" />
        </div>
        <select onChange={onChange} value={value}>
          {options.map(o => <option key={`drpdwn-${o.value}`} value={o.value}>{o.name}</option>)}
        </select>
      </div>
    );
  }
}

export default Dropdown;
