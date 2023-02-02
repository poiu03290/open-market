import { useState, useEffect, useCallback } from 'react'; 
import { Link } from 'react-router-dom';

import { getCartList } from '../api/api'
import { updateCartItem } from '../api/api';
import { deleteCartItem } from '../api/api';

import { CartItem } from '../components/CartItem';
import { Modal } from '../components/Modal';

export const Cart = () => {
    const [cartList, setCartList] = useState([]);
    const [cart, setCart] = useState({
        product_id: '',
        quantity: null,
        is_active: true,
    });
    const [_id, set_ID] = useState(null);
    const [checkID, setCheckID] = useState([]);
    const [checkItems, setCheckItems] = useState([]);
    const [isModal, setIsModal] = useState(false);
    const [modalMODE, setModalMODE] = useState('');

    useEffect(() => {
        (async () => {
            const { data } = await getCartList('/cart/')

            setCartList(data || [])
        })();
    }, [cart, isModal])

    const handlePlus = () => {
        setCart({
            ...cart,
            quantity: cart.quantity + 1
        })
    }

    const handleMinus = () => {
        if (cart.quantity <= 1) return
        setCart({
            ...cart,
            quantity: cart.quantity - 1
        })
    }

    const updateQuantity = useCallback(async() => {
        try {
            await updateCartItem(`/cart/${_id}/`, cart)
        } catch (err) {
            alert(err.response.data["FAIL_message"])
        } finally {
            setIsModal(false)
            setCheckID([])
            setCheckItems([])
        }
    }, [cart, _id])

    const deleteItem = useCallback(async() => {
        await deleteCartItem(`/cart/${_id}/`)
        setIsModal(false)
        setCheckID([])
        setCheckItems([])
    }, [_id])
    
    const handleCheck = (checked, id) => {
        if (checked) {
            setCheckID(prev => [...prev, id]);
        } else {
            setCheckID(checkID.filter((el) => el !== id));
        }
    }

    const onToggleActive = (id) => {
        cartList.results.forEach((el) => el.product_id === id ? el.is_active = !el.is_active : undefined);
    }

    const checkTotalPrice = (checked, cartInfo, cartItem) => {
        let tempObj = {
            product_id: cartInfo.product_id, 
            quantity: cartInfo.quantity, 
            price: cartItem.price,
            order_kind: 'cart_order',
            image: cartItem.image,
            product_info: cartItem.product_info,
            product_name: cartItem.product_name,
            seller: cartItem.seller,
            stock: cartItem.stock,
            shipping_fee: cartItem.shipping_fee,
            shipping_method: cartItem.shipping_method,
            store_name: cartItem.store_name,
            total_price: (cartItem.price * cartInfo.quantity) + cartItem.shipping_fee
        }
        if(checked) {
            setCheckItems(prev => [...prev, tempObj])
        } else {
            setCheckItems(checkItems.filter((el) => el.product_id !== cartInfo.product_id));
        }
    }

    const totalPrice = checkItems
    .map(item => item.price * item.quantity)
    .reduce((acc, price) => acc + price, 0)

    const orderButtonClick = () => {
        const orderItems = [...checkItems]

        localStorage.removeItem('order')
        localStorage.setItem('cart-order', JSON.stringify(orderItems))
    }

    return(
        <>
        <div>
          <h2 className="cart-title">장바구니</h2>  
          <div className="cart-container">
            <div className="cart-bar">
                <span className="bar-info">상품정보</span>
                <span className="bar-count">수량</span>
                <span className="bar-price">상품금액</span>
            </div>
            {cartList.count >= 1 ? 
            <>
                <ul className="cart-product-list">
                    {cartList.results && cartList.results.map((value, index) => (
                        <CartItem 
                            key={index}
                            cartInfo={value} 
                            cart={cart}
                            setCart={setCart}
                            _id={_id}
                            set_ID={set_ID}
                            handleCheck={handleCheck}
                            onToggleActive={onToggleActive}
                            checkID={checkID}
                            checkTotalPrice={checkTotalPrice}
                            setIsModal={setIsModal} 
                            setModalMODE={setModalMODE} 
                        />
                    ))}
                </ul>
                <div className='cart-total'>
                    <div className='tot-price'>
                        <span>총 상품금액</span>
                        <span className='tot-bold'>{totalPrice.toLocaleString()}</span>
                    </div>
                    <div className='tot-minus'></div>
                    <div>
                        <span>상품 할인</span>
                        <span className='tot-bold'>0</span>
                    </div>
                    <div className='tot-plus'></div>
                    <div>
                        <span>배송비</span>
                        <span className='tot-bold'>0</span>
                    </div>
                    <div className='payment-price-box'>
                        <span style={{ fontWeight: 'bold' }}>결제 예정 금액</span>
                        <span className='tot-bold payment-price'>{totalPrice.toLocaleString()}</span>
                    </div>
                </div>
                <Link to={'/order'} onClick={orderButtonClick}>
                    <input type='button' value='주문하기' className='cart-order-button'/>
                </Link>
            </>
            : 
            <div className='empty-container'>
                <h2>장바구니에 담긴 상품이 없습니다.</h2>
                <p>원하는 상품을 장바구니에 담아보세요!</p>
            </div>
            }
          </div>
        </div>
        {<Modal 
            isModal={isModal}
            setIsModal={setIsModal}
            MODE={modalMODE}
            cart={cart}
            setCart={setCart}
            handlePlus={handlePlus}
            handleMinus={handleMinus}
            updateQuantity={updateQuantity}
            deleteItem={deleteItem}
        />}
        </>
    )
}