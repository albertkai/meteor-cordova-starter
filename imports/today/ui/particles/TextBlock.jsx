import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Checkbox } from '/imports/core';
import { todayActions } from '/imports/today';

export class TextBlockComponent extends PureComponent {
  state = {
    left: this.props.min,
    expanded: false,
  };

  onChange = (e) => {
    const { value } = e.target;
    this.setState({ left: this.props.min - value.length });
  };

  expand = () => this.setState({ expanded: !this.state.expanded });

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
      type,
      task,
    } = this.props;
    const { expanded } = this.state;
    if (task) {
      return (
        <div className={`block-item text ${type} ${block.passed ? '_passed' : ''}`}>
          <div onClick={this.expand}>
            <div>
              <Checkbox
                onChange={this.checkTextBlock}
                checked={block.passed}
                enableOnly
              />
            </div>
            <div>
              <h3>День {block.options.day}</h3>
              <p>Ежедневное задание</p>
            </div>
            <div>
              <button className="button-expand">
                <i className={`fa fa-chevron-${expanded ? 'up' : 'down'}`} />
              </button>
            </div>
          </div>
          <div className={`expand ${expanded ? '_expanded' : ''}`}>
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
              {!block.passed && <button
                className="send"
                onClick={this.checkTextBlock}
              >
                Отправить!
              </button>}
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className={`block-item text ${type} ${block.passed ? '_passed' : ''}`}>
        <div onClick={this.expand}>
          <div>
            <Checkbox
              // onChange={this.checkTextBlock}
              checked={block.passed}
              enableOnly
            />
          </div>
          <div>
            <h3>{name}</h3>
          </div>
          <div>
            <button className="button-expand">
              <i className={`fa fa-chevron-${expanded ? 'up' : 'down'}`} />
            </button>
          </div>
        </div>
        <div className={`expand ${expanded ? '_expanded' : ''}`}>
          <div>
            <div className="checkbox" />
          </div>
          <div>
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
                  <button
                    className="send"
                    onClick={this.checkTextBlock}
                  >
                    Отправить!
                  </button>
                </div>
            }
          </div>
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
