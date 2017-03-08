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
import FiscalYearsWidget from '../widgets/fiscal-years/FiscalYearsWidget';

import FiscalYear from '../../../api/objects/fiscalYear';

const StandardItemsFormControl = ({
  standardItem, fiscalYears, onFormFieldChange, editMode, isAddUpdateLoading, handleAddUpdateClick, isClearLoading, handleClearClick, errors, onFiscalYearChange, selectedFiscalYearOption
}) => {


  let standardItemNoHelpBlock = null;
  let standardItemNoValidationState = null;
  if (errors["StandardItemNo"]) {
    standardItemNoHelpBlock = <HelpBlock>* Item No:</HelpBlock>;
    standardItemNoValidationState = "error";
  } else {
    standardItemNoValidationState = null;
    standardItemNoHelpBlock = <HelpBlock>Item No:</HelpBlock>;
  }

  let standardItemFYHelpBlock = null;
  let standardItemFYValidationState = null;
  if (errors["FiscalYearId"]) {
    standardItemFYValidationState = "error";
    standardItemFYHelpBlock = <HelpBlock>* Fiscal Year:</HelpBlock>;
  } else {
    standardItemFYValidationState = null;
    standardItemFYHelpBlock = <HelpBlock>Fiscal Year:</HelpBlock>;
  }

  function createStandardItemValueLink(key, type) {
    switch (type) {
      case "Void":
        return {
          value: standardItem.Void,
          requestChange: function (isChecked) {
            standardItem.Void = isChecked;
          }
        };

      case "V":
        return {
          value: standardItem.HasCheckPointTypeV,
          requestChange: function (isChecked) {
            if(isChecked) {
              standardItem.addCheckPoint(3);
              standardItem.HasCheckPointTypeV = true;
            } else {
              standardItem.removeCheckPoint(3);
              standardItem.HasCheckPointTypeV = false;
            }
          }
        };

      case "G":
        return {
          value: standardItem.HasCheckPointTypeG,
          requestChange: function (isChecked) {
            if(isChecked) {
              standardItem.addCheckPoint(4);
              standardItem.HasCheckPointTypeG = true;
            } else {
              standardItem.removeCheckPoint(4);
              standardItem.HasCheckPointTypeG = false;
            }
          }
        };

      case "I":
        return {
          value: standardItem.HasCheckPointTypeI,
          requestChange: function (isChecked) {
            if(isChecked) {
              standardItem.addCheckPoint(2);
              standardItem.HasCheckPointTypeI = true;
            } else {
              standardItem.removeCheckPoint(2);
              standardItem.HasCheckPointTypeI = false;
            }
          }
        };

      case "Q":
        return {
          value: standardItem.HasCheckPointTypeQ,
          requestChange: function (isChecked) {
            if(isChecked) {
              standardItem.addCheckPoint(5);
              standardItem.HasCheckPointTypeQ = true;
            } else {
              standardItem.removeCheckPoint(5);
              standardItem.HasCheckPointTypeQ = false;
            }
          }
        };

      case "RPT":
        return {
          value: standardItem.HasCheckPointTypeRPT,
          requestChange: function (isChecked) {
            if(isChecked) {
              standardItem.addCheckPoint(6);
              standardItem.HasCheckPointTypeRPT = true;
            } else {
              standardItem.removeCheckPoint(6);
              standardItem.HasCheckPointTypeRPT = false;
            }
          }
        };
    }
  }

  function createNewFiscalyear() {
    FiscalYear.handleCreateNewFiscalYearClick();
  }

  return (
    <div>
      <br />
      <Panel
        className="ti-panel"
        header={
          <div>
            <span className="table-header-glyph">
              <Glyphicon title='Standard Items' className="nav-glyph" glyph='collapse-down'/>&nbsp;&nbsp;
              <Glyphicon
                className="table-glyph"
                title='stdItems:'
                glyph='cog'/>&nbsp; Standard Item
              </span>
            <span className="table-header-glyph" style={{float: 'right'}}>
              <Glyphicon
                className="pushpin-glyph-pinned"
                title='pinStandardItem:'
                glyph='pushpin'/>
            </span>
          </div>
        }
        collapsible
        expanded={'true'}>

        <div id="si-form-outerdiv" className="ti-outer-div">
          <div id="si-form-innerdiv" className="ti-inner-div">
            <Form horizontal>

              <FormGroup
                controlId={"standardItem"}
                validationState={standardItemNoValidationState}
                bsSize="small">
                <Col
                  sm={1}
                  componentClass={ControlLabel}>
                  {standardItemNoHelpBlock}
                </Col>
                <Col sm={8}>
                  <FormControl
                    name={'StandardItemNo'}
                    type={'text'}
                    placeholder={'Item No.'}
                    onChange={onFormFieldChange}
                    value={standardItem.StandardItemNo}/>
                </Col>
              </FormGroup>

              <FormGroup
                controlId="frmFiscalYears"
                validationState={standardItemFYValidationState}
                bsSize="small">
                <Col componentClass={ControlLabel} sm={1}>
                  {standardItemFYHelpBlock}
                </Col>
                <Col sm={8}>
                  <FiscalYearsWidget
                    fiscalYears={fiscalYears}
                    onChange={onFiscalYearChange}
                    selectedValue={selectedFiscalYearOption}
                    showLabel={false}/>
                </Col>
              </FormGroup>

              <FormGroup
                controlId="frmPara"
                bsSize="small">
                <Col
                  sm={1}
                  componentClass={ControlLabel}>
                  <HelpBlock>Para:</HelpBlock>
                </Col>
                <Col sm={8}>
                  <FormControl
                    name={'WorkPara'}
                    type="text"
                    placeholder="Work Para"
                    onChange={onFormFieldChange}
                    value={standardItem.WorkPara}/>
                </Col>
              </FormGroup>

              <FormGroup
                controlId="frmInspType"
                bsSize="small">
                <Col
                  sm={1}
                  componentClass={ControlLabel}>
                  <HelpBlock>Insp Type:</HelpBlock>
                </Col>
                <Col sm={8}>
                  <FormControl
                    name={'InspType'}
                    type="text"
                    placeholder="Insp Type"
                    onChange={onFormFieldChange}
                    value={standardItem.InspectionTypeItem}/>
                </Col>
              </FormGroup>

              <FormGroup
                controlId="frmVoid"
                bsSize="small">
                <Col
                  sm={1}
                  componentClass={ControlLabel}>
                  <HelpBlock>Void:</HelpBlock>
                </Col>
                <Col sm={8}>
                  <Checkbox
                    checkedLink={createStandardItemValueLink('standardItem.Void', "Void")} />
                </Col>
              </FormGroup>

              <FormGroup
                controlId="frmCheckpointTypes"
                bsSize="small">
                <Col
                  sm={1}
                  componentClass={ControlLabel}>
                  <HelpBlock>CP Type:</HelpBlock>
                </Col>
                <Col sm={6}>
                  <Checkbox
                    inline
                    checkedLink={createStandardItemValueLink('checkPointTypeVChecked', "V")}
                  >V</Checkbox>
                  {" "}
                  <Checkbox
                    inline
                    checkedLink={createStandardItemValueLink('checkPointTypeGChecked', "G")}
                  >G</Checkbox>
                  {" "}
                  <Checkbox
                    inline
                    checkedLink={createStandardItemValueLink('checkPointTypeIChecked', "I")}
                  >I</Checkbox>
                  {" "}
                  <Checkbox
                    inline
                    checkedLink={createStandardItemValueLink('checkPointTypeQChecked', "Q")}
                  >Q</Checkbox>
                  {" "}
                  <Checkbox
                    inline
                    checkedLink={createStandardItemValueLink('checkPointTypeRPTChecked', "RPT")}
                  >RPT</Checkbox>
                </Col>
              </FormGroup>

              <FormGroup
                controlId="frmCriteria"
                bsSize="small">
                <Col
                  sm={1}
                  componentClass={ControlLabel}>
                  <HelpBlock>Criteria:</HelpBlock>
                </Col>
                <Col sm={6}>
                  <FormControl
                    name={'Criteria'}
                    componentClass="textarea"
                    placeholder="Criteria"
                    onChange={onFormFieldChange}
                    value={standardItem.Criteria}/>
                </Col>
              </FormGroup>

              <FormGroup
                controlId="frmOptions"
                bsSize="small">
                <Col
                  sm={1}
                  componentClass={ControlLabel}/>
                <Col sm={6}>
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
                        loading={false}
                        buttonText={"Create new fiscal year"}
                        buttonProcessText={"Creating new financial year..."}
                        onClick={createNewFiscalyear}>
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

StandardItemsFormControl.propTypes = {
  errors: PropTypes.array.isRequired,
  standardItem: PropTypes.array.isRequired,
  fiscalYears: PropTypes.array.isRequired,
  onFiscalYearChange: PropTypes.func.isRequired,
  selectedFiscalYearOption: PropTypes.object.isRequired,
  onFormFieldChange: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired,
  isAddUpdateLoading: PropTypes.bool.isRequired,
  handleAddUpdateClick: PropTypes.func.isRequired,
  isClearLoading: PropTypes.bool.isRequired,
  handleClearClick: PropTypes.func.isRequired
};

export default StandardItemsFormControl;
