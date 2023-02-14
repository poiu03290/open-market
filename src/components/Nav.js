import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Modal } from './Modal';
import { SellerNav, BuyerNav } from './NavContents';
import styles from './Nav.module.css';

import Logo from '.././assets/Logo-hodu.png';

export const Nav = () => {
  const [modalMODE, setModalMODE] = useState('');
  const [isModal, setIsModal] = useState(false);

  const { user } = useSelector(state => state.user);

  const getSearchProducts = useCallback((e) => {
    if(e.key === 'Enter') {
      alert('검색은 UI만 존재합니다 :(')
    }
  }, [])
  
    return(
      <header className={styles.container}>
        <div className={styles.inner}>
        <Link to='/'>
          <img src={Logo} alt={'로고 이미지'} className={styles.icon}/>
        </Link>
        <input 
          type='text' 
          placeholder={'상품을 검색해보세요!'}
          onKeyDown={getSearchProducts}
          className={styles.search}
        />
          {user.token ? 
          <div className={styles.purchase}>
            {user.user_type === "BUYER" ?
              <BuyerNav /> :
              <SellerNav />
            }
          </div> : 
          <div className={styles.sale}>
            <div className={styles['icon-box']}>
              <input type="button" value="장바구니" onClick={() => setIsModal(!isModal)} className={styles.cart}/>
            </div>
            
            <Link to={"/login"}>
              <div className={styles['icon-box']}>
                  <input type="button" value={user.token ? "마이페이지" : "로그인"} className={styles.mypage}/>
              </div>
            </Link>
          </div>
          }
        </div>
        <Modal isModal={isModal} setIsModal={setIsModal} MODE={modalMODE} setModalMODE={setModalMODE} />
      </header>
      
    )
  }