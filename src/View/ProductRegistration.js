import styles from './ProductRegistration.module.css';

export const ProductRegistration = () => {
    return(
        <div className={styles.container}>
            <div className={styles.subject}>
                <h1>상품 등록</h1>
            </div>
            <div className={styles.view}>
                <div className={styles.info}>
                    <div className={styles.imgwrap}>
                        <p>상품 이미지</p>
                        {/* <img src="" alt="프로필 이미지" /> */}
                        {/* <input type="file" /> */}
                        <div>
                            이미지 들어갈 곳.
                        </div>
                    </div>
                    <div className={styles.test}>
                        <p>상품명</p>
                        <input type='text'/>
                    </div>
                </div>
            </div>
        </div>
    )
}