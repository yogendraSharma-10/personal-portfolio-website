import React from 'react';
import ReactDOM from 'react-dom/client'; // For React 18+
import App from './App';
import './styles/main.css'; // Import global styles

/**
 * The main entry point for the React application.
 * This file is responsible for rendering the root App component into the DOM.
 */

// Find the root DOM element where the React application will be mounted.
// This element is typically defined in `client/public/index.html` with an ID of 'root'.
const rootElement = document.getElementById('root');

// Check if the root element exists to prevent errors if the HTML structure is incomplete.
if (rootElement) {
  // Create a React root for concurrent mode (React 18+).
  // This is the recommended way to render React applications in modern React,
  // enabling features like automatic batching, transitions, and suspense.
  const root = ReactDOM.createRoot(rootElement);

  // Render the main App component into the root.
  // React.StrictMode is a tool for highlighting potential problems in an application.
  // It activates additional checks and warnings for its descendants during development mode.
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  // Log an error if the root element is not found. This indicates a critical issue
  // with the application's setup, as React has no place to mount itself.
  console.error('Failed to find the root element with ID "root". Ensure it exists in public/index.html.');
}