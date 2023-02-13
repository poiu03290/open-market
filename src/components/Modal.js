import { LoginModal, DeleteModal, QuantityModal, AlertModal } from './ModalContents';
import styles from './Modal.module.css';

let content = null;

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