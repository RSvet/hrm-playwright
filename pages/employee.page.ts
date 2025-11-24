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
  private employeeIdError: Locator
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
  private tableRows: Locator
  private resetButton: Locator
  private searchInputs: Locator
  private selectInputs: Locator
  private deleteSelectedButton: Locator
  private savePersonalDetailsButton: Locator
  private editFirstEmployeeButton: Locator
  private jobDetailsLink: Locator
  private jobTitleDropdown: Locator
  private subUnitDropdown: Locator
  private statusDropdown: Locator
  private terminateButton: Locator
  private terminateModal: Locator
  private terminateDateInput: Locator
  private terminationDropdown: Locator
  private includeDropdown: Locator
  private saveButtonForTermination: Locator
  private terminationDateError: Locator
  private terminationReasonError: Locator
  private tableLoader: Locator

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
    this.employeeIdError = this.employeeIdInput.locator('..').locator(':scope + span')
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
    this.tableRows = this.page.locator('.oxd-table-row')
    this.tableCells =  this.page.locator('.oxd-table-cell')
    this.resetButton = this.page.locator('button:has-text("Reset")')
    this.searchInputs =  this.page.locator('.oxd-table-filter input')
    this.selectInputs = this.page.locator('.oxd-table-filter .oxd-select-text-input')
    this.deleteSelectedButton = this.page.locator('button:has-text("Delete Selected")')
    this.editFirstEmployeeButton =  this.page.locator('button [class*="pencil"]').first()
    this.includeDropdown = this.page.locator('label:has-text("Include")').locator('..').locator(':scope + div .oxd-select-text-input')
    this.tableLoader = page.locator('.oxd-table-loader')

    // Employee Details Locators
    this.savePersonalDetailsButton = this.page.locator('button:has-text("Save")').first()
    this.jobDetailsLink = this.page.getByRole('link', { name: 'Job' })
    this.jobTitleDropdown = this.page.locator('label:has-text("Job Title")').locator('..').locator(':scope + div .oxd-select-text-input')
    this.subUnitDropdown = this.page.locator('label:has-text("Sub Unit")').locator('..').locator(':scope + div .oxd-select-text-input')
    this.statusDropdown = this.page.locator('label:has-text("Employment Status")').locator('..').locator(':scope + div .oxd-select-text-input')
    this.terminateButton = this.page.locator('.--termination-button')
    this.terminateModal =  this.page.locator('.orangehrm-dialog-modal:has-text("Terminate Employment")')
    this.terminateDateInput = this.page.locator('.orangehrm-dialog-modal [placeholder="yyyy-dd-mm"]')
    this.terminationDropdown = this.page.locator('label:has-text("Termination Reason")').locator('..').locator(':scope + div .oxd-select-text')
    this.saveButtonForTermination =  this.page.locator('.orangehrm-dialog-modal button:has-text("Save")')
    this.terminationDateError = this.page.locator('.orangehrm-dialog-modal .oxd-input-group', {hasText: 'Termination Date'}).locator('span')
    this.terminationReasonError = this.page.locator('.orangehrm-dialog-modal .oxd-input-group', {hasText: 'Termination Reason'}).locator('span')
  }

  
  async openPIM() {
    await this.pimMenu.click()
  }
  
  public async openAddEmployee() {
    await this.openPIM()
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

  async clickSaveButtonForTermination(){
    await this.saveButtonForTermination.click()
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

  async clickEditFirstEmployeeButton(){
    await this.editFirstEmployeeButton.click()
  }

  async clickSavePersonalDetailsButton(){
    await this.savePersonalDetailsButton.click()
  }

  async clickTerminateButton(){
    await this.terminateButton.click()
  }

  async clickJobDetailsLink(){
    await this.jobDetailsLink.click()
    await this.expectVisible(this.jobTitleDropdown)
  }

  async openJobTitleDropdown(){     
    await this.jobTitleDropdown.click()
  }

  async openSubUnitDropdown(){
    await this.subUnitDropdown.click()
  }

  async openStatusDropdown(){
    await this.statusDropdown.click()
  }

  async openTerminationReasonDropdown(){
    await this.terminationDropdown.click()
  }

  async openIncludeDropdown(){
    await this.includeDropdown.click()
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

  private async clearAndFill(input: Locator, value: string) {
    await input.click({ clickCount: 3 })
    await input.press('Backspace')
    await input.fill(value)
  }

  async updateRequiredFields(firstName: string, lastName: string) {
    await this.clearAndFill(this.firstNameInput, firstName)
    await this.clearAndFill(this.lastNameInput, lastName)
    await this.clickSavePersonalDetailsButton()
  }

  async checkGenderAndVerify(gender:string){
    await this.page.locator('label', {hasText: gender}).click()
    const genderBox = this.page.getByRole('radio', { name: gender })
    await expect(genderBox).toBeChecked()
  }

  async updateMiddleName(middleName:string){
    //clear and fill middle name
    await this.clearAndFill(this.middleNameInput, middleName)    
  }

  async updateEmployeeId(id:string){
    await this.clearAndFill(this.employeeIdInput, id)   
  }

  async updateOptionalFields(middleName: string, id: string, gender: string){
    await this.checkGenderAndVerify(gender)
    await this.updateMiddleName(middleName)
    await this.updateEmployeeId(id)
    await this.savePersonalDetailsButton.click()
  }

  async terminateEmployee(reason:string){
    await this.clickTerminateButton()
    await this.expectVisible(this.terminateModal)
    await this.setTerminationDateToToday()
    await this.selectTerminationReason(reason)
    await this.clickSaveButtonForTermination()
    await this.expectVisible(this.successToast)
  }

  async formatDateForTermination(){
    const now = new Date()            
    const yyyy = now.getFullYear().toString()
    const mm = (now.getMonth() + 1).toString().padStart(2, '0')
    const dd = now.getDate().toString().padStart(2, '0')
    return `${yyyy}-${dd}-${mm}`;
  }

  async setTerminationDateToToday(){
    const todayTermination =  await this.formatDateForTermination()
    await this.type(this.terminateDateInput, todayTermination)
  }
  
  private async selectEmployeeForDeletion(id: string){
     // Locate the row for the employee by ID
    const targetRow = this.page.getByRole('row', { name: id })

    // Click the delete button in that row
    const deleteButton = targetRow.locator('button [class*="trash"]')
    await deleteButton.click()
  }

  async selectEmployeeForEditing(id:string){
    // Locate the row for the employee by ID
    const targetRow = this.page.getByRole('row', {name:id})
    // Click edit button in the row
    const editButton = targetRow.locator('button [class*="pencil"]')
    await editButton.click()
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
    await this.selectEmployeeForDeletion(id)
    await this.cancelDeletionButton.click()
  }

  async getTwoEmployeeIds() {
    const editableRows = this.tableRows.filter({ has: this.page.locator('button [class*="trash"]') })

    await editableRows.first().waitFor({ state: 'visible' })

    const allIds = []
    for (const row of await editableRows.all()) {
      const idCell = row.locator('.oxd-table-cell').nth(1)
      const idText = (await idCell.textContent())?.trim()
      if (idText) allIds.push(idText)
    }
    return allIds.slice(0, 2)
  }

  async selectJobTitle(job:string){
    await this.openJobTitleDropdown()
    await this.page.getByRole('option', {name: job}).click()
    await this.expectText(this.jobTitleDropdown, job)
  }

  async selectSubUnit(subunit: string){
    await this.openSubUnitDropdown()
    await this.page.getByRole('option', {name: subunit}).click()
    await this.expectText(this.subUnitDropdown, subunit)
  }

  async selectStatus(status: string){
    await this.openStatusDropdown()
    await this.page.getByRole('option', {name: status}).click()
    await this.expectText(this.statusDropdown, status)
  }

  async selectTerminationReason(reason:string){
    await this.openTerminationReasonDropdown()
    await this.page.getByRole('option', {name: reason}).click()
    await this.expectText(this.terminationDropdown, reason)
  }

  async addJobTitle(job:string){
    await this.selectJobTitle(job)
    await this.clickSaveButton()
    await this.expectVisible(this.successToast)
  }

  async addSubUnit(subunit:string){
    await this.selectSubUnit(subunit)
    await this.clickSaveButton()
    await this.expectVisible(this.successToast)
  }

  async addStatus(status:string){
    await this.selectStatus(status)
    await this.clickSaveButton()
    await this.expectVisible(this.successToast)
  }

  async selectEmployment(employment:string){
    await this.openIncludeDropdown()
    await this.page.getByRole('option', {name: employment}).click()   
    await this.expectText(this.includeDropdown, employment) 
  }
  // verification methods

  async searchEmployeeByName(name: string) {
    await this.employeeNameInput.fill(name)
    await this.expectValue(this.employeeNameInput, name)
    await this.searchButton.click()
    await this.tableLoader.waitFor({ state: "hidden" })
  }

  async searchEmployeebyId(id: string){
    await this.employeeIdInput.fill(id)
    await this.expectValue(this.employeeIdInput, id)
    await this.searchButton.click()
    await this.tableLoader.waitFor({ state: "hidden" })   
  }

  async searchEmployeeByJobTitle(job:string){
    await this.selectJobTitle(job)
    await this.expectText(this.jobTitleDropdown, job)
    await this.searchButton.click()
    await this.tableLoader.waitFor({ state: "hidden" })
  }

  async searchEmployeeBySubUnit(subunit:string){
    await this.selectSubUnit(subunit)
    await this.expectText(this.subUnitDropdown, subunit)
    await this.searchButton.click()
    await this.tableLoader.waitFor({ state: "hidden" })
  }

  async searchEmployeeByStatus(status:string){
    await this.selectStatus(status)
    await this.expectText(this.statusDropdown, status)
    await this.searchButton.click()
    await this.tableLoader.waitFor({ state: "hidden" })
  }

  async verifyEmployeeSearchResultsByName(id: string, firstName: string, lastName: string, middleName?: string) {     
    const targetRow = this.page.getByRole('cell', {name: id}).locator('..')
    const nameText = middleName
    ? `${firstName} ${middleName}`
    : firstName
    
    // Verify first name cell is visible within that row
    const firstNameCell =  targetRow.locator('.oxd-table-cell', { hasText: nameText })
    await this.expectVisible(firstNameCell)
   
    // Verify last name cell is visible within that row
    const lastNameCell = targetRow.locator('.oxd-table-cell', { hasText: lastName })
    await this.expectVisible(lastNameCell)
  }
    
  async verifyEmployeeSearchResultsById(id: string) {  
    const row = this.page.getByRole('cell', { name: id }).locator('..')
    await this.expectVisible(row)
  }

  async verifyEmployeeSearchByJobTitle(id: string, job:string){
    const targetRow = this.page.getByRole('cell', {name: id}).locator('..')
    const jobTitleCell =  targetRow.locator('.oxd-table-cell', { hasText: job })
    await this.expectVisible(jobTitleCell)
  }

  async verifyEmployeeSearchBySubUnit(id:string, subunit:string){
    const targetRow = this.page.getByRole('cell', {name: id}).locator('..')
    const subUnitCell = targetRow.locator('.oxd-table-cell', {hasText: subunit})
    await this.expectVisible(subUnitCell)
  }

  async verifyEmployeeSearchByStatus(id:string, status:string){
    const targetRow = this.page.getByRole('cell', {name: id}).locator('..')
    const statusCell = targetRow.locator('.oxd-table-cell', {hasText: status})
    await this.expectVisible(statusCell)
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

  async verifyDuplicateIdError(message:string){
    await this.expectText(this.employeeIdError, message)
    await expect (this.employeeIdInput).toHaveCSS('border-color', /rgb\(235,\s*\d+,\s*\d+\)/)
  }

  async verifyMissingTerminationFields(message: string){
    await this.expectText(this.terminationDateError, message)
    await this.expectText(this.terminationReasonError, message)
    await expect (this.terminateDateInput).toHaveCSS('border-color', /rgb\(235,\s*\d+,\s*\d+\)/)
    await expect (this.terminationDropdown).toHaveCSS('border-color', /rgb\(235,\s*\d+,\s*\d+\)/)
  }
  async verifyTableIsVisible(){
    await this.expectVisible(this.tableRows.first())
  }
}