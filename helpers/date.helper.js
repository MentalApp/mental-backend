const moment = require('moment');
const dateTimePattern = "dd/mm/yyyy";
const monthPattern = "mm/yyyy";
module.exports = {
  formatDateStringToObject: (dateString) => {
    if (moment(dateString, dateTimePattern).isValid()) {
      return moment(dateString, dateTimePattern);
    } else {
      return null;
    }
  },
  formatMonth: (dateString) => {
    if (moment(dateString, dateTimePattern).isValid()) {
      return moment(dateString, monthPattern);
    } else {
      return null;
    }
  }
}