import { useState, useEffect, useCallback, useRef } from 'react';

import { getProductList } from '../api/api';
import { ProductItem } from '../components/ProductItem';

export const Main = () => {
    const ref = useRef();
    const [products, setProducts] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slideLength, setSlideLength] = useState(0);

    useEffect(() => {
        (async () => {
            const { data } = await getProductList("/products/")

            setProducts(data || [])
            setSlideLength(data.results.length)
        })()
    }, [])

    useEffect(() => {
        ref.current.style.marginLeft = `${-currentSlide * 100}%`;
    }, [currentSlide])

    const isCheckActivePrevbutton = useCallback(() => {
        return currentSlide >= 1
    }, [currentSlide])

    const isCheckActiveNextbutton= useCallback(() => {
        return currentSlide < slideLength - 1
    }, [currentSlide, slideLength])

    const prevButtonClick = useCallback(() => {
        if(!isCheckActivePrevbutton()) return
        setCurrentSlide(prev => prev - 1)
    }, [isCheckActivePrevbutton])

    const nextButtonClick = useCallback(() => {
        if (!isCheckActiveNextbutton()) return
        setCurrentSlide(prev => prev + 1)
    }, [isCheckActiveNextbutton])

    return(
        <div>
            <div className={'main-img-section'}>
                <ul ref={ref} className='slider-list'>
                    {products.results && products.results.map((value, index) => (
                        <li key={index}>
                            <img src={value.image} alt={value.product_info}/>
                        </li>
                    ))}
                </ul>
                <button onClick={prevButtonClick} className='btn-arrow btn-prev'></button>
                <button onClick={nextButtonClick} className='btn-arrow btn-next'></button>
            </div>
            <ul className={'product-container'}>
                {products.results && products.results.map((value, index) => (
                    <ProductItem key={index} products={value}/>
                ))}
            </ul>
        </div>
    )
}