// this form will take several props, and be used by both Create and Update
// the action will be dependent upon the parent component(create or update)
// however, the form will look the same on both pages.
import { Form, Button, Container } from 'react-bootstrap'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const StockForm = (props) => {
    
    const { stock, ticker, handleChange, handleChange2, handleSubmit, handleSubmit2, heading } = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="m-2">
                    <Form.Label>Symbol:</Form.Label>
                    <Form.Control 
                        placeholder="What stock do you want?"
                        id="symbol"
                        name="symbol"
                        value={ stock.symbol }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Price:</Form.Label>
                    <Form.Control 
                        type="number"
                        placeholder="Price"
                        id="price"
                        name="price"
                        value={ stock.price }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button className="m-2" type="submit">Submit</Button>
            </Form>

            <h3>Search Ticker</h3>

            <Form onSubmit={handleSubmit2} inline>
                <Row>
                <Col xs="auto">
                    <Form.Control
                    type="text"
                    placeholder="Search"
                    name="ticker"
                    value={ ticker }
                    onChange={handleChange2}
                    className=" mr-sm-2"
                    />
                </Col>
                <Col xs="auto">
                    <Button type="submit">Submit</Button>
                </Col>
                </Row>
            </Form>
        </Container>
        
        
    )

}

export default StockForm