import {toast} from "react-toastify";

export const sleep = (timeMS) =>  new Promise(resolve => setTimeout(resolve, timeMS));

export  const toastNotify = (msg, opt) => {
    toast(msg, opt);
};
