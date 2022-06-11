import axiosClient from "./axiosClient"

const voucherApi = {

    getAll: ({page, limit, sortByDate}) => {
        const url = 'vouchers/'
        return axiosClient.get(url, { params: {page, limit, sortByDate}})
    },
    getById: (id) => {
        const url = `vouchers/${id}`
        return axiosClient.get(url)
    },
    createVoucher: (data) => {
        const url = `vouchers/`
        return axiosClient.post(url, data)
    },
    updateVoucher: (id, data) => {
        const url = `vouchers/${id}`
        return axiosClient.put(url, data)
    },
    deleteVoucher: (id) => {
        const url = `vouchers/${id}`
        return axiosClient.delete(url)
    }

}

export default voucherApi