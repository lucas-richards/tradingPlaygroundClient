import { useState } from 'react';
import {Button, Modal, Form } from 'react-bootstrap';
import { getLogo, getLastPrice } from '../../api/other_api'


function StockCreateModal(props) {
  const { stock, onSubmit, setStock, ticker} = props
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  
  const handleShow = () => {
    getLastPrice(ticker)
      .then((lastPrice) => {

          getLogo(ticker)
            .then((logoUrl) => {
              
              setStock({
                symbol: ticker,
                price: lastPrice,
                logo:logoUrl
              })
            })
            .catch((error) => {
              console.error('Error fetching logo:', error);
            });
  
      })
      .catch((error) => {
          console.log(error);
      });

    setShow(true)
  };

  

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <svg width={30} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Current Stock Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit}>
            <Form.Group className="m-2">
              <Form.Label>Name:</Form.Label>
              <Form.Control 
                  
                  id="symbol"
                  name="symbol"
                  value={ stock.symbol }
                  disabled
              />
              <Form.Label>Symbol:</Form.Label>
              <Form.Control 
                  
                  id="symbol"
                  name="symbol"
                  value={ stock.symbol }
                  disabled
              />
              <Form.Label>Price:</Form.Label>
              <Form.Control 
                  
                  id="price"
                  name="price"
                  value={ stock.price }
                  disabled
              />
                
            </Form.Group>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Add Stock 
            </Button>
                    
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default StockCreateModal;