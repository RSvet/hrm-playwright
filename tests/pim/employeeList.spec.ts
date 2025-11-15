import test from "@playwright/test"
import { testData } from "../../data/testData"
import { LoginPage } from "../../pages/login.page"
import { EmployeePage } from "../../pages/employee.page"

test.describe('Employee list page scenarios', ()=>{
  test.beforeEach(async ({page})=>{  
    await page.goto(testData.urls.login)
    const loginPage = new LoginPage(page)
    await loginPage.loginUser(testData.credentials.validUsername, testData.credentials.validPassword)
  })
  
  test.describe('Search Employee',  () => {
    test('TC-015: Search by employee name', async({page})=>{
      // create a test employee
      const employeePage = new EmployeePage(page)
      await employeePage.openAddEmployee()
      const employeeId =  await employeePage.addNewEmployee(testData.employeeData.firstName, testData.employeeData.lastName)

      //navigate to employee list 
      await employeePage.openPIM()
      await employeePage.verifyPageUrl(testData.urls.employeeList)

      //search for the employee and verify
      await employeePage.searchEmployeeByName(testData.employeeData.firstName)
      await employeePage.verifyEmployeeSearchResultsByName(employeeId, testData.employeeData.firstName, testData.employeeData.firstName)

      //delete test data
      await employeePage.deleteEmployeeById(employeeId)
   
    })  

    test('TC-016: Search by employee ID', async({page})=>{   
      // create a test employee
      const employeePage = new EmployeePage(page)
      await employeePage.openAddEmployee()
      const employeeId =  await employeePage.addNewEmployee(testData.employeeData.firstName, testData.employeeData.lastName)

      //navigate to employee list 
      await employeePage.openPIM()
      await employeePage.verifyPageUrl(testData.urls.employeeList)

      //search for the employee and verify
      await employeePage.searchEmployeebyId(employeeId)
      await employeePage.verifyEmployeeSearchResultsById(employeeId)

      //delete test data
      await employeePage.deleteEmployeeById(employeeId)
    }) 

    test('TC-017: Search with invalid data', async({page})=>{      
      //navigate to employee list 
      const employeePage = new EmployeePage(page)
      await employeePage.openPIM()
      await employeePage.verifyPageUrl(testData.urls.employeeList)

      //search for the employee and verify
      await employeePage.searchEmployeeByName(testData.employeeData.invalidFirstName + ' ' + testData.employeeData.invalidLastName)
      await employeePage.verifyEmployeeDoesNotExist()
    }) 

    test('TC-018: Reset search', async({page})=>{
   
    })
  }) 

  test.describe('Delete Employee',  () => {
    test('TC-019: Delete an existing employee', async({page})=>{
   
    })  

    test('TC-020: Cancel deletion', async({page})=>{
   
    }) 

    test('TC-021: Delete employee via bulk option', async({page})=>{
   
    }) 

    
  }) 
 

})