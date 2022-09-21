
/**
* Hàm format số tiền
* TVTOAN (26/07/2022)
*/
export function formatPrice(value) {
    try {
        let newVal = value.toString().replace(/^0+/, '').replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return newVal
    } catch (error) {
        console.log(error);
    }
}

/**
* Hàm format số tiền
* TVTOAN (26/07/2022)
*/
export function formatInputTypeNumber(value) {
    try {
        return value.replace(/[^0-9.]/g,'');
    } catch (error) {
        console.log(error);
    }
}


/**
* Hàm format ngày tháng năm
* TVTOAN (26/07/2022)
*/
export function formatInputDate(value) {
    try {
        var date = value.toString().replace(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
        return (date) ? new Date(date[3], date[2] - 1, date[1]) : null;
    } catch (error) {
        console.log(error);
    }
}

/**
* Hàm format số tiền có phân cách thành không phân cách
* TVTOAN (26/07/2022)
*/
export function formatNumber(value) {
    try {
        return value.split('.').join('');
    } catch (error) {
        console.log(error);
        return "";
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

