// Your code here
function createEmployeeRecord(array) {
    let employeeRecord = {};
    employeeRecord.firstName = array[0];
    employeeRecord.familyName = array[1];
    employeeRecord.title = array[2];
    employeeRecord.payPerHour = array[3];
    employeeRecord.timeInEvents = [];
    employeeRecord.timeOutEvents = [];
    return employeeRecord;
  }
  
  function createEmployeeRecords(arrays) {
    return arrays.map(function (array) {
      return createEmployeeRecord(array);
    });
  }
  
  function createTimeInEvent(employeeRecord, dateTimeString) {
    let timeInEvent = {};
    timeInEvent.type = "TimeIn";
    timeInEvent.date = dateTimeString.split(" ")[0];
    timeInEvent.hour = parseInt(dateTimeString.split(" ")[1], 10);
    employeeRecord.timeInEvents.push(timeInEvent);
    return employeeRecord;
  }
  
  function createTimeOutEvent(employeeRecord, dateTimeString) {
    let timeOutEvent = {};
    timeOutEvent.type = "TimeOut";
    timeOutEvent.date = dateTimeString.split(" ")[0];
    timeOutEvent.hour = parseInt(dateTimeString.split(" ")[1], 10);
    employeeRecord.timeOutEvents.push(timeOutEvent);
    return employeeRecord;
  }
  
  function hoursWorkedOnDate(employeeRecord, date) {
    let timeInEvent = employeeRecord.timeInEvents.find(function (e) {
      return e.date === date;
    });
    let timeOutEvent = employeeRecord.timeOutEvents.find(function (e) {
      return e.date === date;
    });
    return (timeOutEvent.hour - timeInEvent.hour) / 100;
  }
  
  function wagesEarnedOnDate(employeeRecord, date) {
    let hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    let payRate = employeeRecord.payPerHour;
    return hoursWorked * payRate;
  }
  
  function allWagesFor(employeeRecord) {
    let dates = employeeRecord.timeInEvents.map(function (e) {
      return e.date;
    });
    let wages = dates.map(function (date) {
      return wagesEarnedOnDate(employeeRecord, date);
    });
    let totalWages = wages.reduce(function (total, wage) {
      return total + wage;
    }, 0);
    return totalWages;
  }
  
  function calculatePayroll(employeeRecords) {
    let wages = employeeRecords.map(function (employeeRecord) {
      return allWagesFor(employeeRecord);
    });
    let totalWages = wages.reduce(function (total, wage) {
      return total + wage;
    }, 0);
    return totalWages;
  }