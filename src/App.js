import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Table from './components/table';
import Home from './Pages/home';
import Notfound from './Pages/notfound';
import Login from './auth/login';
import Funk from '../src/components/funk';
import Register from './auth/register';
import Seller from './seller/seller';
import HomePage from './dars-test/homePage';
import UserProvider from './dars-test/usProvider';
import { Card } from '@material-tailwind/react';
import { DataProvider } from './seller/DataContext';

function App() {
  return (
    <Router>
      <DataProvider>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path="/table" element={<Table />} />
          <Route path="/*" element={<Notfound />} />
          <Route path='/funk' element={<Funk />} />
          <Route path='/seller' element={<Seller />} />
          <Route path='/card' element={<Card />} />
          <Route path='/homePage' element={<HomePage />} />
          <Route path='/userprovider' element={<UserProvider />} />
        </Routes>
      </DataProvider>
    </Router>
  );
}

export default App;

