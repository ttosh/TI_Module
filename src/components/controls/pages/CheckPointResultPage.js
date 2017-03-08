import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import {bindActionCreators} from 'redux';
import * as jobActions from '../../../actions/jobActions';
import * as checkPointResultActions from '../../../actions/checkPointResultActions';
import * as fiscalYearActions from '../../../actions/fiscalYearActions';

import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Grid from 'react-bootstrap/lib/Grid';
import Table from 'react-bootstrap/lib/Table';
import Panel from 'react-bootstrap/lib/Panel';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

import JobsWidget from '../widgets/jobs/JobsWidget';
import FiscalYearsWidget from '../widgets/fiscal-years/FiscalYearsWidget';
import BuildPlanDataGrid from '../../controls/datagrids/BuildPlanDataGrid';
import CheckPointResultsDataGrid from '../../controls/datagrids/CheckPointResultsDataGrid';
import CheckPointResultsForm from '../../controls/forms/CheckPointResultsFormControl';

import Job from '../../../api/objects/job';
import Ticket from '../../../api/objects/ticket';
import FiscalYear from '../../../api/objects/fiscalYear';
import CommonUtils from '../../../api/objects/commonUtils';
import CheckPointResult from '../../../api/objects/checkPointResult';

class CheckPointResultPage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {

