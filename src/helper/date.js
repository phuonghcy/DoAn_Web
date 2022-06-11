const date = {
    getMonday: (date) => {
        const first = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1)
        const monday = new Date(date.setDate(first))
        monday.setUTCHours(0, 0, 0, 0)
        monday.setHours(0)
        return monday
    },
    getSunday: (date) => {
        const first = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1)
        const sunday = new Date(date.setDate(first + 6))
        sunday.setUTCHours(0, 0, 0, 0)
        sunday.setHours(0)
        return sunday
    },
    isToday: (date) => {
        return new Date(date).toLocaleDateString() === new Date().toLocaleDateString()
    }
}

export default date