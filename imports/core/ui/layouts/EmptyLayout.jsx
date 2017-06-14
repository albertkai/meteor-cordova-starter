import React, { PureComponent } from 'react';

export class EmptyLayout extends PureComponent {
  render() {
    const { children } = this.props;
    return (
      <div id="empty-layout">
        {React.cloneElement(children, this.props)}
      </div>
    );
  }
}

export default EmptyLayout;
