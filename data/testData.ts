export const testData = {
   credentials: {
    validUsername: 'Admin',
    validPassword: 'admin123',    
    invalidUsername: 'wrongUser', 
    invalidPassword: 'wrongPass',
    resetPasswordTitle: 'Reset Password',
    resetPasswordSuccess: 'Reset Password link sent successfully'
  }, 

  employeeData: {
    firstName: 'Test name',
    lastName: 'Test last name'
  },
  
  loginMessages: {
    missingCredential: 'Required',  
    invalidCredentials: 'Invalid credentials',
  },

  dashboard: {
    widgets: ['Time at Work', 'My Actions', 'Quick Launch', 'Buzz Latest Posts', 'Employees on Leave Today', 'Employee Distribution by Sub Unit', 'Employee Distribution by Location'],
    quickLaunch: [
      { name: "Assign Leave", urlPart: "/leave/assignLeave" },
      { name: "Leave List", urlPart: "/leave/viewLeaveList" },
      { name: "Timesheets", urlPart: "/time/viewEmployeeTimesheet" },
      { name: "Apply Leave", urlPart: "/leave/applyLeave" },
      { name: "My Leave", urlPart: "/leave/viewMyLeaveList" },
      { name: "My Timesheet", urlPart: "/time/viewMyTimesheet" },     
    ]
  },

  urls: {
    login: 'auth/login',
    passwordReset: 'requestPasswordResetCode',
    dashboard: 'dashboard/index',
    employeeList: 'pim/viewEmployeeList',
    addEmployee: 'pim/addEmployee'
  }
}