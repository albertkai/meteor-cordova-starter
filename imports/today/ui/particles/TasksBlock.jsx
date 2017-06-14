import React, { PureComponent } from 'react';

import { Checkbox } from '/imports/core';

export class TasksBlock extends PureComponent {
  render() {
    const {
      name,
      desc,
    } = this.props;
    return (
      <div className="block-item">
        <div>
          <Checkbox disabled />
        </div>
        <div>
          <h3>{name}</h3>
          <p className="desc">{desc}</p>
          <div className="tasks">
            <div className="task">
              <div>
                <Checkbox />
              </div>
              <div>
                <h4>Сделать много интересного сегодня</h4>
              </div>
            </div>
            <div className="task">
              <div>
                <Checkbox />
              </div>
              <div>
                <h4>Добавить еще немного хайпа к своему проекту</h4>
              </div>
            </div>
            <div className="task">
              <div>
                <Checkbox />
              </div>
              <div>
                <h4>Записать видео-обращение к авторам блога Техкранч и запустить воронку</h4>
              </div>
            </div>
            <div className="task add">
              <div>
                <button className="checkbox add">
                  <i className="fa fa-plus" />
                </button>
              </div>
              <div>
                <h4>Добавить задачу</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TasksBlock;
