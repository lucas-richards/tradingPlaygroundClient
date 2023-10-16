import { useState, useEffect } from 'react'
import { Table, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import LoadingScreen from '../shared/LoadingScreen'
import StockUpdate from './StockUpdate'

// api function call from our api file
import { getAllStocks } from '../../api/stock'
import messages from '../shared/AutoDismissAlert/messages'
const linkStyle = {
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    margin: '10px'
}

const StockIndex = (props) => {
    const [stocks, setStocks] = useState(null)
    
    const [error, setError] = useState(false)
    const { msgAlert, user } = props

    useEffect(() => {
        getAllStocks()
            .then(res => {
                setStocks(res.data.stocks.filter(stock => stock.owner._id === user._id))
            })
            .catch(err => {
                msgAlert({
                    heading: 'Error getting Stocks',
                    message: messages.indexStocksFailure,
                    variant: 'danger'
                })
                setError(true)
            })

    }, [])

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
                    <img width={40} src={ stock.logo } alt='logo'/>
                </td>
                <td>
                    <Link to={`/stocks/${stock._id}`} className=''>
                      { stock.symbol }
                    </Link>
                </td>
                <td>{ stock.price }</td>
                <td>
                    <img width={100} src='/green.png' alt='sparkline'></img>
                </td>
                <td>{ (stock.price-stock.prev_price).toFixed(2) }</td>
                <td>{ ((stock.price-stock.prev_price)/stock.price*100).toFixed(2) }%</td>
                <td>{ stock.prev_price }</td>
                <td>{ stock.low }</td>
                <td>{ stock.high }</td>
                <td>{ stock.volume }</td>
                <td><StockUpdate 
                    stock = {stock}
                    stocks = {stocks}
                    setStocks = {setStocks}
                    user={user} 
                    msgAlert= {msgAlert}
                    />
                </td>
            </tr>
     
    ))

    return (
        <>
        <Container className='m-2'>
            <h1>Watch List</h1>

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Logo</th>
                    <th>Symbol</th>
                    <th>Last</th>
                    <th>Sparkline</th>
                    <th>change</th>
                    <th>%change</th>
                    <th>prev close</th>
                    <th>low</th>
                    <th>high</th>
                    <th>volume</th>
                    <th>last update</th>
                </tr>
                </thead>
                <tbody>
                    { stockCards }
                </tbody>
            </Table>
            <Link to='/create-stock' style={linkStyle} >
                <svg width={20} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>  
				<span>Add Symbol</span>
			</Link>
        </Container>
        
      </>
    )
}

// export our component
export default StockIndex