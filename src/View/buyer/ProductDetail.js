import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from "react-router-dom";

import { getProductDetail } from '../../api/api';
import { putInCartList } from '../../api/api';
import styles from './ProductDetail.module.css';

import { Modal } from '../../components/Modal';

export const ProductDetail = () => {
    const { productId } = useParams();

    const [productDetail, setProductDetail] = useState({});
    const [count, setCount] = useState(1)
    const [cart, setCart] = useState({
        product_id: '',
        quantity: null,
        check: null,
    })
    const [message, setMessage] = useState('');
    const [modalMODE, setModalMODE] = useState('');
    const [isModal, setIsModal] = useState(false);

    useEffect(() => {
        (async () => {
            const { data } = await getProductDetail(`/products/${productId}/`)
            setProductDetail(data || {})
        })();
    }, [productId])

    useEffect(() => {
        setCart({...cart, 
            product_id: productDetail.product_id, 
            quantity: count,
            check: true,
        })
    }, [productDetail, count])

    const handleMinus = useCallback(() => {
        if (count <= 1) return 
        setCount(prev => prev - 1)
    }, [count])

    const handlePlus = useCallback(() => {
        if (count >= productDetail.stock) return
        setCount(prev => prev + 1)
    }, [count, productDetail.stock])

    const putInCart = useCallback(async() => {
        try {
            await putInCartList('/cart/', cart);
            setMessage("장바구니에 추가되었습니다.")
        } catch (err) {
            setMessage(err.response.data.FAIL_message)
        } finally {
            setIsModal(true)
            setModalMODE('ALERT')
        }
    }, [cart])

    const orderButtonClick = useCallback(() => {
        const orderItem = {...productDetail}
        orderItem.order_kind = 'direct_order'
        orderItem.quantity = count
        orderItem.total_price = (Number(productDetail.price) * count) + orderItem.shipping_fee
        
        localStorage.removeItem('order')
        localStorage.removeItem('cart-order')
        localStorage.setItem('order', JSON.stringify(orderItem))
    }, [productDetail, count])

    return(
        <div className={styles.container}>
            <div className={styles['detail-box']}>
                <img src={productDetail.image} alt={'상품 세부 이미지'}/>
                <div className={styles.info}>
                    <div>
                        <span>{productDetail.store_name}</span>
                        <h2>{productDetail.product_name}</h2>
                        <span>{productDetail.price && productDetail.price.toLocaleString()}</span>
                    </div>
                    <div className={styles.subinfo}>
                        <span className={styles.shipping}>택배배송 / 무료배송</span>
                        <p className='div-line'></p>
                        <div className={styles.count}>
                            <input type='button' value='' onClick={handleMinus} className={styles.minus}/>
                            <span>{count}</span>
                            <input type='button' value='' onClick={handlePlus} className={styles.plus}/>
                        </div>
                        <p className='div-line'></p>
                        <div>
                            <div className={styles['price-box']}>
                                <span className={styles['total-price']}><b>총 상품 금액</b></span>
                                <div className={styles.price}>
                                    <span>총 수량 <b>{count}</b>개</span>
                                    <span><b>{(Number(productDetail.price) * count).toLocaleString()}</b></span>
                                </div>
                                
                            </div>
                            <div className={styles['order-box']}>
                                <Link to='/order' onClick={orderButtonClick}>
                                    <input type='button' value='바로 구매' className={styles.order} />
                                </Link>
                                <input type='button' onClick={putInCart} value='장바구니' className={styles.cart} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal isModal={isModal} setIsModal={setIsModal} MODE={modalMODE} message={message}/>
        </div>
        
    )
}