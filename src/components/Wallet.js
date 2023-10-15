import { useState,useEffect } from "react"
import TransactionsIndex from "./transactions/TransactionIndex"
import { Row, Col, Card } from 'react-bootstrap'
import { getAllAccounts } from "../api/account"
import LoadingScreen from "./shared/LoadingScreen"
import CreateAccount from "./accounts/CreateAccount"
import PortfolioGraph from './accounts/PortfolioGraph'
import messages from './shared/AutoDismissAlert/messages'
import { getAllTransactions } from '../api/transaction'

const Wallet = (props) => {
	const {user, msgAlert} = props
	const [account,setAccount] = useState(null)
	const [transactions, setTransactions] = useState(null)
	const [error, setError] = useState(false)

	
	useEffect(()=>{

			getAllAccounts(user._id)
				.then(res =>{
					if(res.data.accounts.length>0)
					setAccount(res.data.accounts[0])
	
					getAllTransactions()
						.then(res => {
							setTransactions(res.data.transactions.filter(transaction => transaction.owner._id === user._id))
						})
						.catch(err => {
							msgAlert({
								heading: 'Error getting Transactions',
								message: messages.indexTransactionsFailure,
								variant: 'danger'
							})
							setError(true)
						})
						
				})
				.catch(
					console.log('error fetching account')
				)
		
	},[])

	
	if(!user){
		return <LoadingScreen />
	}
	

	return (
		<div className="m-5">
			
			
			<Card>
			<Card.Header>
				<h2>My Wallet</h2>
            </Card.Header>
            	<Card.Body>
					
						
						{account?
							<Row>
								<Col>
									<h4>Savings: ${account.savings.toFixed(2)}</h4>
									<h4>Investments: ${account.investments.toFixed(2)}</h4>
								</Col>
								<Col>
									<PortfolioGraph />
								</Col>
							</Row>
							:
							<div>
								<h4>Create an account to stat trading</h4>
								<CreateAccount 
									user={user}
									setAccount = {setAccount}
								/>
							</div>

						}
						
						
					
				</Card.Body>
			</Card>
			<hr />
			<h4>All Transactions</h4>
			<TransactionsIndex 
				user={user}
				msgAlert={msgAlert}
				transactions={transactions}
			/>
		</div>
	)
}

export default Wallet
