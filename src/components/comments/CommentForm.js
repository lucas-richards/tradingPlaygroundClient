import { useState } from 'react'
import {Button, Form, Card } from 'react-bootstrap';
import { createComment } from '../../api/comment'
import { createCommentSuccess,createCommentFailure } from '../shared/AutoDismissAlert/messages'

function CommentShow(props){

    const {transaction, user, msgAlert, triggerRefresh} = props
    const [comment, setComment] = useState({
        content:''
    })

    const onChange = (e)=>{
        e.persist()

        setComment(prevComm =>{
            let updatedName = e.target.name
            let updatedValue = e.target.value

            const updatedComment = {[updatedName]:updatedValue}
            console.log(updatedComment)

            return {
                ...prevComm,...updatedComment
            }
                
        })

    }

    const onSubmit = (e)=>{
        e.preventDefault()

        createComment(user, transaction._id, comment)
            // then navigate the user to the show page if successful
            .then(res => { 
                console.log('new comment created',comment)
                setComment({
                    content:''
                })
            })
            .then(() => triggerRefresh())
            // send a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: createCommentSuccess,
                    variant: 'success'
                })
            })
            // if it fails, keep the user on the create page and send a message
            .catch(() => {
                msgAlert({
                    heading: 'Oh no!',
                    message: createCommentFailure,
                    variant: 'danger'
                })
            })

    }


    return(
        <Card className='m-2'>
            <Card.Body>
            <Form onSubmit={onSubmit}>
                <Form.Group className="m-2">
                <Form.Control 
                    type='text'
                    id="conent"
                    name="content"
                    value={ comment.content }
                    onChange={onChange}
                    
                />
                </Form.Group>
                
                <Button className='m-3' variant="primary" type="submit">
                Save 
                </Button>
            
            </Form>
            </Card.Body>
        </Card>
    )

}

export default CommentShow