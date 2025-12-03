import { Page, Locator, expect } from '@playwright/test'
import { BasePage } from './base.page'

export class EmployeePage extends BasePage{
  // Menu
  private pimMenu: Locator

   // Add Employee
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
  private nameFieldsSection: Locator

  // Employee List
  private employeeNameInput: Locator
  private searchButton: Locator
  private resetButton: Locator
  private tableLoader: Locator
  private tableRows: Locator
  private tableCells: Locator
  private noRecords: Locator
  private noInfoToast: Locator
  private searchInputs: Locator
  private selectInputs: Locator
  private deleteSelectedButton: Locator
  private confirmDeleteButton: Locator
  private cancelDeletionButton: Locator
  private editFirstEmployeeButton: Locator
  private includeDropdown: Locator

  // Employee Details
  private savePersonalDetailsButton: Locator
  private jobDetailsLink: Locator
  private jobTitleDropdown: Locator
  private subUnitDropdown: Locator
  private statusDropdown: Locator

  // Termination
  private terminateButton: Locator
  private terminateModal: Locator
  private terminateDateInput: Locator
  private terminationDropdown: Locator
  private saveButtonForTermination: Locator
  private terminationDateError: Locator
  private terminationReasonError: Locator

  constructor(page: Page){
    super(page)

    // Menu
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
    this.nameFieldsSection = this.page.locator('.--name-grouped-field')

    // Employee List Locators
    this.employeeNameInput = this.page.locator('label:has-text("Employee Name")').locator('..').locator(':scope + div input')  
    this.searchButton = page.locator('button:has-text("Search")')
    this.resetButton = this.page.locator('button:has-text("Reset")')
    this.tableLoader = page.locator('.oxd-table-loader')
    this.tableRows = this.page.locator('.oxd-table-row')
    this.tableCells =  this.page.locator('.oxd-table-cell')
    this.noRecords = this.page.locator('span').getByText('No Records Found')
    this.noInfoToast = this.page.locator('.oxd-toast--info')
    this.searchInputs =  this.page.locator('.oxd-table-filter input')
    this.selectInputs = this.page.locator('.oxd-table-filter .oxd-select-text-input')
    this.deleteSelectedButton = this.page.locator('button:has-text("Delete Selected")')
    this.confirmDeleteButton = this.page.locator('button:has-text("Yes, Delete")')
    this.cancelDeletionButton =  this.page.locator('button:has-text("No, Cancel")')
    this.editFirstEmployeeButton =  this.page.locator('button [class*="pencil"]').first()
    this.includeDropdown = this.page.locator('label:has-text("Include")').locator('..').locator(':scope + div .oxd-select-text-input')

    // Employee Details Locators
    this.savePersonalDetailsButton = this.page.locator('button:has-text("Save")').first()
    this.jobDetailsLink = this.page.getByRole('link', { name: 'Job' })
    this.jobTitleDropdown = this.page.locator('label:has-text("Job Title")').locator('..').locator(':scope + div .oxd-select-text-input')
    this.subUnitDropdown = this.page.locator('label:has-text("Sub Unit")').locator('..').locator(':scope + div .oxd-select-text-input')
    this.statusDropdown = this.page.locator('label:has-text("Employment Status")').locator('..').locator(':scope + div .oxd-select-text-input')

    // Termination
    this.terminateButton = this.page.locator('.--termination-button')
    this.terminateModal =  this.page.locator('.orangehrm-dialog-modal:has-text("Terminate Employment")')
    this.terminateDateInput = this.page.locator('.orangehrm-dialog-modal [placeholder="yyyy-dd-mm"]')
    this.terminationDropdown = this.page.locator('label:has-text("Termination Reason")').locator('..').locator(':scope + div .oxd-select-text')
    this.saveButtonForTermination =  this.page.locator('.orangehrm-dialog-modal button:has-text("Save")')
    this.terminationDateError = this.page.locator('.orangehrm-dialog-modal .oxd-input-group', {hasText: 'Termination Date'}).locator('span')
    this.terminationReasonError = this.page.locator('.orangehrm-dialog-modal .oxd-input-group', {hasText: 'Termination Reason'}).locator('span')
  }

  // HELPERS

  private async clearAndFill(input: Locator, value: string) {
    await input.click({ clickCount: 3 })
    await input.press('Backspace')
    await input.fill(value)
  }

  private async waitForTableToLoad() {
    await this.tableLoader.waitFor({ state: 'hidden' })
  }

