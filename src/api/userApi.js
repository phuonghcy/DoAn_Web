import axiosClient from "./axiosClient"

const userApi = {

    getCurrentUser: () => {
        const url = 'auth/current-user'
        return axiosClient.get(url)
    },
    getById: (id) => {
        const url = 'users/'
        return axiosClient.get(url, { params: { id } })
    }

}

export default userApi