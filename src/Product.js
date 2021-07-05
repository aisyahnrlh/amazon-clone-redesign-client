import React from 'react'
import CurrencyFormat from 'react-currency-format';
import { Link } from 'react-router-dom';

function Product({ id, name, category, price, description, photos }) {
    return (
        <Link to={`/products/${id}`} className="product f jcc fdc">
            <p className="lato product__bestSeller">Best Seller</p>
            <img className="product__image" src="https://i.ibb.co/1M7cFt9/shoe-1.png" alt="" />
            <p className="lato product__shipping">Ships to Indonesia</p>
            <div className="product__title">{name}</div>
            <div className="product__review">
                <img className="product__star" src="assets/tabler-icon-star.svg" alt="" />
                <img className="product__star" src="assets/tabler-icon-star.svg" alt="" />
                <img className="product__star" src="assets/tabler-icon-star.svg" alt="" />
                <img className="product__star" src="assets/tabler-icon-star.svg" alt="" />
                <img className="product__star" src="assets/tabler-icon-star.svg" alt="" />
                <span>0 reviews</span>
            </div>
            <div className="product__price lato">
                <CurrencyFormat
                    value={"125.00"}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    fixedDecimalScale={true}
                    className="product__price-fixed"
                />
                <CurrencyFormat
                    value={"250.00"}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    className="product__price-discount"
                />
            </div>
        </Link>
    )
}

export default Product
