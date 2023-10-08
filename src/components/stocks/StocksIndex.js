import { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import LoadingScreen from '../shared/LoadingScreen'

// api function call from our api file
import { getAllStocks } from '../../api/stock'

// we need our messages from the autodismiss alert messaged file
import messages from '../shared/AutoDismissAlert/messages'

const cardContainerLayout = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

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
        <Card key={ stock.id } style={{ width: '30%', margin: 5 }}>
            <Card.Header>{ stock.symbol }</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={`/stocks/${stock._id}`} className='btn btn-info'>
                        View { stock.symbol }
                    </Link>
                </Card.Text>
                { stock.owner ? 
                    <Card.Footer>owner: {stock.owner.email}</Card.Footer>
                : null }
            </Card.Body>
        </Card>
    ))

    return (
        <div className="container-md" style={ cardContainerLayout }>
            { stockCards }
        </div>
    )
}

// export our component
export default StocksIndex