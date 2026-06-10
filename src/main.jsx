// main.jsx or index.jsx

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'animate.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'

// Import Bootstrap JS bundle (includes Popper)
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
