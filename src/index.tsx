import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import store from './store'
import { MainPage } from './components/MainPage';
import { PersonPage } from './components/PersonPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Router>
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/person/:name" element={<PersonPage />} />
      </Routes>
    </Provider>
  </Router>

);
