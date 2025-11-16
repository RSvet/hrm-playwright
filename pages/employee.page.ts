import { Page, Locator, expect } from '@playwright/test'
import { BasePage } from './base.page'

export class EmployeePage extends BasePage{
  private pimMenu: Locator
  private addEmployeeButton: Locator
  private firstNameInput: Locator
  private firstNameError: Locator
  private lastNameInput: Locator
  private lastNameError: Locator
  private middleNameInput: Locator
  private employeeIdInput: Locator
  private saveButton: Locator
  private cancelButton: Locator
  private successToast: Locator
  private employeeNameInput: Locator
  private searchButton: Locator
  private confirmDeleteButton: Locator
  private cancelDeletionButton: Locator
  private noInfoToast: Locator
  private noRecords: Locator
  private tableCells: Locator
  private resetButton: Locator
  private searchInputs: Locator
  private selectInputs: Locator
  private deleteSelectedButton: Locator

  constructor(page: Page){
    super(page)
    this.pimMenu =  this.page.getByRole('link', {name: 'PIM'})

    // Add Employee Locators
    this.addEmployeeButton = this.page.locator('button:has-text("Add")')
    this.firstNameInput = this.page.locator('input[name="firstName"]')
    this.firstNameError = this.firstNameInput.locator('..').locator(':scope + span')
    this.lastNameInput = this.page.locator('input[name="lastName"]')
    this.lastNameError = this.lastNameInput.locator('..').locator(':scope + span')
    this.middleNameInput =  this.page.locator('input[name="middleName"]')
    this.employeeIdInput = this.page.locator('label:has-text("Employee Id")').locator('..').locator(':scope + div input')
    this.saveButton = this.page.locator('button:has-text("Save")')
    this.cancelButton =  this.page.locator('button:has-text("Cancel")')
    this.successToast = this.page.locator('.oxd-toast--success')

    // Employee List Locators
    this.employeeNameInput = this.page.locator('label:has-text("Employee Name")').locator('..').locator(':scope + div input')
    this.employeeIdInput = this.page.locator('label:has-text("Employee Id")').locator('..').locator(':scope + div input')
    this.searchButton = page.locator('button:has-text("Search")')
    this.confirmDeleteButton = this.page.locator('button:has-text("Yes, Delete")')
    this.cancelDeletionButton =  this.page.locator('button:has-text("No, Cancel")')
    this.noInfoToast = this.page.locator('.oxd-toast--info')
    this.noRecords = this.page.locator('span').getByText('No Records Found')
    this.tableCells =  this.page.locator('.oxd-table-cell')
    this.resetButton = this.page.locator('button:has-text("Reset")')
    this.searchInputs =  this.page.locator('.oxd-table-filter input')
    this.selectInputs = this.page.locator('.oxd-table-filter .oxd-select-text-input')
    this.deleteSelectedButton = this.page.locator('button:has-text("Delete Selected")')

  }

  
  async openPIM() {
    await this.pimMenu.click()
  }
  
  public async openAddEmployee() {
    await this.pimMenu.click()
    await this.addEmployeeButton.click()
  }

  private async populateFirstName(firstName: string){
    await this.type(this.firstNameInput, firstName)
  }

  private async populateLastName(lastName: string){
    await this.type(this.lastNameInput, lastName)
  }

  private async populateMiddleName(middleName:string){
    await this.type(this.middleNameInput, middleName)
  }

  async clickSaveButton(){
    await this.saveButton.click()
  }

  async clickCancelButton(){
    await this.cancelButton.click()
  }

  async clickResetButton(){
    await this.resetButton.click()
  }

  async clickConfirmDeleteButton(){
    await this.confirmDeleteButton.click()
  }

  async clickDeleteSelectedButton(){
    await this.deleteSelectedButton.click()
  }
    
  async addNewEmployee(firstName: string, lastName: string, middleName?: string) {
    await this.populateFirstName(firstName)
    await this.populateLastName(lastName)
    if (middleName) {
    await this.populateMiddleName(middleName)
    }
    const employeeId = await this.employeeIdInput.inputValue()
    await this.clickSaveButton()
    await this.expectVisible(this.successToast) 

    return employeeId
  }

