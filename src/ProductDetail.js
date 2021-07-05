import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import { catalogs } from './data';
import { useStateValue } from './StateProvider';
import { Link } from 'react-router-dom';

function ProductDetail() {
    const [{ cart }, dispatch] = useStateValue()
    const [photoNumber, setPhotoNumber] = useState(0)
    const [tabs, setTabs] = useState('info')
    const { id } = useParams()
    const product = catalogs.filter(product => product.id === id);
    const { name, price, description, photos, department, subdepartment, products } = product[0];

    const handleTabs = (tab) => {
        setTabs(tab)
    }

    const handleNumber = (operation) => {
        if (photoNumber >= photos.length - 1) {
            setPhotoNumber(0)
        }
        else if (photoNumber < 0) {
            setPhotoNumber(photos.length - 1)
        } else {
            if (operation === '+') {
                setPhotoNumber(photoNumber + 1)
            } else {
                setPhotoNumber(photoNumber - 1)
            }
        }
    }

    const addToCart = () => {
        dispatch({
            type: 'ADD_TO_CART',
            payload: {
                id: id,
                name: name,
                price: price,
                photo: photos[0],
                quantity: 1
            }
        })
    }

    return (
        <>
            <div className="productDetail__category-title f aic">
                <p className="productDetail__category lato">{department}</p>
                <svg className="tabler-icon-arrow-narrow-right" xmlns="http://www.w3.org/2000/svg" width="30" height="24" viewBox="0 0 46 24">
                    <g id="Group_1" data-name="Group 1" transform="translate(-492 -999)">
                        <path id="Path_1" data-name="Path 1" d="M0,0H24V24H0Z" transform="translate(492 999)" fill="none" />
                        <line id="Line_1" data-name="Line 1" x2="40" transform="translate(497 1011)" fill="none" stroke="#4c4b4d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
                        <line id="Line_2" data-name="Line 2" x2="4" y2="4" transform="translate(497 1011)" fill="none" stroke="#4c4b4d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
                        <line id="Line_3" data-name="Line 3" y1="4" x2="4" transform="translate(497 1007)" fill="none" stroke="#4c4b4d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
                    </g>
                </svg>
                <p className="productDetail__category lato">{subdepartment}</p>
                <svg className="tabler-icon-arrow-narrow-right" xmlns="http://www.w3.org/2000/svg" width="30" height="24" viewBox="0 0 46 24">
                    <g id="Group_1" data-name="Group 1" transform="translate(-492 -999)">
                        <path id="Path_1" data-name="Path 1" d="M0,0H24V24H0Z" transform="translate(492 999)" fill="none" />
                        <line id="Line_1" data-name="Line 1" x2="40" transform="translate(497 1011)" fill="none" stroke="#4c4b4d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
                        <line id="Line_2" data-name="Line 2" x2="4" y2="4" transform="translate(497 1011)" fill="none" stroke="#4c4b4d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
                        <line id="Line_3" data-name="Line 3" y1="4" x2="4" transform="translate(497 1007)" fill="none" stroke="#4c4b4d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
                    </g>
                </svg>
                <p className="productDetail__category lato">{products}</p>
            </div>
            <div className="productDetail f">
                <div className="productDetail__left">
                    <div className="productDetail__bigImage relative">
                        <img src={photos[photoNumber]} alt="" />
                        <div className="favorite">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-heart" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                            </svg>
                        </div>
                        <div className="previous" onClick={() => handleNumber('-')}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-left" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <polyline points="15 6 9 12 15 18" />
                            </svg>
                        </div>
                        <div className="next" onClick={() => handleNumber('+')}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-right" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <polyline points="9 6 15 12 9 18" />
                            </svg>
                        </div>
                        <div className="productDetail__points f jcse">
                            {
                                photos.map((photo, index) => {
                                    return <div className={photoNumber === index ? 'productDetail__bigPoint active f jcc aic' : 'productDetail__bigPoint f jcc aic'} key={index}>
                                        <div className={photoNumber === index ? 'productDetail__point active' : 'productDetail__point'}></div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                    <div className="productDetail__smallImages f jcse aic">
                        {
                            photos.map((photo, index) => (
                                <img key={index} src={photo} className="productDetail__smallImage" alt="" />
                            ))
                        }
                    </div>
                </div>

                <div className="productDetail__right f fdc">
                    <div className="productDetail__tabs f jcsb aifs">
                        <div onClick={() => handleTabs('info')} className={tabs === "info" ? "active lato" : 'lato'}>Product Information</div>
                        <div onClick={() => handleTabs('reviews')} className={tabs === "reviews" ? "active lato" : 'lato'}>Reviews</div>
                        <div onClick={() => handleTabs('faq')} className={tabs === "faq" ? "active lato" : 'lato'}>FAQ</div>
                    </div>
                    <div className={tabs === "info" ? "productDetail__info active" : "productDetail__info"}>
                        <div className="productDetail__title">{name}</div>
                        <div className="productDetail__ratings">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24">
                                <g id="Group_2" data-name="Group 2" transform="translate(-1020 -794)">
                                    <path id="Path_9" data-name="Path 9" d="M0,0H24V24H0Z" transform="translate(1020 794)" fill="none" />
                                    <path id="Path_10" data-name="Path 10" d="M12,17.75,5.828,20.995l1.179-6.873-5-4.867,6.9-1L11.993,2l3.086,6.253,6.9,1-5,4.867,1.179,6.873Z" transform="translate(1020 794)" fill="#fcaf18" stroke="#fcaf18" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                </g>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24">
                                <g id="Group_2" data-name="Group 2" transform="translate(-1020 -794)">
                                    <path id="Path_9" data-name="Path 9" d="M0,0H24V24H0Z" transform="translate(1020 794)" fill="none" />
                                    <path id="Path_10" data-name="Path 10" d="M12,17.75,5.828,20.995l1.179-6.873-5-4.867,6.9-1L11.993,2l3.086,6.253,6.9,1-5,4.867,1.179,6.873Z" transform="translate(1020 794)" fill="#fcaf18" stroke="#fcaf18" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                </g>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24">
                                <g id="Group_2" data-name="Group 2" transform="translate(-1020 -794)">
                                    <path id="Path_9" data-name="Path 9" d="M0,0H24V24H0Z" transform="translate(1020 794)" fill="none" />
                                    <path id="Path_10" data-name="Path 10" d="M12,17.75,5.828,20.995l1.179-6.873-5-4.867,6.9-1L11.993,2l3.086,6.253,6.9,1-5,4.867,1.179,6.873Z" transform="translate(1020 794)" fill="#fcaf18" stroke="#fcaf18" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                </g>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24">
                                <g id="Group_2" data-name="Group 2" transform="translate(-1020 -794)">
                                    <path id="Path_9" data-name="Path 9" d="M0,0H24V24H0Z" transform="translate(1020 794)" fill="none" />
                                    <path id="Path_10" data-name="Path 10" d="M12,17.75,5.828,20.995l1.179-6.873-5-4.867,6.9-1L11.993,2l3.086,6.253,6.9,1-5,4.867,1.179,6.873Z" transform="translate(1020 794)" fill="#fcaf18" stroke="#fcaf18" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                </g>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24">
                                <g id="Group_2" data-name="Group 2" transform="translate(-1020 -794)">
                                    <path id="Path_9" data-name="Path 9" d="M0,0H24V24H0Z" transform="translate(1020 794)" fill="none" />
                                    <path id="Path_10" data-name="Path 10" d="M12,17.75,5.828,20.995l1.179-6.873-5-4.867,6.9-1L11.993,2l3.086,6.253,6.9,1-5,4.867,1.179,6.873Z" transform="translate(1020 794)" fill="#fcaf18" stroke="#fcaf18" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                </g>
                            </svg>

                            <span className="lato">400 ratings | 37 answered questions</span>
                        </div>
                        <div className="productDetail__desc lato">
                            <strong>About this item:</strong>
                            <br /><br />
                            <p>{description}</p>
                        </div>
                        <div className="productDetail__price lato">
                            <CurrencyFormat
                                value={price}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                            />
                        </div>
                        <div className="productDetail__cta">
                            <Link to="/checkout"><button className="productDetail__bn lato" onClick={addToCart}>Buy Now</button></Link>
                            <button className="productDetail__atc lato" onClick={addToCart}>Add to Cart</button>
                        </div>
                    </div>
                    <div className={tabs === "reviews" ? "productDetail__reviews active f" : "productDetail__reviews"}>Coming soon!</div>
                    <div className={tabs === "faq" ? "productDetail__faq active f" : "productDetail__faq"}>Coming soon!</div>
                </div>
            </div >
        </>
    )
}

export default ProductDetail
