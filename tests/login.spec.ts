import { test } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';
import { testData } from '../data/testData';

test.describe('Login page scenarios', ()=>{
  test.beforeEach(async ({page})=>{  
    await page.goto(testData.urls.login)
  })
  
  test.describe('Successful login',  () => {
    test('TC-001: Login in with correct credentials', async({page})=>{
      const loginPage = new LoginPage(page)
      const dashboardPage =  new DashboardPage(page)
      await loginPage.loginUser(testData.credentials.validUsername, testData.credentials.validPassword)
      await dashboardPage.verifyDashboardPageUrl(testData.urls.dashboard)
      await dashboardPage.expectDashboardTitle()
    })  
  })

  test.describe('Missing credentials',  () => {
    test('TC-002: Login with correct password and blank username', async({page})=>{
      const loginPage = new LoginPage(page)
      await loginPage.enterPassword(testData.credentials.validPassword)
      await loginPage.clickLoginButton()
      await loginPage.verifyMissingUsernameError(testData.loginMessages.missingCredential)  
    })

    test('TC-003: Login with correct username and blank password', async({page})=>{
      const loginPage = new LoginPage(page)
      await loginPage.enterUsername(testData.credentials.validUsername)
      await loginPage.clickLoginButton()
      await loginPage.verifyMissingPasswordError(testData.loginMessages.missingCredential)
  
    })

    test('TC-004: Login without credentials', async({page})=>{
      const loginPage =  new LoginPage(page)
      await loginPage.clickLoginButton()
      await loginPage.verifyMissingUsernameError(testData.loginMessages.missingCredential)  
      await loginPage.verifyMissingPasswordError(testData.loginMessages.missingCredential)      
    })
  
  })

  test.describe('Invalid credentials',  () => {
    test('TC-005: Login with invalid username and valid password', async({page})=>{
      const loginPage = new LoginPage(page)
      await loginPage.loginUser(testData.credentials.invalidUsername, testData.credentials.invalidPassword)
      await loginPage.verifyInvalidCredentialsMessage(testData.loginMessages.invalidCredentials)  
    })

    test('TC-006: Login with valid username and invalid password', async({page})=>{
      const loginPage = new LoginPage(page)
      await loginPage.loginUser(testData.credentials.validUsername, testData.credentials.invalidPassword)
      await loginPage.verifyInvalidCredentialsMessage(testData.loginMessages.invalidCredentials)  
    })

    test('TC-007: Login with invalid username and password', async({page})=>{
      const loginPage = new LoginPage(page)
      await loginPage.loginUser(testData.credentials.invalidUsername, testData.credentials.validPassword)
      await loginPage.verifyInvalidCredentialsMessage(testData.loginMessages.invalidCredentials)
    })
  
  })

   test.describe('Forgotten password',  () => {
    test('TC-008: Open Forgot Password page', async({page})=>{
      const loginPage = new LoginPage(page)
      await loginPage.clickForgotPasswordLink()
      await loginPage.verifyForgotPasswordTitle(testData.credentials.resetPasswordTitle)
      await loginPage.verifyPageUrl(testData.urls.passwordReset)
    })

    test('TC-009: Reset password without username', async({page})=>{
      const loginPage = new LoginPage(page)
      await loginPage.clickForgotPasswordLink()
      await loginPage.clickResetButton()
      await loginPage.verifyMissingUsernameError(testData.loginMessages.missingCredential)

    })

    test('TC-010: Reset with valid username', async({page})=>{
      const loginPage = new LoginPage(page)
      await loginPage.clickForgotPasswordLink()
      await loginPage.resetPassword(testData.credentials.validUsername)
      await loginPage.verifyForgotPasswordTitle(testData.credentials.resetPasswordSuccess)
    })

    test('TC-011: Cancel reset', async({page})=>{
      const loginPage = new LoginPage(page)
      await loginPage.clickForgotPasswordLink()
      await loginPage.cancelReset()
      await loginPage.verifyPageUrl(testData.urls.login)
    })
  
  })

})


