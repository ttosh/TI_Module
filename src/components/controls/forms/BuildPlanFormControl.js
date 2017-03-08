import React, {PropTypes} from 'react';

import Col from 'react-bootstrap/lib/Col';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Panel from 'react-bootstrap/lib/Panel';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import AppButton from '../buttons/AppButton';

import ShopSubsFormControl from './ShopSubsFormControl';
import TaskNoFormWidget from '../widgets/TaskNoFormWidget';
import StandardItemsFormWidget from '../widgets/StandardItemsFormWidget';

import Ticket from '../../../api/objects/ticket';

const BuildPlanFormControl = ({ticket, tickets, standardItems, shopSubs, selectedTaskOption, onTaskNoFormChange, onFormFieldChange, editMode, isAddUpdateLoading, handleAddUpdateClick, isClearLoading, handleClearClick, errors}) => {


  function createBuildPlanValueLink(key, type) {
    switch (type) {
      case "V":
        return {
          value: ticket.HasCheckPointTypeV,
          requestChange: function (isChecked) {
            if (isChecked) {
              ticket.addCheckPoint(3);
              ticket.HasCheckPointTypeV = true;
            } else {
              ticket.removeCheckPoint(3);
              ticket.HasCheckPointTypeV = false;
            }
          }
        };

      case "G":
        return {
          value: ticket.HasCheckPointTypeG,
          requestChange: function (isChecked) {
            if (isChecked) {
              ticket.addCheckPoint(4);
              ticket.HasCheckPointTypeG = true;
            } else {
              ticket.removeCheckPoint(4);
              ticket.HasCheckPointTypeG = false;
            }
          }
        };

      case "I":
        return {
          value: ticket.HasCheckPointTypeI,
          requestChange: function (isChecked) {
            if (isChecked) {
              ticket.addCheckPoint(2);
              ticket.HasCheckPointTypeI = true;
            } else {
              ticket.removeCheckPoint(2);
              ticket.HasCheckPointTypeI = false;
            }
          }
        };

      case "Q":
        return {
          value: ticket.HasCheckPointTypeQ,
          requestChange: function (isChecked) {
            if (isChecked) {
              ticket.addCheckPoint(5);
              ticket.HasCheckPointTypeQ = true;
            } else {
              ticket.removeCheckPoint(5);
              ticket.HasCheckPointTypeQ = false;
            }
          }
        };

      case "RPT":
        return {
          value: ticket.HasCheckPointTypeRPT,
          requestChange: function (isChecked) {
            if (isChecked) {
              ticket.addCheckPoint(6);
              ticket.HasCheckPointTypeRPT = true;
            } else {
              ticket.removeCheckPoint(6);
              ticket.HasCheckPointTypeRPT = false;
            }
          }
        };
    }
  }

  function voidTicket() {
    ticket.void();
  }

  function unVoidTicket() {
    ticket.unVoid();
  }

  function copyTicket() {
    ticket.copy();
  }

  let title = <div>
            <span className="table-header-glyph">
              <Glyphicon title='Build Plans' className="nav-glyph" glyph='collapse-down'/>&nbsp;&nbsp;
              <Glyphicon
                className="table-glyph"
                title='bplans:'
                glyph='cog'/>&nbsp; Build Plan
              </span>
    <span className="table-header-glyph" style={{float: 'right'}}>
              <Glyphicon
                className="pushpin-glyph-pinned"
                title='pinbplans:'
                glyph='pushpin'/>
            </span>
  </div>;

  return (
    <div>
        <Panel
          className="ti-panel"
          header={title}
          collapsible
          expanded={true}>
          <div id="bp-form-outerdiv" className="ti-outer-div">
            <div id="bp-form-innerdiv" className="ti-inner-div">
              <Form inline>
                <br />
                <FormGroup
                  controlId={"ticketNo"}
                  bsSize="small">
                  <Col
                    lg={2}
                    componentClass={ControlLabel}>
                    Ticket#
                  </Col>
                  <Col lg={4}>
                    <FormControl
                      type="text"
                      placeholder="Ticket No."
                      value={ticket.TicketNo}/>
                  </Col>
                </FormGroup>

                <FormGroup
                  controlId={"title"}
                  bsSize="small">
                  <Col
                    lg={2}
                    componentClass={ControlLabel}>
                    Title
                  </Col>
                  <Col lg={4}>
                    <FormControl
                      type="text"
                      placeholder="Title."
                      value={ticket.Title}/>
                  </Col>
                </FormGroup>

                <br /><br />

                <FormGroup
                  controlId={"testStage"}
                  bsSize="small">
                  <Col
                    lg={2}
                    componentClass={ControlLabel}>
                    Stage
                  </Col>
                  <Col lg={4}>
                    <FormControl
                      type="text"
                      placeholder="Test Stage"
                      value={ticket.TestStage}/>
                  </Col>
                </FormGroup>


                <FormGroup
                  controlId={"para"}
                  bsSize="small">
                  <Col
                    lg={2}
                    componentClass={ControlLabel}>
                    Para
                  </Col>
                  <Col lg={4}>
                    <FormControl
                      type="text"
                      placeholder="Para"
                      value={ticket.WorkPara}/>
                  </Col>
                </FormGroup>

                <br /><br />


                <FormGroup
                  controlId={"item"}
                  bsSize="small">
                  <Col
                    lg={2}
                    componentClass={ControlLabel}>
                    Spec No.
                  </Col>
                  <Col lg={4}>
                    <FormControl
                      type="text"
                      placeholder="Item"
                      value={ticket.SpecItemNo}/>
                  </Col>
                </FormGroup>

                <FormGroup
                  controlId={"itemtitle"}
                  bsSize="small">
                  <Col
                    lg={2}
                    componentClass={ControlLabel}>
                    Spec Item
                  </Col>
                  <Col lg={4}>
                    <FormControl
                      type="text"
                      placeholder="Item Title"
                      value={ticket.SpecItemTitle}/>
                  </Col>
                </FormGroup>

                <br /><br />


                <FormGroup
                  controlId={"workpara"}
                  bsSize="small">
                  <Col
                    lg={2}
                    componentClass={ControlLabel}>
                    Spec Para
                  </Col>
                  <Col lg={4}>
                    <FormControl
                      type="text"
                      placeholder="Work Para"
                      value={ticket.SpecItemWorkPara}/>
                  </Col>
                </FormGroup>


                <FormGroup
                  controlId={"shopSubs"}
                  bsSize="small">
                  <Col
                    lg={2}
                    componentClass={ControlLabel}>
                    Shop Subs
                  </Col>
                  <Col lg={4}>
                    <ShopSubsFormControl
                      shopSubs={shopSubs}
                      onChange={onFormFieldChange}/>
                  </Col>
                </FormGroup>

                <br /><br />


                <FormGroup
                  controlId={"standardItems"}
                  bsSize="small">
                  <Col
                    lg={2}
                    componentClass={ControlLabel}>
                    Standard Items
                  </Col>
                  <Col lg={4}>
                    <StandardItemsFormWidget
                      standardItems={standardItems}
                      onChange={onFormFieldChange}/>
                  </Col>
                </FormGroup>

                <FormGroup
                  controlId={"filler3"}
                  bsSize="small">
                  <Col lg={1}/>
                  <Col lg={4}/>
                </FormGroup>

                <br /><br />


                <FormGroup
                  controlId="criteria"
                  bsSize="small">
                  <Col
                    lg={1}
                    componentClass={ControlLabel}>
                    Criteria:
                  </Col>
                  <br />
                  <Col lg={4}>
                    <FormControl
                      componentClass="textarea"
                      placeholder="Criteria"
                      value={ticket.Criteria}/>
                  </Col>
                </FormGroup>

                <FormGroup
                  controlId={"filler3"}
                  bsSize="small">
                  <Col lg={1}/>
                  <Col lg={4}/>
                </FormGroup>

                <br /><br />

                <FormGroup
                  controlId="addcriteria"
                  bsSize="small">
                  <Col
                    lg={3}
                    componentClass={ControlLabel}>
                    Additional Criteria:
                  </Col>
                  <br />
                  <Col lg={4}>
                    <FormControl
                      componentClass="textarea"
                      placeholder="Add. Criteria"
                      value={ticket.AdditionalCriteria}/>
                  </Col>
                </FormGroup>


                <FormGroup
                  controlId={"filler3"}
                  bsSize="small">
                  <Col lg={1}/>
                  <Col lg={4}/>
                </FormGroup>

                <br /><br />

                <FormGroup
                  controlId="void"
                  bsSize="small">
                  <Col
                    lg={1}
                    componentClass={ControlLabel}>
                    Void: <Checkbox> </Checkbox>
                  </Col>
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
                          buttonText={"New Ticket"}
                          buttonProcessText={"Refreshing UI..."}
                          onClick={handleClearClick}>
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
                          buttonText={"Copy Ticket"}
                          buttonProcessText={"Copying the Ticket..."}
                          onClick={copyTicket}>
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

BuildPlanFormControl.propTypes = {
  ticket: PropTypes.object.isRequired,
  tickets: PropTypes.array.isRequired,
  shopSubs: PropTypes.array.isRequired,
  standardItems: PropTypes.array.isRequired,
  errors: PropTypes.array.isRequired,
  onTaskNoFormChange: PropTypes.func.isRequired,
  onFormFieldChange: PropTypes.func.isRequired,
  selectedTaskOption: PropTypes.object.isRequired,
  editMode: PropTypes.bool.isRequired,
  isAddUpdateLoading: PropTypes.bool.isRequired,
  handleAddUpdateClick: PropTypes.func.isRequired,
  isClearLoading: PropTypes.bool.isRequired,
  handleClearClick: PropTypes.func.isRequired
};

export default BuildPlanFormControl;
