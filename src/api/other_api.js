import axios from 'axios'

export const getLogo = (ticker) => {
    return axios({
        method: 'GET',
        url: 'https://twelve-data1.p.rapidapi.com/logo',
        params: {symbol: ticker },
        headers: {
            'X-RapidAPI-Key': `${process.env.REACT_APP_X_RapidAPI_Key}`,
            'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
        }
    })
}

  
  