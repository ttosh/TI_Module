import React, {PropTypes} from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';

const ShopSubsFormControl = ({shopSubs, onChange}) => {

  function getShopSubsFormControlOptions() {

    let i, item;
    let items = [];
    for (i = 0; i < shopSubs.length; i++) {
      for (item in shopSubs[i]) {

        if(shopSubs[i]['Selected']) {
          items.push(<option key={shopSubs[i]['Description']}
                             value={shopSubs[i]['Description']} selected="selected">{shopSubs[i]['Description']}</option>);
        } else {
          items.push(<option key={shopSubs[i]['Description']}
                             value={shopSubs[i]['Description']}>{shopSubs[i]['Description']}</option>);
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
      {getShopSubsFormControlOptions()}
    </FormControl>
  );
};

ShopSubsFormControl.propTypes = {
  shopSubs: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
};

export default ShopSubsFormControl;
