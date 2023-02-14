import { useRef } from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';

import { removeToken } from '../modules/user';
import useDetectClose from '../hooks/useDetectClose';

import styles from './Nav.module.css';

export const BuyerNav = () => {
    const dropDownRef = useRef();
    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useDetectClose(dropDownRef, false);

    return (
        <>
            <Link to='/cart'>
              <div className={styles['icon-box']}>
                  <input type="button" value="장바구니" className={styles.cart}/>
              </div>
            </Link>
            <div ref={dropDownRef} className={styles['dropdown-box']}> 
                <button onClick={(e) => setIsOpen(e)} id={'btn-mypage-click'} className={styles.mypage}>
                마이페이지
                </button>
                {isOpen && (
                <ul className={styles.dropdown}>
                    <li value="마이페이지">마이페이지</li>
                    <Link to='/'>
                    <li value="로그아웃" onClick={() => dispatch(removeToken())}>로그아웃</li>
                    </Link>
                </ul>
                )}
            </div>
        </>
    )
}

export const SellerNav = () => {
    const dropDownRef = useRef();
    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useDetectClose(dropDownRef, false);

    return (
        <>
            <Link to='/seller_center'>
                <div className={styles['icon-box']}>
                    <input type="button" value="판매자 센터" className={styles['seller-center']} />
                </div>
            </Link>
            <div ref={dropDownRef} className={styles['dropdown-box']}>
                <button onClick={(e) => setIsOpen(e)} id={'btn-mypage-click'} className={styles.mypage}>
                    마이페이지
                </button>
                {isOpen && (
                <ul className={styles.dropdown}>
                    <li value="마이페이지">마이페이지</li>
                    <Link to='/'>
                        <li value="로그아웃" onClick={() => dispatch(removeToken())}>로그아웃</li>
                    </Link>
                </ul>
                )}
            </div>
        </>
    )
}