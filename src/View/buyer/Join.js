import { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { DuplicateCheckAPI, JoinAPI, sellerValidate, sellerJoin } from '../../api/api';
import styles from './Join.module.css'

import useDetectClose from '../../hooks/useDetectClose';
import ValidationForm from '../../components/ValidationForm';
import { PhoneDropDown } from '../../components/PhoneDropDown';

import Logo from '../../assets/Logo-hodu.png'

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
  const [joinType, setJoinType] = useState('BUYER');
  const [duplicateCheck, setDuplicateCheck] = useState({});
  const [registrateCheck, setRegistrateCheck] = useState({});
  const [joinErrorMessage, setJoinErrorMessage] = useState({});
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
      if (joinType === 'buyer') {
        await JoinAPI(' /accounts/signup/', profile)
      } else {
        await sellerJoin('/accounts/signup_seller/', profile)
      }

      navigate('/login')
    } catch (error) {
      let tmpArr = {}
      
      for (let j = 0; j < Object.keys(error.response.data).length; j++) {
        tmpArr[Object.keys(error.response.data)[j]] = Object.values(error.response.data)[j][0]
        setJoinErrorMessage(tmpArr)
      }
    }

  }, [profile, navigate])

  const IsCheckRegistrationNumber = useCallback(async() => {
    try {
      const { data } = await sellerValidate('/accounts/signup/valid/company_registration_number/', profile)

      setRegistrateCheck({...registrateCheck, result: true, message: data.Success})

    } catch (error) {
      setRegistrateCheck({...registrateCheck, result: false, message: error.response.data.FAIL_Message})

    }
  }, [profile, registrateCheck])

    return(
        <div className='flex-center'>
          <Link to='/'>
            <img src={Logo} alt='로고 이미지' className={styles.logo}/>
          </Link>

          <div className={styles.container}>
            <div className={styles['tab-box']}>
              <input type='radio' id='select-buyer' onClick={() => setJoinType('BUYER')} name='member-select' checked readOnly />
              <label htmlFor='select-buyer' className={joinType === 'BUYER' ? `${styles.tab} ${styles.check}` : `${styles.tab}`}>구매회원가입</label>
              <input type='radio' name='member-select' onClick={() => setJoinType('SELLER')} id='select-seller'/>
              <label htmlFor='select-seller' className={joinType === 'SELLER' ? `${styles.tab} ${styles.check}` : `${styles.tab}`}>판매회원가입</label>
            </div>
            <div className={styles.box}>

              <div className={styles['input-box']}>
              <label htmlFor='join-id-input'>아이디</label>
                <div className={styles['id-box']}>
                  <ValidationForm 
                    type='text' 
                    value={profile.username}
                    onChange={(e) => setProfile({...profile, username: e.target.value})}
                    error={duplicateCheck.message ? duplicateCheck : undefined}
                    validation={joinErrorMessage.username}
                    id={'join-id-input'}
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
                  id={'join-pw-input'}
                />
                <label htmlFor='join-repw-input'>비밀번호 재확인</label>
                <ValidationForm 
                  type='password' 
                  value={profile.password2}
                  onChange={(e) => setProfile({...profile, password2: e.target.value})}
                  error={isCorrectPassword}
                  validation={joinErrorMessage.password2}
                  className={isCorrectPassword ? styles.proper : styles['repw-input']}
                  id={'join-repw-input'}
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
                <label htmlFor='join-email-input'>이메일</label>
                <div className={styles['email-box']}>
                  <input type='text' id={'join-email-input'}/>
                  <span>@</span>
                  <input type='text' />
                </div>

                {/* 판매자 */}
                {joinType === 'SELLER' && 
                <>
                  <label htmlFor='join-buisness-input'>사업자 등록번호</label>
                  <div className={`${styles['id-box']}`}>
                    <ValidationForm 
                      type='text' 
                      value={profile.company_registration_number || ""}
                      onChange={(e) => setProfile({...profile, company_registration_number: e.target.value})}
                      error={registrateCheck.message ? registrateCheck : undefined}
                      id={'join-buisness-input'}
                      maxLength={10}
                    />
                    <button 
                      onClick={IsCheckRegistrationNumber} 
                      className={styles.valid}>
                        인증
                    </button>
                  </div>
                  <label htmlFor='join-store-input'>스토어 이름</label>
                  <ValidationForm 
                    type='text' 
                    value={profile.store_name || ""}
                    onChange={(e) => setProfile({...profile, store_name: e.target.value})}
                    validation={joinErrorMessage.name}
                    id={'join-store-input'}
                    />
                </>
                }
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
              disabled={isFillInput ? false : true}
            >가입하기</button>
          </div>
          
        </div>
    )
}