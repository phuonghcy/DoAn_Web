import axiosClient from "./axiosClient"

const voucherApi = {

    getAll: ({page, limit, sortByDate, canUse}) => {
        const url = 'vouchers/'
        return axiosClient.get(url, { params: {page, limit, sortByDate, canUse}})
    },
    getById: (id) => {
        const url = `vouchers/${id}`
        return axiosClient.get(url)
    },
    getByCode: (code) => {
        const url = `vouchers/code/${code}`
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