import apiUrl from '../apiConfig'
import axios from 'axios'


// READ -> Index
export const getAllTransactions = () => {
    return axios(`${apiUrl}/transactions`)
}

// READ -> Show
export const getOneTransaction = (user, id) => {
    return axios({
        url:`${apiUrl}/transactions/${id}`,
        method:'GET',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}

// CREATE -> Add transaction
export const createTransaction = (user, newTransaction) => {
    return axios({
        url: `${apiUrl}/transactions`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { transaction: newTransaction }
    })
}