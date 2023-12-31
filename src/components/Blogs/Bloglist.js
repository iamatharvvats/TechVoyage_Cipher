import React from 'react';
import Blogcard from './Blogcard';
import './Bloglist.css';

const BlogList = () => {
  const blogs = [
    {
      id: 1,
      image: '../Navbar/logo-iet.png',
      header: 'Blog Title 1',
      author: 'John Doe',
      organization: 'Tech Bloggers Inc.',
    },
    // Add more blog entries as needed
  ];

  return (
    <div className="blog-list">
      {blogs.map((blog) => (
        <Blogcard
          key={blog.id}
          image={blog.image}
          header={blog.header}
          author={blog.author}
          organization={blog.organization}
        />
      ))}
    </div>
  );
};

export default BlogList;
