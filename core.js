module.exports = {
  getWeekNumber: function() {
    let currentdate = new Date();
    let oneJan = new Date(currentdate.getFullYear(),0,1);
    let numberOfDays = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000));
    let result = Math.ceil(( currentdate.getDay() + 1 + numberOfDays) / 7);
    return parseInt(result);
  },
  getYearNumber: function() {
    return new Date().getFullYear();
  }
}