import React, { useState } from 'react';

/**
 * @typedef {object} ContactFormData
 * @property {string} name - The name of the sender.
 * @property {string} email - The email of the sender.
 * @property {string} message - The message content.
 */

/**
 * ContactForm component for submitting inquiries through a backend API.
 * It manages form state, handles user input, performs API submission,
 * and provides feedback to the user regarding the submission status.
 */
const ContactForm = () => {
  // State to hold the current form data (name, email, message)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // State to track the submission status: 'idle', 'submitting', 'success', 'error'
  const [status, setStatus] = useState('idle');
  // State to store the feedback message displayed to the user
  const [feedbackMessage, setFeedbackMessage] = useState('');

  /**
   * Handles changes to form input fields (text, email, textarea).
   * Updates the `formData` state based on the input's name and value.
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e - The change event object.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  /**
   * Handles the form submission event.
   * Prevents default form behavior, sets submission status, sends data to the backend API,
   * and updates UI based on the API response.
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event object.
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default browser form submission
    setStatus('submitting');
    setFeedbackMessage('Sending your message...');

    try {
      // Use an environment variable for the API base URL for flexibility in different environments.
      // e.g., REACT_APP_API_BASE_URL=http://localhost:5000 in .env.development
      const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json(); // Parse the JSON response from the server

      if (response.ok) {
        setStatus('success');
        setFeedbackMessage(data.message || 'Message sent successfully! I will get back to you shortly.');
        // Reset form fields after a successful submission
        setFormData({ name: '', email: '', message: '' });

        // --- Cross-Project Context Simulation ---
        // In a larger microservice ecosystem, a successful contact form submission
        // might trigger subsequent actions in other services. For instance:
        // - A new lead/task could be created in the "Collaborative Task Management System".
        // - An internal notification might be posted to a "Micro Social Media Dashboard" for team awareness.
        // - Customer details could be added to a CRM or a "Multi-vendor E-commerce Marketplace" for future outreach.
        // This frontend component's role is to send the initial request; the backend (server/index.js, server/routes/contact.js)
        // would be responsible for orchestrating these cross-service interactions.
        // --- End Cross-Project Context Simulation ---

      } else {
        setStatus('error');
        // Display server-provided error message or a generic one
        setFeedbackMessage(data.message || 'Failed to send message. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setStatus('error');
      setFeedbackMessage('Network error. Please check your connection and try again.');
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <p className="section-description">
          Have a question, a project idea, or just want to say hello? I'd love to hear from you!
        </p>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="name" className="sr-only">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              aria-label="Your Name"
              className="form-input"
              disabled={status === 'submitting'} // Disable inputs during submission
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="sr-only">Your Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              aria-label="Your Email"
              className="form-input"
              disabled={status === 'submitting'}
            />
          </div>

          <div className="form-group">
            <label htmlFor="message" className="sr-only">Your Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="6"
              required
              aria-label="Your Message"
              className="form-textarea"
              disabled={status === 'submitting'}
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn btn-primary contact-submit-btn"
            disabled={status === 'submitting'} // Disable button when submitting
            aria-live="polite" // Announce status changes to screen readers
          >
            {status === 'submitting' ? 'Sending...' : 'Send Message'}
          </button>

          {/* Display feedback message to the user */}
          {feedbackMessage && (
            <p
              className={`feedback-message ${status === 'success' ? 'success' : status === 'error' ? 'error' : ''}`}
              role="status" // Indicates that this element is a live region where updates are important
              aria-live="assertive" // Ensures screen readers announce changes immediately
            >
              {feedbackMessage}
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactForm;