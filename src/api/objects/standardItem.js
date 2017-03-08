import $ from 'jquery'
import delay from '../delay';
import FiscalYear from '../objects/fiscalYear';
import CheckPointType from '../objects/checkPointType';
import CommonUtils from '../../api/objects/commonUtils';

let StandardItem = function (params) {
  let properties = $.extend({
    id: 0,
    no: '',
    fiscalYearId: 0,
    workPara: '',
    criteria: '',
    inspectionTypeItem: '',
    checkPointTypes: [],
    hasCheckPointTypeV: false,
    hasCheckPointTypeQ: false,
    hasCheckPointTypeI: false,
    hasCheckPointTypeG: false,
    hasCheckPointTypeRPT: false,
    void: false,
    createdBy: null,
    createDate: null,
    createTime: null
  }, params);

  this.StandardItemId = properties.id;
  this.StandardItemNo = properties.no;
  this.FiscalYearId = properties.fiscalYearId;
  this.WorkPara = properties.workPara;
  this.Criteria = properties.criteria;
  this.InspectionTypeItem = properties.inspectionTypeItem;
  this.CheckPointTypes = properties.checkPointTypes;
  this.HasCheckPointTypeV = this.hasCheckPointType("V");
  this.HasCheckPointTypeQ = this.hasCheckPointType("Q");
  this.HasCheckPointTypeI = this.hasCheckPointType("I");
  this.HasCheckPointTypeG = this.hasCheckPointType("G");
  this.HasCheckPointTypeRPT = this.hasCheckPointType("RPT");
  this.Void = properties.void;
  this.CreatedBy = properties.createdBy;
  this.CreateDate = properties.createDate;
  this.CreateTime = properties.createTime;
};


StandardItem.prototype.getJSON = function () {
  return JSON.stringify({
    StandardItemId: this.StandardItemId,
    StandardItemNo: this.StandardItemNo,
    FiscalYearId: this.FiscalYearId,
    WorkPara: this.WorkPara,
    Criteria: this.Criteria,
    InspectionTypeItem: this.InspectionTypeItem,
    CheckPointTypes: this.CheckPointTypes,
    HasCheckPointTypeV: this.HasCheckPointTypeV,
    HasCheckPointTypeG: this.HasCheckPointTypeG,
    HasCheckPointTypeQ: this.HasCheckPointTypeQ,
    HasCheckPointTypeI: this.HasCheckPointTypeI,
    HasCheckPointTypeRPT: this.HasCheckPointTypeRPT,
    Void: this.Void,
    CreateDate: this.CreateDate,
    CreateTime: this.CreateTime,
    CreatedBy: this.CreatedBy
  });
};

StandardItem.prototype.hasCheckPointType = function (cpType) {
  return this.CheckPointTypes.filter(cpt => cpt.Description == cpType && cpt.StandardItemId == this.StandardItemId).length > 0;
};

StandardItem.prototype.addCheckPoint = function(id) {
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

StandardItem.prototype.removeCheckPoint = function(id) {
  let i = this.CheckPointTypes.length;
  while(i--){
    if(this.CheckPointTypes[i]["CheckPointTypeId"] === id){
      this.CheckPointTypes.splice(i,1);
    }
  }
};

StandardItem.save = function (standardItem) {
  standardItem = Object.assign({}, standardItem);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        CommonUtils.invokeAjaxPromise(
          {
            url: CommonUtils.getServiceBaseURL() + 'StandardItems.ashx',
            type: 'POST',
            dataType: "json",
            data: {
              f: standardItem.StandardItemId === 0 ? 'Add' : 'Update',
              data: standardItem.getJSON()
            },
            contentType: "application/json; charset=utf-8"
          }).then(
          function resolveHandler(data) {
            resolve(standardItem);
            //alert("Standard Item Created Successfully!: " + data);
          },
          function rejectHandler(jqXHR, textStatus, errorThrown) {
            reject("Error in standard item creation: " + errorThrown);
            //alert("Error thrown creating Standard Item: " + textStatus + " : " + errorThrown);
          }
        ).catch(function errorHandler(error) {
          reject("Error thrown invoking standard item save promise: " + error);
          //alert("Error thrown invoking promise to save Standard Item: " + error);
        });
      } catch(err) {
        reject("Error thrown invoking standard item save promise: " + err);
      }
    }, delay);
  });
};

