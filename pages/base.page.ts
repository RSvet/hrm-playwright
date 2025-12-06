import { expect, Locator, Page } from "@playwright/test";

export class BasePage {
  protected page: Page

  constructor(page: Page){
    this.page = page
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  async populateField(element: Locator, text: string){
    await element.fill(text)
  }

  async expectVisible(element: Locator){
    await expect (element).toBeVisible()
  }

  async expectText(element: Locator, text: string){
    await expect (element).toHaveText(text)
  }

  async expectValue(element: Locator, text: string){
    await expect (element).toHaveValue(text)
  }

  async verifyPageUrl(text: string){
    await expect (this.page).toHaveURL(new RegExp (text))
  }

  async expectErrorBorderColor(element: Locator, colorRegex = /rgb\(235,\s*\d+,\s*\d+\)/) {
    await expect(element).toHaveCSS('border-color', colorRegex);
  }

  async snapshotOnPage(element:Locator, fileName:string){
    await expect(element).toBeVisible()
    await element.scrollIntoViewIfNeeded()
    await element.page().evaluate(() => document.fonts.ready)
    await expect(element).toHaveScreenshot(fileName,{
    animations: 'disabled',
    scale: 'css',
    })
  }

}