import axios from 'axios'

const ROUTES = {
    CLIENTS: '/clients/',
    TRANSACTIONS: '/transactions/',
}

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
})

const getClients = async () => {
    return await api.get(ROUTES.CLIENTS, {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
    })
}

const getTransactions = async (client_id?: string[], start_date?: string, end_date?: string) => {
    return await api.get(ROUTES.TRANSACTIONS, {
        params: {
            client_id: client_id,
            start_date: start_date,
            end_date: end_date,
        },
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
    })
}

const apiService = {
    getClients,
    getTransactions,
}
export default apiService
