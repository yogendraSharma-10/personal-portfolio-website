// server/config/index.js

/**
 * @file Configuration file for the Personal Portfolio Website backend.
 * @description Loads environment variables and provides a centralized configuration object
 *              for server settings, API keys, and external service URLs.
 */

require('dotenv').config(); // Load environment variables from .env file

/**
 * Validates that a critical environment variable is set.
 * If not set, it logs an error and exits the process.
 * @param {string} varName - The name of the environment variable to check.
 * @returns {string} The value of the environment variable.
 */
const getRequiredEnv = (varName) => {
  const value = process.env[varName];
  if (!value) {
    console.error(`Error: Environment variable "${varName}" is not set. Please check your .env file.`);
    process.exit(1); // Exit the application if a critical variable is missing
  }
  return value;
};

/**
 * Validates that an environment variable is set.
 * If not set, it logs a warning.
 * @param {string} varName - The name of the environment variable to check.
 * @returns {string | undefined} The value of the environment variable, or undefined if not set.
 */
const getOptionalEnv = (varName) => {
  const value = process.env[varName];
  if (!value) {
    console.warn(`Warning: Environment variable "${varName}" is not set. Some features might be unavailable.`);
  }
  return value;
};

/**
 * Configuration object for the portfolio backend.
 * All settings are loaded from environment variables, with sensible defaults where possible.
 */
const config = {
  /**
   * Application environment (e.g., 'development', 'production', 'test').
   * Defaults to 'development'.
   */
  env: process.env.NODE_ENV || 'development',

  /**
   * Port on which the server will listen.
   * Defaults to 5000.
   */
  port: parseInt(process.env.PORT || '5000', 10),

  /**
   * The origin URL of the client-side application.
   * Used for CORS (Cross-Origin Resource Sharing) to allow requests from the frontend.
   * Defaults to 'http://localhost:3000' for local development.
   */
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',

  /**
   * Configuration for the email service used by the contact form.
   * Currently supports SendGrid.
   */
  email: {
    provider: process.env.EMAIL_SERVICE_PROVIDER || 'sendgrid', // e.g., 'sendgrid', 'nodemailer'
    apiKey: getRequiredEnv('EMAIL_API_KEY'), // API key for the email service (e.g., SendGrid API Key)
    senderEmail: getRequiredEnv('SENDER_EMAIL'), // The email address from which contact form emails will be sent
    recipientEmail: process.env.RECIPIENT_EMAIL || getRequiredEnv('SENDER_EMAIL'), // The email address to which contact form emails will be sent (defaults to sender)
  },

  /**
   * Configuration for external microservices or interconnected systems.
   * These URLs are used to simulate a larger ecosystem and could be used for
   * future integrations (e.g., fetching data from other services).
   */
  microservices: {
    /**
     * Base URL for the Collaborative Task Management System API.
     * Example: 'http://localhost:8001/api/tasks'
     */
    taskManagerApiUrl: getOptionalEnv('TASK_MANAGER_API_URL') || 'http://localhost:8001/api/tasks',

    /**
     * Base URL for the Real-time Collaborative Whiteboard API.
     * Example: 'http://localhost:8002/api/whiteboard'
     */
    whiteboardApiUrl: getOptionalEnv('WHITEBOARD_API_URL') || 'http://localhost:8002/api/whiteboard',

    /**
     * Base URL for the Micro Social Media Dashboard API.
     * Example: 'http://localhost:8003/api/social'
     */
    socialMediaApiUrl: getOptionalEnv('SOCIAL_MEDIA_API_URL') || 'http://localhost:8003/api/social',

    /**
     * Base URL for the Multi-vendor E-commerce Marketplace API.
     * Example: 'http://localhost:8004/api/ecommerce'
     */
    ecommerceApiUrl: getOptionalEnv('ECOMMERCE_API_URL') || 'http://localhost:8004/api/ecommerce',
  },

  /**
   * Any other general application settings can be added here.
   */
  app: {
    name: 'Personal Portfolio Backend',
    version: '1.0.0',
  },
};

module.exports = config;