  async createTestEmployee(firstName: string, lastName: string): Promise<string> {
    await this.openAddEmployee()
    return await this.addNewEmployee(firstName, lastName)
  }  
  
  private async selectEmployeeForDeletion(id: string){
     // Locate the row for the employee by ID
    const targetRow = this.page.getByRole('row', { name: id })

    // Click the delete button in that row
    const deleteButton = targetRow.locator('button [class*="trash"]')
    await deleteButton.click()
  }

  async checkEmployeeCheckBox(id:string){
    const targetRow = this.page.getByRole('row', { name: id })
    targetRow.getByRole('checkbox').check({force:true})
    await this.expectVisible(this.deleteSelectedButton)
  }

  async deleteEmployeeById(id: string) {
    this.selectEmployeeForDeletion(id)  
    await this.clickConfirmDeleteButton()
    await this.expectVisible(this.successToast) 
  }

  async deleteAndConfirm(id: string) {
  await this.deleteEmployeeById(id)
  await this.searchEmployeebyId(id)
  await this.verifyEmployeeDoesNotExist()
  }

  async cancelDeletion(id:string){
    this.selectEmployeeForDeletion(id)
    await this.cancelDeletionButton.click()
  }

  // verification methods

  async searchEmployeeByName(name: string) {
    await this.employeeNameInput.fill(name)
    await this.searchButton.click()
  }

  async searchEmployeebyId(id: string){
    await this.employeeIdInput.fill(id)
    await this.searchButton.click()
  }

  async verifyEmployeeSearchResultsByName(id: string, firstName: string, lastName: string, middleName?: string) {     
    const targetRow = this.page.getByRole('cell', {name: id}).locator('..')
    // Verify first name cell is visible within that row
     const nameText = middleName
    ? `${firstName} ${middleName}`
    : firstName

    const firstNameCell =  targetRow.locator('.oxd-table-cell', { hasText: nameText })
    await expect(firstNameCell).toBeVisible()

 
    // Verify last name cell is visible within that row
    const lastNameCell = targetRow.locator('.oxd-table-cell', { hasText: lastName })
    await expect(lastNameCell).toBeVisible()
  }
    
  async verifyEmployeeSearchResultsById(id: string) {  
    const row = this.page.getByRole('cell', { name: id }).locator('..')
    await expect(row).toBeVisible()
  }

  async searchAndVerifyById(id: string) {
    await this.openPIM()   
    await this.searchEmployeebyId(id)
    await this.verifyEmployeeSearchResultsById(id)
  }

  async verifyEmployeeDoesNotExist(){   
    await expect(this.tableCells).toHaveCount(0)
    await this.expectVisible(this.noInfoToast)
    await this.expectVisible(this.noRecords)
  }

  private async verifyInputsAreEmpty(){
    for (const input of await this.searchInputs.all()){
      await expect(input).toHaveValue('')
    }
  }

  private async verifySelectInputsAreEmpty(){
    for (const select of await this.selectInputs.all()){
      const selectedText = (await select.textContent())?.trim()
      if(selectedText !== 'Current Employees Only')
        expect (selectedText).toContain('Select')
    }
  }

  async verifySearchIsReset(){
    await this.verifyInputsAreEmpty()
    await this.verifySelectInputsAreEmpty()
    await this.expectVisible(this.tableCells.first())
    expect(await this.tableCells.count()).toBeGreaterThan(0)
  }

  async verifyMissingRequiredFieldsError(message: string){
    await this.expectText(this.firstNameError, message)    
    await this.expectText(this.lastNameError, message)
    await expect (this.firstNameInput).toHaveCSS('border-color', /rgb\(235,\s*\d+,\s*\d+\)/)
    await expect (this.lastNameInput).toHaveCSS('border-color', /rgb\(235,\s*\d+,\s*\d+\)/)
  }

}