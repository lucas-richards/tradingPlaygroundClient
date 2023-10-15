import { Card } from 'react-bootstrap'
import LoadingScreen from '../shared/LoadingScreen'
import CommentIndex from '../comments/CommentIndex'

const cardContainerLayout = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const TransactionsIndex = (props) => {

    const { msgAlert, user, transactions } = props

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
                        transactionId={tran._id}
                        user={user}
                        msgAlert={msgAlert}
                    />
                    <hr />
                    <small >Date: { tran.createdAt }</small><br />
                    <p>Description: { tran.buy?'Bought':'Sold' } { tran.quantity} stocks of { tran.symbol } at ${ tran.price }/stock</p>
                    
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