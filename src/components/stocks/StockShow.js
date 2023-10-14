import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Card, Row, Col} from 'react-bootstrap'
import LoadingScreen from '../shared/LoadingScreen'
// we'll need to import an api function to grab an individual stock
import { getOneStock} from '../../api/stock'
import { getAllTransactions } from "../../api/transaction"
import { showStockFailure} from '../shared/AutoDismissAlert/messages'
import { getHistory } from '../../api/other_api'
import LineGraph from '../shared/StockGraph'
import TransactionForm from '../shared/TransactionForm'

const StockShow = (props) => {
    const [stock, setStock] = useState(null)
    const [historyData, setHistoryData] = useState(null)
    const { id } = useParams()
    const { user, msgAlert } = props
    const [stockQty, setStockQty] = useState(0)
    const [transactions, setTransactions] = useState(null)


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
                
                return res.data.stock.symbol

            })
            .then(symbol => {
                getAllTransactions()
                            .then(res => {
                                const tran = res.data.transactions.filter(transaction => transaction.owner._id === user._id && transaction.symbol === symbol)
                                setTransactions(tran)
                                console.log('this is transactions',transactions)
                                return tran
                            })
                            .then(transactions => {
                                console.log('this is transactions',transactions)
                                const countStocks = transactions.reduce((count,obj)=>{
                                    if (obj.buy === true) {
                                        count.buy = count.buy + obj.quantity ;
                                    } else {
                                        count.sell = count.sell + obj.quantity;
                                    }
                                    return count;
                                },{ buy: 0, sell: 0 })
                                console.log('this is countstocks',countStocks)
                                setStockQty(countStocks.buy - countStocks.sell)
                                console.log('stockQty',stockQty)
                            })
                            .catch(err => {
                                console.log('error getting transactions')
                                
                            })
            })
            .catch(err => {
                msgAlert({
                    heading: 'Error getting stock',
                    message: showStockFailure,
                    variant: 'danger'
                })
            })

            
    }, [])
    

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
                        <Card.Header><h4>Transaction</h4> <small>{`Portfolio quantity: ${stockQty} `}</small></Card.Header>
                        
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