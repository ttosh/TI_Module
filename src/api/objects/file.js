import Job from '../../api/objects/job';
import Ticket from '../../api/objects/ticket';
import CommonUtils from '../../api/objects/commonUtils';

let File = new function () {
  // file object
};

File.getFilesForJob = function (jobId) {
  CommonUtils.invokeAjaxPromise(
    {
      url: CommonUtils.CommonUtils.getServiceBaseURL() + 'Files.ashx',
      type: 'POST',
      dataType: "json",
      data: {
        f: 'GetForJob',
        JobId: jobId
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

File.getFileInfo = function (e) {
  return $.map(e.files, function (file) {
    let info = file.name;

    // File size is not available in all browsers
    if (file.size > 0) {
      info += " (" + Math.ceil(file.size / 1024) + " KB)";
    }
    return info;
  }).join(", ");
};

File.fileSelect = function (e) {
  let currentHeight = $("#content").height();
  let selectedFileCount = e.files.length;
  let newHeight = currentHeight + (selectedFileCount * 65);
  document.getElementById('content').setAttribute("style", "height:" + newHeight + "px");
  getFilesForJob(Job.getLocalStorageIdentifier());
};

File.viewSelectedFile = function (selFile) {

};


File.loadTicketsForJob = function (jobID) {
  Ticket.loadTickets(jobID);
};

let getFilesForJob = function (currentJobID) {
  let searchResults = "";
  $.ajax({
    url: CommonUtils.getServiceBaseURL() + "Files.ashx?f=GetForJob&JobID=" + currentJobID,
    data: null,
    traditional: true,
    success: function (result) {
      searchResults = result;
    }
  }).done(function () {
    let data = $.map(searchResults, function (el) { return el });
    let grid = $("#filesGrid").data("kendoGrid");
    grid.dataSource.data(data);
  });
};

export default File;
