import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Container, Card, Row, Col} from 'react-bootstrap'
import LoadingScreen from '../shared/LoadingScreen'
// we'll need to import an api function to grab an individual stock
import { getOneStock} from '../../api/stock'
import { showStockFailure} from '../shared/AutoDismissAlert/messages'
import { getHistory } from '../../api/other_api'
import LineGraph from '../shared/StockGraph'

const StockShow = (props) => {
    const [stock, setStock] = useState(null)
    // this is a boolean that we can alter to trigger a page re-render
    const [updated, setUpdated] = useState(false)
    const [historyData, setHistoryData] = useState(null)

    const { id } = useParams()
    const { user, msgAlert } = props

    

    useEffect(() => {
        getOneStock(id)
            .then(res => {
                setStock(res.data.stock)

                console.log(res.data.stock.symbol)

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
    }, [updated])

    console.log('this is history data',historyData)

    if(!stock) {
        return <LoadingScreen />
    }

    return (
        <>
            <Container className='m-2'>
            <Row>
                <Col md={9}  xs="auto">
                    <Card>
                        <Card.Header>{ stock.symbol }</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <small>Price: {stock.price}</small><br/>
                                {   
                                    historyData ?
                                    <LineGraph data={historyData} />
                                    :
                                    null
                                }
                            </Card.Text>
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
                <Col md={3} xs="auto">
                    <h3>This </h3>
                </Col>
            </Row>
            </Container>
            
            
        </>
    )
}

export default StockShow