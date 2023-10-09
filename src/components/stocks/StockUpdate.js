import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Container, Card} from 'react-bootstrap'
import LoadingScreen from '../shared/LoadingScreen'
// we'll need to import an api function to grab an individual stock
import { getOneStock} from '../../api/stock'
import { showStockFailure} from '../shared/AutoDismissAlert/messages'


const StockShow = (props) => {
    return
}