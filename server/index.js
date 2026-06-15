const express = require('express');
const cors = require('cors');
const helmet = require('helmet'); // For security headers
const dotenv = require('dotenv');
const contactRoutes = require('./routes/contact');
const config = require('./config'); // Import configuration

// Load environment variables from .env file
dotenv.config();

// Initialize the Express application
const app = express();

// ============================================================================
// Security Middleware
// ============================================================================

// Helmet helps secure Express apps by setting various HTTP headers.
// It's a collection of 14 smaller middleware functions that set security-related HTTP headers.
app.use(helmet());

// ============================================================================
// CORS Configuration
// ============================================================================

// Configure CORS (Cross-Origin Resource Sharing) to allow requests from the frontend.
// The client URL is fetched from the config, defaulting to localhost:3000 for development.
const corsOptions = {
    origin: config.CLIENT_URL, // Allow requests from the specified client origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
    credentials: true, // Allow cookies to be sent with requests
    optionsSuccessStatus: 204 // Some legacy browsers (IE11, various SmartTVs) choke on 200
};
app.use(cors(corsOptions));

// ============================================================================
// Body Parser Middleware
// ============================================================================

// express.json() parses incoming requests with JSON payloads.
// It's based on body-parser and is included in Express starting from 4.16.0.
app.use(express.json());

// express.urlencoded() parses incoming requests with URL-encoded payloads.
// This is often used for form submissions.
app.use(express.urlencoded({ extended: true })); // `extended: true` allows for rich objects and arrays to be encoded into the URL-encoded format.

// ============================================================================
// API Routes
// ============================================================================

/**
 * @route GET /
 * @description Root endpoint for API health check and service discovery.
 *              Provides information about the portfolio API and related microservices.
 */
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Personal Portfolio API is running!',
        serviceName: 'Personal Portfolio Backend',
        version: '1.0.0',
        environment: process.env.NODE_ENV || 'development',
        uptime: process.uptime(), // Server uptime in seconds
        availableRoutes: {
            contact: '/api/contact'
        },
        // Cross-project context: Mention related services and their API endpoints
        // These URLs would typically be configured via environment variables in a real microservice setup
        relatedServices: [
            { name: 'Collaborative Task Management System', api_base_url: process.env.TASK_MANAGER_API_URL || 'http://localhost:5001/api' },
            { name: 'Real-time Collaborative Whiteboard', api_base_url: process.env.WHITEBOARD_API_URL || 'http://localhost:5002/api' },
            { name: 'Micro Social Media Dashboard', api_base_url: process.env.SOCIAL_MEDIA_API_URL || 'http://localhost:5003/api' },
            { name: 'Multi-vendor E-commerce Marketplace', api_base_url: process.env.ECOMMERCE_API_URL || 'http://localhost:5004/api' }
        ],
        documentation: '/api-