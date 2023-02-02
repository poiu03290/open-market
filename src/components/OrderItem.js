import { useEffect } from 'react';


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
            <li className="order-item">
                <img src={orderInfo.image} alt={'주문한 이미지'}/>
                <div className="order-item-info">
                    <span>{orderInfo.store_name}</span>
                    <span className="order-item-name">{orderInfo.product_name}</span>
                    <span className="order-item-quantity">수량 : {orderInfo.quantity}개</span>
                </div>
                <div className="order-discount flex-center">
                    -
                </div>
                <div className="order-shopping-fee flex-center">
                    {orderInfo.shipping_fee.toLocaleString()}
                </div>
                <div className="order-item-price flex-center">
                    {orderInfo.total_price.toLocaleString()}원
                </div>
            </li>
        </>
    )
}