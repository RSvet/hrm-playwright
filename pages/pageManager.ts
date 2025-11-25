import { Page } from '@playwright/test'
import { LoginPage } from './login.page'
import { DashboardPage } from './dashboard.page'
import { EmployeePage } from './employee.page'
import { HeaderPage } from './header.page'

export class PageManager {
  private loginPage?: LoginPage
  private dashboardPage?: DashboardPage
  private employeePage?: EmployeePage
  private headerPage?: HeaderPage

  constructor(private page: Page) {}

  get login() {
    if (!this.loginPage) {
      this.loginPage = new LoginPage(this.page)
    }
    return this.loginPage
  }

  get dashboard() {
    if (!this.dashboardPage) {
      this.dashboardPage = new DashboardPage(this.page)
    }
    return this.dashboardPage
  }

  get employee() {
    if (!this.employeePage) {
      this.employeePage = new EmployeePage(this.page)
    }
    return this.employeePage
  }

  get header() {
    if (!this.headerPage) {
      this.headerPage = new HeaderPage(this.page)
    }
    return this.headerPage
  }
}
