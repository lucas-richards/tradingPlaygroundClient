import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Container, Card, Button } from 'react-bootstrap'
import LoadingScreen from '../shared/LoadingScreen'
// we'll need to import an api function to grab an individual stock
import { getOneStock, removeStock } from '../../api/stock'
import { showStockFailure, removeStockSuccess, removeStockFailure } from '../shared/AutoDismissAlert/messages'


const StockShow = (props) => {
    const [stock, setStock] = useState(null)
    // this is a boolean that we can alter to trigger a page re-render
    const [updated, setUpdated] = useState(false)

    const navigate = useNavigate()

    // we need to pull the id from the url
    // localhost:3000/stocks/<stock_id>
    // to retrieve our id, we can use something from react-router-dom called useParams
    // this is called id, because that's how it is declared in our Route component in App.js
    const { id } = useParams()
    const { user, msgAlert } = props

    // useEffect takes two arguments
    // the callback function
    // the dependency array
    // the dependency array determines when useEffect gets called
    // if any piece of state inside the dependency array changes
    // this triggers the useEffect to run the callback function again
    // NEVER EVER EVER EVER EVER EVER EVER put a piece of state in the dependency array that gets updated by the useEffect callback function
    // doing this causes an infinite loop
    // react will kill your application if this happens
    useEffect(() => {
        getOneStock(id)
            .then(res => setStock(res.data.stock))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting stock',
                    message: showStockFailure,
                    variant: 'danger'
                })
            })
    }, [updated])

    const setStockFree = () => {
        // we want to remove the stock
        removeStock(user, stock._id)
            // send a success message
            .then(() =>
                msgAlert({
                    heading: `${stock.symbol} has been set free!`,
                    message: removeStockSuccess,
                    variant: 'success',
                })
            )
            // navigate the user to the home page(index)
            .then(() => navigate('/'))
            // send a fail message if there is an error
            .catch(() =>
                msgAlert({
                    heading: 'Oh no!',
                    message: removeStockFailure,
                    variant: 'danger',
                })
            )
    }

    if(!stock) {
        return <LoadingScreen />
    }

    return (
        <>
            <Container className='m-2'>
                <Card>
                    <Card.Header>{ stock.symbol }</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <small>Price: {stock.price}</small><br/>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        {
                             user && stock.owner._id === user._id
                            ?
                            <>
                                <Button 
                                    className="m-2" variant="danger"
                                    onClick={() => setStockFree()}
                                >
                                    Delete
                                </Button>
                            </>
                            :
                            null
                        }
                    </Card.Footer>
                </Card>
            </Container>
            
        </>
    )
}

export default StockShow