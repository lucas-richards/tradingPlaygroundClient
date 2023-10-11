import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { updateStock} from '../../api/stock'
import { updateStockSuccess, updateStockFailure} from '../shared/AutoDismissAlert/messages'
import { getHistory, getLastPrice } from '../../api/other_api'

const StockUpdate = (props) => {

    const { stock, stocks, setStocks, user, msgAlert }= props
    const updatedStocks = [...stocks]
    // to utilize the navigate hook from react-router-dom
    const navigate = useNavigate()

    const updateValues = () => {
       
        getHistory(stock.symbol)
            .then((data) => {
                console.log(JSON.stringify(data.values[0]));

                const indexToUpdate = updatedStocks.findIndex(obj => obj._id === stock._id);
                if (indexToUpdate !== -1) {

                    getLastPrice(stock.symbol)
                        .then((lastPrice) => {
                            updatedStocks[indexToUpdate].price = lastPrice
                            updatedStocks[indexToUpdate].prev_price = data.values[1].close
                            updatedStocks[indexToUpdate].open = data.values[0].open
                            updatedStocks[indexToUpdate].high = data.values[0].high
                            updatedStocks[indexToUpdate].low = data.values[0].low
                            updatedStocks[indexToUpdate].close = data.values[0].close
                            updatedStocks[indexToUpdate].volume = data.values[0].volume
                            setStocks(updatedStocks)
                            return updatedStocks[indexToUpdate]

                        })
                        .then((uSData)=>{
                            updateStock(user, uSData)
                                // then navigate the user to the show page if successful
                                .then(res => { 
                                    navigate(`/stocks`)
                                })
                                // send a success message
                                .then(() => {
                                    msgAlert({
                                        heading: 'Oh Yeah!',
                                        message: updateStockSuccess,
                                        variant: 'success'
                                    })
                                })
                                // if it fails, keep the user on the create page and send a message
                                .catch((error) => {
                                    msgAlert({
                                        heading: 'Failed!',
                                        message: updateStockFailure,
                                        variant: 'danger'
                                    })
                                });
                            
                        })
                        .catch((error) => {
                            console.log(error);
                        });
            
                } else {
                    console.log("Object not found in the array.");
                }
                
                
                
            })
        .catch((error) => {
            console.log(error);
        });

        
    }

    

    return(
        <>
            <small>{stock.updatedAt}</small>
            <Button variant="secondary" onClick={updateValues}>
                <svg width={20} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
            </Button>
        </>
    )
}

export default StockUpdate;