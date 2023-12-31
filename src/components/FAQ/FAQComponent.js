// FAQComponent.js

// FAQComponent.js

import React, { useState } from 'react';
import './FAQComponent.css';

const FAQComponent = ({ faqs }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (<>
    <div className='faqheader'>
        FAQs<br/><br/>
      </div>
    <div className="faq-container">
      
      {faqs && faqs.length > 0 ? (
        faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question">
              {faq.question}
              <button
                className="toggle-btn"
                onClick={() => handleToggle(index)}
              >
                {activeIndex === index ? '-' : '+'}
              </button>
            </div>
            {activeIndex === index && (
              <div className="faq-answer">{faq.answer}</div>
            )}
          </div>
        ))
      ) : (
        <p>No FAQs available</p>
      )}
    </div></>
  );
};

export default FAQComponent;
