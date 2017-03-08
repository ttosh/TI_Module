import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import {bindActionCreators} from 'redux';
import * as jobActions from '../../../actions/jobActions';
import * as ticketActions from '../../../actions/ticketActions';
import * as fiscalYearActions from '../../../actions/fiscalYearActions';

import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Grid from 'react-bootstrap/lib/Grid';
import Table from 'react-bootstrap/lib/Table';
import Panel from 'react-bootstrap/lib/Panel';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

import JobsWidget from '../widgets/jobs/JobsWidget';
import FiscalYearsWidget from '../widgets/fiscal-years/FiscalYearsWidget';
import BuildPlanForm from '../../controls/forms/BuildPlanFormControl';
import BuildPlanDataGrid from '../../controls/datagrids/BuildPlanDataGrid';

import Ticket from '../../../api/objects/ticket';
import Job from '../../../api/objects/job';
import CommonUtils from '../../../api/objects/commonUtils';
import FiscalYear from '../../../api/objects/fiscalYear';

class BuildPlanPage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      errors: {},
      editMode: false,
      isPanelPinned: false,
      isGridPanelPinned: false,
      buildPlanFYJobOpen: false,
      buildPlanGridOpen: true,
      isAddUpdateLoading: false,
      isClearLoading: false,
      ticket: Object.assign({}, new Ticket()),
      selJobOption: props.selJobOption,
      selFiscalYearOption: props.selFiscalYearOption,
      selTaskNoOption: props.selTaskNoOption
    };
    this.ticket = new Ticket();
    this.isFormValid = this.isFormValid.bind(this);
    this.onJobsSelect = this.onJobsSelect.bind(this);
    this.onTaskNoFormChange = this.onTaskNoFormChange.bind(this);
    this.onFiscalYearSelect = this.onFiscalYearSelect.bind(this);
    this.handleBuildPlanSelect = this.handleBuildPlanSelect.bind(this);
    this.handleToolbarClick = this.handleToolbarClick.bind(this);
    this.handleAddUpdateClick = this.handleAddUpdateClick.bind(this);
    this.handleClearClick = this.handleClearClick.bind(this);
    this.handlePanelPinned = this.handlePanelPinned.bind(this);
    this.buildPlanFormUpdated = this.buildPlanFormUpdated.bind(this);
    this.handleGridToolbarClick = this.handleGridToolbarClick.bind(this);
    this.loadTicketsForJob = this.loadTicketsForJob.bind(this);
    this.updateJobsOnFiscalYearChange = this.updateJobsOnFiscalYearChange.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.ticket.TicketId != nextProps.ticket.TicketId) {
      this.setState({
        ticket: Object.assign({}, nextProps.ticket),
        selTaskNoOption: Object.assign({}, {label: nextProps.ticket.TaskNo, value: nextProps.ticket.TaskNo})
      });
    }
  }

  onJobsSelect(event) {
    Job.setLocalStorageIdentifier(event.value);
    this.props.ticketActions.loadTickets(event.value)
      .then(
        this.setState({
          tickets: Object.assign([], this.props.tickets),
          selJobOption: Object.assign({}, {groupId: event.groupId, label: event.label, value: event.value})
        }))
      .catch(error => {
        console.log(error)
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
  }

  onTaskNoFormChange(event) {
    return this.setState({
      selTaskNoOption: Object.assign({}, event)
    });
  }

  updateJobsOnFiscalYearChange(fiscalYearId) {
    Job.setLocalStorageIdentifier(0);
    this.props.jobActions.loadJobs(fiscalYearId)
      .then(this.setState({
        tickets: Object.assign([], [])
      }))
      .catch(error => {
        console.log(error)
      });
  }

  loadTicketsForJob(jobId) {
    this.props.ticketActions.loadTickets(jobId)
      .then(
        this.setState({
          tickets: Object.assign([], this.props.tickets),
          selJobOption: Object.assign({}, {groupId: 'active', label: 'Select.....', value: '0'})
        }))
      .catch(error => {
        console.log(error)
      });
  }

  handleBuildPlanSelect(row, isSelected, e) {
    this.ticket = new Ticket();
    if (!isSelected) {
      return this.setState({
        editMode: false,
        ticket: Object.assign({}, this.ticket),
        buildPlanGridOpen: true,
        selTaskNoOption: Object.assign({}, {label: 'Select...', value: '0'})
      });
    }

    if (parseInt(row["TicketId"]) > 0) {
      this.ticket = new Ticket({
        id: row["TicketId"],
        no: row["No"],
        taskItemId: row["TaskId"],
        taskNo: row["TaskNo"],
        jobId: row["JobId"],
        fiscalYearId: row["FiscalYearId"],
        standardItemId: row["StandardItemId"],
        standardItemNo: row["StandardItemNo"],
        checkPointTypes: row["CheckPointTypes"],
        hasCheckPointTypeV: row["HasCheckPointTypeV"],
        hasCheckPointTypeQ: row["HasCheckPointTypeQ"],
        hasCheckPointTypeI: row["HasCheckPointTypeI"],
        hasCheckPointTypeG: row["HasCheckPointTypeG"],
        hasCheckPointTypeRPT: row["HasCheckPointTypeRPT"],
        shopSub: row["TicketShopSub"],
        title: row["Title"],
        void: row["Void"],
        testStage: row["TestStage"],
        workPara: row["WorkPara"],
        specItemNo: row["SpecItemNo"],
        specItemTitle: row["SpecItemTitle"],
        specItemWorkPara: row["SpecItemWorkPara"],
        specItemLocation: row["SpecItemLocation"],
        criteria: row["Criteria"],
        additionalCriteria: row["AdditionalCriteria"],
        createdBy: row["CreatedBy"],
        createDate: row["CreateDate"],
        createTime: row["CreateTime"]
      });

      let selTaskNo = this.ticket.TaskNo === null ?
        {label: 'Select...', value: '0'} :
        {label: this.ticket.TaskNo, value: this.ticket.TaskNo};

      return this.setState({
        editMode: true,
        ticket: Object.assign({}, this.ticket),
        buildPlanGridOpen: this.state.isGridPanelPinned,
        selTaskNoOption: Object.assign({}, selTaskNo)
      });
    } else {
      return this.setState({
        editMode: false,
        ticket: Object.assign({}, this.ticket),
        buildPlanGridOpen: this.state.isGridPanelPinned,
        selTaskNoOption: Object.assign({}, {label: 'Select...', value: '0'})
      });
    }
  }

  handlePanelPinned(event) {
    if (this.state.isPanelPinned) {
      return this.setState({
        buildPlanFYJobOpen: true,
        isPanelPinned: !this.state.isPanelPinned
      });
    } else {
      return this.setState({
        isPanelPinned: !this.state.isPanelPinned
      });
    }
  }

  handleToolbarClick() {
    if (this.state.isPanelPinned) {
      return this.setState({
        buildPlanFYJobOpen: this.state.buildPlanFYJobOpen
      });
    }

    return this.setState({
      buildPlanFYJobOpen: !this.state.buildPlanFYJobOpen
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
      this.props.ticketActions.saveTicket(this.ticket)
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
      this.ticket = new Ticket();
      this.setState({
        editMode: false,
        isClearLoading: false,
        ticket: Object.assign({}, this.ticket)
      });
    }, 1000);
  }

  isFormValid() {
    let errors = {};

    if (CommonUtils.trim(this.ticket.TicketNo).length === 0) {
      errors["TicketNo"] = true;
    }

    if (this.ticket.FiscalYearId === 0) {
      errors["FiscalYearId"] = true;
    }
    this.setState({errors: errors});

    return errors.length > 0;
  }

  buildPlanFormUpdated(event) {
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
        break;
    }
    return this.setState({
      ticket: this.ticket
    });
  }

  render() {

    let pinGlyphClassName = this.state.isPanelPinned ? "pushpin-glyph-pinned" : "pushpin-glyph";
    let collapsePanelGlyph = this.state.buildPlanFYJobOpen
      ? <Glyphicon title="Standard Item" className="nav-glyph" glyph="collapse-up"/>
      : <Glyphicon title="Standard Item" className="nav-glyph" glyph="collapse-down"/>;

    let gridPinGlyphClassName = this.state.isGridPanelPinned ? 'pushpin-glyph-pinned' : 'pushpin-glyph';

    let title = (
      <div>
          <span className="table-header-glyph" onClick={this.handleToolbarClick} style={{cursor: 'pointer'}}>
            {collapsePanelGlyph}
            &nbsp;&nbsp;
            <Glyphicon
              className="table-glyphFiscalYear-active"
              title='fiscalYear:'
              glyph='calendar'/>&nbsp; {this.props.selFiscalYearOption.label}
            &nbsp;&nbsp;
            <Glyphicon
              className="table-glyphJob-active"
              title='job:'
              glyph='folder-open'/>&nbsp; Job: {this.props.selJobOption.label}
        </span>
        <span className="table-header-glyph" style={{float: 'right'}} onClick={this.handlePanelPinned}>
            <Glyphicon
              className={pinGlyphClassName}
              title='pinFiscalYearJob'
              glyph='pushpin'/>
          </span>
      </div>
    );

    let buildPlanGlyphCollapseNode = this.ticket.TicketId === 0
      ? <Glyphicon title='Build Plans' className="nav-glyph" glyph='collapse-up'/>
      : <Glyphicon title='Build Plans' className="nav-glyph" glyph='collapse-down'/>;

    let buildPlanGridTitle = (
      <div>
          <span className="table-header-glyph" onClick={this.handleGridToolbarClick}>
            {buildPlanGlyphCollapseNode}
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

    let selFiscalYearOptionsMap =
      this.state.selFiscalYearOption.value === "0" ? this.props.selFiscalYearOption : this.state.selFiscalYearOption;

    let selJobOptionsMap =
      this.state.selJobOption.value === "0" ? this.props.selJobOption : this.state.selJobOption;

    let selTaskNoOptionsMap =
      this.state.selTaskNoOption.value === "0" ? this.props.selTaskNoOption : this.state.selTaskNoOption;

    return (
      <div className="ti-page-container">
        <Grid>
          <Panel
            className="ti-panel"
            header={title}
            collapsible
            expanded={this.state.buildPlanFYJobOpen}>

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

          <Row className="show-grid">
            <Col lg={8}>

              <BuildPlanForm
                ticket={this.ticket}
                tickets={this.props.tickets}
                onTaskNoFormChange={this.onTaskNoFormChange}
                selectedTaskOption={selTaskNoOptionsMap}
                shopSubs={this.props.shopSubs}
                standardItems={this.props.standardItems}
                errors={this.state.errors}
                onFormFieldChange={this.buildPlanFormUpdated}
                editMode={this.state.editMode}
                isAddUpdateLoading={this.state.isAddUpdateLoading}
                handleAddUpdateClick={!this.state.isAddUpdateLoading ? this.handleAddUpdateClick : null}
                isClearLoading={this.state.isClearLoading}
                handleClearClick={!this.state.isClearLoading ? this.handleClearClick : null}/>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

BuildPlanPage.propTypes = {
  ticket: PropTypes.object.isRequired,
  tickets: PropTypes.array.isRequired,
  standardItems: PropTypes.array.isRequired,
  jobs: PropTypes.array.isRequired,
  shopSubs: PropTypes.array.isRequired,
  fiscalYears: PropTypes.array.isRequired,
  selJobOption: PropTypes.object.isRequired,
  selTaskNoOption: PropTypes.object,
  selFiscalYearOption: PropTypes.object.isRequired,
  jobActions: PropTypes.object.isRequired,
  ticketActions: PropTypes.object.isRequired,
  fiscalYearActions: PropTypes.object.isRequired
};


function mapStateToProps(state) {

  const jobs = state.jobs;
  const ticket = state.ticket == undefined ? new Ticket() : state.ticket;
  const fiscalYears = state.fiscalYears;

  let selTaskNoOptionsToMap = {label: 'Select...', value: '0'};
  let selFiscalYearOptionToMap = {label: 'Select...', value: '0'};
  let selJobOptionToMap = {groupId: 'active', label: 'Select...', value: '0'};

  try {
    if (state.selTaskNoOption !== undefined && parseInt(state.selTaskNoOption.value) > 0) {
      selTaskNoOptionsToMap = state.selTaskNoOption;
    }
  } catch(err) {
   console.log(err);
  }

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

  const shopSubsTemp = [];

  return {
    ticket: ticket,
    tickets: state.tickets,
    standardItems: state.standardItems,
    jobs: state.jobs,
    shopSubs: shopSubsTemp,
    fiscalYears: state.fiscalYears,
    selJobOption: selJobOptionToMap,
    selTaskNoOption: selTaskNoOptionsToMap,
    selFiscalYearOption: selFiscalYearOptionToMap
  };
}

function mapDispatchToProps(dispatch) {
  return {
    jobActions: bindActionCreators(jobActions, dispatch),
    ticketActions: bindActionCreators(ticketActions, dispatch),
    fiscalYearActions: bindActionCreators(fiscalYearActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BuildPlanPage);





