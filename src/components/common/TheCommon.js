
    export function formatPrice(value) {
        try {
            return value.toString().replace(/^0+/, '').replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        } catch (error) {
            console.log(error);
        }
    }
    export function formatDate(date) {
        try {
            let characters = '/'
            if (date) {
                date = new Date(date);
                return `${((date.getDate() < 10) ? '0' : '')}${date.getDate()}${characters}${((date.getMonth() < 9) ? '0' : '')}${date.getMonth() + 1}${characters}${date.getFullYear()}`
            }
        } catch (error) {
            console.log(error);
            return "";
        }
    }
