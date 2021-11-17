// Your code here
let createEmployeeRecord = (employeeInfo) => {
    return {
        firstName: employeeInfo[0],
        familyName: employeeInfo[1],
        title: employeeInfo[2],
        payPerHour: employeeInfo[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}
let createEmployeeRecords = (allEmployees) => (
    allEmployees.map((employee) => createEmployeeRecord(employee))
)

let createTimeInEvent = (employeeRecord, timeIn) => {
    employeeRecord.timeInEvents.push(
        { 
            type: "TimeIn",
            date: timeIn.split(" ")[0],
            hour: parseInt(timeIn.split(" ")[1])
        }
    )
    return employeeRecord
}
let createTimeOutEvent = (employeeRecord, timeIn) => {
    const [date, hour] = timeIn.split(" ")
    employeeRecord.timeOutEvents.push(
        { 
            type: "TimeOut",
            date: date,
            hour: parseInt(hour)
        }
    )
    return employeeRecord
}
let hoursWorkedOnDate = (employeeRecord, date) => {
    let timeInRecord = employeeRecord.timeInEvents.find((e)=> e.date == date )
    let timeOutRecord = employeeRecord.timeOutEvents.find((e)=> e.date == date )

    return (timeOutRecord.hour -  timeInRecord.hour)/100
}
let wagesEarnedOnDate = (employeeRecord, date) => {
    return hoursWorkedOnDate(employeeRecord, date)*employeeRecord.payPerHour
}
let allWagesFor = (employeeRecord) => (
//     let wage = 
    employeeRecord.timeInEvents.reduce((total, timeIn) => (
         wagesEarnedOnDate(employeeRecord, timeIn.date)+total
     ) ,0)
    // return wage
)
let calculatePayroll = (allEmployees) => (
     allEmployees.reduce((total, employee) => allWagesFor(employee) + total, 0)
)

let findEmployeeByFirstName = (allEmployees, firstName) => (
        allEmployees.find((e) => e.firstName == firstName)
    )
