import React, {PropTypes} from 'react';

import Panel from 'react-bootstrap/lib/Panel';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

const StandardItemsDataGrid = ({standardItems, gridPanelOpen, onRowSelect, title}) => {
  return (
    <div>
      <Panel
        className="ti-panel"
        header={title}
        collapsible
        expanded={gridPanelOpen} >

        <div id="si-table-outerdiv" className="ti-outer-div">
          <div id="si-table-innerdiv" className="ti-inner-div">
            <BootstrapTable
              data={standardItems}
              striped={true}
              hover={true}
              condensed={true}
              maxHeight={205}
              options={
                {
                  noDataText: "No Standard Item Data found..."
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
              trClassName={"standardItemsTableRow"}>
              <TableHeaderColumn dataField="StandardItemId" isKey={true} hidden={true}>StandardItemId</TableHeaderColumn>
              <TableHeaderColumn className="standardItemsTable" dataField="StandardItemNo" dataSort={true}>Item</TableHeaderColumn>
              <TableHeaderColumn dataField="FiscalYearId" className="standardItemsTable" hidden={true}>FY</TableHeaderColumn>
              <TableHeaderColumn className="standardItemsTable" dataField="WorkPara" dataSort={true}>Para</TableHeaderColumn>
              <TableHeaderColumn className="standardItemsTable" dataField="InspectionTypeItem" dataSort={true}>InspType</TableHeaderColumn>
              <TableHeaderColumn className="standardItemsTable" dataField="Criteria" dataSort={true}>Criteria</TableHeaderColumn>
              <TableHeaderColumn className="standardItemsTable" dataField="Void" hidden={true}>Void</TableHeaderColumn>
              <TableHeaderColumn className="standardItemsTable" dataField="CheckPointTypes" hidden={true}>CPTypes</TableHeaderColumn>
              <TableHeaderColumn className="standardItemsTable" dataField="HasCheckPointTypeV" hidden={true}>CPTypeV</TableHeaderColumn>
              <TableHeaderColumn className="standardItemsTable" dataField="HasCheckPointTypeI" hidden={true}>CPTypeV</TableHeaderColumn>
              <TableHeaderColumn className="standardItemsTable" dataField="HasCheckPointTypeG" hidden={true}>CPTypeV</TableHeaderColumn>
              <TableHeaderColumn className="standardItemsTable" dataField="HasCheckPointTypeQ" hidden={true}>CPTypeV</TableHeaderColumn>
              <TableHeaderColumn className="standardItemsTable" dataField="HasCheckPointTypeRPT" hidden={true}>CPTypeV</TableHeaderColumn>
              <TableHeaderColumn className="standardItemsTable" dataField="CreateDate" hidden={true}>CreateDate</TableHeaderColumn>
              <TableHeaderColumn className="standardItemsTable" dataField="CreateTime" hidden={true}>CreateTime</TableHeaderColumn>
              <TableHeaderColumn className="standardItemsTable" dataField="CreatedBy" hidden={true}>CreatedBy</TableHeaderColumn>
            </BootstrapTable>
          </div>
        </div>
      </Panel>
    </div>
  );
};

StandardItemsDataGrid.propTypes = {
  standardItems: PropTypes.array.isRequired,
  gridPanelOpen: PropTypes.bool,
  title: PropTypes.string,
  onRowSelect: PropTypes.func.isRequired
};

export default StandardItemsDataGrid;
