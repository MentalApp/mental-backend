const moment = require('moment');
const dateTimePattern = 'DD/MM/YYYY';
const monthPattern = 'MM/YYYY';
const fullTimePattern = 'DD/MM/YYYY HH:mm';
module.exports = {
  formatDateStringToObject: (dateString) => {
    if (moment(dateString, dateTimePattern).isValid()) {
      return moment(dateString, dateTimePattern);
    } else {
      return null;
    }
  },
  formatMonth: (dateString) => {
    if (moment(dateString, monthPattern).isValid()) {
      return moment(dateString, monthPattern);
    } else {
      return null;
    }
  },

  formatDateTimeToString: (dateObject) => {
    if (dateObject && moment(dateObject).isValid()) {
      return moment(dateObject).format(fullTimePattern);
    }
    return null;
  },
};
