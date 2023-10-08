import apiUrl from '../apiConfig'
import axios from 'axios'

// READ -> Index
export const getAllStocks = () => {
    return axios(`${apiUrl}/stocks`)
}

// READ -> Show
export const getOneStock = (id) => {
    return axios(`${apiUrl}/stocks/${id}`)
}

// CREATE -> Add stock
export const createStock = (user, newStock) => {
    return axios({
        url: `${apiUrl}/stocks`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { stock: newStock }
    })
}
// UPDATE -> Change stock
export const updateStock = (user, updatedStock) => {
    return axios({
        url: `${apiUrl}/stocks/${updatedStock._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { stock: updatedStock }
    })
}

// DELETE -> Set a stock free
export const removeStock = (user, stockId) => {
    return axios({
        url: `${apiUrl}/stocks/${stockId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}


