import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class DashboardPage extends BasePage{
  private dashboardTitle: Locator
  private dashboardCardNames: Locator
  private quickLaunchSection: Locator
    
  constructor(page: Page){
    super(page)
    this.dashboardTitle = this.page.locator('h6')
    this.dashboardCardNames = this.page.locator('.orangehrm-dashboard-widget-name')
    this.quickLaunchSection = this.page.locator('.orangehrm-quick-launch')
  
  }

  async verifyDashboardPageUrl(url: string){
    await this.verifyPageUrl(url)
  }

  async expectDashboardTitle(){
    await this.expectVisible(this.dashboardTitle)
    await this.expectText(this.dashboardTitle, 'Dashboard')
  }

  /**
   * Verifies titles on the dashboard cards (widgets)
   * @param {array} expectedWidgets
   */
  async verifyDashboardWidgets(expectedWidgets: string[]){
    const actualWidgets = await this.dashboardCardNames.allTextContents();
    const normalizedActual = actualWidgets.map(w => w.trim().toLowerCase());
    const normalizedExpected = expectedWidgets.map(w => w.trim().toLowerCase());
    expect(normalizedActual).toEqual(normalizedExpected);    
  }

  /**
   * Clicks the button from the Quick Launch section and verifies url
   * @param {string }option - button name
   * @param {string} expectedUrlPart 
   */  
  async clickQuickLaunchOption(option: string, expectedUrlPart: string) {
    await this.quickLaunchSection.getByRole('button', {name: option}).click();
    await this.verifyPageUrl(expectedUrlPart)
  }

  /**
   * Loops through all quick launch options, clicks button and verifies url
   * @param buttons - array of objects with button names and resulting urls
   */
  async verifyAllQuickLaunchButtons(buttons: { name: string, urlPart: string }[]){
    for (const btn of buttons) {
      await this.clickQuickLaunchOption(btn.name, btn.urlPart)
      await this.page.goBack(); // Return to dashboard for next button
    }
  }
}