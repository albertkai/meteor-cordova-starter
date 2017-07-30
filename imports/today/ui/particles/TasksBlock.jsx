import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { todayActions } from '/imports/today';
import { Checkbox, ContentEditable } from '/imports/core';

export class TasksBlockComponent extends PureComponent {

  addTask = (e) => {
    const { value } = this.add;
    const {
      day: {
        _id,
      },
      addTask,
    } = this.props;
    if (value) {
      addTask(_id, value);
      this.add.value = '';
    }
  };

  keyUpAdd = (e) => {
    e.persist();
    console.log(e.which);
    if (e.which === 13) {
      const { value } = this.add;
      const {
        day: {
          _id,
        },
        addTask,
      } = this.props;
      if (value) {
        addTask(_id, value);
        this.add.value = '';
      }
    }
  };

  removeTask = (index) => {
    const {
      day: {
        _id,
      },
      removeTask,
    } = this.props;
    removeTask(_id, index);
  };

  checkTask = (index) => {
    const {
      day: {
        _id,
      },
      checkTask,
    } = this.props;
    checkTask(_id, index);
  };

  render() {
    const {
      block,
    } = this.props;
    const isHalf = block.data && block.data.tasks && block.data.tasks.length >= 3;
    let tasks = block.data ? block.data.tasks : [];
    tasks = tasks || [];
    return (
      <div className={`block-item tasks-block ${block.name} ${block.passed ? '_passed' : ''}`}>
        <div>
          <div>
            <Checkbox
              disabled
              checked={block.passed}
              isHalf={isHalf}
            />
          </div>
          <div>
            <h3>3 задачи на день</h3>
            <p className="desc">Добавить до 11:00</p>
          </div>
        </div>
        <div>
          <div>
            <div className="checkbox" />
          </div>
          <div>
            <div className="tasks">
              {tasks.map((t, i) => (
                <div
                  className="task"
                  key={`tasks-block-task-${i}`}
                >
                  <div>
                    <Checkbox
                      onChange={() => this.checkTask(i)}
                      noAnimation
                      checked={t.checked}
                    />
                  </div>
                  <div>
                    <h4>{t.text}</h4>
                  </div>
                  <div>
                    {!block.passed && <button
                      onClick={() => this.removeTask(i)}
                      className="remove"
                    >
                      <i className="fa fa-times" />
                    </button>}
                  </div>
                </div>
              ))}
              {tasks.length < 3 && <div className="task add">
                <div>
                  <button
                    className="checkbox add"
                    onClick={this.addTask}
                  >
                    <i className="fa fa-plus" />
                  </button>
                </div>
                <div>
                  <input
                    ref={(ref) => this.add = ref}
                    onKeyUp={this.keyUpAdd}
                    type="text"
                    placeholder="Текст задания"
                  />
                </div>
              </div>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch =>
  bindActionCreators(todayActions, dispatch);

export const TasksBlock = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TasksBlockComponent);

export default TasksBlock;
