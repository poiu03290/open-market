import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';

import { loginAPI } from '../api/api';
import { getToken } from '../modules/user';
import styles from './Login.module.css';

import Logo from '../assets/Logo-hodu.png'

export const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const IdFocus = useRef();
    const PwFocus = useRef();
    const [profile, setProfile] = useState({ username: '', password: '', login_type: "BUYER" });
    const [message, setMessage] = useState('');

    const LoginButtonClick = async () => {
      if(profile.username.length <= 0 && profile.password.length <= 0) {
        setMessage("아이디를 입력해 주세요.")
        IdFocus.current.focus();
      } else if (profile.password.length <= 0) {
        setMessage("비밀번호를 입력해 주세요.")
        PwFocus.current.focus();
      } else {
        try {
          const { data } = await loginAPI('accounts/login/', profile)

          dispatch(getToken(data))
          navigate(-1)
        } catch(error) {
          setMessage("아이디 또는 비밀번호가 일치하지 않습니다.")
          PwFocus.current.focus();
          PwFocus.current.value = ""
        }
      }
    }

    return(
        <div className='flex-center'>
          <img src={Logo} alt='로고 이미지' className={styles.logo} />
          <div className={styles.container}>
            <div className={styles['tab-box']}>
              <input type='radio' id='select-buyer' name='member-select' checked readOnly />
              <label htmlFor='select-buyer' className={styles.buyer}>구매회원 로그인</label>
              <input type='radio' name='member-select' id='select-seller'/>
              <label htmlFor='select-seller' className={styles.seller}>판매회원 로그인</label>
            </div>
            <div>
              <div className={styles['input-box']}>
                <input type='text' placeholder='아이디' 
                  ref={IdFocus}
                  onChange={(e) => 
                    {setProfile({...profile, username: e.target.value})}
                } className={styles.id}/>
                <input type='password' placeholder='비밀번호' 
                  ref={PwFocus}
                  onChange={(e) => {
                    setProfile({...profile, password: e.target.value})
                }}/>
                <span className={styles.warning}>{message}</span>
              </div>
              <input type='button' value='로그인' onClick={LoginButtonClick} className={styles.login}/>
            </div>
          </div>
          <div className={styles['txt-box']}>
            <a href='/join' className={styles.lnk}>회원가입</a>
            <a href='/findpw'>비밀번호 찾기</a>
          </div>
        </div>
      )
}