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

    test('TC-024: Update employee with empty required fields', async({page})=>{      
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

  test.describe('Edit Job Details',  () => {
    test('TC-026: Update job title for selected employee', async({page})=>{      
      // add employee
      const employeePage = new EmployeePage(page)
      const employeeId = await employeePage.createTestEmployee(testData.employeeData.firstName, testData.employeeData.lastName)
    
      //verify employee is in the list
      await employeePage.searchAndVerifyById(employeeId)

      //edit employee
      await employeePage.selectEmployeeForEditing(employeeId)  
      await employeePage.clickJobDetailsLink()
      await employeePage.verifyPageUrl(testData.urls.editJobDetails)
      

      // edit job details with job title   
      await employeePage.addJobTitle(testData.employeeData.jobTitle)    

      // // navigate to employee list to confirm change
      await employeePage.openPIM()
      await employeePage.searchEmployeeByJobTitle(testData.employeeData.jobTitle)
      await employeePage.verifyEmployeeSearchByJobTitle(employeeId, testData.employeeData.jobTitle)

      //cleanup test data
      await employeePage.deleteEmployeeById(employeeId)

    })

    test('TC-027: Update subunit for selected employee', async({page})=>{      
      // add employee
      const employeePage = new EmployeePage(page)
      const employeeId = await employeePage.createTestEmployee(testData.employeeData.firstName, testData.employeeData.lastName)
    
      //verify employee is in the list
      await employeePage.searchAndVerifyById(employeeId)

      //edit employee
      await employeePage.selectEmployeeForEditing(employeeId)  
      await employeePage.clickJobDetailsLink()
      await employeePage.verifyPageUrl(testData.urls.editJobDetails)
      

      // edit subunit
      await employeePage.addSubUnit(testData.employeeData.subUnit)    

      // navigate to employee list to confirm change
      await employeePage.openPIM()
      await employeePage.searchEmployeeBySubUnit(testData.employeeData.subUnit)
      await employeePage.verifyEmployeeSearchBySubUnit(employeeId, testData.employeeData.subUnit)

      //cleanup test data
      await employeePage.deleteEmployeeById(employeeId)

    })

    test('TC-028: Update status for selected employee', async({page})=>{      
      // add employee
      const employeePage = new EmployeePage(page)
      const employeeId = await employeePage.createTestEmployee(testData.employeeData.firstName, testData.employeeData.lastName)
    
      //verify employee is in the list
      await employeePage.searchAndVerifyById(employeeId)

      //edit employee
      await employeePage.selectEmployeeForEditing(employeeId)  
      await employeePage.clickJobDetailsLink()
      await employeePage.verifyPageUrl(testData.urls.editJobDetails)
      

      // edit status
      await employeePage.addStatus(testData.employeeData.employmentStatus)    

      // navigate to employee list to confirm change
      await employeePage.openPIM()
      await employeePage.searchEmployeeByStatus(testData.employeeData.employmentStatus)
      await employeePage.verifyEmployeeSearchByStatus(employeeId, testData.employeeData.employmentStatus)

      //cleanup test data
      await employeePage.deleteEmployeeById(employeeId)

    })

    test('TC-029: Terminate employment for selected employee', async({page})=>{      
      // add employee
      const employeePage = new EmployeePage(page)
      const employeeId = await employeePage.createTestEmployee(testData.employeeData.firstName, testData.employeeData.lastName)
    
      //verify employee is in the list
      await employeePage.searchAndVerifyById(employeeId)

      //edit employee
      await employeePage.selectEmployeeForEditing(employeeId)  
      await employeePage.clickJobDetailsLink()
      await employeePage.verifyPageUrl(testData.urls.editJobDetails)
      

      // terminate
      await employeePage.terminateEmployee(testData.employeeData.terminationReason)

      // navigate to employee list to confirm change
      await employeePage.openPIM()
      await employeePage.selectEmployment(testData.employeeData.includeTerminated)
      await employeePage.searchEmployeebyId(employeeId)
    
      await employeePage.verifyEmployeeSearchResultsById(employeeId)

      //cleanup test data
      await employeePage.deleteEmployeeById(employeeId)

    })

    test('TC-030: Terminate employment without required fields', async({page})=>{      
      // add employee
      const employeePage = new EmployeePage(page)      
      await employeePage.openPIM()

      //edit employee
      await employeePage.clickEditFirstEmployeeButton()  
      await employeePage.clickJobDetailsLink()
      await employeePage.verifyPageUrl(testData.urls.editJobDetails)     

      // terminate
      await employeePage.clickTerminateButton()
      await employeePage.clickSaveButtonForTermination()
      await employeePage.verifyMissingTerminationFields(testData.employeeData.missingRequiredFieldMsg)
   
    })
  })
})