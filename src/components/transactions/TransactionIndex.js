import { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import LoadingScreen from '../shared/LoadingScreen'

// api function call from our api file
import { getAllTransactions } from '../../api/transaction'
import messages from '../shared/AutoDismissAlert/messages'

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
                    <svg width={25} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                        <path d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                    </svg>
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