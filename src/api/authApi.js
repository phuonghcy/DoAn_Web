import axiosClient from "./axiosClient"

const authApi = {

    loginWithGoogle: (accessToken) => {
        const url = 'auth/google'
        return axiosClient.post(url, {accessToken: accessToken})
    },
    getRefreshToken: () => {
        const url = 'auth/refresh-token'
        return axiosClient.post(url)
    },
    logout: () => {
        const url = `auth/logout`
        return axiosClient.get(url)
    }

}

export default authApi