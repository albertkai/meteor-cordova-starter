import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { TimezoneSelect } from '/imports/profile';
import * as profileActions from '../../api/redux/actions';

export class ProfileSettingsComponent extends PureComponent {

  static propTypes = {
    setTimezone: PropTypes.func.isRequired,
    setFee: PropTypes.func.isRequired,
    setProfileField: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };

  render() {
    const {
      setTimezone,
      setFee,
      user: {
        personalData: {
          timezone,
          city,
          sphere,
          facebook,
          vkontakte,
          instagram,
          about,
        },
        fees: {
          amount,
        },
      },
      setProfileField,
    } = this.props;
    return (
      <div id="profile-settings">
        <div className="main-info">
          <div className="profile-form-item">
            <div>
              <h5>Временная зона:</h5>
            </div>
            <div>
              <TimezoneSelect
                  timezone={timezone}
                  setTimezone={setTimezone}
              />
            </div>
          </div>
          <div className="profile-form-item profile-form-item-fee">
            <div>
              <h5>Сумма штрафа:</h5>
            </div>
            <div>
              <span><i className="fa fa-rouble" /></span>
              <input
                  id="fee"
                  type="number"
                  defaultValue={amount}
                  onChange={setFee}
              />
            </div>
          </div>
          <div className="profile-form-item">
            <div>
              <h5>Город:</h5>
            </div>
            <div>
              <input
                  type="text"
                  placeholder="напр. Москва"
                  defaultValue={city}
                  onChange={e => setProfileField('city', e)}
              />
            </div>
          </div>
          <div className="profile-form-item">
            <div>
              <h5>Сфера:</h5>
            </div>
            <div>
              <input
                  type="text"
                  placeholder="напр. Веб-разработка"
                  defaultValue={sphere}
                  onChange={e => setProfileField('sphere', e)}
              />
            </div>
          </div>
          <div className="profile-form-item profile-form-item-contact">
            <div>
              <h5><i className="fa fa-facebook" /> Facebook:</h5>
            </div>
            <div>
              <input
                  type="text"
                  placeholder="https://facebook.com/yourname"
                  defaultValue={facebook}
                  onChange={e => setProfileField('facebook', e)}
              />
            </div>
          </div>
          <div className="profile-form-item profile-form-item-contact">
            <div>
              <h5><i className="fa fa-vk" /> Vkontakte:</h5>
            </div>
            <div>
              <input
                  type="text"
                  placeholder="https://vk.com/yourname"
                  defaultValue={vkontakte}
                  onChange={e => setProfileField('vkontakte', e)}
              />
            </div>
          </div>
          <div className="profile-form-item profile-form-item-contact">
            <div>
              <h5><i className="fa fa-instagram" /> Instagram:</h5>
            </div>
            <div>
              <input
                  type="text"
                  placeholder="https://instagram.com/yourname"
                  defaultValue={instagram}
                  onChange={e => setProfileField('instagram', e)}
              />
            </div>
          </div>
          <div className="profile-form-item profile-form-item-contact">
            <div>
              <h5>О себе:</h5>
            </div>
            <div>
              <textarea
                  placeholder="Опишите себя в 3х предложениях"
                  rows="5"
                  defaultValue={about}
                  onChange={e => setProfileField('about', e)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch =>
  bindActionCreators(profileActions, dispatch);

export const ProfileSettings = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileSettingsComponent);

export default ProfileSettings;
