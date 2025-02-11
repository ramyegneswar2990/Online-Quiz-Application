import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to the Online Quiz System!</h1>
      <p style={styles.description}>
        Test your knowledge and skills with our exciting quizzes on various topics.
      </p>
      <h2 style={styles.subHeading}>Get Started</h2>
      <div style={styles.buttonContainer}>
        <Link to="/Userlogin" style={styles.button}>
          User Login
        </Link>
        <Link to="/Adminlogin" style={styles.button}>
          Admin Login
        </Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    textAlign: 'center',
    background: 'linear-gradient(135deg, #FAF3E0 0%, #FFD700 100%)', // Soft beige to golden gradient
    color: '#4A3F35', // Dark brown for readability
    padding: '20px',
  },
  heading: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#4A3F35', // Dark brown
  },
  description: {
    fontSize: '1.2rem',
    maxWidth: '600px',
    color: '#5A4B3B', // Softer brown for text contrast
  },
  subHeading: {
    marginTop: '20px',
    fontSize: '1.8rem',
    color: '#4A3F35',
  },
  buttonContainer: {
    marginTop: '20px',
  },
  button: {
    margin: '10px',
    padding: '12px 24px',
    borderRadius: '25px',
    backgroundColor: '#A97155', // Warm brown button
    color: '#FAF3E0', // Beige text
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '1rem',
    transition: '0.3s ease-in-out',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
  },
  buttonHover: {
    backgroundColor: '#8B5E3B', // Darker brown on hover
  },
};

export default Home;
