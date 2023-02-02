import { Link } from "react-router-dom"

export const ProductItem = ({ products }) => {
    return (
        <Link to={`/products/${products.product_id}`}>
            {
                products && 
                <li className={'product-list'}>
                    <img src={products.image} alt={'상품 이미지'} />
                    <span className="product-store">{products.store_name}</span>
                    <span className="product-name">{products.product_name}</span>
                    <span className="product-price">{products.price.toLocaleString()}</span>
                </li>
            }
        </Link>
    )
}