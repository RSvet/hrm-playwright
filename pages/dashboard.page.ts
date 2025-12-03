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

  // Verifications

  async verifyDashboardPageUrl(url: string){
    await this.verifyPageUrl(url)
  }

  async expectDashboardTitle(){
    await this.expectVisible(this.dashboardTitle)
    await this.expectText(this.dashboardTitle, 'Dashboard')
  }

  /**
   * Verifies titles on the dashboard cards (widgets)   
   */
  async verifyDashboardWidgets(expectedWidgets: string[]){
    const actualWidgets = await this.dashboardCardNames.allTextContents();
    const normalizedActual = actualWidgets.map(w => w.trim().toLowerCase());
    const normalizedExpected = expectedWidgets.map(w => w.trim().toLowerCase());
    expect(normalizedActual).toEqual(normalizedExpected);    
  }

  // Actions

  /**
   * Clicks the button from the Quick Launch section and verifies url
   */  
  async clickQuickLaunchOption(option: string, expectedUrlPart: string) {
    await this.quickLaunchSection.getByRole('button', {name: option}).click();
    await this.verifyPageUrl(expectedUrlPart)
  }

  /**
   * Loops through all quick launch options, clicks button and verifies url
   */
  async verifyAllQuickLaunchButtons(buttons: { name: string, urlPart: string }[]){
    for (const btn of buttons) {
      await this.clickQuickLaunchOption(btn.name, btn.urlPart)
      await this.page.goBack(); // Return to dashboard for next button
    }
  }

    //Snapshot
  
  async snapshotQuickLaunch() {
    await this.page.mouse.move(0, 0)
    await this.snapshotOnPage(this.quickLaunchSection, 'dashboard-quick-launch.png') 
  }
}