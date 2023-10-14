import { Form, Button, Container } from 'react-bootstrap'
import { createTransaction } from '../../api/transaction'
import { updateAccount } from '../../api/account'
import { getAllAccounts } from '../../api/account'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { createTransactionSuccess, createTransactionFailure } from '../shared/AutoDismissAlert/messages'
import CreateAccount from '../accounts/CreateAccount'

const TransactionForm = (props) => {
    
    const { stock, stockQty, user, msgAlert } = props
    
    const [account, setAccount] = useState(null)
    const [transaction, setTransaction] = useState({
        symbol: stock.symbol,
        buy: true,
        price: stock.price,
        quantity:0,
    })
    const navigate = useNavigate()
    console.log('transaction',transaction)

    useEffect(()=>{
        getAllAccounts(user._id)
			.then(res =>{
				if(res.data.accounts.length>0)
				setAccount(res.data.accounts[0])
				console.log('account found',account)
			})
			.catch(
				console.log('Account was not found')
			)
        
    },[])

    const onChange = (e) => {
        // e is the placeholder for event
        e.persist()

        setTransaction(prevTra => {
            let updatedName = e.target.name
            let updatedValue = e.target.value

            // the above is enough for string inputs
            // but we have a number and a boolean to handle
            if (e.target.type === 'number') {
                // if the target type is a number - updateValue must be a number
                updatedValue = parseInt(e.target.value)
            }

            // to handle our checkbox, we need to tell it when to send a true, and when to send a false. we can target it by the unique name(adoptable) and handle it the way checkboxes are meant to be handled.
            // a checkbox only sends the value 'checked' not the boolean we need
            if (updatedName === 'buy'){
                if (updatedValue === 'false') updatedValue = false
                else updatedValue = true
            } 
            
            // build the pet object, grab the attribute name from the field and assign it the respective value.
            const updatedTra = { [updatedName] : updatedValue }

            // keep all the old pet stuff and add the new pet stuff(each keypress)
            return {
                ...prevTra, ...updatedTra
            }
        })
    }

    const onSubmit = (e) => {
        // we're still using a form - the default behavior of a form is to refresh the page
        e.preventDefault()

        //Not enough money in the account to buy stocks
        const total = transaction.price*transaction.quantity
        if(transaction.buy){
            if(account.savings < total){
                return (
                    msgAlert({
                        heading: `Oh no, you dont have enough money in your account. You have $${(account.savings).toFixed(2)}`,
                        variant: 'danger'
                    })
                )
        } 
        //Not enough stocks in the portfolio to sell
        }else if(!transaction.buy){
            if (stockQty < transaction.quantity){
                return (
                    msgAlert({
                        heading: `Oh no, you dont have enough stocks to sell!  You have ${stockQty} stocks`,
                        variant: 'danger'
                    })
                )
            }
                
        } 
        // first we want to send our create request
        createTransaction(user, transaction)
            // then navigate the user to the show page if successful
            .then(res => { 
                console.log('new transaction created',transaction)
                
                if (transaction.buy){
                    account.savings = account.savings - total
                    account.investments = account.investments + total
                } else {
                    account.savings = account.savings + total
                    account.investments = account.investments - total
                }
                console.log('updated account',account)
                updateAccount(user, account)
                    .then(res => {
                        console.log('account was adjusted successfully')
                        navigate(`/wallet`)
                    })
                    .catch(err=>{
                        console('issue updating account')
                    })
                
            })
            // send a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: createTransactionSuccess,
                    variant: 'success'
                })
            })
            // if it fails, keep the user on the create page and send a message
            .catch(() => {
                msgAlert({
                    heading: 'Oh no!',
                    message: createTransactionFailure,
                    variant: 'danger'
                })
            })
      }
    
      

    if(!account){
        return <CreateAccount 
                    user={user}
                    setAccount={setAccount}
                    msgAlert = {msgAlert}
                />
    }

    return (
        <Container className="justify-content-center">
            <Form onSubmit={onSubmit}>
                <Form.Group className="m-2">
                
                    <Form.Check
                        type="radio"
                        label="Buy"
                        name="buy"
                        id="buy"
                        value="true"
                        onChange={onChange}
                    />
                    <Form.Check
                        type="radio"
                        label="Sell"
                        name="buy"
                        id="sell"
                        value="false"
                        onChange={onChange}
                    />
                
                <Form.Label>Symbol:</Form.Label>
                <Form.Control 
                    type='text'
                    id="symbol"
                    name="symbol"
                    value={ stock.symbol }
                    disabled
                />
                <Form.Label>Current Price:</Form.Label>
                <Form.Control 
                    type='number'
                    id="price"
                    name="price"
                    value={ stock.price }
                    onChange={onChange}
                    disabled
                />
                <Form.Label>Quantity:</Form.Label>
                <Form.Control 
                    type='number'
                    id="quantity"
                    name="quantity"
                    value={ null }
                    onChange={onChange}
                />
                    
                </Form.Group>
                <hr />
                <Form.Label className=''>Total: ${(transaction.price*transaction.quantity).toFixed(2)}</Form.Label><br></br>
                <Button className='m-3' variant="primary" type="submit">
                Submit 
                </Button>
                    
            </Form>
        </Container>
        
        
    )

}

export default TransactionForm