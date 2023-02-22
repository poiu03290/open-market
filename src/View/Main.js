import { useState, useEffect, useRef } from 'react';

import { getProductList } from '../api/api';
import { ProductItem } from '../components/ProductItem';
import { Carousel } from '../components/Carousel'

import styles from './Main.module.css';

export const Main = () => {
    const [products, setProducts] = useState([]);
    const [slideLength, setSlideLength] = useState(0);

    useEffect(() => {
        (async () => {
            const { data } = await getProductList("/products/")

            setProducts(data || [])
            setSlideLength(data.results.length)
        })()
    }, [])

    
    return(
        <div className={styles.container}>
            <Carousel products={products} slideLength={slideLength} />
            <ul className={styles.product}>
                {products.results && products.results.map((value, index) => (
                    <ProductItem key={index} products={value} setSlideLength={setSlideLength}/>
                ))}
            </ul>
        </div>
    )
}