import test from "@playwright/test"
import { testData } from "../../data/testData"
import { EmployeePage } from "../../pages/employee.page"
import { LoginPage } from "../../pages/login.page"

test.describe('Edit employee page scenarios', ()=>{
  test.beforeEach(async ({page})=>{  
    await page.goto(testData.urls.login)
    const loginPage = new LoginPage(page)
    await loginPage.loginUser(testData.credentials.validUsername, testData.credentials.validPassword)
   
  })
  
  test.describe('Edit Personal Details',  () => {
    test('TC-022: Update required fields in the personal details form', async({page})=>{
      // add employee
      const employeePage = new EmployeePage(page)
      const employeeId = await employeePage.createTestEmployee(testData.employeeData.firstName, testData.employeeData.lastName)

      //navigate to employee list 
      await employeePage.openPIM() 
    
      //verify employee is in the list
      await employeePage.searchAndVerifyById(employeeId)

      //edit employee - required data
      await employeePage.selectEmployeeForEditing(employeeId)      
      await employeePage.updateRequiredFields(testData.employeeData.editedFirstName, testData.employeeData.editedLastName)

      //navigate to employee list and verify edited data
      await employeePage.openPIM()
      await employeePage.searchEmployeeByName(testData.employeeData.editedFirstName)
      await employeePage.verifyEmployeeSearchResultsByName(employeeId, testData.employeeData.editedFirstName, testData.employeeData.editedLastName)

      //cleanup test data
      await employeePage.deleteEmployeeById(employeeId)
    
    })

    test('TC-023: Update optional fields in the personal details form', async({page})=>{
      // add employee
      const employeePage = new EmployeePage(page)
      const employeeId = await employeePage.createTestEmployee(testData.employeeData.firstName, testData.employeeData.lastName)

      //navigate to employee list 
      await employeePage.openPIM() 
    
      //verify employee is in the list
      await employeePage.searchAndVerifyById(employeeId)

      //edit employee - optional data
      await employeePage.selectEmployeeForEditing(employeeId)     
      await employeePage.updateOptionalFields(testData.employeeData.editedMiddleName, employeeId + 'edited', testData.employeeData.gender)

      //navigate to employee list and verify edited data
      await employeePage.openPIM()
      await employeePage.searchEmployeebyId(employeeId + 'edited')
      await employeePage.verifyEmployeeSearchResultsByName(employeeId + 'edited', testData.employeeData.firstName, testData.employeeData.lastName, testData.employeeData.editedMiddleName)

      //cleanup test data
      await employeePage.deleteEmployeeById(employeeId + 'edited')
    
    })

    test('TC-024: Update required fields in the personal details form', async({page})=>{      
      const employeePage = new EmployeePage(page)
      await employeePage.openPIM()
      
      //edit employee - empty required fields
      await employeePage.clickEditFirstEmployeeButton()      
      await employeePage.updateRequiredFields('', '')
      await employeePage.verifyMissingRequiredFieldsError(testData.employeeData.missingRequiredFieldMsg)
    
    })

    test('TC-025:Update employee with ID from another record', async({page})=>{      
      const employeePage = new EmployeePage(page)
      await employeePage.openPIM()
      
      // get two existing employee ids
      const[firstId, secondId] = await employeePage.getTwoEmployeeIds()

      // try to update employee's id with existing id
      await employeePage.selectEmployeeForEditing(firstId)
      await employeePage.updateEmployeeId(secondId)
      await employeePage.clickSavePersonalDetailsButton()
      await employeePage.verifyDuplicateIdError(testData.employeeData.duplicateIdError)    
    })
  })
})