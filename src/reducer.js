export const initialState = {
    cart: [],
    user: null
};

export const getCartTotal = (cart) =>
    cart.reduce((total, item) => total + item.price, 0)

const reducer = (state, action) => {
    switch (action.type) {
        case 'USER_LOGIN':
            console.log(action.payload.user)
            return {
                ...state,
                user: action.payload.user
            }
        case 'USER_LOGOUT':
            return {
                ...state,
                user: null
            }
        case 'ADD_TO_CART':
            const id = action.payload.id
            if (state.cart.length === 0) {
                return {
                    ...state,
                    cart: [...state.cart, {
                        id: action.payload.id,
                        name: action.payload.name,
                        price: action.payload.price,
                        photo: action.payload.photo,
                        quantity: 1
                    }]
                }
            } else {
                const cartIndex = state.cart.findIndex(cartItem => cartItem.id === id)
                if (cartIndex === -1) {
                    return {
                        ...state,
                        cart: [...state.cart, {
                            id: action.payload.id,
                            name: action.payload.name,
                            price: action.payload.price,
                            photo: action.payload.photo,
                            quantity: 1
                        }]
                    }
                } else {
                    const newCart = [...state.cart]
                    newCart.splice(cartIndex, 1)
                    newCart.splice(cartIndex, 0, {
                        id: action.payload.id,
                        name: action.payload.name,
                        price: action.payload.price,
                        photo: action.payload.photo,
                        quantity: state.cart[cartIndex].quantity + 1
                    })
                    return {
                        ...state,
                        cart: newCart
                    }
                }
            }
        case 'ADD_QUANTITIES':
            const cartIndex = action.payload.cartIndex
            const newCart = [...state.cart]
            newCart.splice(cartIndex, 1)
            newCart.splice(cartIndex, 0, {
                id: state.cart[cartIndex].id,
                name: state.cart[cartIndex].name,
                price: state.cart[cartIndex].price,
                photo: state.cart[cartIndex].photo,
                quantity: state.cart[cartIndex].quantity + 1
            })
            return {
                ...state,
                cart: newCart
            }

        case 'SUBTRACT_QUANTITIES':
            const index = action.payload.cartIndex
            const newCart1 = [...state.cart]
            newCart1.splice(index, 1)
            newCart1.splice(index, 0, {
                id: state.cart[index].id,
                name: state.cart[index].name,
                price: state.cart[index].price,
                photo: state.cart[index].photo,
                quantity: state.cart[index].quantity - 1
            })

            if (newCart1[index].quantity === 0) {
                newCart1.splice(index, 1)
            }

            return {
                ...state,
                cart: newCart1
            }
        case 'REMOVE_ITEM':
            const indexCart = action.payload.cartIndex
            console.log(indexCart)
            const cartNew = [...state.cart]
            cartNew.splice(indexCart, 1)

            return {
                ...state,
                cart: cartNew
            }
        case 'EMPTY_CART':
            return {
                ...state,
                cart: []
            }
        default:
            return state;
    }
};

export default reducer;