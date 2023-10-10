import axios from 'axios'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { updateStock} from '../../api/stock'
import { updateStockSuccess, updateStockFailure} from '../shared/AutoDismissAlert/messages'


const StockUpdate = (props) => {

    const { stock, stocks, setStocks, user }= props
    const updatedStocks = [...stocks]
    // to utilize the navigate hook from react-router-dom
    const navigate = useNavigate()
    console.log('this is updated stock first',updatedStocks)

    const updateValues = () => {
       
        axios.request({
            method: 'GET',
            url: 'https://twelve-data1.p.rapidapi.com/time_series',
            params: {
                symbol: `${stock.symbol}`,
                interval: '1day',
                outputsize: '30',
                format: 'json'
            },
            maxBodyLength: Infinity,
            headers: { 
                'X-RapidAPI-Key': `${process.env.REACT_APP_X_RapidAPI_Key}`, 
                'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
            },
            })
            .then((response) => {
                console.log(JSON.stringify(response.data.values[0]));

                const indexToUpdate = updatedStocks.findIndex(obj => obj._id === stock._id);
                if (indexToUpdate !== -1) {

                    axios.request({
                        url: `https://twelve-data1.p.rapidapi.com/price?symbol=${stock.symbol}&format=json&outputsize=30`,
                        method: 'GET',
                        maxBodyLength: Infinity,
                        headers: { 
                            'X-RapidAPI-Key': `${process.env.REACT_APP_X_RapidAPI_Key}`, 
                            'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
                        },
                        })
                        .then((response) => {
                            console.log('last price successful',JSON.stringify(response.data));
                            updatedStocks[indexToUpdate].price = response.data.price
                            
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                
                    updatedStocks[indexToUpdate]._id = stock._id
                    updatedStocks[indexToUpdate].symbol = stock.symbol
                    updatedStocks[indexToUpdate].prev_price = response.data.values[1].close
                    updatedStocks[indexToUpdate].open = response.data.values[0].open
                    updatedStocks[indexToUpdate].high = response.data.values[0].high
                    updatedStocks[indexToUpdate].low = response.data.values[0].low
                    updatedStocks[indexToUpdate].close = response.data.values[0].close
                    updatedStocks[indexToUpdate].volume = response.data.values[0].volume
            
                    setStocks(updatedStocks)
                    console.log('updated stock',updatedStocks[indexToUpdate])
                } else {
                    console.log("Object not found in the array.");
                }
                
                
                updateStock(user, updatedStocks[indexToUpdate])
                    // then navigate the user to the show page if successful
                    .then(res => { 
                        navigate(`/stocks`)
                    })
                    // send a success message
                    // .then(() => {
                    //     msgAlert({
                    //         heading: 'Oh Yeah!',
                    //         message: updateStockSuccess,
                    //         variant: 'success'
                    //     })
                    // })
                    // if it fails, keep the user on the create page and send a message
                    .catch((error) => {
                        console.log(error);
                    });
        })
        .catch((error) => {
            console.log(error);
        });

        
    }

    

    return(
        <>
            <small>{stock.updatedAt}</small>
            <Button variant="secondary" onClick={updateValues}>
                <svg width={20} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
            </Button>
        </>
    )
}

export default StockUpdate;