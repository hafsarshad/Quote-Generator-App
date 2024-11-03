import React from 'react';
import Ai from './Components/Ai';
import Quote from './Components/Quote';
import Navbar from './Components/Navbar';
import ErrorBoundary from './Components/ErrorBoundary';


const App = () => {
  return (
    <div className='bg-purple-100 min-h-screen'>
      <Navbar />
      <Quote/>
      <ErrorBoundary>
      <Ai/>
      </ErrorBoundary>
     
    </div>
  );
};

export default App;
