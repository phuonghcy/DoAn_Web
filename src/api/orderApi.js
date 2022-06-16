import axiosClient from "./axiosClient"

const orderApi = {
    getAll: ({page = 1, limit, sortByDate, userId}) => {
        const url = 'orders/'
        return axiosClient.get(url, { params: {page, limit, sortByDate, userId}})
    },
    getById: (id, {userId}) => {
        const url = `orders/${id}`
        return axiosClient.get(url, { params: {userId}})
    },
    createOrder: (data) => {
        const url = `orders/`
        return axiosClient.post(url, data)
    },
    updateStatusById: (id, data) => {
        const url = `orders/${id}/status`
        return axiosClient.put(url, data)
    },
    updatePaymentStatusById: (id, data) => {
        const url = `orders/${id}/payment-status`
        return axiosClient.put(url, data)
    },
}

export default orderApi