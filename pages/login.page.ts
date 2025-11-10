import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

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
  }

  async enterUsername(username: string){
    await this.type(this.usernameInput, username)   
  }

  async enterPassword(password: string){
    await this.type(this.passwordInput, password) 
  }

  async clickLoginButton(){
    await this.loginButton.click()
  } 

  async loginUser(username: string, password: string){
    await this.enterUsername(username)
    await this.enterPassword(password)
    await this.clickLoginButton()
  }

  async clickForgotPasswordLink(){
    await this.forgotPasswordLink.click()
  }
  
  async verifyLoginFormTitleIsVisible(){
    await this.expectVisible(this.loginTitle)
    await this.expectText(this.loginTitle, 'Login')
  }
  
  async verifyForgotPasswordTitle(title: string){
    await this.expectText(this.forgotPasswortTitle, title)
  }

  async verifyMissingUsernameError(message: string){
    await this.expectText(this.usernameError, message)
    await expect (this.usernameInput).toHaveCSS('border-color', /rgb\(235,\s*\d+,\s*\d+\)/)
  }

  async verifyMissingPasswordError(message: string){
    await this.expectText(this.passwordError, message)    
    await expect (this.passwordInput).toHaveCSS('border-color', /rgb\(235,\s*\d+,\s*\d+\)/)
  }

  async verifyInvalidCredentialsMessage(message: string) {
    await this.expectVisible(this.page.getByText(message))
  }

  async resetPassword(username: string){
    await this.enterUsername(username)
    await this.clickResetButton()
  }

  async clickResetButton (){
    await this.resetPasswordButton.click()
  }

  async cancelReset(){
    await this.cancelResetButton.click()
  }

}