import { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getAllTransactions } from '../../api/transaction'
import LoadingScreen from '../shared/LoadingScreen'
import messages from '../shared/AutoDismissAlert/messages'
import CommentIndex from '../comments/CommentIndex'

const cardContainerLayout = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const TransactionsIndex = (props) => {
    const [transactions, setTransactions] = useState(null)
    const [error, setError] = useState(false)
    const { msgAlert, user } = props

    useEffect(() => {
        getAllTransactions()
            .then(res => {
                console.log(res)
                setTransactions(res.data.transactions.filter(transaction => transaction.owner._id === user._id))
            })
            .catch(err => {
                msgAlert({
                    heading: 'Error getting Transactions',
                    message: messages.indexTransactionsFailure,
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

    // if the transactions aren't even loaded yet
    if (!transactions) {
        return <LoadingScreen />
    // if we have NO transactions
    } else if (transactions.length === 0) {
        return <p>No transactions yet, go trade!</p>
    }
    

    const transactionCards = transactions.map(tran => (
        
        <Card key={ tran.id } style={{ width: '100%', margin: 5 }}>
            
            <Card.Body>
                <Card.Text>
                    <small >Tran#: { tran._id }</small>
                    <CommentIndex />
                    <hr />
                    <h6>Symbol: { tran.symbol }</h6>
                    <h6>Type: { tran.buy?'Buy':'Sell' }</h6>
                    <h6>Price: ${ tran.price }</h6>
                    <h6>Quantity: { tran.quantity}</h6>
                    <h6>Total: ${ (tran.price *tran.quantity).toFixed(2)}</h6>
                    
                </Card.Text>
            </Card.Body>
        </Card>
     
    ))

    return (
        <div className="container-md" style={ cardContainerLayout }>
            { transactionCards }
        </div>
    )
}

// export our component
export default TransactionsIndex