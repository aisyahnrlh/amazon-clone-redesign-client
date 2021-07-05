import React, { useState } from 'react';
import { CardCvcElement, CardNumberElement, CardExpiryElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from "axios";
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from './StateProvider';
import { useHistory } from 'react-router-dom';

function Payment({ amount }) {
    const stripe = useStripe()
    const elements = useElements()
    const [{ cart }, dispatch] = useStateValue()
    const [disabled, setDisabled] = useState(true)
    const [succeeded, setSucceeded] = useState(false)
    const [processing, setProcessing] = useState("")
    const [error, setError] = useState(null)
    const history = useHistory();

    const cardElementOptions = {
        style: {
            base: {
                fontSize: '16px',
                color: '#000',
                fontFamily: 'Lato'
            },
            invalid: {
                color: '#ff0000'
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setProcessing(true)
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardNumberElement)
        })

        if (!error) {
            try {
                const { id } = paymentMethod
                const response = await axios.post("https://secure-brook-65032.herokuapp.com/payment", {
                    amount: Math.round(amount * 100),
                    id
                })

                if (response.data.success) {
                    console.log("Success Payment")
                    setSucceeded(true)
                    setError(null)
                    setProcessing(false)
                    dispatch({
                        type: "EMPTY_CART",
                    })
                }
                history.replace('orders')
            } catch (error) {
                console.log("Error", error)
            }
        } else {
            console.log(error.message)
        }
    }

    const handleChange = event => {
        // listen for changes in the card element and display any errors as the costumer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

    console.log(error, disabled, processing)

    return (
        <>
            <form onSubmit={handleSubmit} className="payment__card">
                <div>
                    <p className="payment__method-title lato">Card Number:</p>
                    <CardNumberElement onChange={handleChange} options={cardElementOptions} />
                </div>
                <div className="payment__inputCard">
                    <div className="div">
                        <p className="payment__method-title lato">Expiration Date:</p>
                        <CardExpiryElement onChange={handleChange} options={cardElementOptions} />
                    </div>
                    <div>
                        <p className="payment__method-title lato">CVV:</p>
                        <CardCvcElement onChange={handleChange} options={cardElementOptions} />
                    </div>
                </div>
                <button className="payment__checkout lato" disabled={processing || disabled || succeeded}>
                    {
                        processing
                            ?
                            <>
                                <p>Processing</p>
                                <img className="payment__checkout-loading" src="https://gifimage.net/wp-content/uploads/2017/11/gif-loading-transparent.gif" alt="" />
                            </>
                            :
                            <>
                                <p>Checkout</p>
                                <p>
                                    <CurrencyFormat
                                        value={amount}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        prefix={"$"}
                                    />
                                </p>
                            </>
                    }

                </button>
            </form>
        </>
    )
}

export default Payment
