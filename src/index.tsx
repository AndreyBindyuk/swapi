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
            color: 'yellow',
          },
          '& .MuiPaginationItem-page.Mui-selected': {
            backgroundColor: 'yellow',
            color: '#000000',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-input': {
            color: '#FFE81F',

          },
          '& .MuiInputLabel-root': {
            color: '#FFE81F',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#FFE81F',
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
