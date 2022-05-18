import axiosClient from "./axiosClient"

const authorApi = {

    getAll: () => {
        const url = 'authors/'
        return axiosClient.get(url)
    }

}

export default authorApi