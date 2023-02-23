import { useState, useRef, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { uploadProduct } from '../../api/api';

import styles from './ProductRegistration.module.css';
import basicImage from '../../assets/Polygon_4.png'

export const ProductRegistration = () => {
    const ref = useRef();
    const [imgFile, setImgFile] = useState("");
    const [shippingMethod, setShippingMethod] = useState("PARCEL");
    const [product, setProduct] = useState({
        image: "", 
        shipping_method: "",
        product_info: "상품 정보입니다."
    })

    const imageUpload = useCallback(async () => {
        const file = ref.current.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImgFile(reader.result);
        }
    }, [])

    const imageUploadButtonClick = useCallback(() => {
        if(!ref.current) return;

        ref.current.click();
    }, [])

    const handleProductData = useCallback((e) => {
        const handleValue = (e) => {
            const { name, value } = e.target;
            setProduct({ ...product, [name]: value })
        }

        return handleValue(e)
    }, [product])

    useEffect(() => {
        setProduct({
            ...product, 
                image: imgFile,
                shipping_method: shippingMethod
            })
    }, [shippingMethod, imgFile])

    const saveButtonClick = useCallback(async() => {
        try {
            console.log(product)
            await uploadProduct('/products/', product)

        } catch (err) {
            console.log(err)
        }
    }, [product])


    return(
        <div className={styles.container}>
            <div className={styles.subject}>
                <h1>상품 등록</h1>
            </div>
            <div className={styles.view}>
                <div className={styles.info}>
                    <div className={styles.imgwrap}>
                        <p>상품 이미지</p>
                        <div>
                            <img 
                                src={imgFile ? imgFile : basicImage} 
                                alt="상품 이미지" 
                            />
                            <button onClick={imageUploadButtonClick} className={styles.upload}></button>
                        </div>
                        <input 
                            type="file" 
                            accept='image/*'
                            id='image'
                            ref={ref}
                            onChange={imageUpload}
                        />
                    </div>
                    <div className={styles['product-info']}>
                        <div className={styles['product-name']}>
                            <p>상품명</p>
                            <input type='text' name={"product_name"} onChange={(e) => handleProductData(e)}/>
                        </div>
                        <div className={styles.numinput}>
                            <p>판매가</p>
                            <div className={styles['input-wrap']}>
                                <input type='number' name={"price"} onChange={(e) => handleProductData(e)} />
                                <div>원</div>
                            </div>
                        </div>
                        <div className={styles.numinput}>
                            <p>배송방법</p>
                            <input type='radio' name='delivery' onClick={() => setShippingMethod("PARCEL")} id='parcel' checked readOnly/>
                            <label htmlFor='parcel' className={shippingMethod === "PARCEL" ? `${styles.method} ${styles.check}`: styles.method}>택배, 소포, 등기</label>
                            <input type='radio' name='delivery' onClick={() => setShippingMethod("DELIVERY")} id='freight' />
                            <label htmlFor='freight' className={shippingMethod === "DELIVERY" ? `${styles.method} ${styles.check}`: styles.method}>직접배송(화물배달)</label>
                        </div>
                        <div className={styles.numinput}>
                            <p>기본 배송비</p>
                            <div className={styles['input-wrap']}>
                                <input type='number' name={"shipping_fee"} onChange={(e) => handleProductData(e)}/>
                                <div>원</div>
                            </div>
                        </div>
                        <div className={styles.numinput}>
                            <p>재고</p>
                            <div className={styles['input-wrap']}>
                                <input type='number' name={"stock"} onChange={(e) => handleProductData(e)}/>
                                <div>개</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.btnWrap}>
                    <div>
                        <Link to='/seller_center'>
                            <input type="button" value="취소" className={styles.cancel}/>
                        </Link>
                        <input type="button" value="저장하기" onClick={saveButtonClick} className={styles.save}/>
                    </div>
                </div>
            </div>
        </div>
    )
}