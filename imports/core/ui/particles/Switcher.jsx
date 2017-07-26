import React, { PureComponent } from 'react';

export class Switcher extends PureComponent {

  state = {
    checked: false,
  };

  toggle = () => {
    console.log(this.props.onChange);
    this.props.onChange(!this.props.checked);
  };

  render() {
    const { checked, noAnimation } = this.props;
    return (
      <div className={`switcher ${checked ? '_checked' : ''}`}>
        {!noAnimation && <div className="circle" />}
        <div className="control" onClick={this.toggle}>
          <div className="stripe">
            <div className="ovrl" />
            <div className="handle" />
          </div>
        </div>
      </div>
    );
  }
}

export default Switcher;
