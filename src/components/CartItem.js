import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { getProductDetail } from "../api/api"
import styles from '../view/buyer/Cart.module.css';

export const CartItem = ({ 
    cartInfo, 
    cart, 
    setCart, 
    set_ID, 
    handleCheck, 
    onToggleActive, 
    checkID, 
    checkTotalPrice, 
    setIsModal, 
    setModalMODE, 
    }) => {

    const [cartItem, setCartItem] = useState([]);

    useEffect(() => {
        (async () => {
            const { data } = await getProductDetail(`/products/${cartInfo.product_id}/`)
            
            setCartItem(data || [])
        })();
    }, [cartInfo.product_id])

    const setCartInfo = useCallback(() => {
        setCart({
            ...cart,
                product_id: cartInfo.product_id,
                quantity: cartInfo.quantity,
                is_active: true,
        })
        set_ID(cartInfo.cart_item_id)
    }, [cart, cartInfo, set_ID, setCart])

    const OrderButtonClick = useCallback(async() => {
        const orderItem = {...cartItem}
        orderItem.order_kind = 'cart_one_order'
        orderItem.quantity = cartInfo.quantity
        orderItem.total_price = (cartItem.price * cartInfo.quantity) + cartItem.shipping_fee

        localStorage.removeItem('order')
        localStorage.removeItem('cart-order')
        localStorage.setItem('order', JSON.stringify(orderItem))
    }, [cartItem, cartInfo.quantity])

    return(
        <>
            <li>
                <div className={styles.check}>
                    <input 
                        type='checkbox' 
                        onChange={(e) => (
                            handleCheck(e.target.checked, cartInfo.product_id), 
                            onToggleActive(cartInfo.product_id),
                            checkTotalPrice(e.target.checked, cartInfo, cartItem)
                        )}
                        checked={checkID.includes(cartInfo.product_id) ? true : false}
                        id={cartInfo.product_id} 
                        className="check"
                        />
                    <label htmlFor={cartInfo.product_id}></label>
                </div>
                
                <img src={cartItem.image} alt={'?????? ?????????'} className={styles.img}/>
                <div className={styles['p-info']}>
                    <span className={styles.store}>{cartItem.store_name}</span>
                    <span className={styles.name}>{cartItem.product_name}</span>
                    <span className={styles['b-price']}>{Number(cartItem.price).toLocaleString()}???</span>
                    <span className={styles.shopping}>???????????? / ????????????</span>
                </div>
                <div style={{ marginLeft: '48px' }} className={styles['p-count']} onClick={() => (
                        setIsModal(true), 
                        setModalMODE('QUANTITY'), 
                        setCartInfo()
                    )}>
                    <input type='button' className={styles.minus} />
                    <span>{cartInfo.quantity}</span>
                    <input type='button' className={styles.plus} />
                </div>
                <div className={styles.order}>
                    <span>{(Number(cartItem.price) * cartInfo.quantity).toLocaleString()}???</span>
                    <Link to={'/order'} onClick={OrderButtonClick} >
                        <input type='button' value='????????????'/>
                    </Link>
                </div>
                <input type='button' className={styles.delete} onClick={() => (setIsModal(true), setModalMODE('DELETE'), setCartInfo())}/>
            </li>
        </>
    )
}
