import React from 'react';

let CommonUtils = new function () {
};

CommonUtils.getServiceBaseURL = function () {
  let url = window.location.href;
  let hostAndPort = url.split("/");
  let hostResult = hostAndPort[0] + "//" + hostAndPort[2];
  return hostResult + "/QA/TI/HttpHandlers/";
};

CommonUtils.setCookie = function(name, value, days) {
  let expires = "";
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + value + expires + "; path=/";
};

CommonUtils.getCookie = function (name) {
  let value = "; " + document.cookie;
  let parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
};

CommonUtils.isPostBack = function () {
  return document.getElementById('_ispostback').value == 'True';
};

CommonUtils.getParameterByName = function (name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
};

CommonUtils.invokeAjaxPromise = function(options) {
  return new Promise(function (resolve, reject) {
    $.ajax(options).done(resolve).fail(reject);
  });
};

CommonUtils.trim = function() {
  let TRIM_RE = /^\s+|\s+$/g;
  return function trim(string) {
    return string.replace(TRIM_RE, '')
  }
}();

export default CommonUtils;

