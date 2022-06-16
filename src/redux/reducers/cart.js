const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {
    list: [],
    voucher: "",
    subTotal: 0,
    discount: 0,
    total: 0,
} ;
const cartReducer = (state = initialState, action) => {
    switch (action.type) {

        case "ADD_TO_CART": {
            const newList = [...state.list]
            let isFind = false
            newList.forEach(product => {
                if (product._id === action.payload._id) {
                    isFind = true
                    product.quantity += parseInt(action.payload.quantity)
                    product.totalPriceItem = product.quantity * product.price
                    return
                }
            })
            if (!isFind) {
                newList.push(action.payload)
            }   

            const subTotal = newList.reduce((sum, product) => sum + product.totalPriceItem, 0)

            console.log({
                ...state,
                list: newList,
                subTotal: subTotal,
                total: subTotal - state.discount
            })

            localStorage.setItem("cart", JSON.stringify({
                ...state,
                list: newList,
                subTotal: subTotal,
                total: subTotal - state.discount
            }))

            return {
                ...state,
                list: newList,
                subTotal: subTotal,
                total: subTotal - state.discount
            }
        }

        case "UPDATE_QUANTITY": {
            const newList = [...state.list]
            newList.forEach(product => {
                if (product._id === action.payload._id) {
                    product.quantity = action.payload.quantity
                    product.totalPriceItem = product.quantity * product.price
                    return
                }
            })

            const subTotal = newList.reduce((sum, product) => sum + product.totalPriceItem, 0)

            console.log({
                ...state,
                list: newList,
                subTotal: subTotal,
                total: subTotal - state.discount
            })

            localStorage.setItem("cart", JSON.stringify({
                ...state,
                list: newList,
                subTotal: subTotal,
                total: subTotal - state.discount
            }))

            return {
                ...state,
                list: newList,
                subTotal: subTotal,
                total: subTotal - state.discount
            }
        }

        case "REMOVE_ITEM": {
            const newList = [...state.list].filter(product => product._id !== action.payload._id)
            
            const subTotal = newList.reduce((sum, product) => sum + product.totalPriceItem, 0)

            console.log({
                ...state,
                list: newList,
                subTotal: subTotal,
                total: subTotal - state.discount
            })

             localStorage.setItem("cart", JSON.stringify({
                ...state,
                list: newList,
                subTotal: subTotal,
                total: subTotal - state.discount
            }))

            return {
                ...state,
                list: newList,
                subTotal: subTotal,
                total: subTotal - state.discount
            }
        }

        case "UPDATE_VOUCHER": {
            
            const subTotal = state.list.reduce((sum, product) => sum + product.totalPriceItem, 0)
            console.log({
                ...state,
                voucher: action.payload.voucher,
                subTotal: subTotal,
                discount: action.payload.discount,
                total: subTotal - action.payload.discount
            })

             localStorage.setItem("cart", JSON.stringify({
                ...state,
                voucher: action.payload.voucher,
                subTotal: subTotal,
                discount: action.payload.discount,
                total: subTotal - action.payload.discount
            }))

            return {
                ...state,
                voucher: action.payload.voucher,
                subTotal: subTotal,
                discount: action.payload.discount,
                total: subTotal - action.payload.discount
            }
        }

        case "DESTROY": {
            
            localStorage.setItem("cart", JSON.stringify({
                ...state,
                list: [],
                voucher: "",
                discount: 0,
                subTotal: 0,
                total: 0
           }))

           return {
                ...state,
                list: [],
                voucher: "",
                discount: 0,
                subTotal: 0,
                total: 0
           }
       }

        default: {
            return state;
        }
    }
};
  
export default cartReducer;
  