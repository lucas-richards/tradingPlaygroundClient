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
        
        <Card key={ tran._id } style={{ width: '100%', margin: 5 }}>
            <Card.Body>
                    <small >Tran#: { tran._id }</small>
                    <CommentIndex 
                        transaction={tran} 
                        user={user}
                        msgAlert={msgAlert}
                    />
                    <hr />
                    <p>Symbol: { tran.symbol }</p>
                    <p>Type: { tran.buy?'Buy':'Sell' }</p>
                    <p>Price: ${ tran.price }</p>
                    <p>Quantity: { tran.quantity}</p>
                    <p>Total: ${ (tran.price *tran.quantity).toFixed(2)}</p>
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