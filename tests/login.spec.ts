import { test } from '../fixtures/test-fixtures'
import { testData } from '../data/testData'

test.describe('Login page scenarios', ()=>{  
  test.describe('Successful login',  () => {
    test('TC-001: Login in with correct credentials', async({pages})=>{    
      await pages.login.loginUser(testData.credentials.validUsername, testData.credentials.validPassword)
      await pages.dashboard.verifyDashboardPageUrl(testData.urls.dashboard)
      await pages.dashboard.expectDashboardTitle()
    })  
  })

  test.describe('Missing credentials',  () => {
    test('TC-002: Login with correct password and blank username', async({pages})=>{    
      await pages.login.enterPassword(testData.credentials.validPassword)
      await pages.login.clickLoginButton()
      await pages.login.verifyMissingUsernameError(testData.loginMessages.missingCredential)  
    })

    test('TC-003: Login with correct username and blank password', async({pages})=>{      
      await pages.login.enterUsername(testData.credentials.validUsername)
      await pages.login.clickLoginButton()
      await pages.login.verifyMissingPasswordError(testData.loginMessages.missingCredential)  
    })

    test('TC-004: Login without credentials', async({pages})=>{      
      await pages.login.clickLoginButton()
      await pages.login.verifyMissingUsernameError(testData.loginMessages.missingCredential)  
      await pages.login.verifyMissingPasswordError(testData.loginMessages.missingCredential)      
    })  
  })

  test.describe('Invalid credentials',  () => {
    test('TC-005: Login with invalid username and valid password', async({pages})=>{   
      await pages.login.loginUser(testData.credentials.invalidUsername, testData.credentials.invalidPassword)
      await pages.login.verifyInvalidCredentialsMessage(testData.loginMessages.invalidCredentials)  
    })

    test('TC-006: Login with valid username and invalid password', async({pages})=>{     
      await pages.login.loginUser(testData.credentials.validUsername, testData.credentials.invalidPassword)
      await pages.login.verifyInvalidCredentialsMessage(testData.loginMessages.invalidCredentials)  
    })

    test('TC-007: Login with invalid username and password', async({pages})=>{    
      await pages.login.loginUser(testData.credentials.invalidUsername, testData.credentials.validPassword)
      await pages.login.verifyInvalidCredentialsMessage(testData.loginMessages.invalidCredentials)
    })  
  })

  test.describe('Forgotten password',  () => {
    test.beforeEach(async ({pages})=>{ 
      await pages.login.clickForgotPasswordLink()
    })

    test('TC-008: Open Forgot Password page', async({pages})=>{          
      await pages.login.verifyForgotPasswordTitle(testData.credentials.resetPasswordTitle)
      await pages.login.verifyPageUrl(testData.urls.passwordReset)
    })

    test('TC-009: Reset password without username', async({pages})=>{     
      await pages.login.clickResetButton()
      await pages.login.verifyMissingUsernameError(testData.loginMessages.missingCredential)
    })

    test('TC-010: Reset with valid username', async({pages})=>{ 
      await pages.login.resetPassword(testData.credentials.validUsername)
      await pages.login.verifyForgotPasswordTitle(testData.credentials.resetPasswordSuccess)
    })

    test('TC-011: Cancel reset', async({pages})=>{
      await pages.login.cancelReset()
      await pages.login.verifyPageUrl(testData.urls.login)
    })
  
  })

})


