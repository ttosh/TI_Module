import React, {PropTypes} from 'react';
import Label from 'react-bootstrap/lib/Label';
import {SimpleSelect} from "react-selectize";

import FiscalYear from '../../../../api/objects/fiscalYear';

const FiscalYearsWidget = ({fiscalYears, selectedValue, onChange, showLabel}) => {

  let label = showLabel ? <p><Label bsStyle="primary">Fiscal Years:</Label></p> : null;

  return (
    <div>
      {label}
        <SimpleSelect
          theme="bootstrap3"
          placeholder="Select..."
          value={selectedValue}
          onValueChange={onChange}
          options={FiscalYear.getFiscalYearsFormControlOptions(fiscalYears)}
          renderOption = {function(item){
            let optionStyle = {
                fontSize: 12
              };
            return <div className="simple-option" style={optionStyle}><span>{item.label}</span></div>
          }}
          defaultValue={{label: "Select...", value: 0}}>
        </SimpleSelect>
    </div>
  );
};

FiscalYearsWidget.propTypes = {
  fiscalYears: PropTypes.array.isRequired,
  selectedValue: PropTypes.number,
  showLabel: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};

export default FiscalYearsWidget;
