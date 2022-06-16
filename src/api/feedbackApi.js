import axiosClient from "./axiosClient"

const feedbackApi = {
    getAll: ({page, limit, sortByDate}) => {
        const url = 'feedbacks/'
        return axiosClient.get(url, { params: {page, limit, sortByDate}})
    },
    createFeedback: (data) => {
        const url = `feedbacks/`
        return axiosClient.post(url, data)
    },
   
}

export default feedbackApi