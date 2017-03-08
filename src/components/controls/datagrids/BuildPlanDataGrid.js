import React, {PropTypes} from 'react';

import Panel from 'react-bootstrap/lib/Panel';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

const BuildPlanDataGrid = ({tickets, gridPanelOpen, onRowSelect, title}) => {

  return (
    <div>
      <Panel
        className="ti-panel"
        header={title}
        collapsible
        expanded={gridPanelOpen}>

        <div id="bp-table-outerdiv" className="ti-outer-div">
          <div id="bp-table-innerdiv" className="ti-inner-div">
            <BootstrapTable
              data={tickets}
              striped={true}
              hover={true}
              condensed={true}
              maxHeight={205}
              options={
                {
                  noDataText: "No Build Plan Data found..."
                }
              }
              selectRow={
                {
                  mode: "radio",
                  hideSelectColumn: true,
                  onSelect: onRowSelect,
                  clickToSelect: true,
                  bgColor: "AliceBlue"
                }
              }
              trClassName={"ticketTableRow"}>
              <TableHeaderColumn dataField="TicketId" isKey={true} hidden={true}>Ticket Id</TableHeaderColumn>
              <TableHeaderColumn className="ticketTable" dataField="TaskItemId" hidden={true}>Task Item Id</TableHeaderColumn>
              <TableHeaderColumn className="ticketTable" dataField="TaskNo" dataSort={true}>Task No.</TableHeaderColumn>
              <TableHeaderColumn className="ticketTable" dataField="JobId" hidden={true}>Job Id</TableHeaderColumn>
              <TableHeaderColumn className="ticketTable" dataField="No" dataSort={true}>Ticket</TableHeaderColumn>
              <TableHeaderColumn className="ticketTable" dataField="Title" dataSort={true}>Title</TableHeaderColumn>
              <TableHeaderColumn className="ticketTable" dataField="StandardItemId" hidden={true}>Std Item Id</TableHeaderColumn>
              <TableHeaderColumn className="ticketTable" dataField="StandardItemNo" hidden={true}>Std Item No</TableHeaderColumn>
              <TableHeaderColumn className="ticketTable" dataField="WorkPara" dataSort={true}>Para</TableHeaderColumn>
              <TableHeaderColumn className="ticketTable" dataField="SpecItemLocation" hidden={true}>Spec ItemLoc</TableHeaderColumn>
              <TableHeaderColumn className="ticketTable" dataField="SpecItemNo" dataSort={true}>SpecItem</TableHeaderColumn>
              <TableHeaderColumn className="ticketTable" dataField="SpecItemTitle" hidden={true}>Spect ItemTitle</TableHeaderColumn>
              <TableHeaderColumn className="ticketTable" dataField="SpecItemWorkPara" hidden={true}>Spec ItemPara</TableHeaderColumn>
              <TableHeaderColumn className="ticketTable" dataField="FiscalYearId" hidden={true}>FY</TableHeaderColumn>
              <TableHeaderColumn className="ticketTable" dataField="Criteria" hidden={true}>Criteria</TableHeaderColumn>
              <TableHeaderColumn className="ticketTable" dataField="AdditionalCriteria" hidden={true}>AdditionalCriteria</TableHeaderColumn>
              <TableHeaderColumn className="ticketTable" dataField="Void" hidden={true}>Void</TableHeaderColumn>
              <TableHeaderColumn className="ticketTable" dataField="TestStage" hidden={true}>TestStage</TableHeaderColumn>
              <TableHeaderColumn className="ticketTable" dataField="TicketShopSub" dataSort={true}>ShopSub</TableHeaderColumn>
              <TableHeaderColumn className="ticketTable" dataField="CheckPointTypes" hidden={true}>CheckPointTypes</TableHeaderColumn>
              <TableHeaderColumn className="ticketTable" dataField="HasCheckPointTypeV" hidden={true}>HasCheckPointTypeV</TableHeaderColumn>
              <TableHeaderColumn className="ticketTable" dataField="HasCheckPointTypeQ" hidden={true}>HasCheckPointTypeQ</TableHeaderColumn>
              <TableHeaderColumn className="ticketTable" dataField="HasCheckPointTypeI" hidden={true}>HasCheckPointTypeI</TableHeaderColumn>
              <TableHeaderColumn className="ticketTable" dataField="HasCheckPointTypeG" hidden={true}>HasCheckPointTypeG</TableHeaderColumn>
              <TableHeaderColumn className="ticketTable" dataField="HasCheckPointTypeRPT" hidden={true}>HasCheckPointTypeRPT</TableHeaderColumn>
              <TableHeaderColumn className="ticketTable" dataField="CreateDate" hidden={true}>CreateDate</TableHeaderColumn>
              <TableHeaderColumn className="ticketTable" dataField="CreateTime" hidden={true}>CreateTime</TableHeaderColumn>
              <TableHeaderColumn className="ticketTable" dataField="CreatedBy" hidden={true}>CreatedBy</TableHeaderColumn>
            </BootstrapTable>
          </div>
        </div>
      </Panel>
    </div>
  );
}

BuildPlanDataGrid.propTypes = {
  tickets: PropTypes.array.isRequired,
  gridPanelOpen: PropTypes.bool,
  title: PropTypes.string,
  onRowSelect: PropTypes.func.isRequired
};


export default BuildPlanDataGrid;
