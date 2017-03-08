import $ from 'jquery';
import CommonUtils from '../objects/commonUtils';

let CheckPointResult = function (params) {
  let properties = $.extend({
    id: 0,
    checkPointId: 0,
    ticketId: 0,
    checkPointResultTicketNo: 0,
    calDueDate: null,
    checkPointDate: null,
    checkPointTime: null,
    concur: false,
    custSigningRep: '',
    equipmentSN: '',
    govtRepNotified: '',
    isPartial: false,
    isFinal: false,
    remarks: '',
    satUnsat: '',
    testEquipment: false,
    createdBy: null,
    createDate: null,
    createTime: null
  }, params);

  this.CheckPointResultId = properties.id;
  this.CheckPointId = properties.CheckPointId;
  this.TicketId = properties.TicketId;
  this.CheckPointResultTicketNo = properties.checkPointResultTicketNo;
  this.CalDueDate = properties.calDueDate;
  this.CheckPointDate = properties.checkPointDate;
  this.CheckPointTime = properties.checkPointTime;
  this.Concur = properties.concur;
  this.CustSigningRep = properties.custSigningRep;
  this.EquipmentSN = properties.equipmentSN;
  this.GovtRepNotified = properties.govtRepNotified;
  this.IsPartial = properties.isPartial;
  this.IsFinal = properties.isFinal;
  this.Remarks = properties.remarks;
  this.SatUnsat = properties.satUnsat;
  this.TestEquipment = properties.testEquipment;

  this.CreatedBy = properties.createdBy;
  this.CreateDate = properties.createDate;
  this.CreateTime = properties.createTime;
};


CheckPointResult.prototype.getJSON = function () {
  return JSON.stringify({
    CheckPointResultId: this.CheckPointResultId,
    CheckPointId: this.CheckPointId,
    TicketId: this.TicketId,
    CheckPointResultTicketNo: this.CheckPointResultTicketNo,
    CalDueDate: this.CalDueDate,
    CheckPointDate: this.CheckPointDate,
    CheckPointTime: this.CheckPointTime,
    Concur: this.Concur,
    CustSigningRep: this.CustSigningRep,
    EquipmentSN: this.EquipmentSN,
    GovtRepNotified: this.GovtRepNotified,
    IsPartial: this.IsPartial,
    IsFinal: this.IsFinal,
    Remarks: this.Remarks,
    SatUnsat: this.SatUnsat,
    TestEquipment: this.TestEquipment,
    CreateDate: this.CreateDate,
    CreateTime: this.CreateTime,
    CreatedBy: this.CreatedBy
  });
};

CheckPointResult.prototype.save = function () {
  CommonUtils.invokeAjaxPromise(
    {
      url: CommonUtils.getServiceBaseURL() + 'CheckPointResults.ashx',
      type: 'POST',
      dataType: "json",
      data: {
        f: 'Add',
        data: this.getJSON()
      },
      contentType: "application/json; charset=utf-8"
    }).then(
    function resolveHandler(data) {
      this.id = data.CheckPointResultId;
      // do any other work needed here
    },
    function rejectHandler(jqXHR, textStatus, errorThrown) {
      alert("Error thrown save CheckPoint Result: " + textStatus + " : " + errorThrown);
    }
  ).catch(function errorHandler(error) {
    alert("Error thrown invoking promise to save CheckPoint Result: " + error);
  });
};

CheckPointResult.prototype.update = function () {
  CommonUtils.invokeAjaxPromise(
    {
      url: CommonUtils.getServiceBaseURL() + 'CheckPointResults.ashx',
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
      alert("Error thrown updating CheckPoint Result: " + textStatus + " : " + errorThrown);
    }
  ).catch(function errorHandler(error) {
    alert("Error thrown invoking promise to update CheckPoint Result: " + error);
  });
};

CheckPointResult.loadCheckPointResults = function (ticketId) {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: CommonUtils.getServiceBaseURL() + 'CheckPointResults.ashx',
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

CheckPointResult.setEditMode = function (inEditMode) {
  localStorage.setItem('selCheckPointResultEditMode', inEditMode);
};

CheckPointResult.getEditMode = function () {
  let editMode = localStorage.getItem('selCheckPointResultEditMode');
  return editMode === "true";
};

CheckPointResult.setLocalStorageIdentifier = function (checkPointResultId, props) {
  localStorage.setItem('selCheckPointResultIdentifier', checkPointResultId);
};

CheckPointResult.getLocalStorageIdentifier = function () {
  let checkPointResultIdentifier = 0;
  try {
    checkPointResultIdentifier = localStorage.getItem('selCheckPointResultIdentifier');
  } catch(err) {
    return 0;
  }
  if(checkPointResultIdentifier === undefined || checkPointResultIdentifier === null || isNaN(checkPointResultIdentifier)) {
    return 0;
  }
  return parseInt(checkPointResultIdentifier);
};


CheckPointResult.prototype.setLocalStorage = function () {
  localStorage.setItem('selCheckPointResult', this.getJSON());
};

CheckPointResult.getLocalStorage = function () {

  try {
    let checkPointResult = localStorage.getItem('selCheckPointResult');
    if(checkPointResult === null) { return new CheckPointResult(); }
    checkPointResult = JSON.parse(checkPointResult);
    checkPointResult =  new CheckPointResult(
      {
        CheckPointResultId: checkPointResult.CheckPointResultId,
        CheckPointId: checkPointResult.CheckPointId,
        CheckPointPartialTicketNo: checkPointResult.CheckPointResultTicketNo,
        CalDueDate: checkPointResult.CalDueDate,
        CheckPointDate: checkPointResult.CheckPointDate,
        CheckPointTime: checkPointResult.CheckPointTime,
        Concur: checkPointResult.Concur,
        CustSigningRep: checkPointResult.CustSigningRep,
        EquipmentSN: checkPointResult.EquipmentSN,
        GovtRepNotified: checkPointResult.GovtRepNotified,
        IsPartial: checkPointResult.IsPartial,
        IsFinal: checkPointResult.IsFinal,
        Remarks: checkPointResult.Remarks,
        SatUnsat: checkPointResult.SatUnsat,
        TestEquipment: checkPointResult.TestEquipment,
        CreateDate: checkPointResult.CreateDate,
        CreateTime: checkPointResult.CreateTime,
        CreatedBy: checkPointResult.CreatedBy
      }
    );
    return checkPointResult;
  } catch(err) {
    return new CheckPointResult();
  }
};

CheckPointResult.nullifyLocalStorageCheckPointResult = function() {
  localStorage.setItem('selCheckPointResult', new CheckPointResult().getJSON());
};

export default CheckPointResult;
