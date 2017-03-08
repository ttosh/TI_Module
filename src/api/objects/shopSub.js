import $ from 'jquery'
import React from 'react';
import CommonUtils from '../../api/objects/commonUtils';

let ShopSub = function(params) {
  let properties = $.extend({
    description: 'Select from below'
  }, params);

  this.Description = properties.description;
};

ShopSub.prototype.getJSON = function () {
  return JSON.stringify({
    Description: this.Description
  });
};

ShopSub.getAllShopSubs = function (jobId) {
  let shopSubs = [];
  return new Promise((resolve, reject) => {
    resolve(Object.assign([], shopSubs));
  });
};

ShopSub.getShopSubFormControlOptions = function(shopSubs) {
  let i;
  let items = [];
  let filter = [];

  for (i = 0; i < shopSubs.length; i++) {
    if (filter.indexOf(shopSubs[i].Description) !== 0) {
      items.push({label: String(shopSubs[i]['Description']), value: String(shopSubs[i]['Description'])});
    }
    filter.push(shopSubs[i].Description);
  }
  return items;
};

export default ShopSub;
