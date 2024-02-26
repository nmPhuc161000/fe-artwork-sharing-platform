// Trong tệp About.js
import React from 'react';

function About() {
  return (
    <div className="about">
      <h2>About Us</h2>
      <p>Welcome to our website!</p>
      <div className="info">
        <p><strong>Name:</strong> John Doe</p>
        <p><strong>Address:</strong> 123 Street, City</p>
        <p><strong>Phone:</strong> 123-456-7890</p>
        <p><strong>Email:</strong> johndoe@example.com</p>
      </div>
    </div>
  );
}

export default About;
