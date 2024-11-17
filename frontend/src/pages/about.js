import React from 'react';
import '../about.css'; // Import a CSS file for styling (optional)

const About = () => {
    return (
        <div className="about-page mt-5">
            <h1 className='mt-5'>About Us</h1>
            <p>Welcome to <strong>The Book Path</strong>!</p>
            <p>
                The Book Path is a platform designed to help book lovers discover, share, and review their favorite reads. Our mission is to create a community of readers who can share their thoughts and recommendations with each other.
            </p>
            <h2>Features</h2>
            <ul>
                <li><strong>Discover New Books:</strong> Explore a wide range of genres and find your next great read.</li>
                <li><strong>Share Your Reviews:</strong> Contribute to our community by sharing your reviews and ratings for books.</li>
                <li><strong>Connect with Other Readers:</strong> Engage with fellow book lovers and participate in discussions.</li>
            </ul>
          
            <h2>Contact Us</h2>
            <p>If you have any questions, suggestions, or feedback, feel free to reach out to us at <a href="mailto:dhinesboopathy1112@gmail.com">dhinesboopathy1112@gmail.com</a>.</p>
        </div>
    );
};

export default About;