      errors: {},
      editMode: false,
      isAddUpdateLoading: false,
      isClearLoading: false,
      selJobOption: props.selJobOption,
      selFiscalYearOption: props.selFiscalYearOption,
      isCheckPointGridPanelPinned: false,
      isPanelPinned: false,
      isGridPanelPinned: false,
      isCheckPointResultGridPanelPinned: false,
      checkPointResultFYJobOpen: false,
      buildPlanGridOpen: true,
      checkPointResultGridOpen: true,
      ticket: Object.assign({}, new Ticket()),
      checkPointResult: Object.assign({}, new CheckPointResult())
    };

    this.ticket = new Ticket();
    this.checkPointResult = new CheckPointResult();

    this.isFormValid = this.isFormValid.bind(this);
    this.onJobsSelect = this.onJobsSelect.bind(this);
    this.onFiscalYearSelect = this.onFiscalYearSelect.bind(this);

    this.handleBuildPlanSelect = this.handleBuildPlanSelect.bind(this);
    this.handleToolbarClick = this.handleToolbarClick.bind(this);
    this.handleAddUpdateClick = this.handleAddUpdateClick.bind(this);
    this.handleClearClick = this.handleClearClick.bind(this);
    this.handlePanelPinned = this.handlePanelPinned.bind(this);
    this.checkPointResultFormUpdated = this.checkPointResultFormUpdated.bind(this);
    this.handleGridToolbarClick = this.handleGridToolbarClick.bind(this);
    this.loadTicketsForFiscalYears = this.loadTicketsForFiscalYears.bind(this);
    this.updateJobsOnFiscalYearChange = this.updateJobsOnFiscalYearChange.bind(this);
    this.loadCheckPointsForBuildPlan = this.loadCheckPointsForBuildPlan.bind(this);
    this.handleGridPanelPinned = this.handleGridPanelPinned.bind(this);
    this.handleCheckPointResultSelect = this.handleCheckPointResultSelect.bind(this);
    this.handleCheckPointResultGridToolbarClick = this.handleCheckPointResultGridToolbarClick.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  onJobsSelect(event) {
    Job.setLocalStorageIdentifier(event.value);
    return this.setState({
      selJobOption: Object.assign({}, {groupId: event.groupId, label: event.label, value: event.value})
    });
  }

  onFiscalYearSelect(event) {
    FiscalYear.setLocalStorageIdentifier(event.value);
    this.setState({
      selFiscalYearOption: Object.assign({}, {label: event.label, value: event.value})
    });

    this.props.fiscalYearActions.loadFiscalYears()
      .then(this.updateJobsOnFiscalYearChange(event.value))
      .catch(error => {
        console.log(error)
      });

    // load tickets here.....
    // this.props.standardItemActions.loadStandardItems()
    //   .then(this.loadStandardItemsForFiscalYears)
    //   .catch(error => {
    //     console.log(error)
    //   });
  }

  updateJobsOnFiscalYearChange(fiscalYearId) {
    Job.setLocalStorageIdentifier(0);
    this.props.jobActions.loadJobs(fiscalYearId)
      .then(this.loadTicketsForFiscalYears)
      .catch(error => {
        console.log(error)
      });
  }

  loadTicketsForFiscalYears() {
    this.props.ticketActions.loadTickets()
      .then(
        this.setState({
          tickets: Object.assign([], this.props.tickets),
          selJobOption: Object.assign({}, {groupId: 'active', label: 'Select.....', value: '0'})
        }))
      .catch(error => {
        console.log(error)
      });
  }

  loadCheckPointsForBuildPlan(ticketId) {
    this.props.checkPointResultActions.loadCheckPointResults(ticketId)
      .then(
        this.setState({
          checkPoints: Object.assign([], this.props.checkPoints)
        }))
      .catch(error => {
        console.log(error)
      });
  }

  handleBuildPlanSelect(row, isSelected, e) {

    this.ticket = new Ticket();
    if (!isSelected) {
      return this.setState({
        ticket: Object.assign({}, this.ticket),
        buildPlanGridOpen: true
      });
    }

    this.ticket.TicketId = row["TicketId"];
    this.loadCheckPointsForBuildPlan(this.ticket.TicketId);
    return this.setState({
      ticket: Object.assign({}, this.ticket),
      buildPlanGridOpen: this.state.isGridPanelPinned
    });

    //
    // console.log("Create new ticket with id: " + row["TicketId"]);
    // this.ticket = new Ticket({
    //   id: row["TicketId"],
    //   no: row["No"],
    //   taskItemId: row["TaskId"],
    //   testStage: row["TestStage"],
    //   workPara: row["Para"],
    //   specItemNo: row["SpecItemNo"],
    //   specItemTitle: row["SpecItemTitle"],
    //   specItemWorkPara: row["SpecItemWorkPara"],
    //   specItemLocation: row["SpecItemLocation"],
    //   criteria: row["Remarks"],
    //   additionalCriteria: row["AdditionalCriteria"]
    // });
    // console.log("Ticket...");
    // console.log(this.ticket);
    // console.log("row..");
    // console.log(row);
    //
    // return this.setState({
    //   ticket: Object.assign({}, this.ticket),
    //   buildPlanGridOpen: this.state.isGridPanelPinned
    // });
  }

  handleCheckPointResultSelect(row, isSelected, e) {

    this.checkPointResult = new CheckPointResult();
    if (!isSelected) {
      return this.setState({
        editMode: false,
        checkPointResultGridOpen: true,
        checkPointResult: Object.assign({}, this.checkPointResult)
      });
    }

    if (parseInt(row["CheckPointResultId"]) > 0) {
      this.checkPointResult = new CheckPointResult({
        id: row["CheckPointResultId"],
        checkPointId: row["CheckPointId"],
        ticketId: row["TicketId"],
        checkPointResultTicketNo: row["CheckPointResultTicketNo"],
        calDueDate: row["CalDueDate"],
        concur: row["Concur"],
        custSigningRep: row["CustSigningRep"],
        equipmentSN: row["EquipmentSN"],
        govtRepNotified: row["GovtRepNotified"],
        isPartial: row["IsPartial"],
        isFinal: row["IsFinal"],
        remarks: row["Remarks"],
        satUnsat: row["SatUnsat"],
        testEquipment: row["TestEquipment"],
        checkPointDate: row["CheckPointDate"],
        checkPointTime: row["CheckPointTime"],
        createdBy: row["CreateTime"],
        createDate: row["CreateDate"],
        createTime: row["CreatedBy"]
      });

      return this.setState({
        editMode: true,
        checkPointResult: Object.assign({}, this.checkPointResult),
        checkPointResultGridOpen: this.state.isCheckPointResultGridPanelPinned
      });
    } else {
      return this.setState({
        editMode: false,
        checkPointResult: Object.assign({}, this.checkPointResult),
        checkPointResultGridOpen: this.state.isCheckPointResultGridPanelPinned
      });
    }
  }

  handleCheckPointResultGridToolbarClick(event) {
    if (this.state.isCheckPointResultGridPanelPinned) {
      return this.setState({
        checkPointResultGridOpen: this.state.checkPointResultGridOpen
      });
    }

    if (this.state.checkPointResultGridOpen) {
      return this.setState({
        checkPointResultGridOpen: this.state.checkPointResultGridOpen
      });
    }

    if (this.checkPointResult.CheckPointResultId === 0) {
      return this.setState({
        checkPointResultGridOpen: true
      });
    } else {
      return this.setState({
        checkPointResultGridOpen: !this.state.checkPointResultGridOpen
      });
    }
  }


  handlePanelPinned(event) {
    if (this.state.isPanelPinned) {
      return this.setState({
        checkPointFYJobOpen: true,
        isPanelPinned: !this.state.isPanelPinned
      });
    } else {
      return this.setState({
        isPanelPinned: !this.state.isPanelPinned
      });
    }
  }

  handleGridPanelPinned(event) {
    if (this.state.isGridPanelPinned) {
      return this.setState({
        checkPointResultGridOpen: true,
        isGridPanelPinned: !this.state.isGridPanelPinned
      });
    } else {
      return this.setState({
        isGridPanelPinned: !this.state.isGridPanelPinned
      });
    }
  }

  handleToolbarClick() {
    if (this.state.isPanelPinned) {
      return this.setState({
        checkPointResultFYJobOpen: this.state.checkPointResultFYJobOpen
      });
    }

    return this.setState({
      checkPointResultFYJobOpen: !this.state.checkPointResultFYJobOpen
    });
  }

  handleGridToolbarClick() {

    if (this.state.isGridPanelPinned) {
      return this.setState({
        buildPlanGridOpen: this.state.buildPlanGridOpen
      });
    }

    if (this.state.buildPlanGridOpen) {
      return this.setState({
        buildPlanGridOpen: this.state.buildPlanGridOpen
      });
    }

    if (this.ticket.TicketId === 0) {
      return this.setState({
        buildPlanGridOpen: true
      });
    } else {
      return this.setState({
        buildPlanGridOpen: !this.state.buildPlanGridOpen
      });
    }
  }

  handleAddUpdateClick(event) {
    if (this.isFormValid()) {
      this.setState({isAddUpdateLoading: true});
      this.props.checkPointResultActions.saveCheckPointResult(this.checkPointResult)
        .then(function (data) {
          console.log("After save data returned is....");
          console.log(data);
          this.setState({isAddUpdateLoading: false});
        })
        .catch(error => {
          console.log("Error saving build plan: " + error);
          this.setState({isAddUpdateLoading: false});
        });
    } else {
      console.log("Cannot submit form, errors, not valid....");
    }
    this.setState({isAddUpdateLoading: false});
  }

  handleClearClick() {
    this.setState({isClearLoading: true});
    setTimeout(() => {
      this.checkPointResult = new CheckPointResult();
      this.setState({
        editMode: false,
        checkPointResult: this.checkPointResult,
        isClearLoading: false
      });
    }, 1000);
  }

  isFormValid() {
    let errors = {};

    if (this.checkPointResult.TicketId === 0) {
      errors["TicketId"] = true;
    }
    this.setState({errors: errors});
    return errors.length > 0;
  }

  checkPointResultFormUpdated(event) {
    switch (event.target.name) {
      // case "StandardItemNo":
      //   this.standardItem.StandardItemNo = event.target.value;
      //   break;
      //
      // case "WorkPara":
      //   this.standardItem.WorkPara = event.target.value;
      //   break;
      //
      // case "InspType":
      //   this.standardItem.InspectionTypeItem = event.target.value;
      //   break;
      //
      // case "Criteria":
      //   this.standardItem.Criteria = event.target.value;
      //   break;

      default:
        console.log("No form field matched incoming event.");
    }
    return this.setState({
      checkPointResult: this.checkPointResult
    });
  }


  render() {

    let pinGlyphClassName = this.state.isPanelPinned ? 'pushpin-glyph-pinned' : 'pushpin-glyph';
    let collapsePanelGlyph = this.state.checkPointResultFYJobOpen
      ? <Glyphicon title='FY Jobs' className="nav-glyph" glyph='collapse-up'/>
      : <Glyphicon title='FY Jobs' className="nav-glyph" glyph='collapse-down'/>;

    let gridPinGlyphClassName = this.state.isGridPanelPinned ? 'pushpin-glyph-pinned' : 'pushpin-glyph';
    let gridPanelCollapsePanelGlyph = this.state.isGridPanelPinned
      ? <Glyphicon title='Build Plan' className="nav-glyph" glyph='collapse-up'/>
      : <Glyphicon title='Build Plan' className="nav-glyph" glyph='collapse-down'/>;

    let checkPointResultGridPinGlyphClassName =
      this.state.isCheckPointResultGridPanelPinned ? 'pushpin-glyph-pinned' : 'pushpin-glyph';
    let checkPointResultGridPanelCollapsePanelGlyph = this.state.isCheckPointResultGridPanelPinned
      ? <Glyphicon title='CheckPoint Result' className="nav-glyph" glyph='collapse-up'/>
      : <Glyphicon title='CheckPoint Result' className="nav-glyph" glyph='collapse-down'/>;

    let title = (
      <div>
          <span className="table-header-glyph" onClick={this.handleToolbarClick} style={{cursor: 'pointer'}}>
            {collapsePanelGlyph}
            &nbsp;&nbsp;
            <Glyphicon
              className="table-glyphFiscalYear-active"
              title='fiscalYear'
              glyph='calendar'/>&nbsp; FY: 2016
            &nbsp;&nbsp;
            <Glyphicon
              className="table-glyphJob-active"
              title='job'
              glyph='folder-open'/>&nbsp; Job: 2300
        </span>
        <span className="table-header-glyph" style={{float: 'right'}} onClick={this.handlePanelPinned}>
            <Glyphicon
              className={pinGlyphClassName}
              title='pincpresult:'
              glyph='pushpin'/>
          </span>
      </div>
    );

    let buildPlanGridTitle = (
      <div>
          <span className="table-header-glyph" onClick={this.handleGridToolbarClick}>
            {gridPanelCollapsePanelGlyph}
            <Glyphicon
              className="table-glyph"
              title='buildPlans:'
              glyph='cog'/>&nbsp; Build Plans
          </span>
        <span className="table-header-glyph" style={{float: 'right'}} onClick={this.handleGridToolbarClick}>
            <Glyphicon
              className={gridPinGlyphClassName}
              title='pinBuildPlans'
              glyph='pushpin'/>
          </span>
      </div>
    );

    let checkPointResultGridTitle = (
      <div>
          <span className="table-header-glyph" onClick={this.handleCheckPointResultGridToolbarClick}>
            {checkPointResultGridPanelCollapsePanelGlyph}
            <Glyphicon
              className="table-glyph"
              title='checkpointresults'
              glyph='cog'/>&nbsp; CheckPoint Results
          </span>
        <span className="table-header-glyph" style={{float: 'right'}} onClick={this.handleCheckPointResultGridToolbarClick}>
            <Glyphicon
              className={checkPointResultGridPinGlyphClassName}
              title='pincheckpointresults'
              glyph='pushpin'/>
          </span>
      </div>
    );


    let checkPointResultsGridNode =
      <Row className="show-grid">
        <Col lg={8}>
          A ticket needs selected to view checkpoint results, or use the add new button.
        </Col>
      </Row>;

  if(this.ticket.TicketId > 0) {
    checkPointResultsGridNode =
        <Row className="show-grid">
          <Col lg={8}>
            <CheckPointResultsDataGrid
              checkPointResults={this.props.checkPointResults}
              title={checkPointResultGridTitle}
              gridPanelOpen={this.state.checkPointResultGridOpen}
              onRowSelect={this.handleCheckPointResultSelect} />
          </Col>
        </Row>
    }

    let checkPointResultsFormNode = <span> </span>;
    if(this.checkPointResult.CheckPointResultId == 0) {
      checkPointResultsFormNode =
        <Row className="show-grid">
          <Col lg={8}>
            A checkpoint result needs selected to edit the result, or use the add new button.
          </Col>
        </Row>;
    }

    if(this.checkPointResult.CheckPointResultId > 0) {
      checkPointResultsFormNode = <Row className="show-grid">
        <Col lg={8}>
          <CheckPointResultsForm
            checkPointResult={this.checkPointResult}
            errors={this.state.errors}
            ticket={this.ticket}
            checkPoint={this.checkPointResult}
            onFormFieldChange={this.checkPointResultFormUpdated}
            editMode={this.state.editMode}
            isAddUpdateLoading={this.state.isAddUpdateLoading}
            handleAddUpdateClick={!this.state.isAddUpdateLoading ? this.handleAddUpdateClick : null}
            isClearLoading={this.state.isClearLoading}
            handleClearClick={!this.state.isClearLoading ? this.handleClearClick : null}/>
        </Col>
      </Row>
    }

    let selFiscalYearOptionsMap =
      this.state.selFiscalYearOption.value === "0" ? this.props.selFiscalYearOption : this.state.selFiscalYearOption;

    let selJobOptionsMap =
      this.state.selJobOption.value === "0" ? this.props.selJobOption : this.state.selJobOption;

    return (
      <div className="ti-page-container">
        <Grid>
          <Panel
            className="ti-panel"
            header={title}
            collapsible
            expanded={this.state.checkPointResultFYJobOpen}>

            <div id="si-fiscalyearsjob-outerdiv" className="ti-outer-div">
              <div id="si-fiscalyearsjob-inner-div" className="ti-inner-div">
                <Table condensed>
                  <tr>
                    <td>
                      <FiscalYearsWidget
                        showLabel={true}
                        fiscalYears={this.props.fiscalYears}
                        onChange={this.onFiscalYearSelect}
                        selectedValue={selFiscalYearOptionsMap}/>
                    </td>
                    <td>
                      <JobsWidget
                        jobs={this.props.jobs}
                        onChange={this.onJobsSelect}
                        selectedValue={selJobOptionsMap}
                      />
                    </td>
                  </tr>
                </Table>
              </div>
            </div>
          </Panel>

          <Row className="show-grid">
            <Col lg={8}>
              <BuildPlanDataGrid
                title={buildPlanGridTitle}
                gridPanelOpen={this.state.buildPlanGridOpen}
                tickets={this.props.tickets}
                onRowSelect={this.handleBuildPlanSelect}/>
            </Col>
          </Row>

          {checkPointResultsGridNode}

          {checkPointResultsFormNode}

        </Grid>
      </div>
    );
  }
}

