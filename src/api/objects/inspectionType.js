import $ from 'jquery'
import React from 'react';
import CommonUtils from '../../api/objects/commonUtils';

let InspectionType = function(params) {
  let properties = $.extend({
    id: 0,
    description: 'Select from below',
    isSelected: false
  }, params);

  this.InspectionTypeId = properties.id;
  this.Description = properties.description;
  this.Selected = properties.selected;
};

InspectionType.prototype.getJSON = function () {
  return JSON.stringify({
    InspectionTypeId: this.InspectionTypeId,
    Description: this.Description,
    Selected: this.Selected
  });
};

InspectionType.getAllInspectionTypes = function (jobId) {
  CommonUtils.invokeAjaxPromise(
    {
      url: CommonUtils.getServiceBaseURL() + 'InspectionTypes.ashx',
      type: 'POST',
      dataType: "json",
      data: {
        f: 'All'
      },
      contentType: "application/json; charset=utf-8"
    }).then(
    function resolveHandler(data) {

    },
    function rejectHandler(jqXHR, textStatus, errorThrown) {
      alert("Error thrown retrieving files for job: " + textStatus + " : " + errorThrown);
    }
  ).catch(function errorHandler(error) {
    alert("Error thrown invoking promise to retrieve files for job: " + error);
  });
};

InspectionType.getInspectionTypesFormControlOptions = function (inspectionTypes) {
  return inspectionTypes.map(function(inspType) {
    return {label: inspType.Description, value: String(inspType.InspectionTypeId) }
  });
};

export default InspectionType;