  private async searchByInput(input: Locator, value: string) {
    await this.populateField(input, value)
    await this.expectValue(input, value)
    await this.searchButton.click()
    await this.waitForTableToLoad()
  }

  private async selectFromDropdown(openDropdown: () => Promise<void>, selectedLocator: Locator, option: string) {
    await openDropdown()
    await this.page.getByRole('option', { name: option }).click()
    await this.expectText(selectedLocator, option)
  }
  
  private async searchByDropdown(openDropdown: () => Promise<void>, dropdownLocator: Locator, option: string) {
    await this.selectFromDropdown(openDropdown, dropdownLocator, option)   
    await this.searchButton.click()
    await this.waitForTableToLoad()
  }

  private async selectAndSave(openDropdown: () => Promise<void>, dropdownLocator: Locator, value: string) {
    await this.selectFromDropdown(openDropdown, dropdownLocator, value)      
    await this.clickSaveButton()
    await this.expectVisible(this.successToast)
  }

  private getRowById(id: string) {
    return this.page.getByRole('row', { name: id })
  }

  private async expectRowToContain(id: string, text: string) {
    const row = this.getRowById(id)
    const cell = row.locator('.oxd-table-cell', { hasText: text })
    await this.expectVisible(cell)
  }

  private async expectError(inputOrSelector: Locator, messageLocator: Locator, message: string) {
    await this.expectText(messageLocator, message)
    await this.expectErrorBorderColor(inputOrSelector)  
  }
  
  // SIMPLE ACTIONS

  async openPIM() {
    await this.pimMenu.click()
  } 

  private async populateFirstName(firstName: string){
    await this.populateField(this.firstNameInput, firstName)
  }

  private async populateLastName(lastName: string){
    await this.populateField(this.lastNameInput, lastName)
  }

