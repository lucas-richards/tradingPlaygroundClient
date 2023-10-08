// stockCreate is going to render a form
// this form will build a stock object in state
// the form will submit an axios POST request when submitted
// we should send a success or failure message
// on success, redirect to the new stock show page
// on failure, component should send the message and remain visible
import { useState } from 'react'
import { createStock } from '../../api/stock'
import { createStockSuccess, createStockFailure } from '../shared/AutoDismissAlert/messages'
// to redirect to a different component(page) we can use a hook from react-router
import { useNavigate } from 'react-router-dom'
import StockForm from '../shared/StockForm'


const StockCreate = (props) => {
    // pull out our props for easy reference
    const { user, msgAlert } = props

    // to utilize the navigate hook from react-router-dom
    const navigate = useNavigate()

    const [stock, setStock] = useState({
        symbol: '',
        price: '',
    })

    const onChange = (e) => {
        // e is the placeholder for event
        e.persist()

        setStock(prevStock => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            // the above is enough for string inputs
            // but we have a number and a boolean to handle
            if (e.target.type === 'number') {
                // if the target type is a number - updateValue must be a number
                updatedValue = parseInt(e.target.value)
            }
            
            // build the stock object, grab the attribute name from the field and assign it the respective value.
            const updatedStock = { [updatedName] : updatedValue }

            // keep all the old stock stuff and add the new stock stuff(each keypress)
            return {
                ...prevStock, ...updatedStock
            }
        })
    }

    const onSubmit = (e) => {
        // we're still using a form - the default behavior of a form is to refresh the page
        e.preventDefault()

        // we're making an api call here
        // so we want to handle the promise with then and catch
        // first we want to send our create request
        createStock(user, stock)
            // then navigate the user to the show page if successful
            .then(res => { navigate(`/stocks/${res.data.stock._id}`)})
            // send a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: createStockSuccess,
                    variant: 'success'
                })
            })
            // if it fails, keep the user on the create page and send a message
            .catch(() => {
                msgAlert({
                    heading: 'Oh no!',
                    message: createStockFailure,
                    variant: 'danger'
                })
            })
    }

    return (
        <StockForm 
            stock={stock} 
            handleChange={onChange}
            handleSubmit={onSubmit}
            heading="Add a new Stock!"
        />
    )
}

export default StockCreate