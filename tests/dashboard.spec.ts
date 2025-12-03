import { test } from '../fixtures/test-fixtures'
import { testData } from "../data/testData"

test.describe('Dashboard page scenarios', ()=>{
  test.beforeEach(async ({pages})=>{    
    await pages.login.loginUser(testData.credentials.validUsername, testData.credentials.validPassword)
  })
  
  test.describe('Dashboard loads correctly after login',  () => {
    test('TC-031: Verify dashboard UI elements after login', async({pages})=>{      
      await pages.dashboard.verifyDashboardPageUrl(testData.urls.dashboard)
      await pages.dashboard.expectDashboardTitle()
      await pages.dashboard.verifyDashboardWidgets(testData.dashboard.widgets)
    })  
  }) 

  test.describe('Navigation from the Dashboard page',  () => {
    test('TC-032: Verify navigation from dashboard quick links', async({pages})=>{       
      await pages.dashboard.verifyDashboardPageUrl(testData.urls.dashboard)
      await pages.dashboard.snapshotQuickLaunch()
      await pages.dashboard.verifyAllQuickLaunchButtons(testData.dashboard.quickLaunch)
    })  
  }) 

  test.describe('Dashboard accessibility and session validation',  () => {
    test('TC-033: Verify dashboard cannot be accessed after logout', async({pages})=>{     
      await pages.header.logout()     
      await pages.login.goto(testData.urls.dashboard)
      await pages.login.verifyPageUrl(testData.urls.login)
      await pages.login.verifyLoginFormTitleIsVisible()
    })      
  }) 
})

