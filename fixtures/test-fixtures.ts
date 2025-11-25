import base from '@playwright/test';
import { PageManager } from "../pages/pageManager"
import { testData } from '../data/testData';


export const test = base.extend<{pages: PageManager}>({
  pages: async ({page}, use)=>{
    const pages = new PageManager(page)
    await page.goto(testData.urls.login)
    await use(pages)
  }
})