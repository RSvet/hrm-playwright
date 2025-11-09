export const testData = {
   credentials: {
    validUsername: 'Admin',
    validPassword: 'admin123',    
    invalidUsername: 'wrongUser', 
    invalidPassword: 'wrongPass',
    resetPasswordTitle: 'Reset Password',
    resetPasswordSuccess: 'Reset Password link sent successfully'
  }, 
  
  loginMessages: {
    missingCredential: 'Required',  
    invalidCredentials: 'Invalid credentials',
  },

  urls: {
    login: 'auth/login',
    passwordReset: 'requestPasswordResetCode',
    dashboard: 'dashboard'
  }
}