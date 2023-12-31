import React from 'react';
import './Blogcard.css';
import { Link } from 'react-router-dom'; // Import Link from 'react-router-dom'
import './Blogcard.css';

const Blogcard = ({ image, header, author, organization, blogLink }) => {
  return (
    <div className="blog-card">
      <div className="blog-image-container">
        <img src='../Navbar/logo-iet.png' alt="Blog" className="blog-image" />
      </div>
      <div className="blog-description">
        <Link to={blogLink} className="blog-header">
          {header}
        </Link>
        <p className="blog-info">By: {author}</p>
        <p className="blog-info">Organization: {organization}</p>
      </div>
    </div>
  );
};

export default Blogcard;
