import React, {PropTypes} from 'react';

import Col from 'react-bootstrap/lib/Col';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Panel from 'react-bootstrap/lib/Panel';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';

import AppButton from '../buttons/AppButton';

const CheckPointFormControl = ({checkPoint, ticket, onFormFieldChange, editMode, isAddUpdateLoading, handleAddUpdateClick, isClearLoading, handleClearClick, errors}) => {

  let cpFormPanelTitle = <div>
            <span className="table-header-glyph">
              <Glyphicon title='Check Points' className="nav-glyph" glyph='collapse-down'/>&nbsp;&nbsp;
              <Glyphicon
                className="table-glyph"
                title='cpoints'
                glyph='cog'/>&nbsp; CheckPoints
              </span>
    <span className="table-header-glyph" style={{float: 'right'}}>
              <Glyphicon
                className="pushpin-glyph-pinned"
                title='pincheckpoints'
                glyph='pushpin'/>
            </span>
  </div>;

  function voidTicket() {
    ticket.void();
  }

  function unVoidTicket() {
    ticket.unVoid();
  }

  function addNewCheckPoint() {
    checkPoint.save();
  }

  function copyCurrentCheckPoint() {
    checkPoint.copy();
  }

  return (
    <div>
      <br />
    <Panel
      className="ti-panel"
      header={cpFormPanelTitle}
      collapsible
      expanded={true}>
      <div id="cp-form-outerdiv" className="ti-outer-div">
        <div id="cp-form-innerdiv" className="ti-inner-div">
          <Form inline>
            <FormGroup
              controlId={"cptickno"}
              bsSize="small">
              <Col
                lg={2}
                componentClass={ControlLabel}>
                Ticket No.
              </Col>
              <Col lg={4}>
                <FormControl
                  type="text"
                  placeholder="CP Id."
                  value={checkPoint.CheckPointResultTicketNo}/>
              </Col>
            </FormGroup>

            <FormGroup
              controlId={"originator"}
              bsSize="small">
              <Col
                lg={2}
                componentClass={ControlLabel}>
                Originator
              </Col>
              <Col lg={4}>
                <FormControl
                  type="text"
                  placeholder="Originator"
                  value={checkPoint.Originator}/>
              </Col>
            </FormGroup>

            <br /><br />

            <FormGroup
              controlId={"ndate"}
              bsSize="small">
              <Col
                lg={2}
                componentClass={ControlLabel}>
                Notify Date
              </Col>
              <Col lg={4}>
                <FormControl
                  type="text"
                  placeholder="Notify Date"
                  value={checkPoint.NotifyDate}/>
              </Col>
            </FormGroup>

            <FormGroup
              controlId={"ntime"}
              bsSize="small">
              <Col
                lg={2}
                componentClass={ControlLabel}>
                Notify Time
              </Col>
              <Col lg={4}>
                <FormControl
                  type="text"
                  placeholder="Notify Time"
                  value={checkPoint.NotifyTime}/>
              </Col>
            </FormGroup>

            <br /><br />

            <FormGroup
              controlId={"cnotified"}
              bsSize="small">
              <Col
                lg={2}
                componentClass={ControlLabel}>
                Customer Notified
              </Col>
              <Col lg={4}>
                <FormControl
                  type="text"
                  placeholder="Customer Notified"
                  value={checkPoint.CustomerNotified}/>
              </Col>
            </FormGroup>

            <FormGroup
              controlId={"mloc"}
              bsSize="small">
              <Col
                lg={2}
                componentClass={ControlLabel}>
                Meet Location
              </Col>
              <Col lg={4}>
                <FormControl
                  type="text"
                  placeholder="Meet Location"
                  value={checkPoint.MeetLocation}/>
              </Col>
            </FormGroup>

            <br /><br />

            <FormGroup
              controlId={"sdate"}
              bsSize="small">
              <Col
                lg={2}
                componentClass={ControlLabel}>
                Sched Date
              </Col>
              <Col lg={4}>
                <FormControl
                  type="text"
                  placeholder="Sched Date"
                  value={checkPoint.SchedDate}/>
              </Col>
            </FormGroup>

            <FormGroup
              controlId={"stime"}
              bsSize="small">
              <Col
                lg={2}
                componentClass={ControlLabel}>
                Sched Time
              </Col>
              <Col lg={4}>
                <FormControl
                  type="text"
                  placeholder="Sched Time"
                  value={checkPoint.SchedTime}/>
              </Col>
            </FormGroup>

            <br /><br />

            <FormGroup
              controlId={"nby"}
              bsSize="small">
              <Col
                lg={2}
                componentClass={ControlLabel}>
                Notify By
              </Col>
              <Col lg={4}>
                <FormControl
                  type="text"
                  placeholder="Notify By"
                  value={checkPoint.NotifyBy}/>
              </Col>
            </FormGroup>


            <FormGroup
              controlId={"filler1"}
              bsSize="small">
              <Col lg={1}/>
              <Col lg={4}/>
            </FormGroup>

            <br /><br />

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
                      editMode={editMode}
                      loading={isAddUpdateLoading}
                      buttonText={editMode ? "Update" : "Add"}
                      buttonProcessText={editMode ? "Updating..." : "Adding"}
                      onClick={!isAddUpdateLoading ? handleAddUpdateClick : null}>
                    </AppButton>
                  </ButtonGroup>

                  <ButtonGroup>
                    <AppButton
                      editMode={false}
                      loading={''}
                      buttonText={"Void Ticket"}
                      buttonProcessText={"Voiding Ticket"}
                      onClick={voidTicket}>
                    </AppButton>
                  </ButtonGroup>

                  <ButtonGroup>
                    <AppButton
                      editMode={false}
                      loading={''}
                      buttonText={"UnVoid Ticket"}
                      buttonProcessText={"UnVoiding Ticket"}
                      onClick={unVoidTicket}>
                    </AppButton>
                  </ButtonGroup>

                  <ButtonGroup>
                    <AppButton
                      editMode={false}
                      loading={''}
                      buttonText={"Copy CheckPoint"}
                      buttonProcessText={"Copying CheckPoint...."}
                      onClick={unVoidTicket}>
                    </AppButton>
                  </ButtonGroup>

                  <ButtonGroup>
                    <AppButton
                      editMode={false}
                      loading={''}
                      buttonText={"Add CheckPoint"}
                      buttonProcessText={"Adding CheckPoint...."}
                      onClick={unVoidTicket}>
                    </AppButton>
                  </ButtonGroup>

                  <ButtonGroup>
                    <AppButton
                      buttonText={"Reset"}
                      buttonProcessText={"Clearing UI..."}
                      loading={isClearLoading}
                      onClick={!isClearLoading ? handleClearClick : null}>
                    </AppButton>
                  </ButtonGroup>
                </ButtonToolbar>
              </Col>
            </FormGroup>

          </Form>
        </div>
      </div>
    </Panel>
    </div>
  );
};

CheckPointFormControl.propTypes = {
  checkPoint: PropTypes.object.isRequired,
  errors: PropTypes.array.isRequired,
  onFormFieldChange: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired,
  isAddUpdateLoading: PropTypes.bool.isRequired,
  handleAddUpdateClick: PropTypes.func.isRequired,
  isClearLoading: PropTypes.bool.isRequired,
  handleClearClick: PropTypes.func.isRequired
};

export default CheckPointFormControl;
