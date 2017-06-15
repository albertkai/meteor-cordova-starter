import React, { PureComponent } from 'react';

export class Loading extends PureComponent {
  render() {
    return (
      <div id="loading" className="canvas">
        <div className="center-self">
          <h4><i className="fa fa-spinner fa-spin" /> Loading...</h4>
        </div>
      </div>
    );
  }
}