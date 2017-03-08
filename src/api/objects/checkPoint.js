import $ from 'jquery';
import React from 'react';
import CacheUtil from '../objects/cacheUtil';
import CommonUtils from '../objects/commonUtils';

let CheckPoint = function (params) {
  let properties = $.extend({
    id: 0,
    ticketId: 0,
    checkPointTicketNo: 0,
    originator: '',
    notifyDate: null,
    notifyTime: null,
    notifyBy: '',
    customerNotified: '',
    meetLocation: '',
    void: false,
    schedDate: null,
    schedTime: null,
    createdBy: null,
    createDate: null,
    createTime: null
  }, params);

  this.CheckPointId = properties.id;
  this.TicketId = properties.TicketId;
  this.CheckPointTicketNo = properties.checkPointTicketNo;
  this.Originator = properties.originator;
  this.NotifyDate = properties.notifyDate;
  this.NotifyTime = properties.notifyTime;
  this.NotifyBy = properties.notifyBy;
  this.CustomerNotified = properties.customerNotified;
  this.MeetLocation = properties.meetLocation;
  this.Void = properties.void;
  this.SchedDate = properties.schedDate;
  this.SchedTime = properties.schedTime;
  this.CreatedBy = properties.createdBy;
  this.CreateDate = properties.createDate;
  this.CreateTime = properties.createTime;
};


CheckPoint.prototype.getJSON = function () {
  return JSON.stringify({
    CheckPointId: this.CheckPointId,
    TicketId: this.TicketId,
    CheckPointTicketNo: this.CheckPointTicketNo,
    Originator: this.Originator,
    NotifyDate: this.NotifyDate,
    NotifyTime: this.NotifyTime,
    NotifyBy: this.NotifyBy,
    Void: this.Void,
    CustomerNotified: this.CustomerNotified,
    MeetLocation: this.MeetLocation,
    SchedDate: this.SchedDate,
    SchedTime: this.SchedTime,
    CreateDate: this.CreateDate,
    CreateTime: this.CreateTime,
    CreatedBy: this.CreatedBy
  });
};

CheckPoint.prototype.save = function () {
  CommonUtils.invokeAjaxPromise(
    {
      url: CommonUtils.getServiceBaseURL() + 'CheckPoints.ashx',
      type: 'POST',
      dataType: "json",
      data: {
        f: 'Add',
        data: this.getJSON()
      },
      contentType: "application/json; charset=utf-8"
    }).then(
    function resolveHandler(data) {
      this.id = data.CheckPointId;
      // do any other work needed here
    },
    function rejectHandler(jqXHR, textStatus, errorThrown) {
      alert("Error thrown save CheckPoint: " + textStatus + " : " + errorThrown);
    }
  ).catch(function errorHandler(error) {
    alert("Error thrown invoking promise to save CheckPoint: " + error);
  });
};

CheckPoint.prototype.update = function () {
  CommonUtils.invokeAjaxPromise(
    {
      url: CommonUtils.getServiceBaseURL() + 'CheckPoints.ashx',
      type: 'POST',
      dataType: "json",
      data: {
        f: 'Update',
        data: this.getJSON()
      },
      contentType: "application/json; charset=utf-8"
    }).then(
    function resolveHandler(data) {
      // do any other work needed here
    },
    function rejectHandler(jqXHR, textStatus, errorThrown) {
      alert("Error thrown updating CheckPoint: " + textStatus + " : " + errorThrown);
    }
  ).catch(function errorHandler(error) {
    alert("Error thrown invoking promise to update CheckPoint: " + error);
  });
};

CheckPoint.prototype.copy = function () {
  CommonUtils.invokeAjaxPromise(
    {
      url: CommonUtils.getServiceBaseURL() + 'CheckPoints.ashx',
      type: 'POST',
      dataType: "json",
      data: {
        f: 'Copy',
        data: this.CheckPointId
      },
      contentType: "application/json; charset=utf-8"
    }).then(
    function resolveHandler(data) {
      // do any other work needed here
    },
    function rejectHandler(jqXHR, textStatus, errorThrown) {
      alert("Error thrown copying CheckPoint: " + textStatus + " : " + errorThrown);
    }
  ).catch(function errorHandler(error) {
    alert("Error thrown invoking promise to copy the CheckPoint: " + error);
  });
};

CheckPoint.prototype.copy = function () {

  let checkPoint = new CheckPoint(0, this.CheckPointId, this.Originator, this.NotifyDate,
    this.NotifyTime, this.NotifyBy, this.CustomerNotified, this.MeetLocation, this.SchedDate, this.SchedTime);

  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      url: CommonUtils.getServiceBaseURL() + 'CheckPoints.ashx',
      data: {
        f: 'CopyCheckPointToCheckPoint',
        data: checkPoint.getJSON()
      },
      success: function (result) {
        resolve(result);
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        reject(errorThrown);
      }
    });
  });
};


CheckPoint.loadCheckPoints = function (ticketId) {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: CommonUtils.getServiceBaseURL() + 'CheckPoints.ashx',
      data: {
        f: 'All',
        ticketId: ticketId
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


CheckPoint.setEditMode = function (inEditMode) {
  localStorage.setItem('selCheckPointEditMode', inEditMode);
};

CheckPoint.getEditMode = function () {
  let editMode = localStorage.getItem('selCheckPointEditMode');
  return editMode === "true";
};

CheckPoint.setLocalStorageIdentifier = function (CheckPointId, props) {
  localStorage.setItem('selCheckPointIdentifier', CheckPointId);
};

CheckPoint.getLocalStorageIdentifier = function () {
  let CheckPointIdentifier = 0;
  try {
    CheckPointIdentifier = localStorage.getItem('selCheckPointIdentifier');
  } catch (err) {
    return 0;
  }
  if (CheckPointIdentifier === undefined || CheckPointIdentifier === null || isNaN(CheckPointIdentifier)) {
    return 0;
  }
  return parseInt(CheckPointIdentifier);
};


CheckPoint.prototype.setLocalStorage = function () {
  localStorage.setItem('selCheckPoint', this.getJSON());
};

CheckPoint.getLocalStorage = function () {

  try {
    let checkPoint = localStorage.getItem('selCheckPoint');
    if (checkPoint === null) {
      return new CheckPoint();
    }
    checkPoint = JSON.parse(checkPoint);
    checkPoint = new CheckPoint(
      {
        CheckPointId: checkPoint.CheckPointId,
        TicketId: checkPoint.TicketId,
        CheckPointTicketNo: checkPoint.CheckPointTicketNo,
        Originator: checkPoint.Originator,
        NotifyDate: checkPoint.NotifyDate,
        NotifyTime: checkPoint.NotifyTime,
        NotifyBy: checkPoint.NotifyBy,
        Void: checkPoint.Void,
        CustomerNotified: checkPoint.CustomerNotified,
        MeetLocation: checkPoint.MeetLocation,
        SchedDate: checkPoint.SchedDate,
        SchedTime: checkPoint.SchedTime,
        CreateDate: checkPoint.CreateDate,
        CreateTime: checkPoint.CreateTime,
        CreatedBy: checkPoint.CreatedBy
      }
    );
    return checkPoint;
  } catch (err) {
    return new CheckPoint();
  }
};

CheckPoint.nullifyLocalStorageCheckPoint = function () {
  localStorage.setItem('selCheckPoint', new CheckPoint().getJSON());
};

export default CheckPoint;
