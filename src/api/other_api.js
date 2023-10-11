import axios from 'axios'

export const getLogo = (ticker) => {
    return new Promise((resolve, reject) => {
      axios.request({
        method: 'GET',
        url: 'https://twelve-data1.p.rapidapi.com/logo',
        params: { symbol: ticker },
        headers: {
          'X-RapidAPI-Key': `${process.env.REACT_APP_X_RapidAPI_Key}`,
          'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com',
        },
      })
        .then((res) => {
          console.log('this is res.data', res.data.url);
          const url = res.data.url;
          resolve(url); // Resolve the promise with the data
        })
        .catch((error) => {
          reject(error); // Reject the promise if there's an error
        });
    });
  };

export const getLastPrice = (ticker) => {
    return new Promise((resolve, reject) => {
        axios.request({
            url: `https://twelve-data1.p.rapidapi.com/price?symbol=${ticker}&format=json&outputsize=30`,
            method: 'GET',
            maxBodyLength: Infinity,
            headers: { 
                'X-RapidAPI-Key': `${process.env.REACT_APP_X_RapidAPI_Key}`, 
                'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
            },
            })
            .then((res) => {
                console.log('this is res.data', res.data);
                const lastPrice = res.data.price;
                resolve(lastPrice); // Resolve the promise with the data
            })
            .catch((error) => {
                reject(error); // Reject the promise if there's an error
            });
    });
};

export const getHistory = (ticker) => {
    return new Promise((resolve, reject) => {
        axios.request({
                method: 'GET',
                url: 'https://twelve-data1.p.rapidapi.com/time_series',
                params: {
                    symbol: `${ticker}`,
                    interval: '1day',
                    outputsize: '30',
                    format: 'json'
                },
                maxBodyLength: Infinity,
                headers: { 
                    'X-RapidAPI-Key': `${process.env.REACT_APP_X_RapidAPI_Key}`, 
                    'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
                }
            })
            .then((res) => {
                const data = res.data;
                resolve(data); // Resolve the promise with the data
            })
            .catch((error) => {
                reject(error); // Reject the promise if there's an error
            });
    });
};

  
  