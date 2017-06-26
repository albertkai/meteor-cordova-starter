import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

import { Intro } from '../components/Intro';
import { Description } from '../components/Description';
import { HistoryDesc } from '../components/HistoryDesc';
import { Taxes } from '../components/Taxes';
import { OnboardFinal } from '../components/OnboardFinal';
import * as onboardActions from '../../api/redux/actions';

const templatesMap = {
  intro: Intro,
  about: Description,
  history: HistoryDesc,
  fees: Taxes,
  final: OnboardFinal,
};

export class OnboardComponent extends PureComponent {

  componentWillReceiveProps(nextProps) {
    const { user, ready, params: { templateName } } = this.props;
    const { user: newUser, params: { templateName: newTemplateName } } = nextProps;
    if ((!user || user && !user.onboard) && newUser && newUser.onboard) {
      browserHistory.push(`/onboard/${newUser.onboard.step}`);
    }
    if (newUser && newUser.onboard && newUser.onboard.isFinished) {
      browserHistory.push('/today');
    }
    if (
      user &&
      newUser &&
      user.onboard &&
      newUser.onboard &&
      user.onboard.step !== newUser.onboard.step
    ) {
      browserHistory.push(`/onboard/${newUser.onboard.step}`);
    }
  }

  renderSteps() {
    const { params: { templateName } } = this.props;
    return (
      <div className="steps">
        {
          Object.keys(templatesMap).map((name, i) => {
            const activeClass = name === templateName ? '_active' : '';
            return <span key={`step-${name}`} className={activeClass}>{i + 1}</span>;
          })
        }
      </div>
    );
  }

  render() {
    const { params: { templateName }, ready } = this.props;
    const DynamicTemplate = templatesMap[templateName];
    return (
      <div id="onboard">
        <div className="ovrl" />
        <header>
          <button
            className="logout"
            onClick={this.props.logout}
          >
            Выйти
          </button>
        </header>
        <div className="onboard-cont paper">
          {this.renderSteps()}
          <div className="content">
            {
              DynamicTemplate ?
                <DynamicTemplate {...this.props} /> :
                <p>not found</p>
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch =>
  bindActionCreators(onboardActions, dispatch);

export const Onboard = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OnboardComponent);

export default Onboard;
