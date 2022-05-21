import axiosClient from "./axiosClient"

const authApi = {

    loginWithGoogle: (accessToken) => {
        const url = 'auth/google'
        return axiosClient.post(url, {accessToken: accessToken})
    },
    loginWithFacebook: (data) => {
        const url = 'auth/facebook'
        return axiosClient.post(url, data)
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