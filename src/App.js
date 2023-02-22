import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { MainLayOut } from './components/MainLayOut';
import { SellerLayOut } from './components/SellerLayOut';
import { Main } from './view/Main';
import { Login } from './view/Login';
import { Join } from './view/Join';
import { ProductDetail } from './view/ProductDetail';
import { Cart } from './view/Cart';
import { Order } from './view/Order';
import { SellerCenter } from './view/SellerCenter';
import { ProductRegistration } from './view/ProductRegistration';

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
          <Route element={<SellerLayOut />}>
            <Route path='/seller_center' element={<SellerCenter />}></Route>
            <Route path='/product_registration' element={<ProductRegistration />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
