
import { useState, useEffect } from 'react'
import { Table, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import LoadingScreen from '../shared/LoadingScreen'
import StockUpdate from './StockUpdate'

// api function call from our api file
import { getAllStocks } from '../../api/stock'

// we need our messages from the autodismiss alert messaged file
import messages from '../shared/AutoDismissAlert/messages'


const StocksIndex = (props) => {
    const [stocks, setStocks] = useState(null)
    const [error, setError] = useState(false)

    const { msgAlert } = props

    // useEffect takes two arguments
    // first a callback function
    // second a 'dependency array'
    useEffect(() => {
        getAllStocks()
            .then(res => {
                setStocks(res.data.stocks)
            })
            .catch(err => {
                msgAlert({
                    heading: 'Error getting Stocks',
                    message: messages.indexStocksFailure,
                    variant: 'danger'
                })
                setError(true)
            })
    }, [msgAlert])

    // we need to account for multiple potential states of our data
    // if we have an error
    if (error) {
        return <LoadingScreen />
    }

    // if the stocks aren't even loaded yet
    if (!stocks) {
        return <LoadingScreen />
    // if we have NO stocks
    } else if (stocks.length === 0) {
        return <p>No stocks yet, go add some!</p>
    }
    

    const stockCards = stocks.map(stock => (
        
            <tr key={ stock._id }>

                <td>
                    <Link to={`/stocks/${stock._id}`} className=''>
                      { stock.symbol }
                    </Link>
                </td>
                <th>Name</th>
                <td>{ stock.price }</td>
                <th>Sparkline</th>
                <th>last</th>
                <th>change</th>
                <th>%change</th>
                <th>low</th>
                <th>high</th>
                <th>volume</th>
            </tr>
     
    ))

    return (
        <>
        <Container className='m-2'>
            <h1>Watch List</h1>

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Symbol</th>
                    <th>Name</th>
                    <th>Price purchased</th>
                    <th>Sparkline</th>
                    <th>last</th>
                    <th>change</th>
                    <th>%change</th>
                    <th>low</th>
                    <th>high</th>
                    <th>volume</th>
                </tr>
                </thead>
                <tbody>
                    { stockCards }
                </tbody>
            </Table>
        </Container>
        <StockUpdate />
      </>
    )
}

// export our component
export default StocksIndex