  private async populateMiddleName(middleName:string){
    await this.populateField(this.middleNameInput, middleName)
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

  // COMPLEX ACTIONS  

  // Add Employee

  async openAddEmployee() {
    await this.openPIM()
    await this.addEmployeeButton.click()
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

  // Edit Employee - personal details
  
  async updateRequiredFields(firstName: string, lastName: string) {
    await this.clearAndFill(this.firstNameInput, firstName)
    await this.clearAndFill(this.lastNameInput, lastName)
    await this.clickSavePersonalDetailsButton()
  }

  private async checkGenderAndVerify(gender:string){
    await this.page.locator('label', {hasText: gender}).click()
    const genderBox = this.page.getByRole('radio', { name: gender })
    await expect(genderBox).toBeChecked()
  }

  private async updateMiddleName(middleName:string){    
    await this.clearAndFill(this.middleNameInput, middleName)    
  }

  async updateEmployeeId(id:string){
    await this.clearAndFill(this.employeeIdInput, id)   
  }

  async updateOptionalFields(middleName: string, id: string, gender: string){
    await this.checkGenderAndVerify(gender)
    await this.updateMiddleName(middleName)
    await this.updateEmployeeId(id)
    await this.clickSavePersonalDetailsButton()
  }

  // Edit Employee - job details

  async clickJobDetailsLink(){
    await this.jobDetailsLink.click()
    await this.expectVisible(this.jobTitleDropdown)
  }

  async addJobTitle(job:string){
    await this.selectAndSave(() => this.openJobTitleDropdown(), this.jobTitleDropdown, job)
  }

  async addSubUnit(subunit:string){
    await this.selectAndSave(() => this.openSubUnitDropdown(), this.subUnitDropdown, subunit)
  }

  async addStatus(status:string){
    await this.selectAndSave(() => this.openStatusDropdown(), this.statusDropdown, status)   
  }

  // Edit Employee - Termination

  private async formatDateForTermination(){
    const now = new Date()            
    const yyyy = now.getFullYear().toString()
    const mm = (now.getMonth() + 1).toString().padStart(2, '0')
    const dd = now.getDate().toString().padStart(2, '0')
    return `${yyyy}-${dd}-${mm}`
  }

  private async setTerminationDateToToday(){
    const todayTermination =  await this.formatDateForTermination()
    await this.populateField(this.terminateDateInput, todayTermination)
  }
  
  private async selectTerminationReason(reason:string){
    await this.selectFromDropdown(() => this.openTerminationReasonDropdown(), this.terminationDropdown, reason) 
  }

  async terminateEmployee(reason:string){
    await this.clickTerminateButton()
    await this.expectVisible(this.terminateModal)
    await this.setTerminationDateToToday()
    await this.selectTerminationReason(reason)
    await this.clickSaveButtonForTermination()
    await this.expectVisible(this.successToast)
  }

  // Employee list

  async goToEmployeeList(url:string) {
    await this.openPIM()
    await this.verifyPageUrl(url)
  }

  async searchEmployeeByName(name: string) {
    await this.searchByInput(this.employeeNameInput, name)  
  }

  async searchEmployeebyId(id: string){
    await this.searchByInput(this.employeeIdInput, id)
  }   

  async searchEmployeeByJobTitle(job:string){
    await this.searchByDropdown(() => this.openJobTitleDropdown(), this.jobTitleDropdown, job)
  }

  async searchEmployeeBySubUnit(subunit:string){
    await this.searchByDropdown(() => this.openSubUnitDropdown(), this.subUnitDropdown, subunit)  
  }

  async searchEmployeeByStatus(status:string){
    await this.searchByDropdown(() => this.openStatusDropdown(), this.statusDropdown, status)  
  }

  async searchEmployeeByEmployment(employment: string) {
    await this.searchByDropdown(() => this.openIncludeDropdown(), this.includeDropdown, employment);
  }

  /**
   * Returns first 2 employee IDs from rows that contain an editable/delete icon
   */  
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

  /**
   * Opens the Edit page for the employee with the given ID.
   */
  async selectEmployeeForEditing(id:string){    
    const targetRow = this.getRowById(id)  
    const editButton = targetRow.locator('button [class*="pencil"]')
    await editButton.click()
  }

  /**
   * Opens the Delete confirmation modal for the employee with the given ID.
   */
  private async openDeleteModalForEmployee(id: string){    
    const targetRow = this.getRowById(id)
    const deleteButton = targetRow.locator('button [class*="trash"]')
    await deleteButton.click()
  }

  /**
   * Selects a checkbox for the employee with the given ID.
   */
  async checkEmployeeCheckBox(id:string){
    const targetRow = this.getRowById(id)
    targetRow.getByRole('checkbox').check({force:true})
    await this.expectVisible(this.deleteSelectedButton)
  }

  async deleteEmployeeById(id: string) {
    this.openDeleteModalForEmployee(id)  
    await this.clickConfirmDeleteButton()
    await this.expectVisible(this.successToast) 
  }

  async deleteAndConfirm(id: string) {
    await this.deleteEmployeeById(id)
    await this.searchEmployeebyId(id)
    await this.verifyEmployeeDoesNotExist()
  }

  async cancelDeletion(id:string){
    await this.openDeleteModalForEmployee(id)
    await this.cancelDeletionButton.click()
  }
  
  // VERIFICATION METHODS

  async verifyEmployeeSearchResultsByName(id: string, firstName: string, lastName: string, middleName?: string) {
    const nameText = middleName
    ? `${firstName} ${middleName}`
    : firstName
      
    await this.expectRowToContain(id, nameText)   
    await this.expectRowToContain(id, lastName)   
  }
    
  async verifyEmployeeSearchResultsById(id: string) {  
    const row = this.getRowById(id)
    await this.expectVisible(row)
  }

  async verifyEmployeeSearchByJobTitle(id: string, job:string){
    await this.expectRowToContain(id, job)   
  }

  async verifyEmployeeSearchBySubUnit(id:string, subunit:string){
    await this.expectRowToContain(id, subunit)
  }

  async verifyEmployeeSearchByStatus(id:string, status:string){
    await this.expectRowToContain(id, status)   
  }

  async searchAndVerifyById(id: string) {   
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
    await this.expectError(this.firstNameInput, this.firstNameError, message)
    await this.expectError(this.lastNameInput, this.lastNameError, message)  
  }

  async verifyDuplicateIdError(message:string){
    await this.expectError(this.employeeIdInput, this.employeeIdError, message)       
  }

  async verifyMissingTerminationFields(message: string){
    await this.expectError(this.terminateDateInput, this.terminationDateError, message)  
    await this.expectError(this.terminationDropdown, this.terminationReasonError, message)   
  }

  //SNAPSHOTS
  
  async snapshotNameFieldsAddEmployee() {  
    await this.snapshotOnPage(this.nameFieldsSection, 'add-missing-required.png') 
  }

  async snapshotDuplicateId(){
    await this.snapshotOnPage(this.employeeIdError, 'add-duplicate-id.png')
  }

  async snapshotTerminateValidation() {  
    await this.snapshotOnPage(this.terminateModal, 'terminate-missing-required.png') 
  }
    
}