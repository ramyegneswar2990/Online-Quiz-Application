import React from "react";
import "./hom.css";
import { motion } from "framer-motion";

const hom = () => {
  return (
    <div className="home-container">
      <motion.div
        className="hero-section"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="hero-title">Welcome to QuizPro!</h1>
        <p className="hero-subtitle">
          Test your knowledge, track your progress, and become a quiz master.
        </p>
        <a href="/start" className="start-btn">
          Get Started
        </a>
      </motion.div>

      <motion.div
        className="about-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2>What is a Quiz?</h2>
        <p>
          A quiz is a fun and engaging way to assess knowledge on various topics
          like science, math, history, and more. It helps users learn and retain
          information effectively.
        </p>
      </motion.div>

      <motion.div
        className="features-section"
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2>Why Choose QuizPro?</h2>
        <ul>
          <li>✅ Interactive questions and instant feedback</li>
          <li>📊 Track your progress and achievements</li>
          <li>🌐 Wide range of quiz categories</li>
        </ul>
      </motion.div>
    </div>
  );
};

export default hom;
