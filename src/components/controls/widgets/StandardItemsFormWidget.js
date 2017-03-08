import React, {PropTypes} from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';

const StandardItemsFormWidget = ({standardItems, onChange}) => {

  function getStandardItemsFormControlOptions() {

    let i, item;
    let items = [];
    for (i = 0; i < standardItems.length; i++) {
      for (item in standardItems[i]) {

        if(standardItems[i]['Selected']) {
          items.push(<option key={standardItems[i]['StandardItemId']}
                             value={standardItems[i]['StandardItemId']} selected="selected">{standardItems[i]['StandardItemNo']}</option>);
        } else {
          items.push(<option key={standardItems[i]['StandardItemId']}
                             value={standardItems[i]['StandardItemId']}>{standardItems[i]['StandardItemNo']}</option>);
        }
      }
    }
    return items;
  }

  return (
        <FormControl
          componentClass="select"
          placeholder="Select..."
          onChange={onChange}>
          {getStandardItemsFormControlOptions()}
        </FormControl>
  );
};

StandardItemsFormWidget.propTypes = {
  standardItems: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
};

export default StandardItemsFormWidget;
