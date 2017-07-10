import React, { PureComponent } from 'react';

import { ProfileTop } from '../components/ProfileTop';
import { ProfileBlocks } from '../components/ProfileBlocks';

export class Profile extends PureComponent {
  render() {
    return (
      <div id="profile">
        <ProfileTop {...this.props} />
        <div className="content">
          <div className="container paper">
            <p>Что делать здесь? Нужны ваши идеи! Возможно отслеживать прогресс, или что-то вроде колеса жизни. Можно тупо информацию о пользователе</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
