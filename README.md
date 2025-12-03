## Test Automation Project – Playwright

This is a test automation project using Playwright with TypeScript, covering the login, dashboard, and PIM modules (creating, editing, and deleting employees) in an [HRM application](https://opensource-demo.orangehrmlive.com/).  
### Project Highlights
- Tests are organized following the Page Object Model design pattern.
- Fixtures are implemented for page management and test data setup.
- Visual regression testing is implemented via element-level snapshots for key UI components and forms.
- Test data is maintained in a separate file (testData.ts) for easier management.
### Covered test scenarios include:
   
   ### ✅ Login: 
   - Successful login
   - Missing credentials validation
   - Invalid credentials validation
   - Password reset and cancellation
   - Visual snapshot tests for login form and error states

   ### ✅ Dashboard: 
   - UI elements verification
   - Navigation through quick links
   - Access control validation (cannot access dashboard after logout)
   - Snapshot tests for key dashboard sections

   ### ✅ Employee Module (PIM): 
   - Add Employee: add employee with all fields, missing mandatory fields, cancel adding 
   - Search Employee: search by name, ID, invalid data, reset search
   - Edit Employee: update required fields, optional fields, handle duplicate IDs, terminate employment 
   - Delete Employee: delete individual employee, bulk deletion, cancel deletion
   - Visual snapshots: 
        - Add Employee form (empty required fields)

        - Edit Employee errors (duplicate ID, terminate with empty required fields)

### Test Structure

- `fixtures/` – Contains reusable fixtures for pages and test setup/teardown

- `pages/` – Page Objects for Login, Dashboard, Employee, Header, etc.

- `tests/` – Test files organized by feature (Login, Dashboard, PIM)

- `data/` – Test data used across scenarios

- `screenshots/` – Stores element-level snapshots for visual regression