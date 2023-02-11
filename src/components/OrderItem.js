import { useEffect } from 'react';

import styles from '../view/Order.module.css';


export const OrderItem = ({ orderInfo, orderData, setOrderData }) => {
    useEffect(() => {
        setOrderData(orderInfo.order_kind !== "cart_order" ? {
            ...orderData, 
                product_id: orderInfo.product_id,
                quantity: orderInfo.quantity,
                order_kind: orderInfo.order_kind,
        } : {
            ...orderData,
                order_kind: orderInfo.order_kind,
        })
    }, [orderInfo])
    return (
        <>
            <li className={styles.item}>
                <div className={styles.info}>
                    <img src={orderInfo.image} alt={'주문한 이미지'}/>
                    <div className={styles['item-info']}>
                        <span>{orderInfo.store_name}</span>
                        <span className={styles['item-name']}>{orderInfo.product_name}</span>
                        <span className={styles['item-quantity']}>수량 : {orderInfo.quantity}개</span>
                    </div>
                </div>
                <div className={`${styles.discount} flex-center`}>
                    -
                </div>
                <div className={`${styles['shopping-fee']} flex-center`}>
                    {orderInfo.shipping_fee.toLocaleString()}
                </div>
                <div className={`${styles['item-price']} flex-center`}>
                    {orderInfo.total_price.toLocaleString()}원
                </div>
            </li>
        </>
    )
}