const format = {
    formatPrice: (price) => {
        return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", }).format(price);
    }
    
}
export default format