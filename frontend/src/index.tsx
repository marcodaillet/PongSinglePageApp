import ReactDOM from 'react-dom/client';
import App from './App';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/';
axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
  );

root.render(
      <App />
);