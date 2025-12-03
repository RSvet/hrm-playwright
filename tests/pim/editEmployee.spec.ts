import { test } from '../../fixtures/test-fixtures'
import { testData } from "../../data/testData"

// Note: testEmployeeId fixture is used only in tests where ID is not changed.

test.describe('Edit employee page scenarios', ()=>{
  test.beforeEach(async ({pages})=>{     
    await pages.login.loginUser(testData.credentials.validUsername, testData.credentials.validPassword)   
  })
  
  test.describe('Edit Personal Details',  () => {
    test('TC-022: Update required fields in the personal details form', async({pages, testEmployeeId})=>{     
      await pages.employee.goToEmployeeList(testData.urls.employeeList) 
    
      //verify employee is in the list
      await pages.employee.searchAndVerifyById(testEmployeeId!)

      //edit employee - required data
      await pages.employee.selectEmployeeForEditing(testEmployeeId!)      
      await pages.employee.updateRequiredFields(testData.employeeData.editedFirstName, testData.employeeData.editedLastName)

      //navigate to employee list and verify edited data
      await pages.employee.goToEmployeeList(testData.urls.employeeList) 
      await pages.employee.searchEmployeeByName(testData.employeeData.editedFirstName)
      await pages.employee.verifyEmployeeSearchResultsByName(testEmployeeId!, testData.employeeData.editedFirstName, testData.employeeData.editedLastName)    
    })

    test('TC-023: Update optional fields in the personal details form', async({pages})=>{
      // add employee      
      const employeeId = await pages.employee.createTestEmployee(testData.employeeData.firstName, testData.employeeData.lastName)

      //navigate to employee list 
      await pages.employee.goToEmployeeList(testData.urls.employeeList) 
    
      //verify employee is in the list
      await pages.employee.searchAndVerifyById(employeeId)

      //edit employee - optional data
      await pages.employee.selectEmployeeForEditing(employeeId)     
      await pages.employee.updateOptionalFields(testData.employeeData.editedMiddleName, employeeId + 'edited', testData.employeeData.gender)

      //navigate to employee list and verify edited data
      await pages.employee.goToEmployeeList(testData.urls.employeeList) 
      await pages.employee.searchEmployeebyId(employeeId + 'edited')
      await pages.employee.verifyEmployeeSearchResultsByName(employeeId + 'edited', testData.employeeData.firstName, testData.employeeData.lastName, testData.employeeData.editedMiddleName)

      //cleanup test data
      await pages.employee.deleteEmployeeById(employeeId + 'edited')
    
    })

    test('TC-024: Update employee with empty required fields', async({pages})=>{      
      await pages.employee.goToEmployeeList(testData.urls.employeeList) 
      
      //edit employee - empty required fields
      await pages.employee.clickEditFirstEmployeeButton()      
      await pages.employee.updateRequiredFields('', '')
      await pages.employee.verifyMissingRequiredFieldsError(testData.employeeData.missingRequiredFieldMsg)    
    })

    test('TC-025:Update employee with ID from another record', async({pages})=>{      
      await pages.employee.goToEmployeeList(testData.urls.employeeList) 
      
      // get two existing employee ids
      const[firstId, secondId] = await pages.employee.getTwoEmployeeIds()

      // try to update employee's id with existing id
      await pages.employee.selectEmployeeForEditing(firstId)
      await pages.employee.updateEmployeeId(secondId)
      await pages.employee.clickSavePersonalDetailsButton()
      await pages.employee.verifyDuplicateIdError(testData.employeeData.duplicateIdError)    
      await pages.employee.snapshotDuplicateId()
    })
  })

  test.describe('Edit Job Details',  () => {
    test('TC-026: Update job title for selected employee', async({pages, testEmployeeId})=>{    
      // verify employee is in the list      
      await pages.employee.goToEmployeeList(testData.urls.employeeList) 
      await pages.employee.searchAndVerifyById(testEmployeeId!)

      //edit employee
      await pages.employee.selectEmployeeForEditing(testEmployeeId!)  
      await pages.employee.clickJobDetailsLink()
      await pages.employee.verifyPageUrl(testData.urls.editJobDetails)      

      // edit job details with job title   
      await pages.employee.addJobTitle(testData.employeeData.jobTitle)    

      // navigate to employee list to confirm change
      await pages.employee.goToEmployeeList(testData.urls.employeeList)
      await pages.employee.searchEmployeeByJobTitle(testData.employeeData.jobTitle)
      await pages.employee.verifyEmployeeSearchByJobTitle(testEmployeeId!, testData.employeeData.jobTitle)
    })

    test('TC-027: Update subunit for selected employee', async({pages, testEmployeeId})=>{      
      //verify employee is in the list
      await pages.employee.goToEmployeeList(testData.urls.employeeList)
      await pages.employee.searchAndVerifyById(testEmployeeId!)

      //edit employee
      await pages.employee.selectEmployeeForEditing(testEmployeeId!)  
      await pages.employee.clickJobDetailsLink()
      await pages.employee.verifyPageUrl(testData.urls.editJobDetails)      

      // edit subunit
      await pages.employee.addSubUnit(testData.employeeData.subUnit)    

      // navigate to employee list to confirm change
      await pages.employee.goToEmployeeList(testData.urls.employeeList)
      await pages.employee.searchEmployeeBySubUnit(testData.employeeData.subUnit)
      await pages.employee.verifyEmployeeSearchBySubUnit(testEmployeeId!, testData.employeeData.subUnit)
    })

    test('TC-028: Update status for selected employee', async({pages, testEmployeeId})=>{       
      //verify employee is in the list
      await pages.employee.goToEmployeeList(testData.urls.employeeList)
      await pages.employee.searchAndVerifyById(testEmployeeId!)

      //edit employee
      await pages.employee.selectEmployeeForEditing(testEmployeeId!)  
      await pages.employee.clickJobDetailsLink()
      await pages.employee.verifyPageUrl(testData.urls.editJobDetails)      

      // edit status
      await pages.employee.addStatus(testData.employeeData.employmentStatus)    

      // navigate to employee list to confirm change
      await pages.employee.goToEmployeeList(testData.urls.employeeList)
      await pages.employee.searchEmployeeByStatus(testData.employeeData.employmentStatus)
      await pages.employee.verifyEmployeeSearchByStatus(testEmployeeId!, testData.employeeData.employmentStatus)
    })

    test('TC-029: Terminate employment for selected employee', async({pages, testEmployeeId})=>{    
      //verify employee is in the list
      await pages.employee.goToEmployeeList(testData.urls.employeeList)
      await pages.employee.searchAndVerifyById(testEmployeeId!)

      //edit employee
      await pages.employee.selectEmployeeForEditing(testEmployeeId!)  
      await pages.employee.clickJobDetailsLink()
      await pages.employee.verifyPageUrl(testData.urls.editJobDetails)     

      // terminate
      await pages.employee.terminateEmployee(testData.employeeData.terminationReason)

      // navigate to employee list to confirm change
      await pages.employee.goToEmployeeList(testData.urls.employeeList)
      await pages.employee.searchEmployeeByEmployment(testData.employeeData.includeTerminated)   
      await pages.employee.verifyEmployeeSearchResultsById(testEmployeeId!)
    })

    test('TC-030: Terminate employment without required fields', async({pages})=>{        
      await pages.employee.goToEmployeeList(testData.urls.employeeList)

      //edit employee
      await pages.employee.clickEditFirstEmployeeButton()  
      await pages.employee.clickJobDetailsLink()
      await pages.employee.verifyPageUrl(testData.urls.editJobDetails)     

      // terminate
      await pages.employee.clickTerminateButton()
      await pages.employee.clickSaveButtonForTermination()
      await pages.employee.verifyMissingTerminationFields(testData.employeeData.missingRequiredFieldMsg)   
      await pages.employee.snapshotTerminateValidation()
    })
  })
})