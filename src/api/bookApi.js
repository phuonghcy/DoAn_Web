import axiosClient from "./axiosClient"

const bookApi = {

    getAll: ({genre, page = 1, limit, sortByPrice, sortByDate, key}) => {
        const url = 'books/'
        return axiosClient.get(url, { params: {genre, page, limit, sortByPrice, sortByDate, key}})
    },
    getById: (id) => {
        const url = `books/${id}`
        return axiosClient.get(url)
    },
    getByBookId: (bookId) => {
        const url = `books/bookId/${bookId}`
        return axiosClient.get(url)
    },
    getBySlug: (slug) => {
        const url = `books/slug/${slug}`
        return axiosClient.get(url)
    },
    checkIsOrdered: (id) => {
        const url = `books/is-ordered/${id}`
        return axiosClient.get(url)
    },
    search: ({key, limit}) => {
        const url = `books/search`
        return axiosClient.get(url, { params: {key, limit}})
    },
    createBook: (data) => {
        const url = `books/`
        return axiosClient.post(url, data)
    },
    updateBook: (id, data) => {
        const url = `books/${id}`
        return axiosClient.put(url, data)
    },
    deleteBook: (id) => {
        const url = `books/${id}`
        return axiosClient.delete(url)
    }

}

export default bookApi