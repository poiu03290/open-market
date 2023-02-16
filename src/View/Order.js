import { useState, useEffect, useCallback } from 'react';

import { OrderAPI } from '../api/api';

import { OrderItem } from '../components/OrderItem';
import styles from './Order.module.css';

export const Order = () => {
    const [orderList, setOrderList] = useState([]);
    const [orderData, setOrderData] = useState({});
    const [check, setCheck] = useState(false);
    const [price, setPrice] = useState(0);
    const [phoneIdentify, setPhoneIdentify] = useState('');
    const [phoneMidNum, setPhoneMidNum] = useState('');
    const [phoneEndNum, setPhoneEndNum] = useState('');

    const computeTotalPrice = useCallback(() => {
        let sum = 0;
        for (let price of orderList) {
            sum += price.total_price
        }

        return sum
    }, [orderList])

    useEffect(() => {
        const orderProduct = localStorage.getItem('order')
        const cartOrderProduct = localStorage.getItem('cart-order')
        const unitProduct = [JSON.parse(orderProduct)]
        const setProduct = JSON.parse(cartOrderProduct)

        setOrderList(setProduct || unitProduct)
    }, [])

    useEffect(() => {
        const computedPrice = computeTotalPrice()
        setPrice(computedPrice)
    }, [orderList, computeTotalPrice])


    useEffect(() => {
        setOrderData({...orderData, 
            receiver_phone_number: phoneIdentify + phoneMidNum + phoneEndNum,
        })
      }, [phoneIdentify, phoneMidNum, phoneEndNum])

      
    useEffect(() => {
        setOrderData({...orderData,
            total_price: price
        })
    }, [price])
    

    const onUserGuessInput = useCallback((e) => {
        const maxLengthCheck = (e) => {
            if (e.target.value.length > e.target.maxLength) {
                e.target.value = e.target.value.slice(0, e.target.maxLength)
            } 
        }
        return maxLengthCheck(e)
    })


    const handleOrderData = useCallback((e) => {
        const handleValue = (e) => {
            const { name, value } = e.target;
            setOrderData({ ...orderData, [name]: value })
        }

        return handleValue(e)
    }, [orderData])


    const onOrderButtonClick = useCallback(async() => {
        try {
            await OrderAPI(`/order/`, orderData)

        } catch (error) {
            console.error(error)
        }
    }, [orderData])

    
    return (
        <>
            <div>
                <h2 className={styles.title}>주문/결제하기</h2>
                <div className={styles.container}>
                    <div className={styles.inner}>
                        <div className={styles.grid}>
                            <div className={styles.bar}>
                                <span className={styles['bar-info']}>상품정보</span>
                                <span className={styles['bar-count']}>할인</span>
                                <span className={styles['bar-delivery']}>배송비</span>
                                <span className={styles['bar-price']}>주문금액</span>
                            </div>
                            <ul>
                                {orderList && orderList.map((value, index) => (
                                    <OrderItem 
                                        key={index}
                                        orderInfo={value}
                                        orderData={orderData}
                                        setOrderData={setOrderData} 
                                    />
                                ))}
                            </ul>
                        </div>
                        
                        <div className={styles['total-price']}>
                            <span>총 주문금액</span>
                            <span>{price.toLocaleString()}원</span>
                        </div>
                    
                        <div className={styles['delivery-container']}>
                            <h3>배송정보</h3>
                            <p className='div-line'></p>
                            <div className={styles.receiver}>
                                <h4>주문자 정보</h4>
                                <p className='div-line'></p>
                                <div className={styles['input-wrap']}>
                                    <p>이름</p>
                                    <div><input type='text' /></div>
                                </div>
                                <div className={styles['phone-wrap']}>
                                    <p>휴대폰</p>
                                    <div>
                                        <input type='number' maxLength={3} onInput={onUserGuessInput}/>
                                        <span>-</span>
                                        <input type='number' maxLength={4} onInput={onUserGuessInput}/>
                                        <span>-</span>
                                        <input type='number' maxLength={4} onInput={onUserGuessInput}/>
                                    </div>
                                </div>
                                <div className={styles['input-wrap']}>
                                    <p>이메일</p>
                                    <div><input type='text'/></div>
                                </div>
                            </div>
                            
                            <div className={styles.receiver}>
                                <h4>배송지 정보</h4>
                                <p className='div-line'></p>
                                <div className={styles['input-wrap']}>
                                    <p>수령인</p>
                                    <div>
                                        <input 
                                            type='text' 
                                            name="receiver"
                                            onChange={(e) => handleOrderData(e)}
                                        />
                                    </div>
                                </div>
                                <div className={styles['phone-wrap']}>
                                    <p>휴대폰</p>
                                    <div>
                                        <input 
                                            type='number' 
                                            onChange={(e) => setPhoneIdentify(e.target.value)} 
                                            maxLength={3} 
                                            onInput={onUserGuessInput}/>
                                        <span>-</span>
                                        <input 
                                            type='number' 
                                            onChange={(e) => setPhoneMidNum(e.target.value)} 
                                            maxLength={4} 
                                            onInput={onUserGuessInput}/>
                                        <span>-</span>
                                        <input 
                                            type='number' 
                                            onChange={(e) => setPhoneEndNum(e.target.value)} 
                                            maxLength={4} 
                                            onInput={onUserGuessInput}/>
                                    </div>
                                </div>
                                <div className={styles['delivery-wrap']}>
                                    <p>배송주소</p>
                                    <div className={styles['post-wrap']}>
                                        <input type='text'/>
                                        <button type='button' value='우편번호 조회' onClick={() => alert('UI만 존재합니다 :(')} className={styles.post}>우편번호 조회</button>
                                        <div>
                                            <input 
                                                type='text' 
                                                name='address'
                                                onChange={(e) => handleOrderData(e)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className={styles['delivery-wrap']}>
                                    <p>배송 메시지</p>
                                    <div className={styles['message-wrap']}>
                                        <input 
                                            type='text' 
                                            name='address_message'
                                            onChange={(e) => handleOrderData(e)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles['payment-container']}>
                            <div className={styles.method}>
                                <h3>결제수단</h3>
                                <div className='div-line'></div>
                                <div className={styles['method-wrap']}>
                                    <input type='radio' id='card' value='CARD' name='payment_method' onClick={(e) => handleOrderData(e)}/>
                                    <label htmlFor='card'>신용/체크카드</label>
                                    <input type='radio' id='deposit' value='DEPOSIT' name='payment_method' onClick={(e) => handleOrderData(e)}/>
                                    <label htmlFor='deposit'>무통장 입금</label>
                                    <input type='radio' id='phone' value='PHONE_PAYMENT' name='payment_method' onClick={(e) => handleOrderData(e)}/>
                                    <label htmlFor='phone'>휴대폰 결제</label>
                                    <input type='radio' id='naver' value='NAVERPAY' name='payment_method' onClick={(e) => handleOrderData(e)}/>
                                    <label htmlFor='naver'>네이버페이</label>
                                    <input type='radio' id='kakao' value='KAKAOPAY' name='payment_method' onClick={(e) => handleOrderData(e)}/>
                                    <label htmlFor='kakao'>카카오페이</label>
                                </div>
                                <div className='div-line'></div>
                            </div>
                            <div className={styles['final-pay-container']}>
                                <h3>최종결제 정보</h3>
                                <article>
                                    <div>
                                        <div className={styles['pay-wrap']}>
                                            <span>- 상품금액</span>
                                            <span>{price.toLocaleString()}</span>
                                        </div>
                                        <div className={styles['pay-wrap']}>
                                            <span>- 할인금액</span>
                                            <span>0</span>
                                        </div>
                                        <div className={styles['pay-wrap']}>
                                            <span>- 배송비</span>
                                            <span>0</span>
                                        </div>
                                        <div className={styles['pay-price']}>
                                            <span>- 결제금액</span>
                                            <span>{price.toLocaleString()}원</span>
                                        </div>
                                    </div>
                                    <div className={styles.area}>
                                        <div className={styles['check-area']}>
                                            <input type='checkbox' onChange={() => setCheck(!check)} checked={check} id='pay-check' className={styles.check} />
                                            <div>
                                                <label htmlFor='pay-check'>주문 내용을 확인하였으며, 정보 제공 등에 동의합니다.</label>
                                            </div>
                                        </div>
                                        <button onClick={onOrderButtonClick} className={check ? `${styles.pay} ${styles['pay-check']}` : `${styles.pay}`}>
                                            결제하기
                                        </button>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </>
    )
}