import { useState, useEffect } from 'react';
import {Button, Modal, Container } from 'react-bootstrap';
import CommentShow from './CommentShow'
import CommentForm from './CommentForm'
import { getOneTransaction } from '../../api/transaction';
import LoadingScreen from '../shared/LoadingScreen'
import { showCommentFailure } from '../shared/AutoDismissAlert/messages'


const CommentIndex = (props) => {
    const { user, msgAlert, transactionId } = props
    const [transaction,setTransaction] = useState(null)
    const [error, setError] = useState(false)
    const [show, setShow] = useState(false);
    // this is a boolean that we can alter to trigger a page re-render
    const [updated, setUpdated] = useState(false)

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    let commentCards
    
    useEffect(()=>{
      
        getOneTransaction(user,transactionId)
            .then(res => {
              
              setTransaction(res.data.transaction)})
            .catch(err => {
              msgAlert({
                heading: 'Error getting Transaction',
                message: showCommentFailure,
                variant: 'danger'
              })
              setError(true)
            })
            
    
    },[updated])

    if (error) {
      return <LoadingScreen />
    } 
    
    if (transaction){
      if (transaction.comments.length > 0) {
        commentCards = transaction.comments.map((comment,idx) => (
    
          <CommentShow 
              key={idx}
              idx={idx}
              comment={comment}
              msgAlert={msgAlert}
              user={user}
              transaction={transaction}
              handleClose={handleClose}
          />
        ))
          // />
    
        
        } else {
            commentCards = <p>No comments yet</p>
        }
    }
    
    
    

    return (
      <>
        <Button variant="link" onClick={handleShow}>
          <svg width={25} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
          </svg>
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            {
            transaction?
            <Modal.Title>{transaction.symbol}-${(transaction.price*transaction.quantity).toFixed(2)}</Modal.Title>
            :
            null
            }
          </Modal.Header>
          <Modal.Body>
              <Container className='m-2'>

                  {commentCards}
                  
                  <CommentForm
                    transaction={ transaction }
                    user={ user }
                    msgAlert={ msgAlert }
                    triggerRefresh={() => setUpdated(prev => !prev)}
                  />

              </Container>
          </Modal.Body>
        </Modal>
      </>
    );
}

export default CommentIndex;