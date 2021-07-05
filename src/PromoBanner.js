import React from 'react';
import CurrencyFormat from 'react-currency-format';

function PromoBanner() {
    return (
        <div className="main__banner f">
            <div className="main__banner-left">
                <h1>SHOP COMPUTERS</h1>
                <h1>& ACCESSORIES</h1>
                <p className="lato">Shop laptops, desktops, monitors, tablets, PC gaming, hard drives and storages, accessories and more</p>
                <button className="lato">View more</button>
            </div>
            <div className="main__banner-right relative f aife">
                <div className="main__banner-card">
                    <p className="main__banner-category">Computer & Accessories</p>
                    <p className="main__banner-title">JBL T460BT Black Headphones</p>
                    <div className="product__review">
                        <img className="product__star" src="assets/tabler-icon-star.svg" alt="" />
                        <img className="product__star" src="assets/tabler-icon-star.svg" alt="" />
                        <img className="product__star" src="assets/tabler-icon-star.svg" alt="" />
                        <img className="product__star" src="assets/tabler-icon-star.svg" alt="" />
                        <img className="product__star" src="assets/tabler-icon-star.svg" alt="" />
                        <span>0 reviews</span>
                    </div>
                    <div className="main__banner-price lato">
                        <CurrencyFormat
                            value={"125.00"}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"$"}
                            fixedDecimalScale={true}
                            className="main__banner-price-fixed"
                        />
                        <CurrencyFormat
                            value={"250.00"}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"$"}
                            className="main__banner-price-discount"
                        />
                    </div>
                    <div className="main__banner-productCTA f aic">
                        <p>View more</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="46" height="24" viewBox="0 0 46 24">
                            <g id="Group_1" data-name="Group 1" transform="translate(-492 -999)">
                                <path id="Path_1" data-name="Path 1" d="M0,0H24V24H0Z" transform="translate(492 999)" fill="none"></path>
                                <line id="Line_1" data-name="Line 1" x2="40" transform="translate(497 1011)" fill="none" stroke="#4c4b4d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"></line>
                                <line id="Line_2" data-name="Line 2" x2="4" y2="4" transform="translate(497 1011)" fill="none" stroke="#4c4b4d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"></line>
                                <line id="Line_3" data-name="Line 3" y1="4" x2="4" transform="translate(497 1007)" fill="none" stroke="#4c4b4d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"></line>
                            </g>
                        </svg>
                    </div>
                </div>
                <div className="main__banner-productImg absolute">
                    <img src="https://i.ibb.co/kyXdVqm/t460bt-wireless-on-ear-headphones-with-pure-removebg-preview.png" alt="" className="main__banner-img" />
                    <p className="absolute">50%</p>
                </div>
            </div>
        </div>
    )
}

export default PromoBanner
