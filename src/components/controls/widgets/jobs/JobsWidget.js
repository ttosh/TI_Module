import React, {PropTypes} from 'react';
import Label from 'react-bootstrap/lib/Label';
import {SimpleSelect} from "react-selectize";

import Job from '../../../../api/objects/job';

const JobsWidget = ({jobs, selectedValue, onChange}) => {
  return (
    <div>
      <p><Label bsStyle="primary">Jobs:</Label></p>
      <SimpleSelect
        theme="bootstrap3"
        placeholder="Select..."
        value={selectedValue}
        onValueChange={onChange}
        groups={Job.getJobFormControlGroups()}
        options={Job.getJobFormControlOptions(jobs)}
        renderOption = {function(item){
          let optionStyle =  {
              fontSize: 12
            };
          return <div className="simple-option" style={optionStyle}><span>{item.label}</span></div>;
        }}
        defaultValue={{groupId: "active", label: "Select...", value: 0}}>
      </SimpleSelect>
    </div>
  );
};

JobsWidget.propTypes = {
  jobs: PropTypes.array.isRequired,
  selectedValue: PropTypes.number,
  onChange: PropTypes.func.isRequired
};

export default JobsWidget;
