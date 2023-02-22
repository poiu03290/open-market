import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { MainLayOut } from './components/layout/MainLayOut';
import { SellerLayOut } from './components/layout/SellerLayOut';
import { Main } from './view/Main';
import { Login } from './view/buyer/Login';
import { Join } from './view/buyer/Join';
import { ProductDetail } from './view/buyer/ProductDetail';
import { Cart } from './view/buyer/Cart';
import { Order } from './view/buyer/Order';
import { SellerCenter } from './view/seller/SellerCenter';
import { ProductRegistration } from './view/seller/ProductRegistration';

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
