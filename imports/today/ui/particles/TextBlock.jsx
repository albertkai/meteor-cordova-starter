import React, { PureComponent } from 'react';

import { Checkbox } from '/imports/core';

export class TextBlock extends PureComponent {
  render() {
    const {
      name,
      desc,
      task,
    } = this.props;
    return (
      <div className="block-item text">
        <div>
          <Checkbox />
        </div>
        <div>
          <h3>{name}</h3>
          {task && <p className="desc task-text">{task}</p>}
          {desc && <p className="desc">{desc}</p>}
          <textarea name="" id="" cols="30" rows="5" placeholder="Напишите ответ, а затем отметьте задание как выполненное" />
          <p className="symbols-left">Еще минимум 175 символов</p>
        </div>
      </div>
    );
  }
}

export default TextBlock;
