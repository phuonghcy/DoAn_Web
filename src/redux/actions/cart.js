export const addToCart = (product) => {
    return  {
        type: 'ADD_TO_CART',
        payload: product
    }
}

export const updateQuantity = (data) => {
    return  {
        type: 'UPDATE_QUANTITY',
        payload: data
    }
}

export const removeItem = (data) => {
    return  {
        type: 'REMOVE_ITEM',
        payload: data
    }
}






