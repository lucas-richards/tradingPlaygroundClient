import { useParams, useNavigate } from 'react-router-dom'
import {Button, ButtonGroup} from 'react-bootstrap'
import { removeStock } from '../../api/stock'
import { removeStockSuccess, removeStockFailure } from '../shared/AutoDismissAlert/messages'


const StockDelete = (props) => {
    const { msgAlert, user } = props
    const { id } = useParams()
    console.log(props)

    const navigate = useNavigate()
    // we want to remove the stock
    const onRemoveStock = () => {
        removeStock(user, id)
        // send a success message
        .then(() =>
            msgAlert({
                heading: `Stock has been removed!`,
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
    
    const onCancel = () => {
        navigate('/')
    }

	return (
		<>
            <div className='row'>
                <div className='col-sm-10 col-md-8 mx-auto mt-5'>
                    <h2>Are you sure you want to remove this stock?</h2>
                    <ButtonGroup>
                        <Button variant='danger' onClick={onRemoveStock}>
                            Delete
                        </Button>
                        <Button variant='warning' onClick={onCancel}>
                            Cancel
                        </Button>
                    </ButtonGroup>
                </div>
            </div>
		</>
	)
}

export default StockDelete