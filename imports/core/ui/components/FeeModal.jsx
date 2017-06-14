import React, { PureComponent } from 'react';

export class FeeModal extends PureComponent {
  render() {
    return (
      <div id="fee-modal" className="modal">
        <div className="modal-cont paper">
          <button
            className="close"
          >
            <i className="fa fa-times" />
          </button>
        </div>
      </div>
    );
  }
}

export default FeeModal;
