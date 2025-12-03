import { test } from '../../fixtures/test-fixtures'
import { testData } from "../../data/testData"

test.describe('Add employee page scenarios', ()=>{
  test.beforeEach(async ({pages})=>{
    await pages.login.loginUser(testData.credentials.validUsername, testData.credentials.validPassword)
    await pages.employee.openAddEmployee()
  })
  
  test.describe('Search Employee',  () => {
    test('TC-012: Add employee with all populated fields', async({pages})=>{
      // add employee     
      const employeeId =  await pages.employee.addNewEmployee(testData.employeeData.firstName, testData.employeeData.lastName, testData.employeeData.middleName)

      //navigate to employee list 
      await pages.employee.openPIM()      

      //search for the employee and verify
      await pages.employee.searchEmployeeByName(testData.employeeData.firstName + ' ' + testData.employeeData.middleName + ' ' + testData.employeeData.lastName)
      await pages.employee.verifyEmployeeSearchResultsByName(employeeId, testData.employeeData.firstName, testData.employeeData.firstName, testData.employeeData.middleName)

      //cleanup test data
      await pages.employee.deleteEmployeeById(employeeId)   
    })

    test('TC-013: Add employee with missing mandatory fields', async({pages})=>{    
      await pages.employee.clickSaveButton()

      //verify user is on the same page and error messages are displayed
      await pages.employee.verifyPageUrl(testData.urls.addEmployee)
      await pages.employee.verifyMissingRequiredFieldsError(testData.employeeData.missingRequiredFieldMsg) 
      await pages.employee.snapshotNameFieldsAddEmployee()  
    })

    test('TC-014: Cancel adding employee', async({pages})=>{     
      await pages.employee.clickCancelButton()

      //verify navigation to employee list      
      await pages.employee.verifyPageUrl(testData.urls.employeeList)   
    })  
  })
})
  
