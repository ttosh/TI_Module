import React, {PropTypes} from 'react';

import Panel from 'react-bootstrap/lib/Panel';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

const CheckPointResultsDataGrid = ({checkPointResults, gridPanelOpen, onRowSelect, title}) => {

  return (
    <div>
    <Panel
      className="ti-panel"
      header={title}
      collapsible
      expanded={gridPanelOpen}>

      <div id="cpr-table-outerdiv" className="ti-outer-div">
        <div id="cpr-table-innerdiv" className="ti-inner-div">
          <BootstrapTable
            data={checkPointResults}
            striped={true}
            hover={true}
            condensed={true}
            maxHeight={200}
            options={
              {
                noDataText: "No CheckPoint Results Data found..."
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
            trClassName={"checkPointResultsTableRow"}>
            <TableHeaderColumn className="checkPointResultsTable" dataField="CheckPointResultId" isKey={true}>CPRId</TableHeaderColumn>
            <TableHeaderColumn className="checkPointResultsTable" dataField="TicketId" hidden={true}>Ticket Id</TableHeaderColumn>
            <TableHeaderColumn className="checkPointResultsTable" dataField="CheckPointResultTicketNo" dataSort={true}>Ticket No</TableHeaderColumn>
            <TableHeaderColumn className="checkPointResultsTable" dataField="CheckPointId" hidden={true}>CPId</TableHeaderColumn>
            <TableHeaderColumn className="checkPointResultsTable" dataField="CalDueDate" dataSort={true}>Cal Due Date</TableHeaderColumn>
            <TableHeaderColumn className="checkPointResultsTable" dataField="CheckPointDate" dataSort={true}>CP Date</TableHeaderColumn>
            <TableHeaderColumn className="checkPointResultsTable" dataField="CheckPointTime" dataSort={true}>CP Time</TableHeaderColumn>
            <TableHeaderColumn className="checkPointResultsTable" dataField="Concur" hidden={true}>Concur</TableHeaderColumn>
            <TableHeaderColumn className="checkPointResultsTable" dataField="CustSigningRep" dataSort={true}>Sign Rep</TableHeaderColumn>
            <TableHeaderColumn className="checkPointResultsTable" dataField="EquipmentSN"  dataSort={true}>SSN</TableHeaderColumn>
            <TableHeaderColumn className="checkPointResultsTable" dataField="GovtRepNotified" dataSort={true}>Govt Rep Notified</TableHeaderColumn>
            <TableHeaderColumn className="checkPointResultsTable" dataField="IsPartial" hidden={true}>Is Partial</TableHeaderColumn>
            <TableHeaderColumn className="checkPointResultsTable" dataField="IsFinal" hidden={true}>Is Final</TableHeaderColumn>
            <TableHeaderColumn className="checkPointResultsTable" dataField="Remarks" dataSort={true}>Remarks</TableHeaderColumn>
            <TableHeaderColumn className="checkPointResultsTable" dataField="SatUnsat" dataSort={true}>Sat Unsat</TableHeaderColumn>
            <TableHeaderColumn className="checkPointResultsTable" dataField="TestEquipment" dataSort={true}>Test Equip</TableHeaderColumn>
            <TableHeaderColumn className="checkPointResultsTable" dataField="CreateDate" hidden={true}>Create Date</TableHeaderColumn>
            <TableHeaderColumn className="checkPointResultsTable" dataField="CreateTime" hidden={true}>Create Time</TableHeaderColumn>
            <TableHeaderColumn className="checkPointResultsTable" dataField="CreatedBy" hidden={true}>Created By</TableHeaderColumn>
          </BootstrapTable>
        </div>
      </div>

    </Panel>
    </div>
  );
}

CheckPointResultsDataGrid.propTypes = {
  checkPointResults: PropTypes.array.isRequired,
  gridPanelOpen: PropTypes.bool,
  title: PropTypes.string,
  onRowSelect: PropTypes.func.isRequired
};

export default CheckPointResultsDataGrid;
