import axios from 'axios'
import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { updateStock} from '../../api/stock'
import { updateStockSuccess, updateStockFailure} from '../shared/AutoDismissAlert/messages'


const StockUpdate = (props) => {

    const { stock, user }= props
    const [updatedStock,setUpdatedStock] = useState(stock)
    // to utilize the navigate hook from react-router-dom
    const navigate = useNavigate()
    console.log('this is updated stock at first',updatedStock)

    const updateValues = () => {
       
        axios.request({
            method: 'GET',
            url: 'https://twelve-data1.p.rapidapi.com/time_series',
            params: {
                symbol: `${updatedStock.symbol}`,
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
            
            setUpdatedStock({
                _id: updatedStock._id,
                symbol: updatedStock.symbol,
                price: updatedStock.price,
                open: response.data.values[0].open,
                high: response.data.values[0].high,
                low: response.data.values[0].low,
                close: response.data.values[0].close,
                volume: response.data.values[0].volume,
            })
            console.log(updatedStock)
            // return response
        })
        .catch((error) => {
            console.log(error);
        });

        updateStock(user, updatedStock)
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