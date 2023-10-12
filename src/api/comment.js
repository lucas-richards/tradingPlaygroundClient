import apiUrl from '../apiConfig'
import axios from 'axios'


// CREATE
export const createComment = (user, transactionId, newComment) => {
    return axios({
        url: `${apiUrl}/comments/${transactionId}`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { comment: newComment }
    })
}

// UPDATE
export const updateComment = (user, transactionId, commentId, updatedComment) => {
    return axios({
        url: `${apiUrl}/comments/${transactionId}/${commentId}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { comment: updatedComment }
    })
}
// DELETE 
export const removeComment = (user, transactionId, commentId) => {
    return axios({
        url: `${apiUrl}/comments/${transactionId}/${commentId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}
