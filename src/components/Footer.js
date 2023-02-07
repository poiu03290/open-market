import styles from './Footer.module.css';

import Insta from '../assets/icon-insta.svg'
import FaceBook from '../assets/icon-fb.svg'
import Youtube from '../assets/icon-yt.svg'

export const Footer = () => {
    return(
        <footer className={styles.container}>
            <div>
                <div className={styles['link-box']}>
                    <div>
                        <span>호두샵 소개</span>
                        <span>이용약관</span>
                        <span><b>개인정보처리방침</b></span>
                        <span>전자금융거래약관</span>
                        <span>청소년보호정책</span>
                        <span>제휴문의</span>
                    </div>
                    <div className={styles.sns}>
                        <img src={Insta} alt={'인스타그램 이미지'}/>
                        <img src={FaceBook} alt={'페이스북 이미지'}/>
                        <img src={Youtube} alt={'유튜브 이미지'}/>
                    </div>
                </div>
                <p className='div-line'></p>
                <div className={styles.info}>
                    <span><b>(주)HODU SHOP</b></span>
                    <span>제주특별자치도 제주시 동광고 137 제주코딩베이스캠프</span>
                    <span>사업자 번호 : 010-2290-3261</span>
                    <span>대표 : 김호두</span>
                </div>
            </div>
        </footer>
    )
}