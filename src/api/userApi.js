import axiosClient from "./axiosClient"

const userApi = {
    addAddress: (id, data) => {
        const url = `users/${id}/address`
        return axiosClient.post(url, data)
    },
    getCurrentUser: () => {
        const url = 'auth/current-user'
        return axiosClient.get(url)
    },
    getById: (id) => {
        const url = `users/${id}`
        return axiosClient.get(url)
    },
    getAllAddressById: (id) => {
        const url = `users/${id}/address`
        return axiosClient.get(url)
    },
    updateById: (id, data) => {
        const url = `users/${id}`
        return axiosClient.put(url, data)
    },
    updateAddressById: (id, addressId, data) => {
        const url = `users/${id}/address/${addressId}`
        return axiosClient.patch(url, data)
    },
    updateDefaultAddressById: (id, addressId) => {
        const url = `users/${id}/address/status/${addressId}`
        return axiosClient.patch(url)
    },
    deleteById: (id, addressId) => {
        const url = `users/${id}/address/${addressId}`
        return axiosClient.delete(url)
    },

}

export default userApi