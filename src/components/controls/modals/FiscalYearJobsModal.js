import React, {PropTypes} from 'react';
import {browserHistory} from 'react-router';

import Toastr from 'toastr';
import Popover from 'react-bootstrap/lib/Popover';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';

import Job from '../../../api/objects/job';
import JobsWidget from '../../controls/widgets/jobs/JobsWidget';
import FiscalYear from '../../../api/objects/fiscalYear';
import FiscalYearWidget from '../widgets/fiscal-years/FiscalYearsWidget';

const fiscalYearConfigurationPopover = (
  <Popover id='fiscalYearPopover' title='Fiscal Year Configuration'>
    Select the fiscal year for the current user session.
  </Popover>
);

const jobConfigurationPopover = (
  <Popover id='jobPopover' title='Job Configuration'>
    Select the job for the current user session.
  </Popover>
);

Toastr.options = {
  'closeButton': true,
  'debug': false,
  'newestOnTop': true,
  'progressBar': true,
  'positionClass': 'toast-top-right',
  'preventDuplicates': false,
  'onclick': null,
  'showDuration': '300',
  'hideDuration': '1000',
  'timeOut': '2000',
  'extendedTimeOut': '1000',
  'showEasing': 'swing',
  'hideEasing': 'linear',
  'showMethod': 'fadeIn',
  'hideMethod': 'fadeOut'
};

class FiscalYearJobsModal extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      showModal: true
    };

    this.job = new Job();
    this.fiscalYear = new FiscalYear();

    this.hideModalForSave = this.hideModalForSave.bind(this);
    this.hideModalForCancel = this.hideModalForCancel.bind(this);
    this.onJobsChange = this.onJobsChange.bind(this);
    this.onFiscalYearChange = this.onFiscalYearChange.bind(this);
  }


  onFiscalYearChange(event) {
    let fyArgs = this.props.fiscalYears.filter(fy => fy.FiscalYearId == event.target.value);
    this.fiscalYear =
      new FiscalYear({
        id: fyArgs[0]['FiscalYearId'],
        description: fyArgs[0]['Description'],
        selected: true
      });
  }

  onJobsChange(event) {
    let jobArgs = this.props.jobs.filter(fy => fy.JobId == event.target.value);
    this.job =
      new Job({
        id: jobArgs[0]['JobId'],
        number: jobArgs[0]['JobNumber'],
        vessel: jobArgs[0]['VesselName'],
        fiscalYearId: jobArgs[0]['FiscalYearId'],
        isActive: jobArgs[0]['IsActive'],
        isSelected: true
      });
  }

  hideModalForSave() {

    this.job.setLocalStorageJob();
    this.fiscalYear.setLocalStorage();
    //UserConfig.setUserConfigToShow(false);

    Toastr.success('User configuration has been set.');
    this.setState({showModal: false});
    browserHistory.push('/dashboard');
  }

  hideModalForCancel() {

    //UserConfig.setUserConfigToShow(true)

    Job.nullifyLocalStorageJob();
    FiscalYear.nullifyLocalStorageFiscalYear();

    Toastr.warning('User configuration has not been set.');
    this.setState({showModal: false});
    browserHistory.push('/dashboard');
  }

  render() {

    let showJobs = this.props.jobs.length > 0;
    let showFiscalYears = this.props.fiscalYears.length > 0;

    if(showJobs) {
      return (
        <Modal show={this.state.showModal} onHide={this.hideModalForCancel} backdrop={'static'}>

          <Modal.Header>
            <Modal.Title>
              <OverlayTrigger overlay={jobConfigurationPopover}>
                <span><Glyphicon glyph='question-sign'/></span>
              </OverlayTrigger>
              &nbsp;&nbsp;Job Configuration
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <JobsWidget
              jobs={this.props.jobs}
              onChange={this.onJobsChange}
            />
          </Modal.Body>

          <Modal.Footer>
            <Button bsStyle='default' onClick={this.hideModalForCancel}>Cancel</Button>
            <Button bsStyle='primary' onClick={this.hideModalForSave}>Save</Button>
          </Modal.Footer>

        </Modal>

      );
    }

    if(showFiscalYears) {
      return (
        <Modal show={this.state.showModal} onHide={this.hideModalForCancel} backdrop={'static'}>

          <Modal.Header>
            <Modal.Title>
              <OverlayTrigger overlay={fiscalYearConfigurationPopover}>
                <span><Glyphicon glyph='question-sign'/></span>
              </OverlayTrigger>
              &nbsp;&nbsp;Fiscal Year Configuration
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <FiscalYearWidget
              fiscalYears={this.props.fiscalYears}
              onChange={this.onFiscalYearChange}
            />

          </Modal.Body>

          <Modal.Footer>
            <Button bsStyle='default' onClick={this.hideModalForCancel}>Cancel</Button>
            <Button bsStyle='primary' onClick={this.hideModalForSave}>Save</Button>
          </Modal.Footer>

        </Modal>

      );
    }

    return (
      <div>No fiscal years or jobs found.....</div>
    );

  }
}

FiscalYearJobsModal.propTypes = {
  fiscalYears: PropTypes.array.isRequired,
  jobs: PropTypes.array.isRequired
};

export default FiscalYearJobsModal;

