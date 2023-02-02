import { Link } from "react-router-dom"

import styles from '../view/Main.module.css';

export const ProductItem = ({ products }) => {
    return (
        <Link to={`/products/${products.product_id}`}>
            {
                products && 
                <li className={styles.list}>
                    <img src={products.image} alt={'상품 이미지'} />
                    <span className={styles.store}>{products.store_name}</span>
                    <span className={styles.name}>{products.product_name}</span>
                    <span className={styles.price}>{products.price.toLocaleString()}</span>
                </li>
            }
        </Link>
    )
}