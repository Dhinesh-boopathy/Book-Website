import React from "react";
import Footer from "../components/Footer";
import '../home.css';
import feelingStuckImage from '../images/Feeling-stuck.avif';
import displineImage from '../images/discipline.png';
import authorImage from '../images/reading-book.webp';

function Home() {
  return (
    <>  
      {/* Section with background image */}
      <div className=" py-4   backgroundImage">
        <div className="mx-5 mt-5 flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold lh-1 mb-3 text-light">Welcome to The Book Path!</h1>
            <h3 className="display-7 mt-4 fw-bold text-light">Discover Your Next Great Read</h3>
            <p className="lead text-light">
              At Book Review Hub, we're passionate about books and believe that a good
              read can uplift your spirits and provide inspiration. Whether you're feeling frustrated and need some motivational books or simply
              looking for your next read, you've come to the right place.
            </p>
          </div>
        </div>
      </div>
      <hr />

      {/* Explore books */}
      {/* Motivational books */}
      <div className="px-4 pb-4 text-center">
        <h3 className="display-7 mt-5 fw-bold">Feeling Stuck? Find Motivation Through Books!</h3>
        <div>
          <img className="my-5" alt="killDepressionImage" src={feelingStuckImage} width="350" height="250" />
        </div>
        <p className="lead inspiration mb-4">
          <strong>"Life can sometimes be challenging, and we all need a little inspiration."</strong><br />
        </p>
        <p className="px-4 explore-pTags">
          Our platform offers a curated collection of motivational books reviewed by readers just like you.
          Find the perfect book and boost your spirits with our collection of motivational books.
          Whether you’re facing challenges or just need a little push, these books offer the inspiration you need.
        </p>

        {/* Discipline books */}
        <h3 className="display-7 mt-5 fw-bold">"Want to become disciplined."</h3>
        <div>
          <img className="my-5" alt="disciplineImage" src={displineImage} width="350" height="250" />
        </div>
        <p className="px-4 explore-pTags">
          Looking to build better habits or improve your discipline? Discover books that offer 
          practical advice and proven strategies to help you become the best version of yourself.
        </p>

        {/* Author Books */}
        <h3 className="display-7 mt-5 fw-bold">"Are you a fan of a specific author?"</h3>
        <div>
          <img className="my-5" alt="authorImage" src={authorImage} width="350" height="250" />
        </div>
        <p className="px-4 explore-pTags">
          Use our search tool to find books by your favorite writers and explore their entire bibliography.
        </p>
        <hr />

        {/* Why choose us */}
        <div className="col-lg-6 mx-auto">
          <h1 className="pt-4">Why choose "The Book Path"?</h1>
          <ul className="text-start mt-1 py-1">
            <li>
              <p><strong>Personalized Recommendations:</strong>Feeling stuck or unmotivated? Use our search feature to
              find books that match your current mood or goals. Whether it’s motivation, discipline, or something else, our curated categories make it easy to find the perfect book.</p>
            </li>
            <li>
              <p><strong>Community Reviews:</strong>Our platform is built on the power of community. Read honest reviews from fellow readers who share their insights
              and experiences with different books. Get a real sense of what each book offers before you decide to dive in.</p>
            </li>
            <li>
              <p><strong>Easy Access:</strong> Found a book you love? We provide direct links to trusted platforms like Amazon and Flipkart, making it easy for you to order your next read in just a few clicks.</p>
            </li>
          </ul>
        </div>
        <hr />

        {/* Procedure */}
        <div className="col-lg-6 mx-auto">
          <h1 className="pt-4">What do you need to do?</h1>
          <ul className="text-start mt-1 py-1">
            <li>
              <p><strong>Browse Books:</strong> Explore a variety of books and see what others have to say. Our reviews will help you choose the best book to read.</p>
            </li>
            <li>
              <p><strong>Read Reviews:</strong> Detailed reviews from fellow readers provide insights into the content, writing style, and impact of each book.</p>
            </li>
            <li>
              <p><strong>Order Your Book:</strong> Once you find a book you like, follow the provided link to purchase it from trusted platforms like Amazon
              or Flipkart. We don't sell books ourselves; we simply help you find and order them. </p>
            </li>
          </ul>
        </div>
      </div>
    <Footer/>
    </>
  );
}

export default Home;
