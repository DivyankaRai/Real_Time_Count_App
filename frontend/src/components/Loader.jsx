import React from 'react';
import './Loader.css'; // Import the CSS file

const Loader = () => {
  return (
    <div className="loader-container">
      <img className="loader-image" src="https://cdn.pixabay.com/animation/2023/11/09/03/05/03-05-45-320_512.gif" alt="Loading..." />
    </div>
  );
};

export default Loader;
