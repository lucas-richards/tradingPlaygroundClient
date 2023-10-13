import apiUrl from '../apiConfig'
import axios from 'axios'

// READ -> Index
export const getAllAccounts = (ownerIdToFind) => {
    const url = ownerIdToFind ? `${apiUrl}/accounts?ownerIdToFind=${ownerIdToFind}` : `${apiUrl}/accounts`;
    return axios(url)
}

// READ -> Show
export const getOneAccount = (id) => {
    return axios(`${apiUrl}/accounts/${id}`)
}

// CREATE -> Add account
export const createAccount = (user) => {
    return axios({
        url: `${apiUrl}/accounts`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}
// UPDATE -> Change account
export const updateAccount = (user, updatedAccount) => {
    return axios({
        url: `${apiUrl}/accounts/${updatedAccount._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { account: updatedAccount }
    })
}



