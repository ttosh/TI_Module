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

const CheckPointResultsFormControl = ({checkPointResult, checkPoint, ticket,  onFormFieldChange, editMode, isAddUpdateLoading, handleAddUpdateClick, isClearLoading, handleClearClick, errors}) => {

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
      header={
        <div>
            <span className="table-header-glyph">
              <Glyphicon title='CheckPoint Results' className="nav-glyph" glyph='collapse-down'/>&nbsp;&nbsp;
              <Glyphicon
                className="table-glyph"
                title='cpointresults:'
                glyph='cog'/>&nbsp; CheckPoint Results
              </span>
          <span className="table-header-glyph" style={{float: 'right'}}>
              <Glyphicon
                className="pushpin-glyph-pinned"
                title='pincheckpointresults'
                glyph='pushpin'/>
            </span>
        </div>
      }
      collapsible
      expanded={'true'}>

      <div id="cpr-form-outerdiv" className="ti-outer-div">
        <div id="cpr-form-innerdiv" className="ti-inner-div">

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
                  placeholder="Ticket No."
                  value={checkPointResult.CheckPointResultTicketNo}/>
              </Col>
            </FormGroup>

            <FormGroup
              controlId={"originator"}
              bsSize="small">
              <Col
                lg={2}
                componentClass={ControlLabel}>
                Test Equip.
              </Col>
              <Col lg={4}>
                <FormControl
                  type="text"
                  placeholder="Test Equip."
                  value={checkPointResult.TestEquipment}/>
              </Col>
            </FormGroup>

            <br /><br />

            <FormGroup
              controlId={"ndate"}
              bsSize="small">
              <Col
                lg={2}
                componentClass={ControlLabel}>
                Govt. Rep Notified
              </Col>
              <Col lg={4}>
                <FormControl
                  type="text"
                  placeholder="Govt. Rep Notified"
                  value={checkPointResult.GovtRepNotified}/>
              </Col>
            </FormGroup>

            <FormGroup
              controlId={"ntime"}
              bsSize="small">
              <Col
                lg={2}
                componentClass={ControlLabel}>
                Cust Sign Rep.
              </Col>
              <Col lg={4}>
                <FormControl
                  type="text"
                  placeholder="Cust Signing Rep"
                  value={checkPointResult.CustSigningRep}/>
              </Col>
            </FormGroup>

            <br /><br />

            <FormGroup
              controlId={"cnotified"}
              bsSize="small">
              <Col
                lg={2}
                componentClass={ControlLabel}>
                Sat/Unsat
              </Col>
              <Col lg={4}>
                <FormControl
                  type="text"
                  placeholder="Sat/Unsat"
                  value={checkPointResult.SatUnsat}/>
              </Col>
            </FormGroup>

            <FormGroup
              controlId={"mloc"}
              bsSize="small">
              <Col
                lg={2}
                componentClass={ControlLabel}>
                Cal Due Date
              </Col>
              <Col lg={4}>
                <FormControl
                  type="text"
                  placeholder="Cal Due Date"
                  value={checkPointResult.CalDueDate}/>
              </Col>
            </FormGroup>

            <br /><br />


            <FormGroup
              controlId={"stime"}
              bsSize="small">
              <Col
                lg={2}
                componentClass={ControlLabel}>
                CheckPoint Date
              </Col>
              <Col lg={4}>
                <FormControl
                  type="text"
                  placeholder="CheckPoint date"
                  value={checkPointResult.CheckPointDate}/>
              </Col>
            </FormGroup>

            <FormGroup
              controlId={"nby"}
              bsSize="small">
              <Col
                lg={2}
                componentClass={ControlLabel}>
                CheckPoint Time
              </Col>
              <Col lg={4}>
                <FormControl
                  type="text"
                  placeholder="CheckPoint Time"
                  value={checkPointResult.CheckPointTime}/>
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

CheckPointResultsFormControl.propTypes = {
  checkPointResult: PropTypes.object.isRequired,
  errors: PropTypes.array.isRequired,
  onFormFieldChange: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired,
  isAddUpdateLoading: PropTypes.bool.isRequired,
  handleAddUpdateClick: PropTypes.func.isRequired,
  isClearLoading: PropTypes.bool.isRequired,
  handleClearClick: PropTypes.func.isRequired
};

export default CheckPointResultsFormControl;
