import { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { DuplicateCheckAPI } from '../api/api';
import { JoinAPI } from '../api/api';
import styles from './Join.module.css'

import useDetectClose from '../hooks/useDetectClose';
import ValidationForm from '../components/ValidationForm';
import { PhoneDropDown } from '../components/PhoneDropDown';

import Logo from '.././assets/Logo-hodu.png'

export const Join = () => {
  const navigate = useNavigate();
  const dropDownRef = useRef();
  const [profile, setProfile] = useState({
    username: '',
    password: '',
    password2: '',
    phone_number: '',
    name: '',
  });

  const [duplicateCheck, setDuplicateCheck] = useState({
    result: null,
    message: '',
  });
  const [joinErrorMessage, setJoinErrorMessage] = useState({})
  const [phoneIdentify, setPhoneIdentify] = useState('');
  const [phoneMidNum, setPhoneMidNum] = useState('');
  const [phoneEndNum, setPhoneEndNum] = useState('');
  const [infoCheck, setInfoCheck] = useState(false);
  const phoneList = ['010', '011', '016', '017', '019'];


  const [isOpen, setIsOpen] = useDetectClose(dropDownRef, false);


  useEffect(() => {
    setProfile({...profile, phone_number: phoneIdentify + phoneMidNum + phoneEndNum})
  }, [phoneIdentify, phoneMidNum, phoneEndNum])


  const DuplicateButtonClick = async () => {
    try {
      const { data } = await DuplicateCheckAPI('/accounts/signup/valid/username/', profile)

      setDuplicateCheck({...duplicateCheck, result: true, message: data.Success})
    } catch(error) {

      setDuplicateCheck({...duplicateCheck, result: false, message: error.response.data.FAIL_Message})
    }
  }


  const isValidPassword = useMemo(() => {
    if(profile.password && profile.password.length >= 8) {
      return true
    }
    return false
  }, [profile.password])

  
  const isCorrectPassword = useMemo(() => {
    return profile.password && profile.password.length > 0 &&
      profile.password === profile.password2 ? 
      {
        result: true,
        message: '비밀번호가 일치합니다 :)'
      } : 
        false
  }, [profile.password, profile.password2])


  const onUserGuessInput = useCallback((e) => {
    const maxLengthCheck = (e) => {
      if (e.target.value.length > e.target.maxLength) {
        e.target.value = e.target.value.slice(0, e.target.maxLength)
      }
    }

    return maxLengthCheck(e)
  }, [])


  const isFillInput = useMemo(() => {
    return duplicateCheck.result && isValidPassword && isCorrectPassword.result && profile.name.length > 0 && infoCheck ?
    true : false
  }, [duplicateCheck, isValidPassword, isCorrectPassword, profile, infoCheck])


  const onJoinButtonClick = useCallback(async() => {
    try {
      await JoinAPI('/accounts/signup/', profile)

      navigate('/login')
    } catch (error) {
      let tmpArr = {}
      
      for (let j = 0; j < Object.keys(error.response.data).length; j++) {
        tmpArr[Object.keys(error.response.data)[j]] = Object.values(error.response.data)[j][0]
        setJoinErrorMessage(tmpArr)
      }
    }

  }, [profile, navigate])

  
    return(
        <div className='flex-center'>

          <img src={Logo} alt='로고 이미지' className={styles.logo}/>

          <div className={styles.container}>
            <div className={styles['tab-box']}>
              <input type='radio' id='select-buyer' name='member-select' checked readOnly />
              <label htmlFor='select-buyer' className={styles.buyer}>구매회원가입</label>
              <input type='radio' name='member-select' id='select-seller'/>
              <label htmlFor='select-seller' className={styles.seller}>판매회원가입</label>
            </div>
            <div className={styles.box}>

              <div className={styles['input-box']}>
              <label htmlFor='join-id-input'>아이디</label>
                <div className={styles['id-box']}>
                  <ValidationForm 
                    type='text' 
                    value={profile.username}
                    onChange={(e) => setProfile({...profile, username: e.target.value})}
                    error={duplicateCheck.message.length > 0 ? duplicateCheck : undefined}
                    validation={joinErrorMessage.username}
                  />
                  <button 
                    onClick={DuplicateButtonClick} 
                    className={styles.valid}>
                      중복확인
                  </button>
                </div>
                <label htmlFor='join-pw-input'>비밀번호</label>
                <ValidationForm 
                  type='password'
                  value={profile.password}
                  onChange={(e) => setProfile({...profile, password: e.target.value})}
                  error={isValidPassword}
                  validation={joinErrorMessage.password}
                  className={isValidPassword ? styles.proper : styles['pw-input']}
                  />
                <label htmlFor='join-repw-input'>비밀번호 재확인</label>
                <ValidationForm 
                  type='password' 
                  value={profile.password2}
                  onChange={(e) => setProfile({...profile, password2: e.target.value})}
                  error={isCorrectPassword}
                  validation={joinErrorMessage.password2}
                  className={isCorrectPassword ? styles.proper : styles['repw-input']}
                  />
              </div>
              
              <div className={styles['info-box']}>
                <label htmlFor='join-name-input'>이름</label>
                <ValidationForm 
                  type='text' 
                  value={profile.name}
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                  validation={joinErrorMessage.name}
                  className={'name-input'}
                  id={'join-name-input'}
                  />
                <label htmlFor='join-phone-input'>휴대폰번호</label>
                <div ref={dropDownRef} className={styles['phone-box']}>
                  <input 
                    onClick={() => setIsOpen(!isOpen)}
                    type='button'
                    value={phoneIdentify}
                    className={styles.dropdown}
                    />
                  <input type='number' 
                    onChange={(e) => setPhoneMidNum(e.target.value)}
                    maxLength={4}
                    onInput={onUserGuessInput}
                    id='join-phone-input'
                    />
                  <input 
                    type='number'
                    onChange={(e) => setPhoneEndNum(e.target.value)}
                    maxLength={4}
                    onInput={onUserGuessInput}
                  />
                  <span>{joinErrorMessage.phone_number}</span>
                  {isOpen && 
                  <ul>
                      {phoneList.map((value, index) => (
                        <PhoneDropDown key={index} value={value} setPhoneIdentify={setPhoneIdentify} setIsOpen={setIsOpen} isOpen={isOpen}/>
                      ))}
                  </ul>
                  }
                </div>
                <label htmlFor='join-id-input'>이메일</label>
                <div className={styles['email-box']}>
                  <input type='text' />
                  <span>@</span>
                  <input type='text' />
                </div>
              </div>
            </div>

          </div>
          <div className={styles.txt}>
            <div className={styles['check-box']}>
              <input 
                type={'checkbox'} 
                onClick={() => setInfoCheck(!infoCheck)} 
                id={'info-check'}
                className={styles.check}
                />
              <div>
                <label htmlFor='info-check'>호두샵의 <b><u>이용약관</u></b> 및 <b><u>개인정보처리방침</u></b>에 대한 내용을 확인하였고 동의합니다.</label>
              </div>
            </div>
            <button
              onClick={onJoinButtonClick}
              className={isFillInput ? styles['join-valid'] : styles.join}
            >가입하기</button>
          </div>
          
        </div>
    )
}