import React, { PureComponent } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'underscore';

import * as profileActions from '../../api/redux/actions';

export class ChoosePictureSourceComponent extends PureComponent {
  render() {
    const {
      uploadAvatar,
      toggle,
      profile: {
        avatarIsUploading,
      },
    } = this.props;
    return (
      <div id="choose-picture-source">
        {
          avatarIsUploading
            ? <div className="progress">
              <div>
                <h4><i className="fa fa-spinner fa-spin" /> Загрузка</h4>
              </div>
            </div>
            : <div>
              <button className="upload" onClick={() => uploadAvatar(null, true, 'camera')}>
                <div>
                  <i className="fa fa-camera" />
                  <h3>Сделать фото</h3>
                </div>
                </button>
              <button className="upload" onClick={() => uploadAvatar(null, true, 'library')}>
                <div>
                  <i className="fa fa-image" />
                  <h3>Выбрать из галереи</h3>
                </div>
              </button>
          </div>
        }
        <button
          className="close"
          onClick={toggle}
        >
          <i className="fa fa-times" />
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile.toJS(),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(profileActions, dispatch);

export const ChoosePictureSource = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChoosePictureSourceComponent);

export default ChoosePictureSource;
