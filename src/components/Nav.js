import { useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { removeToken } from '../modules/user';
import useDetectClose from '../hooks/useDetectClose';
import styles from './Nav.module.css';

import Logo from '.././assets/Logo-hodu.png';

export const Nav = () => {
  const dropDownRef = useRef();
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useDetectClose(dropDownRef, false);
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
                  <li value="로그아웃" onClick={() => dispatch(removeToken())}>로그아웃</li>
                </ul>
              )}
            </div>
          </div> : 
          <div className={styles.sale}>
            <div className={styles['icon-box']}>
              <input type="button" value="장바구니" onClick={() => alert('로그인을 해주세요.')} className={styles.cart}/>
            </div>
            
            <Link to={"/login"}>
              <div className={styles['icon-box']}>
                  <input type="button" value={user.token ? "마이페이지" : "로그인"} className={styles.mypage}/>
              </div>
            </Link>
          </div>
          }
        </div>
      </header>
    )
  }