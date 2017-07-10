import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../api/redux/actions';

export class EditableBlockComponent extends PureComponent {

  state = {
    isEditing: false,
    textToSave: '',
  };

  onChange = (e) => {
    const text = e.target.value;
    this.setState({ textToSave: text });
  };

  toggleEdit = () => {
    this.setState({ isEditing: true });
  };

  skip = () => {
    this.setState({ isEditing: false });
  };

  save = () => {
    const {
      updateTextBlock,
      name,
      dayId,
    } = this.props;
    updateTextBlock(dayId, name, this.state.textToSave);
    Meteor.setTimeout(() => {
      this.setState({ isEditing: false });
    }, 100);
  };

  render() {
    const { heading, desc, task, data } = this.props;
    const { isEditing } = this.state;
    return (
      <div className="editable-block">
        <h3>{heading}</h3>
        {task && <p className="task" dangerouslySetInnerHTML={{ __html: task }} />}
        {desc && <p className="desc">{desc}</p>}
        {
          isEditing ?
            <textarea defaultValue={data ? data.text : ''} onChange={this.onChange} /> :
            <p className="text">{data ? data.text || 'Нажмите "редактировать", чтобы добавить текст' : 'Нажмите "редактировать", чтобы добавить текст'}</p>
        }
        {
          isEditing ?
            <div className="buttons">
              <button onClick={this.skip}>Отменить</button>
              <button onClick={this.save}>Сохранить</button>
            </div> :
            <div className="buttons">
              <button onClick={this.toggleEdit}>Редактировать</button>
            </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch =>
  bindActionCreators(actions, dispatch);

export const EditableBlock = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditableBlockComponent);

export default EditableBlock;
