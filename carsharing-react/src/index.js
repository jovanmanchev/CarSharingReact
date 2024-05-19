import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios';
import reportWebVitals from './reportWebVitals';
axios.interceptors.request.use(
  config => {
      const token = localStorage.getItem('token');
      console.log(token)
      if (token) {
       
          config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
  },
  error => {
      return Promise.reject(error);
  }
);
axios.interceptors.response.use(response => response, error => {
  
  if (error.response.status === 403) {
    
      console.error("Token expired. Please login again.");
      //localStorage.removeItem('token');
     
  }
  return Promise.reject(error);
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
function adjustMainMargin() {
  const footer = document.querySelector('.footer');
  const main = document.querySelector('.main');

  if (footer && main) {
      const footerHeight = footer.offsetHeight;  // Get the height of the footer
      main.style.marginBottom = `${footerHeight}px`;  // Set the bottom margin of the main content
  }
}


document.addEventListener("DOMContentLoaded", adjustMainMargin);


window.addEventListener("resize", adjustMainMargin);
