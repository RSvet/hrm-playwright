import test from "@playwright/test"
import { testData } from "../data/testData"
import { LoginPage } from "../pages/login.page"
import { DashboardPage } from "../pages/dashboard.page"
import { HeaderPage } from "../pages/header.page"

test.describe('Dashboard page scenarios', ()=>{
  test.beforeEach(async ({page})=>{  
    await page.goto(testData.urls.login)
    const loginPage = new LoginPage(page)
    await loginPage.loginUser(testData.credentials.validUsername, testData.credentials.validPassword)
  })
  
  test.describe('Dashboard loads correctly after login',  () => {
    test('TC-031: Verify dashboard UI elements after login', async({page})=>{
      const dashboardPage =  new DashboardPage(page)      
      await dashboardPage.verifyDashboardPageUrl(testData.urls.dashboard)
      await dashboardPage.expectDashboardTitle()
      await dashboardPage.verifyDashboardWidgets(testData.dashboard.widgets)
    })  
  }) 

  test.describe('Navigation from the Dashboard page',  () => {
    test('TC-032: Verify navigation from dashboard quick links', async({page})=>{
      const dashboardPage =  new DashboardPage(page)      
      await dashboardPage.verifyDashboardPageUrl(testData.urls.dashboard)
      await dashboardPage.verifyAllQuickLaunchButtons(testData.dashboard.quickLaunch)
    })  
  }) 

  test.describe('Dashboard accessibility and session validation',  () => {
    test('TC-033: Verify dashboard cannot be accessed after logout', async({page})=>{
      const header = new HeaderPage(page)
      await header.logout()
      const loginPage = new LoginPage(page)
      await loginPage.goto(testData.urls.dashboard)
      await loginPage.verifyPageUrl(testData.urls.login)
      await loginPage.verifyLoginFormTitleIsVisible()
    })      
  }) 
})

