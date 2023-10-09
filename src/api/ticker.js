import axios from 'axios'

export const findTicker = (name) => {
    return axios({
        url: `https://api.polygon.io/v3/reference/tickers?search=amazon&active=true&apiKey=Gix6f7hEpaZXp7fNoboim0QRYESppzrm`,
        method: 'GET',
        headers: {},
        maxBodyLength: Infinity
    })
}
  
// axios.request({
//         url: 'https://api.polygon.io/v3/reference/tickers?search=amazon&active=true&apiKey=Gix6f7hEpaZXp7fNoboim0QRYESppzrm',
//         method: 'GET',
//         maxBodyLength: Infinity,
//         headers: { }
//       })
//   .then((response) => {
//     console.log(JSON.stringify(response.data));
//     return response
//   })
//   .catch((error) => {
//     console.log(error);
//   });