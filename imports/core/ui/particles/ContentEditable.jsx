import React, { PureComponent } from 'react';

export class ContentEditable extends PureComponent {

  constructor(props) {
    super(props);
    this.saveTimeout = null;
  }

  componentDidMount() {
    if (this.props.value) {
      this.input.innerText = this.props.value;
    }
  }

  change = (e) => {
    e.persist();
    Meteor.clearTimeout(this.saveTimeout);
    this.saveTimeout = Meteor.setTimeout(() => {
      this.props.onChange(e.target.innerText);
    }, 300);
  };

  render() {
    if (this.props.element === 'h4') {
      return (
        <h4
          ref={ref => this.input = ref}
          className="content-editable"
          contentEditable={this.props.editable}
          onKeyUp={this.change}
          placeholder={this.props.placeholder}
        >
          {this.props.value}
        </h4>
      );
    }
    return (
      <div
        ref={ref => this.input = ref}
        className="content-editable"
        contentEditable={this.props.editable}
        onChange={this.change}
        placeholder={this.props.placeholder}
      >
        {this.props.value}
      </div>
    );
  }
}

export default ContentEditable;