CheckPointResultPage.propTypes = {
  tickets: PropTypes.array.isRequired,
  checkPointResult: PropTypes.object.isRequired,
  checkPointResults: PropTypes.array.isRequired,
  jobs: PropTypes.array.isRequired,
  fiscalYears: PropTypes.array.isRequired,
  selJobOption: PropTypes.object.isRequired,
  selFiscalYearOption: PropTypes.object.isRequired,
  jobActions: PropTypes.object.isRequired,
  checkPointActions: PropTypes.object.isRequired,
  fiscalYearActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {

  const jobs = state.jobs;
  const fiscalYears = state.fiscalYears;

  let selFiscalYearOptionToMap = {label: 'Select...', value: '0'};
  let selJobOptionToMap = {groupId: 'active', label: 'Select...', value: '0'};

  let selJobId = 0;
  try {
    selJobId = Job.getLocalStorageIdentifier();
    if (selJobId !== 0 && jobs.length > 0) {
      let job = jobs.filter(fy => fy.JobId === selJobId)[0];
      selJobOptionToMap = {
        groupId: job.IsActive ? 'active' : 'inactive',
        label: String(job.JobId),
        value: String(job.JobId)
      };
    }
  } catch (err) {
    console.log(err);
  }

  let selFiscalYearId = 0;
  try {
    selFiscalYearId = FiscalYear.getLocalStorageIdentifier();
    if (selFiscalYearId !== 0 && fiscalYears.length > 0) {
      let fiscalYear = fiscalYears.filter(fy => fy.FiscalYearId === selFiscalYearId)[0];
      selFiscalYearOptionToMap = {label: fiscalYear.Description, value: fiscalYear.FiscalYearId};
    }
  } catch (err) {
    console.log(err);
  }

  return {
    ticket: state.ticket,
    tickets: state.tickets,
    jobs: state.jobs,
    fiscalYears: state.fiscalYears,
    checkPointResult: state.checkPointResult,
    checkPointResults: state.checkPointResults,
    selJobOption: selJobOptionToMap,
    selFiscalYearOption: selFiscalYearOptionToMap
  };
}

function mapDispatchToProps(dispatch) {
  return {
    jobActions: bindActionCreators(jobActions, dispatch),
    checkPointResultActions: bindActionCreators(checkPointResultActions, dispatch),
    fiscalYearActions: bindActionCreators(fiscalYearActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckPointResultPage);





