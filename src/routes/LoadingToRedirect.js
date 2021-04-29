import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const LoadingToRedirect = () => {
  // Time counter
  const [count, setCount] = useState(3);
  let history = useHistory();

  // Counter
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    // redirect once count is equal to 0
    count === 0 && history.push('/');
    // cleanup timer
    return () => clearInterval(interval);
  }, [count, history]);

  return (
    <div
      className="redirecting-container"
      style={{
        height: '40vh',
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '200px',
      }}
    >
      <h3>Переадресация через {count} секунд</h3>
    </div>
  );
};

export default LoadingToRedirect;
