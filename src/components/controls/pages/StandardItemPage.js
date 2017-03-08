import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import {bindActionCreators} from 'redux';
import * as jobActions from '../../../actions/jobActions';
import * as fiscalYearActions from '../../../actions/fiscalYearActions';
import * as standardItemActions from '../../../actions/standardItemActions';

import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Grid from 'react-bootstrap/lib/Grid';
import Table from 'react-bootstrap/lib/Table';
import Panel from 'react-bootstrap/lib/Panel';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

import JobsWidget from '../widgets/jobs/JobsWidget';
import FiscalYearsWidget from '../widgets/fiscal-years/FiscalYearsWidget';
import StandardItemsForm from '../../controls/forms/StandardItemsFormControl';
import StandardItemsDataGrid from '../../controls/datagrids/StandardItemsDataGrid';

import Job from '../../../api/objects/job';
import CommonUtils from '../../../api/objects/commonUtils';
import StandardItem from '../../../api/objects/standardItem';
import FiscalYear from '../../../api/objects/fiscalYear';

class StandardItemPage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      errors: {},
      editMode: false,
      isPanelPinned: false,
      isGridPanelPinned: false,
      stdItemsGridOpen: true,
      stdItemsFYJobOpen: props.isStdItemsFyJobOpen,
      isAddUpdateLoading: false,
      isClearLoading: false,
      selJobOption: props.selJobOption,
      selFiscalYearOption: props.selFiscalYearOption,
      selFiscalYearFormOption: props.selFiscalYearFormOption,
      standardItem: Object.assign({}, new StandardItem())
    };
    this.standardItem = new StandardItem();
    this.isFormValid = this.isFormValid.bind(this);
    this.onJobsSelect = this.onJobsSelect.bind(this);
    this.onFiscalYearSelect = this.onFiscalYearSelect.bind(this);
    this.onFormFiscalYearSelect = this.onFormFiscalYearSelect.bind(this);
    this.handleToolbarClick = this.handleToolbarClick.bind(this);
    this.handlePanelPinned = this.handlePanelPinned.bind(this);
    this.handleGridPanelPinned = this.handleGridPanelPinned.bind(this);
    this.handleStandardItemSelect = this.handleStandardItemSelect.bind(this);
    this.handleGridToolbarClick = this.handleGridToolbarClick.bind(this);
    this.handleAddUpdateClick = this.handleAddUpdateClick.bind(this);
    this.handleClearClick = this.handleClearClick.bind(this);
    this.standardItemFormUpdated = this.standardItemFormUpdated.bind(this);
    this.getFiscalYearJobOpen = this.getFiscalYearJobOpen.bind(this);
    this.loadJobsOnFiscalYearChange = this.loadJobsOnFiscalYearChange.bind(this);
    this.loadStandardItemsForFiscalYears = this.loadStandardItemsForFiscalYears.bind(this);

    this.getFiscalYearJobOpen();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.standardItem.StandardItemId != nextProps.standardItem.StandardItemId) {
      this.setState({standardItem: Object.assign({}, nextProps.standardItem)});
    }
  }

  componentWillMount() {

  }

  componentDidMount() {
    console.log("componentDidMount");
    console.log(this.standardItem);
  }

  getFiscalYearJobOpen() {
    let fiscalYearLocalStorageIdentifier = FiscalYear.getLocalStorageIdentifier();
    return !(fiscalYearLocalStorageIdentifier === null | fiscalYearLocalStorageIdentifier === 0);
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
      .then(this.loadJobsOnFiscalYearChange(event.value))
      .catch(error => {
        console.log(error)
      });

    this.props.standardItemActions.loadStandardItems()
      .then(this.loadStandardItemsForFiscalYears(event.value))
      .catch(error => {
        console.log(error)
      });
  }

  onFormFiscalYearSelect(event) {
    this.standardItem.FiscalYearId = event.value;
    this.setState({
      standardItem: Object.assign({}, this.standardItem),
      selFiscalYearFormOption: Object.assign({}, {label: event.label, value: event.value})
    });
  }

  loadJobsOnFiscalYearChange(fiscalYearId) {
    Job.setLocalStorageIdentifier(0);
    this.props.jobActions.loadJobs(fiscalYearId)
      .then(this.loadStandardItemsForFiscalYears)
      .catch(error => {
        console.log(error)
      });
  }

  loadStandardItemsForFiscalYears(fiscalYearId) {
    this.props.standardItemActions.loadStandardItems(fiscalYearId)
      .then(
        this.setState({
          standardItems: Object.assign([], this.props.standardItems),
          selJobOption: Object.assign({}, {groupId: 'active', label: 'Select.....', value: '0'})
        }))
      .catch(error => {
        console.log(error)
      });
  }

  handlePanelPinned(event) {
    if (this.state.isPanelPinned) {
      return this.setState({
        stdItemsFYJobOpen: true,
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
        stdItemsGridOpen: true,
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
        stdItemsFYJobOpen: this.state.stdItemsFYJobOpen
      });
    }

    return this.setState({
      stdItemsFYJobOpen: !this.state.stdItemsFYJobOpen
    });
  }

  handleGridToolbarClick() {

    if (this.state.isGridPanelPinned) {
      return this.setState({
        stdItemsGridOpen: this.state.stdItemsGridOpen
      });
    }

    if (this.state.stdItemsGridOpen) {
      return this.setState({
        stdItemsGridOpen: this.state.stdItemsGridOpen
      });
    }

    if (this.standardItem.StandardItemNo.length === 0) {
      return this.setState({
        stdItemsGridOpen: true
      });
    } else {
      return this.setState({
        stdItemsGridOpen: !this.state.stdItemsGridOpen
      });
    }
  }

  standardItemFormUpdated(event) {
    switch (event.target.name) {
      case "StandardItemNo":
        this.standardItem.StandardItemNo = event.target.value;
        break;

      case "WorkPara":
        this.standardItem.WorkPara = event.target.value;
        break;

      case "InspType":
        this.standardItem.InspectionTypeItem = event.target.value;
        break;

      case "Criteria":
        this.standardItem.Criteria = event.target.value;
        break;

      default:
        console.log("No form field matched incoming event.");
    }
    return this.setState({
      standardItem: this.standardItem
    });
  }

  isFormValid() {
    let errors = {};

    if (CommonUtils.trim(this.standardItem.StandardItemNo).length === 0) {
      errors["StandardItemNo"] = true;
    }

    if (this.standardItem.FiscalYearId === 0) {
      errors["FiscalYearId"] = true;
    }
    this.setState({errors: errors});

    return errors.length > 0;
  }

  handleAddUpdateClick(event) {
    if (this.isFormValid()) {
      this.setState({isAddUpdateLoading: true});
      this.props.standardItemActions.saveStandardItem(this.standardItem)
        .then(function (data) {
          console.log("After save data returned is....");
          console.log(data);
          //this.standardItem.StandardItemId = data.StandardItemId;
          // StandardItem.setLocalStorageIdentifier(this.standardItem.StandardItemId);
          // StandardItem.createUpdateCheckPoints(this.standardItem.StandardItemId);
          this.setState({isAddUpdateLoading: false});
        })
        .catch(error => {
          console.log("Error saving standard item: " + error);
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
      this.standardItem = new StandardItem();
      this.setState({
        editMode: false,
        isClearLoading: false,
        standardItem: Object.assign({}, this.standardItem),
        selFiscalYearFormOption: {label: 'Select...', value: '0'}
      });
    }, 1000);
  }

  handleStandardItemSelect(row, isSelected, e) {
    this.standardItem = new StandardItem();
    let fyToMap = {label: 'Select...', value: '0'}

    if (!isSelected) {
      return this.setState({
        editMode: false,
        stdItemsGridOpen: true,
        selFiscalYearFormOption: fyToMap,
        standardItem: Object.assign({}, this.standardItem)
      });
    }

    if (row["StandardItemId"] > 0) {
      this.standardItem = new StandardItem({
        id: row["StandardItemId"],
        no: row["StandardItemNo"],
        fiscalYearId: row["FiscalYearId"],
        workPara: row["WorkPara"],
        criteria: row["Criteria"],
        inspectionTypeItem: row["InspectionTypeItem"],
        checkPointTypes: row["CheckPointTypes"],
        HasCheckPointTypeV: row["HasCheckPointTypeV"],
        HasCheckPointTypeG: row["HasCheckPointTypeG"],
        HasCheckPointTypeI: row["HasCheckPointTypeI"],
        HasCheckPointTypeQ: row["HasCheckPointTypeQ"],
        HasCheckPointTypeRPT: row["HasCheckPointTypeRPT"],
        void: row["Void"],
        createdBy: row["CreatedBy"],
        createDate: row["CreateDate"],
        createTime: row["CreateTime"]
      });


      if (this.props.fiscalYears.length > 0) {
        if (this.standardItem.FiscalYearId !== 0) {
          let fiscalYear = this.props.fiscalYears.filter(fy => fy.FiscalYearId === this.standardItem.FiscalYearId)[0];
          fyToMap = {label: fiscalYear.Description, value: fiscalYear.FiscalYearId};
        }
      }

      return this.setState({
        editMode: true,
        stdItemsGridOpen: this.state.isGridPanelPinned,
        selFiscalYearFormOption: fyToMap,
        standardItem: Object.assign({}, this.standardItem)
      });
    } else {
      return this.setState({
        editMode: false,
        selFiscalYearFormOption: fyToMap,
        standardItem: Object.assign({}, this.standardItem)
      });
    }
  }

  render() {

    let pinGlyphClassName = this.state.isPanelPinned ? "pushpin-glyph-pinned" : "pushpin-glyph";
    let collapsePanelGlyph = this.state.stdItemsFYJobOpen
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
              title='pinStandardItemFiscalYearJob'
              glyph='pushpin'/>
          </span>
      </div>
    );

    let standardItemGlyphCollapseNode = this.standardItem.StandardItemNo.length === 0
      ? <Glyphicon title='Standard Items' className="nav-glyph" glyph='collapse-up'/>
      : <Glyphicon title='Standard Items' className="nav-glyph" glyph='collapse-down'/>;

    let standardItemGridTitle = (
      <div>
          <span className="table-header-glyph" onClick={this.handleGridToolbarClick} style={{cursor: 'pointer'}}>
            {standardItemGlyphCollapseNode}
            &nbsp;&nbsp;
            <Glyphicon
              className="table-glyph"
              title='stdItems:'
              glyph='cog'/>&nbsp; Standard Items
          </span>
        <span className="table-header-glyph" style={{float: 'right'}} onClick={this.handleGridPanelPinned}>
            <Glyphicon
              className={gridPinGlyphClassName}
              title='pinStandardItems'
              glyph='pushpin'/>
          </span>
      </div>
    );

    let selFiscalYearOptionsMap =
      this.state.selFiscalYearOption.value === "0" ? this.props.selFiscalYearOption : this.state.selFiscalYearOption;

    let selJobOptionsMap =
      this.state.selJobOption.value === "0" ? this.props.selJobOption : this.state.selJobOption;

    console.log(this.props.standardItems);

    return (
      <div className="ti-page-container">
          <Grid>
            <Panel
              className="ti-panel"
              header={title}
              collapsible
              expanded={this.state.stdItemsFYJobOpen}>

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
                <StandardItemsDataGrid
                  title={standardItemGridTitle}
                  gridPanelOpen={this.state.stdItemsGridOpen}
                  standardItems={this.props.standardItems}
                  onRowSelect={this.handleStandardItemSelect}/>
              </Col>
            </Row>

            <Row className="show-grid">
              <Col lg={8}>
                <StandardItemsForm
                  errors={this.state.errors}
                  standardItem={this.standardItem}
                  editMode={this.state.editMode}
                  onFormFieldChange={this.standardItemFormUpdated}
                  fiscalYears={this.props.fiscalYears}
                  onFiscalYearChange={this.onFormFiscalYearSelect}
                  selectedFiscalYearOption={this.state.selFiscalYearFormOption}
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

StandardItemPage.propTypes = {
  jobs: PropTypes.array.isRequired,
  standardItem: PropTypes.object,
  standardItems: PropTypes.array.isRequired,
  fiscalYears: PropTypes.array.isRequired,
  jobActions: PropTypes.object.isRequired,
  selJobOption: PropTypes.object.isRequired,
  selFiscalYearOption: PropTypes.object.isRequired,
  selFiscalYearFormOption: PropTypes.object.isRequired,
  standardItemActions: PropTypes.object.isRequired,
  fiscalYearActions: PropTypes.object.isRequired,
  isAddUpdateLoading: PropTypes.bool,
  handleAddUpdateClick: PropTypes.func.isRequired,
  isClearLoading: PropTypes.bool.isRequired,
  handleClearClick: PropTypes.func.isRequired,
  isStdItemsFyJobOpen: PropTypes.bool.isRequired
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

  let fiscalYearJobOptionsOpen = state.stdItemsFYJobOpen;
  if (selFiscalYearId === 0) {
    fiscalYearJobOptionsOpen = true;
  }


  return {
    jobs: state.jobs,
    standardItem: state.standardItem == undefined ? new StandardItem() : state.standardItem,
    standardItems: state.standardItems,
    fiscalYears: fiscalYears,
    selJobOption: selJobOptionToMap,
    isStdItemsFyJobOpen: fiscalYearJobOptionsOpen,
    selFiscalYearOption: selFiscalYearOptionToMap,
    selFiscalYearFormOption: state.selFiscalYearFormOption
  };
}

function mapDispatchToProps(dispatch) {
  return {
    jobActions: bindActionCreators(jobActions, dispatch),
    standardItemActions: bindActionCreators(standardItemActions, dispatch),
    fiscalYearActions: bindActionCreators(fiscalYearActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StandardItemPage);




