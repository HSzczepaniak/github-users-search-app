# GitHub Users Search App

This React application allows users to search for GitHub users and view their basic profile information. It features infinite scrolling, debounced search, and a responsive design using Material-UI components.

## Features

- Search for GitHub users by username
- Display user cards with avatar, username, and profile link
- Infinite scrolling to load more results
- Debounced search to minimize API calls
- Responsive design for various screen sizes
- Error handling and loading states
- Dark mode theme
- Util context creator that creates a typed context with a custom hook and provider

## Technologies Used

- React 18
- TypeScript
- Material-UI (MUI) for UI components
- React Query for data fetching and caching
- React Hook Form for form handling
- Yup for form validation
- React Intersection Observer for infinite scrolling
- Jest and React Testing Library for unit testing

## Project Structure

- `src/components`: React components (GithubUsers, UserCard, UsernameForm, etc.)
- `src/contexts`: React context for GitHub users data
- `src/utils`: Utility functions (context creator)
- `src/types`: TypeScript type definitions
- `src/tests`: Unit tests for components and utilities

## Getting Started

1. Clone the repository:

   ```
   git clone https://github.com/HSzczepaniak/github-users-search-app.git
   cd github-users-search-app
   ```

2. Install dependencies:

   ```
   yarn install
   ```

3. Start the development server:

   ```
   yarn start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Available Scripts

In the project directory, you can run:

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner in interactive watch mode
- `npm run build`: Builds the app for production to the `build` folder
- `npm run eject`: Ejects the create-react-app configuration (one-way operation)

## Testing

The project includes unit tests for components and utilities. Run the tests using:

```
yarn test
```
