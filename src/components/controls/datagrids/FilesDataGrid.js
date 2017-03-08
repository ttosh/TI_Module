import React, {PropTypes} from 'react';

import Panel from 'react-bootstrap/lib/Panel';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

const FilesDataGrid = ({tickets, jobs, fiscalYears, files, gridPanelOpen, onRowSelect, title}) => {
  return (
    <div>
      <Panel
        className="ti-panel"
        header={title}
        collapsible
        expanded={gridPanelOpen} >

        <div id="fi-table-outerdiv" className="ti-outer-div">
          <div id="fi-table-innerdiv" className="ti-inner-div">
            <BootstrapTable
              data={files}
              striped={true}
              hover={true}
              condensed={true}
              maxHeight={205}
              options={
                {
                  noDataText: "No File Data found..."
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
              trClassName={"filesTableRow"}>
              <TableHeaderColumn className="filesTable" dataField="WorkPara" dataSort={true}>Para</TableHeaderColumn>
            </BootstrapTable>
          </div>
        </div>
      </Panel>
    </div>
  );
};


export default FilesDataGrid;
