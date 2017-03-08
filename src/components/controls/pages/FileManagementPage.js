import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import Job from '../../../api/objects/job';
import Files from '../../../api/objects/file';
import AppButton from '../buttons/AppButton';
import FilesDataGrid from '../datagrids/FilesDataGrid';

import Col from 'react-bootstrap/lib/Col';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';


class FileManagementPage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.onFileSelect = this.onFileSelect.bind(this);
    this.getFilesForJob = this.getFilesForJob.bind(this);
    this.clearUserInterface = this.clearUserInterface.bind(this);
    this.loadTicketsForJob = this.loadTicketsForJob.bind(this);
  }

  onFileSelect(event) {
    Files.fileSelect(event);
  }

  loadTicketsForJob() {
    Files.loadTicketsForJob(Job.getLocalStorageIdentifier());
  }

  getFilesForJob() {
    Files.getFilesForJob(Job.getLocalStorageIdentifier());
  }

  clearUserInterface() {
    Files.getFilesForJob(Job.getLocalStorageIdentifier());
  }

  render() {
    return(
      <div>
        <FilesDataGrid
          onRowSelect={this.onFileSelect} />

        <FormGroup
          controlId="frmOptions"
          bsSize="small">
          <Col
            lg={1}
            componentClass={ControlLabel}/>
          <Col lg={4}>
            <ButtonToolbar>

              <ButtonGroup>
                <AppButton
                  editMode={false}
                  loading={"Loading Files..."}
                  buttonText={"Add Files..."}
                  buttonProcessText={"Files being added..."}
                  onClick={File.fileSelect}>
                </AppButton>
              </ButtonGroup>

              <ButtonGroup>
                <AppButton
                  buttonText={"Reset"}
                  buttonProcessText={"Clearing UI..."}
                  loading={"Updating UI..."}
                  onClick={this.clearUserInterface}>
                </AppButton>
              </ButtonGroup>
            </ButtonToolbar>
          </Col>
        </FormGroup>
      </div>
    );
  }
}

FileManagementPage.propTypes = {
  files: PropTypes.array.isRequired,
  jobs: PropTypes.array.isRequired,
  tickets: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    files: PropTypes.array.isRequired,
    jobs: state.jobs,
    tickets: state.tickets
  };
}

export default connect(mapStateToProps)(FileManagementPage);




