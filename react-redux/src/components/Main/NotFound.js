import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div style={{ textAlign: 'center' }}>
    <h2>404</h2>
    <h3>Page Not Found</h3>
    <Link to="/">Go home</Link>
  </div>
);

export default NotFound;
