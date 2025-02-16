import React, { useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [hover, setHover] = useState(null);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to the Online Quiz System!</h1>
      <p style={styles.description}>
        Test your knowledge and skills with our exciting quizzes on various topics.
      </p>

      <h2 style={styles.subHeading}>Get Started</h2>

      <div style={styles.buttonContainer}>
        <Link
          to="/Userlogin"
          className="button"
          style={{
            ...styles.button,
            backgroundColor:
              hover === "user"
                ? styles.buttonHover.backgroundColor
                : styles.button.backgroundColor,
          }}
          onMouseEnter={() => setHover("user")}
          onMouseLeave={() => setHover(null)}
        >
          User Login
        </Link>

        <Link
          to="/Adminlogin"
          className="button"
          style={{
            ...styles.button,
            backgroundColor:
              hover === "admin"
                ? styles.buttonHover.backgroundColor
                : styles.button.backgroundColor,
          }}
          onMouseEnter={() => setHover("admin")}
          onMouseLeave={() => setHover(null)}
        >
          Admin Login
        </Link>
      </div>
    </div>
  );
}

// 💡 Moved styles to external CSS for better maintainability
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    width: "100%",
    textAlign: "center",
    background: "linear-gradient(135deg, #FAF3E0 0%, #FFD700 100%)",
    color: "#4A3F35",
    padding: "20px",
    overflow: "hidden",
  },
  heading: {
    fontSize: "2.8rem",
    fontWeight: "bold",
    color: "#4A3F35",
  },
  description: {
    fontSize: "1.2rem",
    maxWidth: "600px",
    color: "#5A4B3B",
    lineHeight: "1.5",
  },
  subHeading: {
    marginTop: "20px",
    fontSize: "1.8rem",
    color: "#4A3F35",
  },
  buttonContainer: {
    marginTop: "25px",
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  button: {
    padding: "14px 28px",
    borderRadius: "30px",
    backgroundColor: "#A97155",
    color: "#FAF3E0",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "1rem",
    transition: "0.3s ease-in-out",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    display: "inline-block",
  },
  buttonHover: {
    backgroundColor: "#8B5E3B",
  },
};

export default Home;
