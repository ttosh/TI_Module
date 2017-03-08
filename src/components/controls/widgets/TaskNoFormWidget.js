import React, {PropTypes} from 'react';
import Label from 'react-bootstrap/lib/Label';
import {SimpleSelect} from "react-selectize";

import Ticket from '../../../api/objects/ticket';

const TaskNoFormWidget = ({tickets, selectedValue, onChange, showLabel}) => {

  let label = showLabel ? <p><Label bsStyle="primary">Tasks:</Label></p> : null;

  return (
    <div id="TaskNoFormWidget">
      {label}
      <SimpleSelect
        theme="bootstrap3"
        placeholder="Select..."
        value={selectedValue}
        onValueChange={onChange}
        options={Ticket.getTaskNoFormControlOptions(tickets)}
        renderOption = {function(item){
          let optionStyle = {
            fontSize: 12,
            maxWidth: 140
          };
          return <div className="simple-option" style={optionStyle}><span>{item.label}</span></div>
        }}
        defaultValue={{label: "Select...", value: 0}}>
      </SimpleSelect>
    </div>
  );
};

TaskNoFormWidget.propTypes = {
  tickets: PropTypes.array.isRequired,
  selectedValue: PropTypes.number,
  showLabel: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};

export default TaskNoFormWidget;
