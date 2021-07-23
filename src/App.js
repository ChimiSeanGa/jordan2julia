import './App.css';
import React from 'react';
import DrawArea from './Drawing/DrawArea.jsx';

function App() {
   return (
      <div className="App">
         <div>Draw on me!</div>
         <DrawArea />
      </div>
   );
}

export default App;
