import base from '@playwright/test';
import { PageManager } from "../pages/pageManager"
import { testData } from '../data/testData';


export const test = base.extend<{
  pages: PageManager, 
  testEmployeeId?: string
}>({
  pages: async ({page}, use)=>{
    const pages = new PageManager(page)
    await page.goto(testData.urls.login)
    await use(pages)
  },
  testEmployeeId: async ({ pages }, use) => {    
    const id = await pages.employee.createTestEmployee(
      testData.employeeData.firstName,
      testData.employeeData.lastName
    )

    await use(id)
   
    await pages.employee.deleteEmployeeById(id);
  },
})