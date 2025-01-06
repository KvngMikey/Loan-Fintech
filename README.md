## SIMPLIFIED LOAN MANAGEMENT APP
This is a simple loan management app built with React, TypeScript, Vite, TailwindCSS, and React Router. The application displays a homepage with user account details, active loan, and recent transactions history. It also includes routing for loan history and loan request features.

**Setup Instructions**
### Prerequisites
Node.js (version 18 or higher recommended)
npm package manager

### Clone the repository
git clone <repository-url>
cd <repository-folder>

### Install dependencies
npm install

### Start development server
npm run dev

### Run unit test
npm run test

**Approach**
### Project Setup
Used Vite for a fast, lightweight development environment.
Configured TypeScript for strong type-checking and better code maintainability.
Added TailwindCSS for utility-first styling and rapid UI development.

### Routing
Configured React Router in index.tsx to handle navigation between pages.
Defined routes for the Homepage and Loan History page.

### Component Design
Created reusable, modular components in the components folder.
Focused on separation of concerns and reusable UI components (e.g., Header, Transactions, LoanDetailsModal).

### Homepage
Displays user data, including account balance, current loan, and a recent transaction table.
Includes CTA buttons for viewing loan details and loan history.

### Loan History Page
Displays a table with loan history data.
Includes a button for requesting a new loan.

### State Management
Used React's useState and useEffect hooks for local state and side effects (e.g., fetching user data).
Passed props to child components to maintain a clean and predictable data flow.

### Testing
Wrote unit tests using Jest and React Testing Library.
Covered key functionalities, such as:
Rendering components with mock data.
Verifying button clicks trigger appropriate actions (e.g., opening modals, navigating routes).
Ensuring API calls fetch the expected data.