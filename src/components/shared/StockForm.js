// this form will take several props, and be used by both Create and Update
// the action will be dependent upon the parent component(create or update)
// however, the form will look the same on both pages.
import { Form, Button, Container } from 'react-bootstrap'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const StockForm = (props) => {
    
    const { ticker, handleChange2, handleSubmit2 } = props

    return (
        <Container className="justify-content-center">

            <h3>Search Ticker</h3>

            <Form onSubmit={handleSubmit2} >
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
                    <Button type="submit">Search</Button>
                </Col>
                </Row>
            </Form>
        </Container>
        
        
    )

}

export default StockForm