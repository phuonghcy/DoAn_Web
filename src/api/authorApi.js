import axiosClient from "./axiosClient"

const authorApi = {

    getAll: ({page, limit, sortByDate}) => {
        const url = 'authors/'
        return axiosClient.get(url, { params: {page, limit, sortByDate}})
    },
    getById: (id) => {
        const url = `authors/${id}`
        return axiosClient.get(url)
    },
    updateAuthor: (id, data) => {
        const url = `authors/${id}`
        return axiosClient.put(url, data)
    },
    createAuthor: (data) => {
        const url = `authors/`
        return axiosClient.post(url, data)
    },
    deleteAuthor: (id) => {
        const url = `authors/${id}`
        return axiosClient.delete(url)
    }

   
}

export default authorApi