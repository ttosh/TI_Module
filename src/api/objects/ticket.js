import $ from 'jquery';
import React from 'react';

import Job from '../objects/job';
import CommonUtils from '../objects/commonUtils';
import FiscalYear from '../objects/fiscalYear';
import CheckPointType from '../objects/checkPointType';

let Ticket = function (params) {
  let properties = $.extend({
    id: 0,
    no: 0,
    workPara: '',
    taskItemId: 0,
    taskNo: '',
    jobId: 0,
    fiscalYearId: 0,
    standardItemId: 0,
    standardItemNo: 0,
    specItemNo: 0,
    specItemTitle: '',
    specItemWorkPara: '',
    specItemLocation: '',
    additionalCriteria: '',
    checkPointTypes: [],
    hasCheckPointTypeV: false,
    hasCheckPointTypeQ: false,
    hasCheckPointTypeI: false,
    hasCheckPointTypeG: false,
    hasCheckPointTypeRPT: false,
    criteria: '',
    testStage: '',
    shopSub: '',
    title: '',
    void: false,
    createdBy: null,
    createDate: null,
    createTime: null
  }, params);

  this.TicketId = properties.id;
  this.TicketNo = properties.no;
  this.WorkPara = properties.workPara;
  this.TaskItemId = properties.taskItemId;
  this.TaskNo = properties.taskNo;
  this.JobId = properties.jobId;
  this.FiscalYearId = properties.fiscalYearId;
  this.StandardItemId = properties.standardItemId;
  this.StandardItemNo = properties.standardItemNo;
  this.SpecItemNo = properties.specItemNo;
  this.SpecItemTitle = properties.specItemTitle;
  this.SpecItemLocation = properties.specItemLocation;
  this.SpecItemWorkPara = properties.specItemWorkPara;
  this.AdditionalCriteria = properties.additionalCriteria;
  this.CheckPointTypes = properties.checkPointTypes;
  this.HasCheckPointTypeV = this.hasCheckPointType("V");
  this.HasCheckPointTypeQ = this.hasCheckPointType("Q");
  this.HasCheckPointTypeI = this.hasCheckPointType("I");
  this.HasCheckPointTypeG = this.hasCheckPointType("G");
  this.HasCheckPointTypeRPT = this.hasCheckPointType("RPT");
  this.Criteria = properties.criteria;
  this.TestStage = properties.testStage;
  this.TicketShopSub = properties.shopSub;
  this.Title = properties.title;
  this.Void = properties.void;
  this.CreatedBy = properties.createdBy;
  this.CreateDate = properties.createDate;
  this.CreateTime = properties.createTime;
};


Ticket.prototype.getJSON = function () {
  return JSON.stringify({
    TicketId: this.id,
    TicketNo: this.no,
    WorkPara: this.workPara,
    TaskItemId: this.taskItemId,
    TaskNo: this.TaskNo,
    JobId: this.jobId,
    FiscalYearId: this.fiscalYearId,
    StandardItemId: this.standardItemId,
    StandardItemNo: this.standardItemNo,
    SpecItemNo: this.specItemNo,
    SpecItemTitle: this.specItemTitle,
    SpecItemWorkPara: this.specItemWorkPara,
    SpecItemLocation: this.specItemLocation,
    CheckPointTypes: this.CheckPointTypes,
    HasCheckPointTypeV: this.HasCheckPointTypeV,
    HasCheckPointTypeG: this.HasCheckPointTypeG,
    HasCheckPointTypeQ: this.HasCheckPointTypeQ,
    HasCheckPointTypeI: this.HasCheckPointTypeI,
    HasCheckPointTypeRPT: this.HasCheckPointTypeRPT,
    AdditionalCriteria: this.additionalCriteria,
    Criteria: this.criteria,
    TestStage: this.testStage,
    Title: this.title,
    TicketShopSub: this.shopSub,
    CreateDate: this.createDate,
    CreateTime: this.createTime,
    CreatedBy: this.createdBy
  });
};

Ticket.prototype.hasCheckPointType = function (cpType) {
  return this.CheckPointTypes.filter(cpt => cpt.Description == cpType && cpt.TicketId == this.TicketId).length > 0;
};

Ticket.prototype.save = function () {
  CommonUtils.invokeAjaxPromise(
    {
      url: CommonUtils.getServiceBaseURL() + 'Tickets.ashx',
      type: 'POST',
      dataType: "json",
      data: {
        f: 'Add',
        StdItem: this.StandardItemId,
        JobId: this.JobId,
        data: this.getJSON()
      },
      contentType: "application/json; charset=utf-8"
    }).then(
    function resolveHandler(data) {
      this.id = data.TicketId;
    },
    function rejectHandler(jqXHR, textStatus, errorThrown) {
      alert("Error thrown adding Ticket: " + textStatus + " : " + errorThrown);
    }
  ).catch(function errorHandler(error) {
    alert("Error thrown invoking promise to add Ticket: " + error);
  });
};

