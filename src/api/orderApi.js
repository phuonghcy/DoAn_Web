import axiosClient from "./axiosClient"

const orderApi = {
    getAll: ({page = 1, limit, sortByDate}) => {
        const url = 'orders/'
        return axiosClient.get(url, { params: {page, limit, sortByDate}})
    },
    getById: (id) => {
        const url = `orders/${id}`
        return axiosClient.get(url)
    },
    createOrder: (data) => {
        const url = `orders/`
        return axiosClient.post(url, data)
    },
    updateStatusById: (id, data) => {
        const url = `orders/${id}/status`
        return axiosClient.put(url, data)
    },
}

export default orderApi