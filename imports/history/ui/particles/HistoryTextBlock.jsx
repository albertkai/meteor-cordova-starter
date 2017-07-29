import React, { PureComponent } from 'react';

import { EditableBlock } from './EditableBlock';

export class HistoryTextBlock extends PureComponent {

  state = {
    expanded: false,
  };

  toggleExpanded = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const { expanded } = this.state;
    const { title, desc, name, data, dayId } = this.props;
    return (
      <div className={`history-text-block ${name}`}>
        <div className="heading" onClick={this.toggleExpanded}>
          <span dangerouslySetInnerHTML={{ __html: title }} />
          <button>
            <i className={`fa fa-chevron-${expanded ? 'up' : 'down'}`} />
          </button>
        </div>
        <div className={`task-content ${expanded ? '_expanded' : ''}`}>
          <div className="task-text" dangerouslySetInnerHTML={{ __html: desc }} />
          <EditableBlock data={data} dayId={dayId} />
        </div>
      </div>
    );
  }
}

export default HistoryTextBlock;
