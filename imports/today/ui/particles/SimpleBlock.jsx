import React, { PureComponent } from 'react';

import { Checkbox } from '/imports/core';

export class SimpleBlock extends PureComponent {
  render() {
    const {
      type,
      name,
      desc,
    } = this.props;
    const status = (() => {
      if (type === 'video' || type === 'audio') {
        return 'play';
      }
      return null;
    })();
    return (
      <div className={`block-item simple-block ${type}`}>
        <div>
          <Checkbox status={status} />
        </div>
        <div>
          <h3>{name}</h3>
          <p className="desc">{desc}</p>
        </div>
      </div>
    );
  }
}

export default SimpleBlock;
