const format = {
    formatPrice: (price) => {
        return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", }).format(price);
    },
    formatDate: (date) => {
        if (date) {
            const newDate = new Date(date)
            return newDate.toLocaleDateString().slice(0, 10) + " " + newDate.toLocaleTimeString('en-GB')
        } 
        return date
    }
}

export default format