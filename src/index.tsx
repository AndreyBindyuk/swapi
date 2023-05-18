import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import store from './store'
import { MainPage } from './components/MainPage';
import { PersonPage } from './components/PersonPage';
import './App.css'
import { ThemeProvider, createTheme } from '@mui/material';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const theme = createTheme({
  components: {
    MuiPagination: {
      styleOverrides: {
        root: {
          '& .MuiPaginationItem-root': {
            color: 'yellow', // Yellow color
          },
          '& .MuiPaginationItem-page.Mui-selected': {
            backgroundColor: 'yellow', // Yellow color for selected page
            color: '#000000', // Black text color for selected page
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-input': {
            color: '#FFE81F', // Yellow color

          },
          '& .MuiInputLabel-root': {
            color: '#FFE81F', // Yellow color
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#FFE81F', // Yellow color for the outline border
          },
        },
      },
    },
  },
});

root.render(
  <ThemeProvider theme={theme}>
    <Router>
      <Provider store={store}>
        <Link to='/'><img src="/swapi.svg" alt="logo" /></Link>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/person/:name" element={<PersonPage />} />
        </Routes>
      </Provider>
    </Router>
  </ThemeProvider>


);
