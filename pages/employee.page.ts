import { Page, Locator, expect } from '@playwright/test'
import { BasePage } from './base.page'

export class EmployeePage extends BasePage{
  private pimMenu: Locator
  private addEmployeeButton: Locator
  private firstNameInput: Locator
  private lastNameInput: Locator
  private employeeIdInput: Locator
  private saveButton: Locator
  private successToast: Locator
  private employeeNameInput: Locator
  private searchButton: Locator
  private confirmDeleteButton: Locator

  constructor(page: Page){
    super(page)
    this.pimMenu =  this.page.getByRole('link', {name: 'PIM'})

    // Add Employee Locators
    this.addEmployeeButton = this.page.locator('button:has-text("Add")')
    this.firstNameInput = this.page.locator('input[name="firstName"]')
    this.lastNameInput = this.page.locator('input[name="lastName"]')
    this.employeeIdInput = this.page.locator('label:has-text("Employee Id")').locator('..').locator(':scope + div input')
    this.saveButton = this.page.locator('button:has-text("Save")')
    this.successToast = this.page.locator('.oxd-toast--success')

    // Employee List Locators
    this.employeeNameInput = this.page.locator('label:has-text("Employee Name")').locator('..').locator(':scope + div input')
    this.searchButton = page.locator('button:has-text("Search")')
    this.confirmDeleteButton = this.page.locator('button:has-text("Yes, Delete")')
  }

  
  async openPIM() {
    await this.pimMenu.click()
  }
  
  async openAddEmployee() {
    await this.pimMenu.click()
    await this.addEmployeeButton.click()
  }

  async populateFirstName(firstName: string){
    await this.type(this.firstNameInput, firstName)
  }

  async populateLastName(lastName: string){
    await this.type(this.lastNameInput, lastName)
  }

  async clickSaveButton(){
    await this.saveButton.click()
  }

  async addNewEmployee(firstName: string, lastName: string) {
    await this.populateFirstName(firstName)
    await this.populateLastName(lastName)
    const employeeId = await this.employeeIdInput.inputValue()
    await this.clickSaveButton()
    await this.expectVisible(this.successToast) 

    return employeeId
  }
  
  async searchEmployeeByName(name: string) {
    await this.employeeNameInput.fill(name)
    await this.searchButton.click()
  }

  async verifyEmployeeSearchResults(id: string, firstName: string, lastName: string) {
    const targetRow = this.page.getByRole('row', { name: id })

      // Verify first name cell is visible within that row
    const firstNameCell = targetRow.locator('.oxd-table-cell', { hasText: firstName })
    await expect(firstNameCell).toBeVisible()

    // Verify last name cell is visible within that row
    const lastNameCell = targetRow.locator('.oxd-table-cell', { hasText: lastName })
    await expect(lastNameCell).toBeVisible()
  }

  async deleteEmployeeById(id: string) {
    // Locate the row for the employee by ID
    const targetRow = this.page.getByRole('row', { name: id })

    // Click the delete button in that row
    const deleteButton = targetRow.locator('button [class*="trash"]')
    await deleteButton.click()

    // Confirm deletion in the modal/dialog  
    await this.confirmDeleteButton.click()
    await this.expectVisible(this.successToast) 
  }
}