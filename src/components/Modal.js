import { Link } from 'react-router-dom';

import styles from './Modal.module.css';

import closeImage from '../assets/icon-delete.svg';

let content = null;

function LoginModal({ setIsModal, isModal }) {
    return (
    <>
        <img src={closeImage} alt={'닫기 버튼'} onClick={() => setIsModal(false)}/>
        <h4>로그인이 필요한 서비스입니다.<br/>로그인 하시겠습니까?</h4>
        <div>
            <input type='button' value='아니오' onClick={() => setIsModal(!isModal)}/>
            <Link to={'/login'}>
                <input type='button' value='예' />
            </Link>
        </div>
    </>
    )
}

function DeleteModal({ setIsModal, deleteItem }) {
    return (
        <>
            <img src={closeImage} alt={'닫기 버튼'} onClick={() => setIsModal(false)}/>
            <h4>상품을 삭제하시겠습니까?</h4>
            <div>
                <input type='button' value='취소' onClick={() => setIsModal(false)}/>
                <input type='button' value='확인' onClick={deleteItem}/>
            </div>
        </>
    )
}

function QuantityModal({ setIsModal, cart, handlePlus, handleMinus, updateQuantity }) {
    return (
        <>
            <img src={closeImage} alt={'닫기 버튼'} onClick={() => setIsModal(false)}/>
            <article onClick={() => setIsModal(true)}>
                <input type='button' value='' onClick={handleMinus} className={styles.minus} />
                <span>{cart.quantity}</span>
                <input type='button' value='' onClick={handlePlus} className={styles.plus} />
            </article>
            <div>
                <input type='button' value='취소' onClick={() => setIsModal(false)}/>
                <input type='button' value='확인' onClick={updateQuantity}/>
            </div>
        </>
    )
}

function AlertModal({ setIsModal, message }) {
    return (
        <>
            <img src={closeImage} alt={'닫기 버튼'} onClick={() => setIsModal(false)}/>
            <p>{message}</p>
            <div>
                <input type='button' value='취소' onClick={() => setIsModal(false)}/>
                <input type='button' value='확인' onClick={() => setIsModal(false)}/>
            </div>
        </>
    )
}

export const Modal = ({ MODE, isModal, ...props }) => {

    if (MODE === 'QUANTITY') {
        content = <QuantityModal {...props} />;
    } else if (MODE === 'DELETE') {
        content = <DeleteModal {...props}/>;
    } else if (MODE === 'ALERT') {
        content = <AlertModal {...props} />
    } else {
        content = <LoginModal {...props} isModal={isModal} />;
    }


    return (
        <div className={isModal ? `${styles.modal} ${styles.open}` : `${styles.modal}`}>
            <div className={isModal ? `${styles.container}` : 'none'} >
                {content}
            </div>
        </div>
    )
}