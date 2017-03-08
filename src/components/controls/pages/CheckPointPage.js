import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import {bindActionCreators} from 'redux';
import * as jobActions from '../../../actions/jobActions';
import * as checkPointActions from '../../../actions/checkPointActions';
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
import CheckPointDataGrid from '../../controls/datagrids/CheckPointsDataGrid';
import CheckPointsForm from '../../controls/forms/CheckPointFormControl';

import Job from '../../../api/objects/job';
import Ticket from '../../../api/objects/ticket';
import CheckPoint from '../../../api/objects/checkPoint';
import FiscalYear from '../../../api/objects/fiscalYear';
import CommonUtils from '../../../api/objects/commonUtils';

class CheckPointPage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      errors: {},
      editMode: false,
      isAddUpdateLoading: false,
      isClearLoading: false,
      selJobOption: props.selJobOption,
      selFiscalYearOption: props.selFiscalYearOption,
      isPanelPinned: false,
      isGridPanelPinned: false,
      isCheckPointGridPanelPinned: false,
      checkPointFYJobOpen: false,
      buildPlanGridOpen: true,
      checkPointGridOpen: true,
      ticket: Object.assign({}, new Ticket()),
      checkPoint: Object.assign({}, new CheckPoint())
    };

    this.ticket = new Ticket();
    this.checkPoint = new CheckPoint();

    this.isFormValid = this.isFormValid.bind(this);
    this.onJobsSelect = this.onJobsSelect.bind(this);
    this.onFiscalYearSelect = this.onFiscalYearSelect.bind(this);

    this.handleBuildPlanSelect = this.handleBuildPlanSelect.bind(this);
    this.handleToolbarClick = this.handleToolbarClick.bind(this);
    this.handleAddUpdateClick = this.handleAddUpdateClick.bind(this);
    this.handleClearClick = this.handleClearClick.bind(this);
    this.handlePanelPinned = this.handlePanelPinned.bind(this);
    this.checkPointFormUpdated = this.checkPointFormUpdated.bind(this);
    this.handleGridToolbarClick = this.handleGridToolbarClick.bind(this);
    this.loadTicketsForFiscalYears = this.loadTicketsForFiscalYears.bind(this);
    this.updateJobsOnFiscalYearChange = this.updateJobsOnFiscalYearChange.bind(this);
    this.handleCheckPointSelect = this.handleCheckPointSelect.bind(this);
    this.loadCheckPointsForBuildPlan = this.loadCheckPointsForBuildPlan.bind(this);
    this.handleGridPanelPinned = this.handleGridPanelPinned.bind(this);
    this.handleCheckPointGridToolbarClick = this.handleCheckPointGridToolbarClick.bind(this);

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
    this.props.checkPointActions.loadCheckPoints(ticketId)
      .then(
        console.log("Checkpoint Filter Results...."),
        console.log(this.props.checkPoints),
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

  handleCheckPointSelect(row, isSelected, e) {
    this.checkPoint = new CheckPoint();
    if (!isSelected) {
      return this.setState({
        editMode: false,
        checkPointGridOpen: true,
        checkPoint: Object.assign({}, this.checkPoint)
      });
    }

    if (row["CheckPointId"] > 0) {
      this.checkPoint = new CheckPoint({
        id: row["CheckPointId"],
        TicketId: row["TicketId"],
        originator: row["Originator"],
        notifyDate: row["NotifyDate"],
        notifyTime: row["NotifyTime"],
        notifyBy: row["NotifyBy"],
        customerNotified: row["CustomerNotified"],
        meetLocation: row["MeetLocation"],
        schedDate: row["SchedDate"],
        schedTime: row["SchedTime"],
        createdBy: row["CreatedBy"],
        createDate: row["CreateDate"],
        createTime: row["CreateTime"]
      });

      return this.setState({
        editMode: true,
        checkPoint: Object.assign({}, this.checkPoint),
        checkPointGridOpen: this.state.isCheckPointGridPanelPinned
      });
    } else {
      return this.setState({
        editMode: false,
        checkPoint: Object.assign({}, this.checkPoint),
        checkPointGridOpen: this.state.isCheckPointGridPanelPinned
      });
    }
  }

  handleCheckPointGridToolbarClick(event) {
    if (this.state.isCheckPointGridPanelPinned) {
      return this.setState({
        checkPointGridOpen: this.state.checkPointGridOpen
      });
    }

    if (this.state.checkPointGridOpen) {
      return this.setState({
        checkPointGridOpen: this.state.checkPointGridOpen
      });
    }

    if (this.checkPoint.CheckPointId === 0) {
      return this.setState({
        checkPointGridOpen: true
      });
    } else {
      return this.setState({
        checkPointGridOpen: !this.state.checkPointGridOpen
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
        checkPointGridOpen: true,
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
        checkPointFYJobOpen: this.state.checkPointFYJobOpen
      });
    }

    return this.setState({
      checkPointFYJobOpen: !this.state.checkPointFYJobOpen
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
      this.props.checkPointActions.saveCheckPoint(this.checkPoint)
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
      this.checkPoint = new CheckPoint();
      this.setState({
        editMode: false,
        isClearLoading: false,
        checkPoint: Object.assign({}, this.checkPoint)
      });
    }, 1000);
  }

  isFormValid() {
    let errors = {};

    if (this.checkPoint.TicketId === 0) {
      errors["TicketId"] = true;
    }
    this.setState({errors: errors});
    return errors.length > 0;
  }

  checkPointFormUpdated(event) {
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
      checkPoint: Object.assign({}, this.checkPoint)
    });
  }


  render() {

    let pinGlyphClassName = this.state.isPanelPinned ? 'pushpin-glyph-pinned' : 'pushpin-glyph';
    let collapsePanelGlyph = this.state.checkPointFYJobOpen
      ? <Glyphicon title='Build Plan' className="nav-glyph" glyph='collapse-up'/>
      : <Glyphicon title='Build Plan' className="nav-glyph" glyph='collapse-down'/>;

    let gridPinGlyphClassName = this.state.isGridPanelPinned ? 'pushpin-glyph-pinned' : 'pushpin-glyph';
    let gridPanelCollapsePanelGlyph = this.state.isGridPanelPinned
      ? <Glyphicon title='Build Plan' className="nav-glyph" glyph='collapse-up'/>
      : <Glyphicon title='Build Plan' className="nav-glyph" glyph='collapse-down'/>;

    let checkPointGridPinGlyphClassName = this.state.isCheckPointGridPanelPinned ? 'pushpin-glyph-pinned' : 'pushpin-glyph';
    let checkPointGridPanelCollapsePanelGlyph = this.state.isCheckPointGridPanelPinned
      ? <Glyphicon title='Build Plan' className="nav-glyph" glyph='collapse-up'/>
      : <Glyphicon title='Build Plan' className="nav-glyph" glyph='collapse-down'/>;

    let title = (
      <div>
          <span className="table-header-glyph" onClick={this.handleToolbarClick} style={{cursor: 'pointer'}}>
            {collapsePanelGlyph}
            &nbsp;&nbsp;
            <Glyphicon
              className="table-glyphFiscalYear-active"
              title='fiscalYear:'
              glyph='calendar'/>&nbsp; FY: 2016
            &nbsp;&nbsp;
            <Glyphicon
              className="table-glyphJob-active"
              title='job:'
              glyph='folder-open'/>&nbsp; Job: 2300
        </span>
        <span className="table-header-glyph" style={{float: 'right'}} onClick={this.handlePanelPinned}>
            <Glyphicon
              className={pinGlyphClassName}
              title='pinStandardItem:'
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

    let checkPointGridTitle = (
      <div>
          <span className="table-header-glyph" onClick={this.handleCheckPointGridToolbarClick}>
            {checkPointGridPanelCollapsePanelGlyph}
            <Glyphicon
              className="table-glyph"
              title='checkpoints'
              glyph='cog'/>&nbsp; Selected CheckPoint
          </span>
        <span className="table-header-glyph" style={{float: 'right'}} onClick={this.handleCheckPointGridToolbarClick}>
            <Glyphicon
              className={checkPointGridPinGlyphClassName}
              title='pincheckpoints'
              glyph='pushpin'/>
          </span>
      </div>
    );

    let checkPointGridNode =
      <Row className="show-grid">
        <Col lg={8}>
          A ticket needs selected to view checkpoints.
        </Col>
      </Row>;

    if (this.ticket.TicketId > 0) {
      checkPointGridNode =
        <Row className="show-grid">
          <Col lg={8}>
            <CheckPointDataGrid
              checkPoints={this.props.checkPoints}
              title={checkPointGridTitle}
              gridPanelOpen={this.state.checkPointGridOpen}
              onRowSelect={this.handleCheckPointSelect}/>
          </Col>
        </Row>
    }

    let checkPointFormNode = <span> </span>;

    if(this.ticket.TicketId > 0 && this.checkPoint.CheckPointId === 0) {
      checkPointFormNode =
        <Row className="show-grid">
          <Col lg={8}>
            A checkpoint needs selected to view checkpoints, or use the add new button.
          </Col>
        </Row>;
    }

    if(this.checkPoint.CheckPointId > 0) {
      checkPointFormNode = <Row className="show-grid">
        <Col lg={8}>
          <CheckPointsForm
            checkPoint={this.checkPoint}
            errors={this.state.errors}
            ticket={this.ticket}
            onFormFieldChange={this.checkPointFormUpdated}
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
            expanded={this.state.checkPointFYJobOpen}>

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

          {checkPointGridNode}

          {checkPointFormNode}

        </Grid>
      </div>
    );
  }
}

CheckPointPage.propTypes = {
  checkPoints: PropTypes.array.isRequired,
  tickets: PropTypes.array.isRequired,
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
    checkPoint: state.checkPoint,
    checkPoints: state.checkPoints,
    selJobOption: selJobOptionToMap,
    selFiscalYearOption: selFiscalYearOptionToMap
  };
}

function mapDispatchToProps(dispatch) {
  return {
    jobActions: bindActionCreators(jobActions, dispatch),
    checkPointActions: bindActionCreators(checkPointActions, dispatch),
    fiscalYearActions: bindActionCreators(fiscalYearActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckPointPage);
