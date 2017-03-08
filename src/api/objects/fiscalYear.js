import $ from 'jquery';
import React from 'react';
import CacheUtil from '../objects/cacheUtil';
import CommonUtils from '../objects/commonUtils';

let FiscalYear = function (params) {
  let properties = $.extend({
    id: 0,
    description: 'Select from below',
    selected: false
  }, params);

  this.FiscalYearId = properties.id;
  this.Description = properties.description;
  this.Selected = properties.selected;
};

FiscalYear.prototype.getJSON = function () {
  return JSON.stringify({
    FiscalYearId: this.FiscalYearId,
    Description: this.Description,
    Selected: this.Selected
  });
};

FiscalYear.prototype.setLocalStorage = function () {
  localStorage.setItem('selFiscalYear', this.getJSON());
};

FiscalYear.prototype.toString = function() {
  return 'FiscalYearId: ' +  this.FiscalYearId  +
    'Description: ' + this.Description +
    'Selected: ' + this.Selected;
};

FiscalYear.setLocalStorageIdentifier = function (fiscalYearId) {
  localStorage.setItem('selFiscalYearIdentifier', fiscalYearId);
};

FiscalYear.getLocalStorageIdentifier = function () {
  let fiscalYearIdentifier = 0;
  try {
    fiscalYearIdentifier = localStorage.getItem('selFiscalYearIdentifier');
  } catch (err) {
    return 0;
  }
  if (fiscalYearIdentifier === undefined || fiscalYearIdentifier === null || isNaN(fiscalYearIdentifier)) {
    return 0;
  }
  return parseInt(fiscalYearIdentifier);
};

FiscalYear.getLocalStorage = function () {
  try {

    let fiscalYear = localStorage.getItem('selFiscalYear');
    if (fiscalYear === null) {
      return new FiscalYear();
    }

    fiscalYear = JSON.parse(fiscalYear);
    fiscalYear = new FiscalYear(
      {
        id: fiscalYear.FiscalYearId,
        description: fiscalYear.Description,
        selected: fiscalYear.Selected
      }
    );
    return fiscalYear;
  } catch (err) {
    return new FiscalYear();
  }
};

FiscalYear.nullifyLocalStorageFiscalYear = function () {
  CacheUtil.removeFromCache('selFiscalYear');
};

FiscalYear.getFiscalYearsFormControlOptions = function (fiscalYears) {
  return fiscalYears.map(function (fiscalYear) {
    return {label: fiscalYear.Description, value: String(fiscalYear.FiscalYearId)}
  });
};

FiscalYear.handleCreateNewFiscalYearClick = function () {
  CacheUtil.removeFromCache('fiscalYears');
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      url: CommonUtils.getServiceBaseURL() + 'StandardItems.ashx',
      data: {
        f: 'createNewFiscalYear'
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

FiscalYear.loadFiscalYears = function () {
  if(CacheUtil.getFromCache('fiscalYears') === null) {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: 'GET',
        url: CommonUtils.getServiceBaseURL() + 'FiscalYears.ashx',
        data: {
          f: 'All'
        },
        success: function (result) {
          CacheUtil.addToCache('fiscalYears', result);
          resolve(Object.assign([], result));
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          reject(errorThrown);
        }
      });
    });
  } else {
    return new Promise((resolve, reject) => {
      resolve(Object.assign([], CacheUtil.getFromCache('fiscalYears')));
    });
  }
};

export default FiscalYear;
