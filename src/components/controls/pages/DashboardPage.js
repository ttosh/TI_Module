import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

class DashboardPage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.onUserConfigMenuSelect = this.onUserConfigMenuSelect.bind(this);
  }

  onUserConfigMenuSelect(key) {
    switch(key) {
      case "changeFiscalYear":
        //UserConfig.setUserConfigToShow(true);
        return this.setState({fiscalYears: this.props.fiscalYears});

      default:
        console.log("Default: " + key);
    }
  }

  render() {
    return(
      <div>
        Testing -- Dashboard page.....
      </div>
    );
  }
}

DashboardPage.propTypes = {
  fiscalYears: PropTypes.array.isRequired,
  jobs: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    fiscalYears: state.fiscalYears,
    jobs: state.jobs
  };
}

export default connect(mapStateToProps)(DashboardPage);




