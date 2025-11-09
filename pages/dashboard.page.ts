import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class DashboardPage extends BasePage{
  private dashboardTitle: Locator
  constructor(page: Page){
    super(page)
    this.dashboardTitle = this.page.locator('h6')
  }

  async verifyDashboardPageUrl(url: string){
    await this.verifyPageUrl(url)
  }

  async expectDashboardTitle(){
    await this.expectVisible(this.dashboardTitle)
    await this.expectText(this.dashboardTitle, 'Dashboard')
  }
}