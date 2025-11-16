import test from "@playwright/test"
import { testData } from "../../data/testData"
import { EmployeePage } from "../../pages/employee.page"
import { LoginPage } from "../../pages/login.page"

test.describe('Add employee page scenarios', ()=>{
  test.beforeEach(async ({page})=>{  
    await page.goto(testData.urls.login)
    const loginPage = new LoginPage(page)
    const employeePage = new EmployeePage(page)
    await loginPage.loginUser(testData.credentials.validUsername, testData.credentials.validPassword)
    await employeePage.openAddEmployee()
  })
  
  test.describe('Search Employee',  () => {
    test('TC-012: Add employee with all populated fields', async({page})=>{
      // add employee
      const employeePage = new EmployeePage(page)      
      const employeeId =  await employeePage.addNewEmployee(testData.employeeData.firstName, testData.employeeData.lastName, testData.employeeData.middleName)

      //navigate to employee list 
      await employeePage.openPIM()      

      //search for the employee and verify
      await employeePage.searchEmployeeByName(testData.employeeData.firstName + ' ' + testData.employeeData.middleName + ' ' + testData.employeeData.lastName)
      await employeePage.verifyEmployeeSearchResultsByName(employeeId, testData.employeeData.firstName, testData.employeeData.firstName, testData.employeeData.middleName)

      //cleanup test data
      await employeePage.deleteEmployeeById(employeeId)
   
    })

    test('TC-013: Add employee with missing mandatory fields', async({page})=>{
      // create a test employee
      const employeePage = new EmployeePage(page)
      await employeePage.clickSaveButton()
      //verify user is on the same page and error messages are displayed
      await employeePage.verifyPageUrl(testData.urls.addEmployee)
      await employeePage.verifyMissingRequiredFieldsError(testData.employeeData.missingRequiredFieldMsg)   
    })

    test('TC-014: Cancel adding employee', async({page})=>{
      // create a test employee
      const employeePage = new EmployeePage(page)    
      await employeePage.clickCancelButton()

      //verify navigation to employee list      
      await employeePage.verifyPageUrl(testData.urls.employeeList)
   
    })
  
  })
})
  
