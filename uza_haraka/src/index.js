import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';
import React from 'react';
// import { Provider } from 'react-redux';
// import store  from './store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      
    <ChakraProvider>
        <App />
    </ChakraProvider>
    
  </React.StrictMode>
);

reportWebVitals();
