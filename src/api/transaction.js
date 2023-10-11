import apiUrl from '../apiConfig'
import axios from 'axios'


// READ -> Index
export const getAllTransactions = () => {
    return axios(`${apiUrl}/transactions`)
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