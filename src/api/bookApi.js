import axiosClient from "./axiosClient"

const bookApi = {

    getAll: ({genre, page, limit, sortByPrice, sortByDate}) => {
        const url = 'books/'
        return axiosClient.get(url, { params: {genre, page, limit, sortByPrice, sortByDate}})
    },
    getByBookId: (bookId) => {
        const url = `books/${bookId}`
        return axiosClient.get(url)
    },
    createBook: (data) => {
        const url = `books/`
        return axiosClient.post(url, data)
    }

}

export default bookApi