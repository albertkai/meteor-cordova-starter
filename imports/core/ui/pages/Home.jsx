import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { coreActions } from '/imports/core';

class HomeComponent extends PureComponent {
  render() {
    const {
      core: {
        clickCount,
      },
      incrementClickCount,
    } = this.props;
    return (
      <div id="home" className="page">
        <div className="container">
          <h2>Hello world</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis cupiditate deleniti fuga, iusto neque nesciunt placeat, provident quidem rerum soluta sunt voluptatum! Alias consequuntur deserunt dicta dolorem dolorum, ducimus explicabo harum, impedit inventore labore laboriosam natus nemo neque nihil nulla obcaecati officiis perspiciatis quibusdam reiciendis repudiandae sapiente sed ullam veritatis.</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ core: state.core.toJS() });

const mapDispatchToProps = dispatch =>
  bindActionCreators(coreActions, dispatch);

export const Home = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeComponent);