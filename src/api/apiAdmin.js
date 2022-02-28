import { API } from "../utils/config";
import axios from "axios";

export const createCategory = (token, data) => {
    return axios.post(`${API}/category`, data, {
        headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${token}`
        }
    })
}
export const createProduct = (token, data) => {
    return axios.post(`${API}/product`, data, {
        headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${token}`
        }
    })
}
export const updateProductById = (token, data, id) => {
    return axios.put(`${API}/product/${id}`, data, {
        headers: {
            "authorization": `Bearer ${token}`
        }
    })
}

export const deleteProductById = (token, id) => {
    return axios.delete(`${API}/product/${id}`, {
        headers: {
            "authorization": `Bearer ${token}`
        }
    })
}

export const getCategories = () => {
    return axios.get(`${API}/category`);
}
