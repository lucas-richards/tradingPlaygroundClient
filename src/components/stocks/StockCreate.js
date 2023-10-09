// stockCreate is going to render a form
// this form will build a stock object in state
// the form will submit an axios POST request when submitted
// we should send a success or failure message
// on success, redirect to the new stock show page
// on failure, component should send the message and remain visible
import axios from 'axios'
import { useState } from 'react'
import { createStock } from '../../api/stock'
import { createStockSuccess, createStockFailure } from '../shared/AutoDismissAlert/messages'
// to redirect to a different component(page) we can use a hook from react-router
import { useNavigate } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import StockForm from '../shared/StockForm'
import StockCreateModal from './StockCreateModal'

const cardContainerLayout = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}


const StockCreate = (props) => {
    // pull out our props for easy reference
    const { user, msgAlert } = props

    // to utilize the navigate hook from react-router-dom
    const navigate = useNavigate()

    const [stock, setStock] = useState({
        symbol: '',
        price: '',
    })

    const [ticker, setTicker] = useState('')
    const [tickers, setTickers] = useState([])

    const onSubmit = (e) => {
        // we're still using a form - the default behavior of a form is to refresh the page
        e.preventDefault()
    
        // first we want to send our create request
        createStock(user, stock)
            // then navigate the user to the show page if successful
            .then(res => { 
                console.log('new stock created',stock)
                navigate(`/stocks`)
            })
            // send a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: createStockSuccess,
                    variant: 'success'
                })
            })
            // if it fails, keep the user on the create page and send a message
            .catch(() => {
                msgAlert({
                    heading: 'Oh no!',
                    message: createStockFailure,
                    variant: 'danger'
                })
            })
      }

    const onSubmit2 = (e) => {
        e.preventDefault()

        axios.request({
            url: `https://api.polygon.io/v3/reference/tickers?search=${ticker}&active=true&apiKey=${process.env.api_twelve_data}`,
            method: 'GET',
            maxBodyLength: Infinity,
            headers: { }
            })
            .then((response) => {
                setTickers(response.data.results)
                // return response
            })
            .catch((error) => {
                console.log(error);
            });

            
    }

    const onChange2 = (e) => {
        // e is the placeholder for event
        e.persist()

        setTicker( e.target.value)
    }

    const tickerCards = tickers.map(ticker => (
        <Card key={ ticker.ticker } style={{ width: '60%', margin: 5 }}>
            <Card.Header>{ ticker.name }</Card.Header>
            <Card.Body>
                <Card.Text>
                    <small>Ticker: { ticker.ticker }</small>
                </Card.Text>
                <StockCreateModal 
                    stock={stock}
                    onSubmit={onSubmit}
                    setStock={setStock} 
                    ticker={ticker.ticker} />
            </Card.Body>
        </Card>
    ))


    return (
        <>
            <StockForm 
                stock={stock}
                ticker={ticker}
                onSubmit = {onSubmit}
                handleChange2={onChange2}
                handleSubmit2={onSubmit2}
                heading="Add a new Stock!"
            />
            <div className="container-md" style={ cardContainerLayout }>
                { tickerCards }
            </div>
            
        </>
    )
}

export default StockCreate