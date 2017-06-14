import React, { PureComponent } from 'react';

import { Checkbox } from '/imports/core';

export class WaterBlock extends PureComponent {
  render() {
    return (
      <div className="block-item water">
        <div>
          <Checkbox status="tint" />
        </div>
        <div>
          <h3>Выпито <span>0.6</span> из <span>2</span> литров воды</h3>
          <p className="desc">Нажмите на кнопку с каплей, каждый раз когда выпиваете стакан воды</p>
        </div>
      </div>
    );
  }
}

export default WaterBlock;
