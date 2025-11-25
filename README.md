## Test Automation Project – Playwright

This is a test automation project using Playwright with TypeScript, covering the login, dashboard, and PIM modules (creating, editing, and deleting employees) in an [HRM application](https://opensource-demo.orangehrmlive.com/).  
- Tests are organized following the Page Object Model design pattern.
- Fixtures are implemented for page management and test data setup.
- Covered test scenarios include:
   
    ✅ Login: successful login, validation errors, password reset  
    ✅ Dashboard: UI elements verification, navigation via quick links  
    ✅ Employee Module (PIM): adding, searching, editing, and deleting employees  
- Test data is maintained in a separate file (testData.ts) for easier management.
  
- Tests combine UI actions and API calls for setup and teardown of test data.

Note: API testing is planned for future iterations.
