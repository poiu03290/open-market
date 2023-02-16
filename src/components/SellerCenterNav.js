import { Link } from 'react-router-dom';
import styles from './SellerCenterNav.module.css';

import logo from '../assets/Logo-hodu.png'

export const SellerCenterNav = () => {
    return (
        <div className={styles.container}>
            <Link to='/'>
                <img src={logo} alt={'로고이미지'}/>
            </Link>
            <h2>판매자 센터</h2>
        </div>
    )
}