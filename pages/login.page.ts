import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";
import path from "path";

export class LoginPage extends BasePage {
  private loginTitle: Locator
  private usernameInput: Locator
  private usernameError: Locator
  private passwordInput: Locator
  private passwordError: Locator
  private loginButton: Locator
  private cancelResetButton: Locator
  private resetPasswordButton: Locator
  private forgotPasswordLink: Locator
  private forgotPasswortTitle: Locator  
  private loginForm:Locator

  constructor(page: Page){
    super(page)
    this.loginTitle = this.page.getByRole('heading', {name: 'Login'})
    this.usernameInput = this.page.getByRole('textbox', {name: "Username"})
    this.usernameError = this.usernameInput.locator('..').locator(':scope + span')
    this.passwordInput = this.page.locator('[type="password"]')
    this.passwordError = this.passwordInput.locator('..').locator(':scope + span')
    this.loginButton = this.page.getByRole('button', {name: "Login"})
    this.cancelResetButton =  this.page.getByRole('button', {name: "Cancel"})
    this.resetPasswordButton = this.page.getByRole('button', {name: "Reset Password"})
    this.forgotPasswordLink =  this.page.locator('.orangehrm-login-forgot-header')
    this.forgotPasswortTitle = this.page.locator('h6.orangehrm-forgot-password-title')
    this.loginForm =  this.page.locator('.orangehrm-login-form')
  }

  // Actions

  async enterUsername(username: string){
    await this.populateField(this.usernameInput, username)   
  }

  async enterPassword(password: string){
    await this.populateField(this.passwordInput, password) 
  }

  async clickLoginButton(){
    await this.loginButton.click()
  } 

  async clickForgotPasswordLink(){
    await this.forgotPasswordLink.click()
  }
  
  async clickResetButton (){
    await this.resetPasswordButton.click()
  }

  async cancelReset(){
    await this.cancelResetButton.click()
  }

  async loginUser(username: string, password: string){
    await this.enterUsername(username)
    await this.enterPassword(password)
    await this.clickLoginButton()
  }

  async resetPassword(username: string){
    await this.enterUsername(username)
    await this.clickResetButton()
  }
  
  //Verifications

  async verifyLoginFormTitleIsVisible(){
    await this.expectVisible(this.loginTitle)
    await this.expectText(this.loginTitle, 'Login')
  }

  async verifyForgotPasswordTitle(title: string){
    await this.expectText(this.forgotPasswortTitle, title)
  }

  async verifyMissingUsernameError(message: string){
    await this.expectText(this.usernameError, message)
    await this.expectErrorBorderColor(this.usernameInput)
  }

   async verifyMissingPasswordError(message: string){
    await this.expectText(this.passwordError, message) 
    await this.expectErrorBorderColor(this.passwordInput)    
  }

  async verifyInvalidCredentialsMessage(message: string) {
    await this.expectVisible(this.page.getByText(message))
  }

  //Snapshots
  
  async snapshotEmptyLoginForm() {
    await this.snapshotOnPage(this.loginForm, 'login-empty.png') 
  }

  async snapshotMissingCredentialsError() {
    await this.snapshotOnPage(this.loginForm, 'login--missing-error.png') 
  }

  async snapshotInvalidCredentialsError() {
    await this.snapshotOnPage(this.loginForm, 'login--invalid-error.png') 
  }

}