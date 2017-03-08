import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import NavigationHeader from './controls/common/NavigationHeader';

class App extends React.Component {
  render() {
    return (
      <div>
        <NavigationHeader
          jobs={this.props.jobs}
          fiscalYears={this.props.fiscalYears}
        />
        <br />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  fiscalYears: PropTypes.array.isRequired,
  jobs: PropTypes.array.isRequired
};


function mapStateToProps(state) {
  return {
    fiscalYears: state.fiscalYears,
    jobs: state.jobs
  };
}

export default connect(mapStateToProps)(App);
