import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class HeaderPage extends BasePage{
  private userDropdown: Locator;
  private logoutLink: Locator;

  constructor(page: Page) {
    super(page)
    this.userDropdown = this.page.locator('.oxd-userdropdown')
    this.logoutLink = this.page.getByRole('menuitem', {name: 'Logout'}) 
  }

  async logout() {
    await this.userDropdown.click();
    await this.logoutLink.click();
  }
}
