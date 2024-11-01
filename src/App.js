import React from 'react';

import Quote from './Components/Quote';
import Navbar from './Components/Navbar';


const App = () => {
  return (
    <div className='bg-purple-100 min-h-screen'>
      <Navbar />
      <Quote/>
    </div>
  );
};

export default App;
