import { StyleFormat, HostApi, NameCookie} from "./TheConst"
import axios from 'axios';

/**
* Hàm format số tiền (ngăn cách phần nghìn)
* TVTOAN (26/07/2022)
*/
export function formatPrice(value) {
    try {
        let newVal = value.toString().replace(/^0+/, '').replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, StyleFormat.FORMAT_NUMBER);
        return newVal
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
        return value.split(StyleFormat.FORMAT_NUMBER).join('');
    } catch (error) {
        console.log(error);
        return "";
    }
}

/**
* Hàm format ngày tháng
* TVTOAN (26/07/2022)
*/
export function formatDate(date) {
    try {
        let characters = StyleFormat.CHARACTER_DATE;
        let format = StyleFormat.FORMAT_DATE;
        if (date) {
            date = new Date(date);
            let dd = `${((date.getDate() < 10) ? '0' : '')}${date.getDate()}`;
            let MM = `${((date.getMonth() < 9) ? '0' : '')}${date.getMonth() + 1}`;
            let YYYY = `${date.getFullYear()}`;
            let arrayDate = format.split(`${characters}`)
            for (let i = 0; i < arrayDate.length; i ++) {
                if(arrayDate[i] == 'dd') {
                    arrayDate[i] = dd
                }
                if(arrayDate[i] == 'MM') {
                    arrayDate[i] = MM
                }
                if(arrayDate[i] == 'YYYY') {
                    arrayDate[i] = YYYY
                }
            }
            return arrayDate.join(`${characters}`) ;
        }
    } catch (error) {
        console.log(error);
        return "";
    }
}

/**
* Hàm lấy token từ cookie
* TVTOAN (26/07/2022)
*/
export function getCookie(name) {
    try {
        let cookie = {};
        document.cookie.split(';').forEach(function(el) {
          let [key,value] = el.split('=');
          cookie[key.trim()] = value;
        })
        if(cookie[name]) {
            return cookie[name];
        }
    } catch (error) {
        console.log(error);
    }
}

function getToken() {
    return getCookie(NameCookie.NAME_TOKEN);
}

/**
* Hàm goi api bang axios
* TVTOAN (29/09/2022)
*/
export const HTTP = axios.create({
  baseURL: `${HostApi.HOST_FIXED_ASSET}`,
  headers: {
    Authorization: `Bearer ` + getToken()
  }
})