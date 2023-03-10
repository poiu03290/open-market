import { useState, useEffect, useCallback } from 'react'; 
import { Link } from 'react-router-dom';

import { getCartList } from '../../api/api'
import { updateCartItem } from '../../api/api';
import { deleteCartItem } from '../../api/api';

import { CartItem } from '../../components/CartItem';
import { Modal } from '../../components/Modal';
import styles from './Cart.module.css';

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


    const handlePlus = useCallback(() => {
        setCart({
            ...cart,
            quantity: cart.quantity + 1
        })
    }, [cart])


    const handleMinus = useCallback(() => {
        if (cart.quantity <= 1) return
        setCart({
            ...cart,
            quantity: cart.quantity - 1
        })
    }, [cart])


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
    
    const handleCheck = useCallback((checked, id) => {
        if (checked) {
            setCheckID(prev => [...prev, id]);
        } else {
            setCheckID(checkID.filter((el) => el !== id));
        }
    }, [checkID])


    const onToggleActive = useCallback((id) => {
        cartList.results.forEach((el) => el.product_id === id ? el.is_active = !el.is_active : undefined);
    }, [cartList])


    const checkTotalPrice = useCallback((checked, cartInfo, cartItem) => {
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
    }, [checkItems])


    const totalPrice = checkItems
        .map(item => item.price * item.quantity)
        .reduce((acc, price) => acc + price, 0)


    const orderButtonClick = useCallback((e) => {
        if (checkID.length < 1) e.preventDefault();
        
        const orderItems = [...checkItems]

        localStorage.removeItem('order')
        localStorage.setItem('cart-order', JSON.stringify(orderItems))
    }, [checkID, checkItems])

    return(
        <>
        <div>
          <h2 className={styles.title}>????????????</h2>  
          <div className={styles.container}>
            <div className={styles.inner}>
                <div className={styles.grid}>
                    <div className={styles.bar}>
                        <span>????????????</span>
                        <span>??????</span>
                        <span>????????????</span>
                    </div>
                    {cartList.count >= 1 ? 
                        <ul className={styles.product}>
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
                        : 
                        <div className={styles.empty}>
                            <h2>??????????????? ?????? ????????? ????????????.</h2>
                            <p>????????? ????????? ??????????????? ???????????????!</p>
                        </div>
                    }
                    </div>
                    {cartList.count > 0 && 
                    <>
                        <div className={styles.total}>
                            <div className={styles['t-price']}>
                                <span>??? ????????????</span>
                                <span className={styles['t-bold']}>{totalPrice.toLocaleString()}</span>
                            </div>
                            <div className={styles['t-minus']}></div>
                            <div>
                                <span>?????? ??????</span>
                                <span className={styles['t-bold']}>0</span>
                            </div>
                            <div className={styles['t-plus']}></div>
                            <div>
                                <span>?????????</span>
                                <span className={styles['t-bold']}>0</span>
                            </div>
                            <div>
                                <span style={{ fontWeight: 'bold' }}>?????? ?????? ??????</span>
                                <span className={`${styles['payment-price']} ${styles['t-bold']}`}>{totalPrice.toLocaleString()}</span>
                            </div>
                        </div>
                        <Link to={'/order'} onClick={orderButtonClick}>
                            <input type='button' value='????????????' className={styles.button} />
                        </Link>
                    </>
                    }
                </div>
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