import React, { useState, useEffect } from 'react';
import ContactForm from './components/ContactForm';
import './styles/main.css'; // Main application styles

/**
 * Main application component for the Personal Portfolio Website.
 * This component orchestrates the different sections of the portfolio,
 * including navigation, hero, about, skills, projects, and contact.
 */
function App() {
  // State to manage UI feedback for the contact form submission
  const [contactMessage, setContactMessage] = useState({ type: '', text: '' });

  // Example data for skills and projects
  const skills = [
    { name: 'React', icon: 'fab fa-react' },
    { name: 'Node.js', icon: 'fab fa-node-js' },
    { name: 'Express.js', icon: 'fas fa-server' },
    { name: 'MongoDB', icon: 'fas fa-database' },
    { name: 'HTML5', icon: 'fab fa-html5' },
    { name: 'CSS3', icon: 'fab fa-css3-alt' },
    { name: 'JavaScript (ES6+)', icon: 'fab fa-js' },
    { name: 'Git & GitHub', icon: 'fab fa-git-alt' },
    { name: 'Docker', icon: 'fab fa-docker' },
    { name: 'AWS', icon: 'fab fa-aws' },
  ];

  const projects = [
    {
      id: 1,
      title: 'Collaborative Task Management System',
      description: 'A robust platform for teams to manage tasks, track progress, and collaborate in real-time. Features include task assignment, due dates, priority levels, and user roles.',
      tech: ['React', 'Node.js', 'MongoDB', 'Socket.IO'],
      link: 'https://github.com/yourusername/task-management-system', // Placeholder link
      liveLink: 'https://task-management.example.com', // Placeholder live link
      context: 'Part of an interconnected system, integrating with user profiles from the Social Media Dashboard.',
    },
    {
      id: 2,
      title: 'Real-time Collaborative Whiteboard',
      description: 'An interactive whiteboard application enabling multiple users to draw, write, and brainstorm together in real-time. Ideal for remote teams and online education.',
      tech: ['React', 'Node.js', 'WebSockets', 'Canvas API'],
      link: 'https://github.com/yourusername/whiteboard-app',
      liveLink: 'https://whiteboard.example.com',
      context: 'Designed for seamless integration with video conferencing tools and document sharing services.',
    },
    {
      id: 3,
      title: 'Micro Social Media Dashboard',
      description: 'A personal dashboard aggregating feeds and notifications from various social media platforms. Features include custom widgets, analytics, and scheduled posting.',
      tech: ['React', 'Express.js', 'OAuth', 'REST APIs'],
      link: 'https://github.com/yourusername/social-media-dashboard',
      liveLink: 'https://social-dashboard.example.com',
      context: 'Serves as a central hub for user activity, potentially linking to user profiles across other services.',
    },
    {
      id: 4,
      title: 'Multi-vendor E-commerce Marketplace',
      description: 'A scalable e-commerce platform supporting multiple vendors, product listings, secure payments, and order management. Includes admin panels for vendor and product oversight.',
      tech: ['Next.js', 'Stripe API', 'PostgreSQL', 'GraphQL'],
      link: 'https://github.com/yourusername/ecommerce-marketplace',
      liveLink: 'https://marketplace.example.com',
      context: 'Features a robust API for product synchronization and order fulfillment, potentially integrating with inventory management systems.',
    },
    {
      id: 5,
      title: 'Personal Portfolio Website (This Site)',
      description: 'The very site you are viewing! A responsive and modern portfolio showcasing my skills, projects, and contact information. Built with a focus on performance and user experience.',
      tech: ['React', 'Node.js', 'CSS3', 'Netlify'],
      link: 'https://github.com/yourusername/personal-portfolio',
      liveLink: 'https://yourportfolio.com',
      context: 'This project serves as a demonstration of my front-end and back-end development capabilities.',
    },
  ];

  /**
   * Callback function to handle messages from the ContactForm component.
   * @param {string} type - 'success' or 'error'
   * @param {string} text - The message to display
   */
  const handleContactMessage = (type, text) => {
    setContactMessage({ type, text });
    // Clear message after a few seconds
    setTimeout(() => {
      setContactMessage({ type: '', text: '' });
    }, 5000);
  };

  return (
    <div className="app-container">
      {/* Header Section */}
      <header className="header">
        <nav className="navbar">
          <div className="logo">
            <a href="#hero">My Portfolio</a>
          </div>
          <ul className="nav-links">
            <li><a href="#about">About</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="hero" className="hero-section">
        <div className="hero-content">
          <h1>Hi, I'm [Your Name]</h1>
          <p className="tagline">A Full-Stack Developer passionate about building innovative web solutions.</p>
          <a href="#projects" className="btn btn-primary">View My Work</a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="container">
          <h2>About Me</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                I'm a dedicated full-stack developer with a strong foundation in modern web technologies.
                My journey in software development began with a curiosity for how things work,
                which quickly evolved into a passion for creating robust and user-friendly applications.
              </p>
              <p>
                With expertise in React for dynamic front-ends and Node.js/Express for scalable back-ends,
                I thrive on solving complex problems and delivering high-quality code. I'm always eager
                to learn new technologies and contribute to impactful projects.
              </p>
              <p>
                Beyond coding, I enjoy [mention a hobby, e.g., hiking, reading, gaming] and staying
                up-to-date with the latest industry trends.
              </p>
            </div>
            <div className="about-image">
              {/* Placeholder for a profile picture */}
              <img src="https://via.placeholder.com/300" alt="Your Name" />
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills-section bg-light">
        <div className="container">
          <h2>My Skills</h2>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div key={index} className="skill-item">
                <i className={`${skill.icon} skill-icon`}></i>
                <h3>{skill.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section">
        <div className="container">
          <h2>My Projects</h2>
          <div className="projects-grid">
            {projects.map(project => (
              <div key={project.id} className="project-card">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tech">
                  {project.tech.map((tech, index) => (
                    <span key={index} className="tech-badge">{tech}</span>
                  ))}
                </div>
                {project.context && <p className="project-context"><em>Context: {project.context}</em></p>}
                <div className="project-links">
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                    <i className="fab fa-github"></i> GitHub
                  </a>
                  {project.liveLink && (
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                      <i className="fas fa-external-link-alt"></i> Live Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section bg-light">
        <div className="container">
          <h2>Get In Touch</h2>
          <p className="contact-intro">
            Have a question, a project idea, or just want to say hello?
            Feel free to reach out using the form below!
          </p>
          {contactMessage.text && (
            <div className={`alert alert-${contactMessage.type}`}>
              {contactMessage.text}
            </div>
          )}
          <ContactForm onMessage={handleContactMessage} />
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} [Your Name]. All rights reserved.</p>
          <div className="social-links">
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a>
            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
            {/* Add more social links as needed */}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;