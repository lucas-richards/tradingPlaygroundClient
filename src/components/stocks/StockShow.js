import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Card, Row, Col} from 'react-bootstrap'
import LoadingScreen from '../shared/LoadingScreen'
// we'll need to import an api function to grab an individual stock
import { getOneStock} from '../../api/stock'
import { showStockFailure} from '../shared/AutoDismissAlert/messages'
import { getHistory } from '../../api/other_api'
import LineGraph from '../shared/StockGraph'
import TransactionForm from '../shared/TransactionForm'

const StockShow = (props) => {
    const [stock, setStock] = useState(null)
    const [historyData, setHistoryData] = useState(null)
    const { id } = useParams()
    const { user, msgAlert, transactions } = props
    const [ownerTran, setOwnerTran] = useState(null)
    
    let stockQty
    useEffect(() => {
        getOneStock(id)
            .then(res => {
                setStock(res.data.stock)

                getHistory(res.data.stock.symbol)
                    .then(res => { 
                        setHistoryData(res.values)
                        

                    })
                    
                    // if it fails, keep the user on the create page and send a message
                    .catch((error) => {
                        console.log(error)
                    });

            })
            .catch(err => {
                msgAlert({
                    heading: 'Error getting stock',
                    message: showStockFailure,
                    variant: 'danger'
                })
            })

        
            
    }, [])

    if(transactions && stock){
        setOwnerTran(transactions.filter(transaction => transaction.owner._id === user._id && transaction.symbol === stock.symbol))
        console.log('these are all the transactions',ownerTran)
        const countStocks = ownerTran.reduce((count,obj)=>{
            if (obj.buy === true) {
                count.buy++;
            } else {
                count.sell++;
            }
            return count;
        },{ buy: 0, sell: 0 })
        console.log('this is countstocks',countStocks)
        stockQty = countStocks.buy - countStocks.sell
        console.log('stockQty',stockQty)
    }

    

    if(!stock) {
        return <LoadingScreen />
    }

    return (
        <div className='m-2'>
            
            <Row  >
                <Col md={8}  xs="auto">
                    <Card>
                        <Card.Header>{ stock.symbol }</Card.Header>
                        <Card.Body>
                            {   
                                historyData ?
                                <LineGraph data={historyData} />
                                :
                                <LoadingScreen />
                            }
                        </Card.Body>
                        <Card.Footer>
                            {
                                user && stock.owner._id === user._id
                                ?
                                <>
                                    <Link className='btn btn-danger' to='delete-stock'>
                                        Delete Stock
                                    </Link>
                                </>
                                :
                                null
                            }
                        </Card.Footer>
                    </Card>
                </Col>
                <Col md={4} xs="auto">
                    <Card>
                        <Card.Header><h4>Transaction</h4> {stockQty? <small>{`Portfolio quantity: ${stockQty} `}</small>:null} </Card.Header>
                        
                        <Card.Body>
                            <span className={`fs-4 ${stock.price - stock.prev_price >= 0 ? 'text-success' : 'text-danger'}`}>
                                {stock.price.toFixed(2)}
                            </span>
                            <small className={`m-1 ${stock.price - stock.prev_price >= 0 ? 'text-success' : 'text-danger'}`}>
                                {(stock.price - stock.prev_price).toFixed(2)}
                            </small>
                            <small className={stock.price - stock.prev_price >= 0 ? 'text-success' : 'text-danger'}>
                                {((stock.price - stock.prev_price) / stock.price * 100).toFixed(2)}%
                            </small>
                            <br />
                            <hr />
                            <TransactionForm 
                                stock={ stock }
                                stockQty={ stockQty }
                                user={ user } 
                                msgAlert = {msgAlert}/>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md={8}  xs="auto">
                    Another column for news
                </Col>
            </Row>
            
        </div>
    )
}

export default StockShow