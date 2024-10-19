import './App.css'
import React from 'react';

const App = () => {
  console.log('loading successful');
  return (
    <div className="js-test">
      <p>Change this text to product title using wordpress</p>
      <button style={{ background: 'red', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={() => {
        const title = document.querySelector('#product-title');
        title.textContent = 'new one';
      }}>Change the title inside of nishani page</button>
    </div>

  );
};

export default App;
