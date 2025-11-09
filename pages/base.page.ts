import { expect, Locator, Page } from "@playwright/test";

export class BasePage {
  protected page: Page

  constructor(page: Page){
    this.page = page
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  async type(element: Locator, text: string){
    await element.fill(text)
  }

  async expectVisible(element: Locator){
    await expect (element).toBeVisible()
  }

  async expectText(element: Locator, text: string){
    await expect (element).toHaveText(text)
  }

  async verifyPageUrl(text: string){
    await expect (this.page).toHaveURL(new RegExp (text))
  }

}