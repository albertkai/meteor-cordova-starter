import React, { PureComponent } from 'react';

export class ItemsLoading extends PureComponent {
  render() {
    return (
      <div id="items-loading">
        <p><i className="fa fa-spinner fa-spin" /> Секундочку</p>
      </div>
    );
  }
}

export default ItemsLoading;
