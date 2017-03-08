
let DateTimeUtils = new function () {};

DateTimeUtils.prototype.getFormattedDate = function (date) {
  try {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
  } catch (err) {
    return "";
  }
};

DateTimeUtils.prototype.getFormattedTime = function (fourDigitTime) {
  try {
    let time = fourDigitTime.split(':'); // convert to array

    // fetch
    let hours = Number(time[0]);
    let minutes = Number(time[1]);
    let seconds = Number(time[2]);

    // calculate
    let timeValue = "" + ((hours > 12) ? hours - 12 : hours); // get hours
    timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes; // get minutes
    //timeValue += (seconds < 10) ? ":0" + seconds : ":" + seconds; // get seconds
    timeValue += (hours >= 12) ? " P.M." : " A.M."; // get AM/PM
    return timeValue;
  } catch (err) {
    return "";
  }
};

DateTimeUtils.prototype.getCurrentDateForObjectSave = function () {
  let udt = new DateTimeUtils();
  let d = new Date(); // for now
  return udt.getFormattedDate(d);
};

DateTimeUtils.prototype.getCurrentTimeForObjectSave = function () {
  let udt = new DateTimeUtils();
  let d = new Date(); // for now
  return udt.getFormattedTime(d.getHours() + ":" + d.getMinutes());
};

DateTimeUtils.prototype.getFormattedTimeToSave = function (currentTime) {
  try {
    let time = currentTime;
    let hours = Number(time.match(/^(\d+)/)[1]);
    let minutes = Number(time.match(/:(\d+)/)[1]);

    let AMPM = time.match(/\s(.*)$/)[1];
    if (AMPM === "PM" && hours !== 12) hours = hours + 12;

    let sHours = hours.toString();
    let sMinutes = minutes.toString();
    if (hours < 10) sHours = "0" + sHours;
    if (minutes < 10) sMinutes = "0" + sMinutes;

    return sHours + ":" + sMinutes;
  } catch (err) {
    return currentTime;
  }
};

export default DateTimeUtils;