StandardItem.loadStandardItems = function(fiscalYearId) {
  let cacheFiscalYearId = fiscalYearId;
  if(fiscalYearId === undefined || fiscalYearId === 0) {
    cacheFiscalYearId = FiscalYear.getLocalStorageIdentifier();
  }
  return new Promise((resolve, reject) => {
    let standardItemCheckPoints = [];
    $.ajax({
      type: 'GET',
      url: CommonUtils.getServiceBaseURL() + 'CheckPointTypes.ashx',
      data: {
        f: 'StandardItem',
        FiscalYearId: cacheFiscalYearId
      },
      success: function (result) {
        standardItemCheckPoints = result;
        $.ajax({
          type: 'GET',
          url: CommonUtils.getServiceBaseURL() + 'StandardItems.ashx',
          data: {
            f: 'All',
            fy: cacheFiscalYearId
          },
          success: function (result) {
            for (let i = 0; i < result.length; i++) {
              result[i].CheckPointTypes = standardItemCheckPoints.filter(cp => cp.StandardItemId === result[i].StandardItemId)
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

StandardItem.createUpdateCheckPoints = function (standardItemId) {

  let checkPointTypes = new CheckPointType(standardItemId,
    CheckPointType.EntityType.STDITEM,
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
      alert("Error thrown during add/update Standard Item CheckPoints: " + textStatus + " : " + errorThrown);
    }
  ).catch(function errorHandler(error) {
    alert("Error thrown invoking promise to add/update Standard Item CheckPoints: " + error);
  });
};

StandardItem.setEditMode = function (inEditMode) {
  localStorage.setItem('selStandardItemEditMode', inEditMode);
};

StandardItem.getEditMode = function () {
  let editMode = localStorage.getItem('selStandardItemEditMode');
  return editMode === "true";
};

StandardItem.setLocalStorageIdentifier = function (standardItemId, props) {
  localStorage.setItem('selStandardItemIdentifier', standardItemId);
};

StandardItem.getLocalStorageIdentifier = function () {
  let standardItemIdentifier = 0;
  try {
    standardItemIdentifier = localStorage.getItem('selStandardItemIdentifier');
  } catch (err) {
    return 0;
  }
  if (standardItemIdentifier === undefined || standardItemIdentifier === null || isNaN(standardItemIdentifier)) {
    return 0;
  }
  return parseInt(standardItemIdentifier);
};


StandardItem.prototype.setLocalStorage = function () {
  localStorage.setItem('selStandardItem', this.getJSON());
};

StandardItem.getLocalStorage = function () {

  try {
    let standardItem = localStorage.getItem('selStandardItem');
    if (standardItem === null) {
      return new StandardItem();
    }
    standardItem = JSON.parse(standardItem);
    standardItem = new StandardItem(
      {
        StandardItemId: standardItem.StandardItemId,
        StandardItemNo: standardItem.StandardItemNo,
        FiscalYearId: standardItem.FiscalYearId,
        WorkPara: standardItem.WorkPara,
        Criteria: standardItem.Criteria,
        InspectionTypeItem: standardItem.InspectionTypeItem,
        CheckPointTypes: standardItem.CheckPointTypes,
        HasCheckPointTypeV: standardItem.HasCheckPointTypeV,
        HasCheckPointTypeG: standardItem.HasCheckPointTypeG,
        HasCheckPointTypeQ: standardItem.HasCheckPointTypeQ,
        HasCheckPointTypeI: standardItem.HasCheckPointTypeI,
        HasCheckPointTypeRPT: standardItem.HasCheckPointTypeRPT,
        Void: standardItem.Void,
        CreateDate: standardItem.CreateDate,
        CreateTime: standardItem.CreateTime,
        CreatedBy: standardItem.CreatedBy
      }
    );
    return standardItem;
  } catch (err) {
    return new StandardItem();
  }
};

StandardItem.nullifyLocalStorageStandardItem = function () {
  localStorage.setItem('selStandardItem', new StandardItem().getJSON());
};

export default StandardItem;
