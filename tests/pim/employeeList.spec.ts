import { test } from '../../fixtures/test-fixtures'
import { testData } from "../../data/testData"

test.describe('Employee list page scenarios', ()=>{
  test.beforeEach(async ({pages})=>{ 
    await pages.login.loginUser(testData.credentials.validUsername, testData.credentials.validPassword)   
  })
  
  test.describe('Search Employee',  () => {
    test('TC-015: Search by employee name', async({pages, testEmployeeId})=>{ 
      await pages.employee.goToEmployeeList(testData.urls.employeeList)     
      await pages.employee.searchEmployeeByName(testData.employeeData.firstName)
      await pages.employee.verifyEmployeeSearchResultsByName(testEmployeeId!, testData.employeeData.firstName, testData.employeeData.lastName)  
    })  

    test('TC-016: Search by employee ID', async({pages, testEmployeeId})=>{  
      await pages.employee.goToEmployeeList(testData.urls.employeeList)           
      await pages.employee.searchEmployeebyId(testEmployeeId!)
      await pages.employee.verifyEmployeeSearchResultsById(testEmployeeId!)     
    }) 

    test('TC-017: Search with invalid data', async({pages})=>{ 
      await pages.employee.goToEmployeeList(testData.urls.employeeList)  
      await pages.employee.searchEmployeeByName(testData.employeeData.invalidFirstName + ' ' + testData.employeeData.invalidLastName)
      await pages.employee.verifyEmployeeDoesNotExist()
    }) 

    test('TC-018: Reset search', async({pages})=>{ 
      await pages.employee.goToEmployeeList(testData.urls.employeeList)    
      await pages.employee.searchEmployeeByName(testData.employeeData.invalidFirstName)
      await pages.employee.verifyEmployeeDoesNotExist()

      //reset search
      await pages.employee.clickResetButton()
      await pages.employee.verifySearchIsReset()
    })
  }) 

  test.describe('Delete Employee',  () => {
    test('TC-019: Delete an existing employee', async({pages})=>{
      // create a test employee     
      const employeeId =  await pages.employee.createTestEmployee(testData.employeeData.firstName, testData.employeeData.lastName)

      //search for the employee and verify
      await pages.employee.goToEmployeeList(testData.urls.employeeList)  
      await pages.employee.searchAndVerifyById(employeeId)

      //delete test data and confirm
      await pages.employee.deleteAndConfirm(employeeId)
    })  

    test('TC-020: Cancel deletion', async({pages, testEmployeeId})=>{
      //verify employee is in the list
      await pages.employee.goToEmployeeList(testData.urls.employeeList)  
      await pages.employee.searchAndVerifyById(testEmployeeId!)

      //cancel
      await pages.employee.cancelDeletion(testEmployeeId!)
      await pages.employee.verifyEmployeeSearchResultsById(testEmployeeId!)     
    }) 

    test('TC-021: Delete employee via bulk option', async({pages})=>{
       // create a test employee   
      const employeeId =  await pages.employee.createTestEmployee(testData.employeeData.firstName, testData.employeeData.lastName)

      //verify employee is in the list
      await pages.employee.goToEmployeeList(testData.urls.employeeList)  
      await pages.employee.searchAndVerifyById(employeeId)

      //delete with checkbox
      await pages.employee.checkEmployeeCheckBox(employeeId)
      await pages.employee.clickDeleteSelectedButton()
      await pages.employee.clickConfirmDeleteButton()

      //search for the employee to confirm deletion
      await pages.employee.searchEmployeebyId(employeeId)
      await pages.employee.verifyEmployeeDoesNotExist()   
    })     
  }) 
})