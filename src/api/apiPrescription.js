import { API } from '../utils/config';
import axios from 'axios';

export const uploadPrescription = (token, data) => {
    return axios.post(`${API}/prescription`, data, {
        headers: {
            "authorization": `Bearer ${token}`
        }
    })
}

export const getPrescriptions = (token) => {
    return axios.get(`${API}/prescription`, {
        headers: {
            "authorization": `Bearer ${token}`
        }
    })
}
export const getProfile = (token, userid) => {
    return axios.get(`${API}/profile/user`, {
        headers: {
            "authorization": `Bearer ${token}`,
            'userid': `${userid}`
        }
    })
}

export const updatePrescription = (token, prescriptionId, data) => {
    return axios.put(`${API}/prescription/update`, data, {
        headers: {
            "authorization": `Bearer ${token}`,
            'prescriptionid': `${prescriptionId}`,
        }
    })
}

export const getAdminApprovedPrescriptions = (token, userId) => {
    return axios.get(`${API}/prescription/user/current`, {
        headers: {
            "authorization": `Bearer ${token}`,
            'userid': `${userId}`,
        }
    })
}

export const deletePrescription = (token, prescriptionId) => {
    return axios.delete(`${API}/prescription/delete`, {
        headers: {
            "authorization": `Bearer ${token}`,
            'prescriptionid': `${prescriptionId}`,
        }
    })
}

export const getUserById = (token, userId) => {
    return axios.get(`${API}/user/find`, {
        headers: {
            "authorization": `Bearer ${token}`,
            'userid': `${userId}`,
        }
    })
}
export const getOrderedPrescriptions = (token, userId) => {
    return axios.get(`${API}/prescription/userconfirmed`, {
        headers: {
            "authorization": `Bearer ${token}`,
            'userid': `${userId}`,
        }
    })
}