Ticket.prototype.update = function () {
  CommonUtils.invokeAjaxPromise(
    {
      url: CommonUtils.getServiceBaseURL() + 'Tickets.ashx',
      type: 'POST',
      dataType: "json",
      data: {
        f: 'Update',
        StdItem: this.StandardItemId,
        JobId: this.JobId,
        data: this.getJSON()
      },
      contentType: "application/json; charset=utf-8"
    }).then(
    function resolveHandler(data) {

    },
    function rejectHandler(jqXHR, textStatus, errorThrown) {
      alert("Error thrown updating Ticket: " + textStatus + " : " + errorThrown);
    }
  ).catch(function errorHandler(error) {
    alert("Error thrown invoking promise to update Ticket: " + error);
  });
};

Ticket.prototype.void = function () {
  CommonUtils.invokeAjaxPromise(
    {
      url: CommonUtils.getServiceBaseURL() + 'Tickets.ashx',
      type: 'POST',
      dataType: "json",
      data: {
        f: 'VoidTicket',
        TicketId: this.TicketId
      },
      contentType: "application/json; charset=utf-8"
    }).then(
    function resolveHandler(data) {
      alert("Succesfully voided the ticket");
    },
    function rejectHandler(jqXHR, textStatus, errorThrown) {
      alert("Error thrown voiding Ticket: " + textStatus + " : " + errorThrown);
    }
  ).catch(function errorHandler(error) {
    alert("Error thrown invoking promise to void Ticket: " + error);
  });
};

Ticket.prototype.unVoid = function () {
  CommonUtils.invokeAjaxPromise(
    {
      url: CommonUtils.getServiceBaseURL() + 'Tickets.ashx',
      type: 'POST',
      dataType: "json",
      data: {
        f: 'UnVoidTicket',
        TicketId: this.TicketId
      },
      contentType: "application/json; charset=utf-8"
    }).then(
    function resolveHandler(data) {
      alert("Succesfully voided the ticket");
    },
    function rejectHandler(jqXHR, textStatus, errorThrown) {
      alert("Error thrown voiding Ticket: " + textStatus + " : " + errorThrown);
    }
  ).catch(function errorHandler(error) {
    alert("Error thrown invoking promise to void Ticket: " + error);
  });
};

Ticket.prototype.copy = function () {
  CommonUtils.invokeAjaxPromise(
    {
      url: CommonUtils.getServiceBaseURL() + 'Tickets.ashx',
      type: 'POST',
      dataType: "json",
      data: {
        f: 'Copy',
        TicketId: this.TicketId
      },
      contentType: "application/json; charset=utf-8"
    }).then(
    function resolveHandler(data) {
      alert("Succesfully copied the ticket");
    },
    function rejectHandler(jqXHR, textStatus, errorThrown) {
      alert("Error thrown copying Ticket: " + textStatus + " : " + errorThrown);
    }
  ).catch(function errorHandler(error) {
    alert("Error thrown invoking promise to copy Ticket: " + error);
  });
};

Ticket.prototype.addCheckPoint = function(id) {
  switch(id) {
    case 2:
      this.CheckPointTypes.push(new CheckPointType({
        id: 2,
        description: 'I',
        isSelected: false
      }));
      break;

    case 3:
      this.CheckPointTypes.push(new CheckPointType({
        id: 3,
        description: 'V',
        isSelected: false
      }));
      break;

    case 4:
      this.CheckPointTypes.push(new CheckPointType({
        id: 4,
        description: 'G',
        isSelected: false
      }));
      break;

    case 5:
      this.CheckPointTypes.push(new CheckPointType({
        id: 5,
        description: 'Q',
        isSelected: false
      }));
      break;

    case 6:
      this.CheckPointTypes.push(new CheckPointType({
        id: 6,
        description: 'RPT',
        isSelected: false
      }));
      break;

    default:
      console.log("Could not match id to any checkpoints.");
      break;
  }
};

Ticket.prototype.removeCheckPoint = function(id) {
  let i = this.CheckPointTypes.length;
  while(i--){
    if(this.CheckPointTypes[i]["CheckPointTypeId"] === id){
      this.CheckPointTypes.splice(i,1);
    }
  }
};

Ticket.loadTickets = function(jobId) {
  let cacheJobId = jobId;
  if(jobId === undefined || jobId === 0) {
    cacheJobId = Job.getLocalStorageIdentifier();
  }
  return new Promise((resolve, reject) => {
    let ticketCheckPoints = [];
    $.ajax({
      type: 'GET',
      url: CommonUtils.getServiceBaseURL() + 'CheckPointTypes.ashx',
      data: {
        f: 'Ticket',
        FiscalYearId: cacheJobId
      },
      success: function (result) {
        ticketCheckPoints = result;
        $.ajax({
          type: 'GET',
          url: CommonUtils.getServiceBaseURL() + 'Tickets.ashx',
          data: {
            f: 'Job',
            JobId: cacheJobId
          },
          success: function (result) {
            for (let i = 0; i < result.length; i++) {
              result[i].CheckPointTypes = ticketCheckPoints.filter(cp => cp.TicketId === result[i].TicketId)
            }
            resolve(Object.assign([], result));
          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            reject(errorThrown);
          }
        });
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        reject(errorThrown);
      }
    });

  });
};


