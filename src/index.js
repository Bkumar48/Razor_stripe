import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import  {createRoot} from 'react-dom/client';
// import reportWebVitals from './reportWebVitals';


const container = document.getElementById('root');
const root = createRoot(container);
root.render(<React.StrictMode>
  <App />
</React.StrictMode>);


// reportWebVitals();
