import React, { PureComponent } from 'react';

import { SideMenu, Header, FeeModal } from '/imports/core';

export class MainLayout extends PureComponent {
  render() {
    const { children } = this.props;
    return (
      <div id="main-layout" className="root">
        <SideMenu />
        <div className="main-content">
          <Header {...this.props}/>
          <div className="content">
            {React.cloneElement(children, this.props)}
          </div>
        </div>
      </div>
    );
  }
}

export default MainLayout;
