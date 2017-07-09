import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { todayActions } from '/imports/today';
import { Checkbox, ContentEditable } from '/imports/core';

export class TasksBlockComponent extends PureComponent {

  updateFirstTask = (text) => {
    const {
      day: {
        _id,
      },
      updateTask,
    } = this.props;
    updateTask(_id, text, 'first');
  };

  updateSecondTask = (text) => {
    const {
      day: {
        _id,
      },
      updateTask,
    } = this.props;
    updateTask(_id, text, 'second');
  };

  updateThirdTask = (text) => {
    const {
      day: {
        _id,
      },
      updateTask,
    } = this.props;
    updateTask(_id, text, 'third');
  };

  checkFirstTask = () => {
    const {
      day: {
        _id,
      },
      checkTask,
    } = this.props;
    checkTask(_id, 'first');
  };

  checkSecondTask = () => {
    const {
      day: {
        _id,
      },
      checkTask,
    } = this.props;
    checkTask(_id, 'second');
  };

  checkThirdTask = () => {
    const {
      day: {
        _id,
      },
      checkTask,
    } = this.props;
    checkTask(_id, 'third');
  };

  render() {
    const {
      block,
    } = this.props;
    const isHalf = (() => {
      if (block.passed) {
        return false;
      }
      if (block.data) {
        return block.data.first && block.data.second && block.data.third;
      }
      return false;
    })();
    return (
      <div className="block-item tasks-block">
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
            <p className="desc">Спланируйте 3 задачи, приближающие вас к вашим целям!</p>
          </div>
        </div>
        <div>
          <div>
            <div className="checkbox" />
          </div>
          <div>
            <div className="tasks">
              <div className="task">
                <div>
                  <Checkbox
                    onChange={this.checkFirstTask}
                    checked={block.data && block.data['first'] && block.data['first'].checked}
                  />
                </div>
                <div>
                  <ContentEditable
                    editable={!block.data || !block.data['second'] || (block.data && block.data['first'] && !block.data['first'].checked)}
                    element="h4"
                    onChange={this.updateFirstTask}
                    value={block.data && block.data['first'] ? block.data['first'].text : ''}
                    placeholder="Добавьте первое задание"
                  />
                </div>
              </div>
              <div className="task">
                <div>
                  <Checkbox
                    onChange={this.checkSecondTask}
                    checked={block.data && block.data['second'] && block.data['second'].checked}
                  />
                </div>
                <div>
                  <ContentEditable
                    editable={!block.data || !block.data['second'] || (block.data && block.data['second'] && !block.data['second'].checked)}
                    element="h4"
                    onChange={this.updateSecondTask}
                    value={block.data && block.data['second'] ? block.data['second'].text : ''}
                    placeholder="Добавьте второе задание"
                  />
                </div>
              </div>
              <div className="task">
                <div>
                  <Checkbox
                    onChange={this.checkThirdTask}
                    checked={block.data && block.data['third'] && block.data['third'].checked}
                  />
                </div>
                <div>
                  <ContentEditable
                    editable={!block.data || !block.data['third'] || (block.data && block.data['third'] && !block.data['third'].checked)}
                    element="h4"
                    onChange={this.updateThirdTask}
                    value={block.data && block.data['third'] ? block.data['third'].text : ''}
                    placeholder="Добавьте третье задание"
                  />
                </div>
              </div>
              {/*<div className="task add">*/}
              {/*<div>*/}
              {/*<button className="checkbox add">*/}
              {/*<i className="fa fa-plus" />*/}
              {/*</button>*/}
              {/*</div>*/}
              {/*<div>*/}
              {/*<h4>Добавить задачу</h4>*/}
              {/*</div>*/}
              {/*</div>*/}
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
