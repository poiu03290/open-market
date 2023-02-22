import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { getSellerProduct } from '../../api/api';

import styles from './SellerCenter.module.css';

import logo from '../../assets/Logo-hodu.png';

export const SellerCenter = () => {
    const [click, setClick] = useState([]);
    const [productList, setProductList] = useState([]);
    const categoty = ['판매중인 상품', '주문/배송', '문의/리뷰', '통계', '스토어 설정'];

    const changeClick = (index) => {
        const newArr = Array(categoty.length).fill(false);
        newArr[index] = true;
        setClick(newArr);
    }

    useEffect(() => {
        (async() => {
            const { data } = await getSellerProduct('/seller/')

            setProductList(data);
            console.log(data)
        })()
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.subject}>
                <h1>대시보드</h1>
                <Link to='/product_registration'>
                    <input type="button" value={"상품 업로드"} className={styles.upload} />
                </Link>
            </div>
            <div className={styles.dashboard}>
                <ul className={styles.category}>
                    {categoty.map((value, index) => (
                        <li 
                            key={index} 
                            onClick={() => changeClick(index)} 
                            className={click[index] ? `${styles.click}` : undefined}>
                                {value}
                        </li>
                    ))}
                </ul>
                <div className={styles.grid}>
                    <div className={styles.bar}>
                        <span className={styles['bar-info']}>상품정보</span>
                        <span className={styles['bar-count']}>판매가격</span>
                        <span className={styles['bar-delivery']}>수정</span>
                        <span className={styles['bar-price']}>삭제</span>
                    </div>
                    <ul>
                        <Link to=''>
                            <li className={styles.item}>
                                <div className={styles.info}>
                                    <img src={logo} alt={'테스트'} className={styles.img}/>
                                    <article>
                                        <p>등록한 상품 1</p>
                                        <span>재고: 370개</span>
                                    </article>
                                </div>
                                <div className={styles.price}>
                                    17,500원
                                </div>
                                <div>
                                    <input type='button' value={'수정'} className={styles.update}/>
                                </div>
                                <div>
                                    <input type='button' value={'삭제'} className={styles.delete}/>
                                </div>
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    )
}