Ticket.createUpdateCheckPoints = function() {

  let checkPointTypes = new CheckPointType(this.StandardItemId,
    CheckPointType.EntityType.TICKET,
    this.HasCheckPointTypeV,
    this.HasCheckPointTypeG,
    this.HasCheckPointTypeI,
    this.HasCheckPointTypeQ,
    this.HasCheckPointTypeRPT);

  CommonUtils.invokeAjaxPromise(
    {
      url: CommonUtils.getServiceBaseURL() + 'StandardItems.ashx',
      type: 'POST',
      dataType: "json",
      data: {
        f: 'AddUpdateCheckPoints',
        data: checkPointTypes.getJSON()
      },
      contentType: "application/json; charset=utf-8"
    }).then(
    function resolveHandler(data) {

    },
    function rejectHandler(jqXHR, textStatus, errorThrown) {
      alert("Error thrown during add/update Ticket CheckPoints: " + textStatus + " : " + errorThrown);
    }
  ).catch(function errorHandler(error) {
    alert("Error thrown invoking promise to add/update Ticket CheckPoints: " + error);
  });
};

Ticket.getTaskNoFormControlOptions = function (tickets) {
  let returnTaskNos = [];
  tickets.forEach(function (ticket) {
    if(ticket.TaskNo !== null) {
      if (!returnTaskNos.includes({label: ticket.TaskNo, value: ticket.TaskNo})) {
        returnTaskNos.push({label: ticket.TaskNo, value: ticket.TaskNo});
      }
    }
  });
  return returnTaskNos;
};

Ticket.setEditMode = function (inEditMode) {
  localStorage.setItem('selTicketEditMode', inEditMode);
};

Ticket.getEditMode = function () {
  let editMode = localStorage.getItem('selTicketEditMode');
  return editMode === "true";
};

Ticket.setLocalStorageIdentifier = function (TicketId, props) {
  localStorage.setItem('selTicketIdentifier', TicketId);
};

Ticket.getLocalStorageIdentifier = function () {
  let TicketIdentifier = 0;
  try {
    TicketIdentifier = localStorage.getItem('selTicketIdentifier');
  } catch(err) {
    return 0;
  }
  if(TicketIdentifier === undefined || TicketIdentifier === null || isNaN(TicketIdentifier)) {
    return 0;
  }
  return parseInt(TicketIdentifier);
};


Ticket.prototype.setLocalStorage = function () {
  localStorage.setItem('selTicket', this.getJSON());
};

Ticket.getLocalStorage = function () {

  try {
    let ticket = localStorage.getItem('selTicket');
    if(ticket === null) { return new Ticket(); }
    ticket = JSON.parse(ticket);
    ticket =  new Ticket(
      {
        id: ticket.TicketId,
        no: ticket.TicketNo,
        jobId: ticket.JobId,
        fiscalYearId: ticket.FiscalYearId,
        taskItemId: ticket.TaskItemId,
        taskNo: ticket.TaskNo,
        standardItemId: ticket.StandardItemId,
        standardItemNo: ticket.StandardItemNo,
        testStage: ticket.TestStage,
        workPara: ticket.WorkPara,
        specItemNo: ticket.SpecItemNo,
        specItemTitle: ticket.SpecItemTitle,
        specItemWorkPara: ticket.SpecItemWorkPara,
        specItemLocation: ticket.SpecItemLocation,
        criteria: ticket.Criteria,
        additionalCriteria: ticket.AdditionalCriteria,
        checkPointTypes: ticket.CheckPointTypes,
        hasCheckPointTypeV: ticket.HasCheckPointTypeV,
        hasCheckPointTypeQ: ticket.HasCheckPointTypeQ,
        hasCheckPointTypeI: ticket.HasCheckPointTypeI,
        hasCheckPointTypeG: ticket.HasCheckPointTypeG,
        hasCheckPointTypeRPT: ticket.HasCheckPointTypeRPT,
        void: ticket.Void,
        shopSub: ticket.TicketShopSub,
        title: ticket.title,
        createdBy: ticket.CreatedBy,
        createDate: ticket.CreateDate,
        createTime: ticket.CreateTime
      }
    );
    return ticket;
  } catch(err) {
    return new Ticket();
  }
};

Ticket.nullifyLocalStorageTicket = function() {
  localStorage.setItem('selTicket', new Ticket().getJSON());
};

export default Ticket;

