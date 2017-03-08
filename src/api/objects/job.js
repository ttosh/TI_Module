import $ from 'jquery'
import React from 'react';
import FiscalYear from '../objects/fiscalYear';
import CommonUtils from '../objects/commonUtils';

let Job = function (params) {
  let properties = $.extend({
    id: 0,
    number: 0,
    vessel: '',
    fiscalYearId: 0,
    isActive: false,
    isSelected: false
  }, params);

  this.JobId = properties.id;
  this.JobNumber = properties.number;
  this.VesselName = properties.vessel;
  this.FiscalYearId = properties.fiscalYearId;
  this.IsActive = properties.isActive;
  this.Selected = properties.selected;
};

Job.prototype.getJSON = function () {
  return JSON.stringify({
    JobId: this.JobId,
    JobNumber: this.JobNumber,
    VesselName: this.VesselName,
    FiscalYearId: this.FiscalYearId,
    IsActive: this.IsActive,
    Selected: this.Selected
  });
};

Job.prototype.setLocalStorageJob = function () {
  localStorage.setItem('selJob', this.getJSON());
};

Job.setLocalStorageIdentifier = function (jobId) {
  localStorage.setItem('selJobIdentifier', jobId);
};

Job.getLocalStorageIdentifier = function () {
  let jobIdentifier = 0;
  try {
    jobIdentifier = localStorage.getItem('selJobIdentifier');
  } catch (err) {
    return 0;
  }
  if (jobIdentifier === undefined || jobIdentifier === null || isNaN(jobIdentifier)) {
    return 0;
  }
  return parseInt(jobIdentifier);
};

Job.nullifyLocalStorageJob = function () {
  localStorage.setItem('selJob', new Job().getJSON());
};

Job.getJobDataForFiscalYear = function(fiscalYearId) {
  let cacheFiscalYearId = fiscalYearId;
  if(fiscalYearId === undefined || fiscalYearId === 0) {
    cacheFiscalYearId = FiscalYear.getLocalStorageIdentifier();
  }
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: CommonUtils.getServiceBaseURL() + 'Jobs.ashx',
      data: {
        f: 'All',
        fy: cacheFiscalYearId
      },
      success: function (result) {
        resolve(Object.assign([], result));
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        reject(errorThrown);
      }
    });
  });
};

Job.getLocalStorageJob = function () {
  try {
    let job = JSON.parse(localStorage.getItem('selJob'));
    return new Job(
      {
        id: job.JobId,
        number: job.JobNumber,
        vessel: job.VesselName,
        fiscalYearId: job.FiscalYearId,
        isActive: job.IsActive,
        isSelected: job.Selected
      }
    );
  } catch (err) {
    return new Job();
  }
};

Job.getJobFormControlGroups = function() {
  return [{
    groupId: "active",
    title: "Active"
  }, {
    groupId: "inactive",
    title: "Inactive"
  }];
}

Job.getJobFormControlOptions = function (jobs) {
  return jobs.map(function(job) {
    return {groupId: job.IsActive ? 'active' : 'inactive', label: String(job.JobId), value: String(job.JobId) }
  });
};

export default Job;

