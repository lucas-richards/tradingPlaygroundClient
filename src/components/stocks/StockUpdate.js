import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Container, Card, Button} from 'react-bootstrap'
import LoadingScreen from '../shared/LoadingScreen'
// we'll need to import an api function to grab an individual stock
import { updateStock} from '../../api/stock'
import { showStockFailure} from '../shared/AutoDismissAlert/messages'


const StockUpdate = (props) => {

    const updateValues = ()=>{

    }
    return(
        <Button variant="secondary" onClick={updateValues}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>

            Update Stock Values
        </Button>
    )
}

export default StockUpdate;