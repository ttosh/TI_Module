import $ from 'jquery'
import CommonUtils from '../objects/commonUtils';

const checkpointTypes = [{
  "cpId": 1,
  "Text": "N/A"
}, {
  "cpId": 2,
  "Text": "I"
}, {
  "cpId": 3,
  "Text": "V"
}, {
  "cpId": 4,
  "Text": "G"
}, {
  "cpId": 5,
  "Text": "Q"
}, {
  "cpId": 6,
  "Text": "RPT"
}];

let CheckPointType = function(params) {
  let properties = $.extend({
    id: 0,
    description: '',
    isSelected: false
  }, params);

  this.CheckPointTypeId = properties.id;
  this.Description = properties.description;
  this.Selected = properties.selected;
};

CheckPointType.EntityType =  {
  TICKET: 1,
  STDITEM: 2
};

CheckPointType.prototype.getJSON = function () {
  return JSON.stringify({
    CheckPointTypeId: this.CheckPointTypeId,
    Description: this.Description,
    Selected: this.Selected
  });
};

CheckPointType.getAllStandardItemCheckPointTypes = function() {

  let i, item;
  let checkPointTypes = [];

  return new Promise((resolve, reject) => {
    resolve(Object.assign([], checkPointTypes));
  });
};

CheckPointType.getAllTicketCheckPointTypes = function() {

  let i, item;
  let checkPointTypes = [];

  return new Promise((resolve, reject) => {
    resolve(Object.assign([], checkPointTypes));
  });
};

export default CheckPointType;

