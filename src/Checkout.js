import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import CurrencyFormat from 'react-currency-format';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Payment from './Payment';

const stripePromise = loadStripe('pk_test_51IWuZYHKwZrgG2gusxD6Upss6bAtuUAL642NoR6DFp93k540vBcWvyvgOgn7z9AOiOJhFB6MVkeyMqZI2ssEk2P600VWxOrlmj')

function Checkout() {
    const [{ cart }, dispatch] = useStateValue()
    const [isFreeShipping, setIsFreeShipping] = useState(true)
    const [shippingCost, setShippingCost] = useState(0)

    const addQuantities = (cartIndex) => {
        dispatch({
            type: 'ADD_QUANTITIES',
            payload: {
                cartIndex: cartIndex
            }
        })
    }

    const subtractQuantities = (cartIndex) => {
        dispatch({
            type: 'SUBTRACT_QUANTITIES',
            payload: {
                cartIndex: cartIndex
            }
        })
    }

    const removeItem = (cartIndex) => {
        dispatch({
            type: 'REMOVE_ITEM',
            payload: {
                cartIndex: cartIndex
            }
        })
    }

    const handleShipping = (e, index) => {
        if (e.target.value === 'true' && typeof e.target.value === 'string') {
            setIsFreeShipping(true)
            setShippingCost(0)
        } else {
            setIsFreeShipping(false)
            setShippingCost(12)
        }
    }

    return (
        <div className="shoppingCart">
            <div className="checkout">
                <div className="checkout__title f aic">
                    <div className="checkout__title1">Shopping Cart</div>
                    <Link to="/" className="checkout__to-home lato f aifs">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="46" height="24" viewBox="0 0 46 24">
                                <g id="Group_1" data-name="Group 1" transform="translate(-492 -999)">
                                    <path id="Path_1" data-name="Path 1" d="M0,0H24V24H0Z" transform="translate(492 999)" fill="none" />
                                    <line id="Line_1" data-name="Line 1" x2="40" transform="translate(497 1011)" fill="none" stroke="#4c4b4d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                    <line id="Line_2" data-name="Line 2" x2="4" y2="4" transform="translate(497 1011)" fill="none" stroke="#4c4b4d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                    <line id="Line_3" data-name="Line 3" y1="4" x2="4" transform="translate(497 1007)" fill="none" stroke="#4c4b4d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                </g>
                            </svg>
                        </span>
                    Continue Shopping
                </Link>
                </div>
                {/* {
                cart.map(cartItem => cartItem.name)
            } */}
                <table className="checkout__items">
                    <thead>
                        <tr className="checkout__items-title lato">
                            <th>Product</th>
                            <th>QTY</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map((item, index) => (
                                <tr className="checkout__item" key={item.id}>
                                    <td className="checkout__item-product f aic">
                                        <input type="checkbox" className="checkout__item-checkbox" />
                                        <img className="checkout__item-image" src={item.photo} alt="" />
                                        <div className="checkout__text">
                                            <small className="lato">In Stock</small>
                                            <div className="checkout__item-title">{item.name}</div>
                                            <div className="checkout__item-desc lato f aic">
                                                <p>Color : <strong>Black</strong></p>
                                                <p>Shoe Size : <strong>42</strong></p>
                                                <div className="checkout__gift f aic">
                                                    <input type="checkbox" /><p>This is a gift</p>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="checkout__item-qty f aic">
                                            <svg onClick={() => addQuantities(index)} xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plus" width="15" height="15" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                            </svg>
                                            <strong className="checkout__item-qtyNumber lato">{item.quantity}</strong>
                                            <svg onClick={() => subtractQuantities(index)} xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-minus" width="15" height="15" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                            </svg>
                                        </div>
                                    </td>
                                    <td className="checkout__price lato">
                                        <CurrencyFormat
                                            value={item.price}
                                            displayType={"text"}
                                            thousandSeparator={true}
                                            prefix={"$"}
                                        />
                                    </td>
                                    <td className="checkout__options relative">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-heart absolute" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="#4c4b4d" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                            <path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path>
                                        </svg>
                                        <svg onClick={() => removeItem(index)} xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash absolute" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="#4c4b4d" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                            <line x1="4" y1="7" x2="20" y2="7"></line>
                                            <line x1="10" y1="11" x2="10" y2="17"></line>
                                            <line x1="14" y1="11" x2="14" y2="17"></line>
                                            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                                            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                                        </svg>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <div className="checkout__shipping">
                    <p className="checkout__shipping-title">Choose shipping</p>
                    <div className="checkout__shipping-text f jcsb">
                        <div className="checkout__shipping-options f fdc">
                            <label className="radio-inline">
                                <input type="radio" name="isFreeShipping" value="true" checked={isFreeShipping === true} onChange={(e) => handleShipping(e)} /> Free
                            </label>
                            <label className="radio-inline">
                                <input type="radio" name="isFreeShipping" value="false" checked={isFreeShipping === false} onChange={(e) => handleShipping(e)} /> Delivery at home (Upder 2-4 day) $12
                            </label>
                        </div>
                        <div className="checkout__total f fdc">
                            <div className="checkout__total-row1 f jcsb aic">
                                <div className="checkout__total-title lato">Subtotal ({cart.reduce((total, item) => total += item.quantity, 0) <= 1 ? `${cart.reduce((total, item) => total += item.quantity, 0)} item` : `${cart.reduce((total, item) => total += item.quantity, 0)} items`})</div>
                                <div className="checkout__total-amount">
                                    <CurrencyFormat
                                        value={cart.reduce((total, item) => total += (item.quantity * item.price), 0)}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        prefix={"$"}
                                    />
                                </div>
                            </div>
                            <div className="checkout__total-row2 f jcsb aic">
                                <div className="checkout__total-title">Shipping</div>
                                <div className="checkout__total-amount">
                                    <CurrencyFormat
                                        value={shippingCost}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        prefix={"$"}
                                    />
                                </div>
                            </div>
                            <div className="checkout__total-row3 f jcsb aic">
                                <div className="checkout__total-title">Cart Total</div>
                                <div className="checkout__total-amount">
                                    <CurrencyFormat
                                        value={cart.reduce((total, item) => total += (item.quantity * item.price), 0) + shippingCost}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        prefix={"$"}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <div className="payment">
                <div className="payment__title">
                    <p>Thomas, the last step remained!</p><img className="payment__emoji" src="https://cdn.shopify.com/s/files/1/1061/1924/products/Down_Pointing_Backhand_Index_Emoji_Icon_ios10_1024x1024.png?v=1571606090" alt="" />
                </div>
                <div className="payment__method">
                    <p className="payment__method-title">Payment Method:</p>
                    <label className="radio-inline">
                        <input type="radio" name="payment" defaultChecked />
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-credit-card" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <rect x="3" y="5" width="18" height="14" rx="3"></rect>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                            <line x1="7" y1="15" x2="7.01" y2="15"></line>
                            <line x1="11" y1="15" x2="13" y2="15"></line>
                        </svg>
                        <p>Credit Card</p>
                    </label>
                    <label className="radio-inline">
                        <input type="radio" name="payment" />
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-paypal" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M10 13l2.5 0c2.5 0 5 -2.5 5 -5c0 -3 -1.9 -5 -5 -5h-5.5c-.5 0 -1 .5 -1 1l-2 14c0 .5 .5 1 1 1h2.8l1.2 -5c.1 -.6 .4 -1 1 -1zm7.5 -5.8c1.7 1 2.5 2.8 2.5 4.8c0 2.5 -2.5 4.5 -5 4.5h-2.6l-.6 3.6a1 1 0 0 1 -1 .8l-2.7 0a0.5 .5 0 0 1 -.5 -.6l.2 -1.4"></path>
                        </svg>
                        <p>Paypal</p>
                    </label>
                    <label className="radio-inline">
                        <input type="radio" name="payment" />
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="23.635" viewBox="0 0 24 23.635">
                            <path id="wmtransfer-icon" d="M11.943.487a12.059,12.059,0,0,1,5.253,1.2c.251.113.5.249.753.384l-1.1.971L15.209,1.349,12.378,3.831,10.71,2.044,5.5,6.673l3.334,3.634-1.3,1.129,3.289,3.634L9.523,16.2l4.7,5.17,2.784-2.529,2.422,2.71a13.582,13.582,0,0,1-1.575,1.039,12.041,12.041,0,0,1-5.892,1.534A11.908,11.908,0,0,1,0,12.294,11.885,11.885,0,0,1,11.943.487ZM9.75,11.571,12.6,9.043l2.558,2.822-2.855,2.528Zm2.032,4.876L14.614,13.9l2.581,2.821-2.855,2.529ZM7.719,6.763l2.85-2.529,2.557,2.822L10.271,9.584ZM12.947,5.4l2.127-1.892,1.918,2.1L14.869,7.531ZM16.735,14.1,18.862,12.2l1.918,2.121-2.124,1.9Zm1.872,4.267,2.124-1.9,1.917,2.1-2.123,1.918Zm.868-9.753,1.416-1.264,1.279,1.4L20.755,10.01ZM17.648,4.434l1.416-1.286L20.344,4.57,18.927,5.834Zm3.631,8.353,1.416-1.264,1.3,1.4L22.562,14.19ZM14.9,9.649l2.124-1.9,1.918,2.1-2.123,1.9Z" transform="translate(0 -0.487)" />
                        </svg>
                        <p>Web Money</p>
                    </label>
                </div>

                <div className="payment__name">
                    <p className="payment__method-title">Name on card:</p>
                    <input type="text" className="payment__inputName montserrat" placeholder="Fill your name" />
                </div>

                <Elements stripe={stripePromise}>
                    <Payment amount={cart.reduce((total, item) => total += (item.quantity * item.price), 0) + shippingCost} />
                </Elements>
            </div>
        </div>
    )
}

export default Checkout
