import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { MainLayOut } from './components/MainLayOut';
import { Main } from './View/Main';
import { Login } from './View/Login';
import { Join } from './View/Join';
import { ProductDetail } from './View/ProductDetail';
import { Cart } from './View/Cart';
import { Order } from './View/Order';

import './App.css';

function App() {
  return (
    <div className='container'>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayOut />}>
            <Route path='/' element={<Main />}></Route>
            <Route path='/products/:productId' element={<ProductDetail />}></Route>
            <Route path='/cart' element={<Cart />}></Route>
            <Route path='/order' element={<Order />}></Route>
          </Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/join' element={<Join />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
