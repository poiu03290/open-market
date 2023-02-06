import { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";

import { getProductDetail } from '../api/api';
import { putInCartList } from '../api/api';

import { Modal } from '../components/Modal';

export const ProductDetail = () => {
    const { productId } = useParams();

    const [productDetail, setProductDetail] = useState({});
    const [message, setMessage] = useState('');
    const [count, setCount] = useState(1)
    const [cart, setCart] = useState({
        product_id: '',
        quantity: null,
        check: null,
    })
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

    const handleMinus = () => {
        if (count <= 1) return 
        setCount(prev => prev - 1)
    }

    const handlePlus = () => {
        if (count >= productDetail.stock) return
        setCount(prev => prev + 1)
    }

    const putInCart = async() => {
        try {
            await putInCartList('/cart/', cart);
            setMessage("장바구니에 추가되었습니다.")
        } catch (err) {
            setMessage(err.response.data.FAIL_message)
        } finally {
            setIsModal(true)
            setModalMODE('ALERT')
        }
    }

    const orderButtonClick = () => {
        const orderItem = {...productDetail}
        orderItem.order_kind = 'direct_order'
        orderItem.quantity = count
        orderItem.total_price = (Number(productDetail.price) * count) + orderItem.shipping_fee
        
        localStorage.removeItem('order')
        localStorage.removeItem('cart-order')
        localStorage.setItem('order', JSON.stringify(orderItem))
    }

    return(
        <div className='product-detail-container'>
            <div className='product-detail-box'>
                <img src={productDetail.image} alt={'상품 세부 이미지'}/>
                <div className='product-detail-info'>
                    <div>
                        <span>{productDetail.store_name}</span>
                        <h2>{productDetail.product_name}</h2>
                        <span>{productDetail.price && productDetail.price.toLocaleString()}</span>
                    </div>
                    <div className='product-order'>
                        <span className='txt-shipping'>택배배송 / 무료배송</span>
                        <p className='div-line'></p>
                        <div className='product-count'>
                            <input type='button' value='' onClick={handleMinus} className='btn-count-minus'/>
                            <span>{count}</span>
                            <input type='button' value='' onClick={handlePlus} className='btn-count-plus'/>
                        </div>
                        <p className='div-line'></p>
                        <div>
                            <div className='product-price-box'>
                                <span className='total-price'><b>총 상품 금액</b></span>
                                <div className='count-price'>
                                    <span>총 수량 <b>{count}</b>개</span>
                                    <span><b>{(Number(productDetail.price) * count).toLocaleString()}</b></span>
                                </div>
                                
                            </div>
                            <div className='order-btn-box'>
                                <Link to='/order' onClick={orderButtonClick}>
                                    <input type='button' value='바로 구매' className='btn-order'/>
                                </Link>
                                <input type='button' onClick={putInCart} value='장바구니' className='btn-shipping-cart'/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal isModal={isModal} setIsModal={setIsModal} MODE={modalMODE} message={message}/>
        </div>
        
    )
}