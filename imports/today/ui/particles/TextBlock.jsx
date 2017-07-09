import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Checkbox } from '/imports/core';
import { todayActions } from '/imports/today';

export class TextBlockComponent extends PureComponent {
  state = {
    left: this.props.min,
  };

  onChange = (e) => {
    const { value } = e.target;
    this.setState({ left: this.props.min - value.length });
  };

  checkTextBlock = () => {
    const { value } = this.textInput;
    const {
      checkTextBlock,
      day: {
        _id,
      },
      block,
      min,
    } = this.props;
    checkTextBlock(_id, block.name, value, min);
  };

  render() {
    const {
      name,
      desc,
      block,
      task,
    } = this.props;
    if (task) {
      return (
        <div className="block-item text">
          <div>
            <div>
              <Checkbox
                onChange={this.checkTextBlock}
                checked={block.passed}
                enableOnly
              />
            </div>
            <div>
              <h3>День {block.options.day}. Задание</h3>
              <p>Прочтите, обдумайте написанное, а главное - выполните действие <br/> и запишите ваши мысли</p>
            </div>
          </div>
          <div>
            <div>
              <div className="checkbox" />
            </div>
            <div>
              <div className="desc task-text" dangerouslySetInnerHTML={{ __html: block.options.html }} />
              {
                block.data && block.data.text ?
                  <div>
                    <p className="answer">{block.data.text}</p>
                  </div> :
                  <div>
                <textarea
                  ref={ref => this.textInput = ref}
                  cols="30"
                  rows="5"
                  onChange={this.onChange}
                  placeholder="Напишите ответ, а затем отметьте задание как выполненное"
                />
                    <p className="symbols-left">
                      {this.state.left > 0 ?
                        <span>Еще минимум {this.state.left} символов</span> :
                        <span>Длина сообщения достаточна</span>
                      }
                    </p>
                  </div>
              }
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="block-item text">
        <div>
          <Checkbox
            onChange={this.checkTextBlock}
            checked={block.passed}
            enableOnly
          />
        </div>
        <div>
          <h3>{name}</h3>
          <p className="desc">{desc}</p>
          {
            block.data && block.data.text ?
              <div>
                <p className="answer">{block.data.text}</p>
              </div> :
              <div>
                <textarea
                  ref={ref => this.textInput = ref}
                  cols="30"
                  rows="5"
                  onChange={this.onChange}
                  placeholder="Напишите ответ, а затем отметьте задание как выполненное"
                />
                <p className="symbols-left">
                  {this.state.left > 0 ?
                    <span>Еще минимум {this.state.left} символов</span> :
                    <span>Длина сообщения достаточна</span>
                  }
                </p>
              </div>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch =>
  bindActionCreators(todayActions, dispatch);

export const TextBlock = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TextBlockComponent);

export default TextBlock;
