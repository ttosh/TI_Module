import React, {PropTypes} from 'react';

import Panel from 'react-bootstrap/lib/Panel';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

const CheckPointsDataGrid = ({checkPoints, gridPanelOpen, onRowSelect, title}) => {

  return (
    <div>
      <Panel
        className="ti-panel"
        header={title}
        collapsible
        expanded={gridPanelOpen}>

        <div id="cp-table-outerdiv" className="ti-outer-div">
          <div id="cp-table-innerdiv" className="ti-inner-div">
            <BootstrapTable
              data={checkPoints}
              striped={true}
              hover={true}
              condensed={true}
              maxHeight={205}
              options={
                {
                  noDataText: "No CheckPoint Data found..."
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
              trClassName={"checkPointTableRow"}>
              <TableHeaderColumn className="checkPointTable" dataField="CheckPointId" isKey={true} hidden={true}>CheckPoint Id</TableHeaderColumn>
              <TableHeaderColumn className="checkPointTable" dataField="TicketId" hidden={true}>Task Id</TableHeaderColumn>
              <TableHeaderColumn className="checkPointTable" dataField="CheckPointTicketNo" dataSort={true}>Ticket No</TableHeaderColumn>
              <TableHeaderColumn className="checkPointTable" dataField="Originator" dataSort={true}>Originator</TableHeaderColumn>
              <TableHeaderColumn className="checkPointTable" dataField="NotifyDate" dataSort={true}>Notify Date</TableHeaderColumn>
              <TableHeaderColumn className="checkPointTable" dataField="NotifyTime" dataSort={true}>Notify Time</TableHeaderColumn>
              <TableHeaderColumn className="checkPointTable" dataField="NotifyBy" dataSort={true}>Notify By</TableHeaderColumn>
              <TableHeaderColumn className="checkPointTable" dataField="CustomerNotified" dataSort={true}>Customer Notified</TableHeaderColumn>
              <TableHeaderColumn className="checkPointTable" dataField="MeetLocation" dataSort={true}>Meet Loc</TableHeaderColumn>
              <TableHeaderColumn className="checkPointTable" dataField="SchedDate" dataSort={true}>Sched Date</TableHeaderColumn>
              <TableHeaderColumn className="checkPointTable" dataField="SchedTime" dataSort={true}>Sched Time</TableHeaderColumn>
              <TableHeaderColumn className="checkPointTable" dataField="Void" hidden={true}>Void</TableHeaderColumn>
              <TableHeaderColumn className="checkPointTable" dataField="CreateDate" hidden={true}>Create Date</TableHeaderColumn>
              <TableHeaderColumn className="checkPointTable" dataField="CreateTime" hidden={true}>Create Time</TableHeaderColumn>
              <TableHeaderColumn className="checkPointTable" dataField="CreatedBy" hidden={true}>Created By</TableHeaderColumn>
            </BootstrapTable>
          </div>
        </div>

      </Panel>
    </div>
  );
}

CheckPointsDataGrid.propTypes = {
  checkPoints: PropTypes.array.isRequired,
  gridPanelOpen: PropTypes.bool,
  title: PropTypes.string,
  onRowSelect: PropTypes.func.isRequired
};

export default CheckPointsDataGrid;
