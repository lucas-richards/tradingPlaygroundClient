// this form will take several props, and be used by both Create and Update
// the action will be dependent upon the parent component(create or update)
// however, the form will look the same on both pages.
import { Form, Button, Container } from 'react-bootstrap'

const StockForm = (props) => {
    
    const { stock, handleChange, handleSubmit, heading } = props

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
        </Container>
    )

}

export default StockForm