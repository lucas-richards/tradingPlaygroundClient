import { useState,useEffect } from "react"
import TransactionsIndex from "./transactions/TransactionIndex"
import { Row, Col, Card, Button} from 'react-bootstrap'
import { getAllAccounts } from "../api/account"

const Wallet = (props) => {
	const {user, msgAlert} = props
	const [account,setAccount] = useState(null)
	console.log('user id',user._id)
	useEffect(()=>{
		getAllAccounts(user._id)
		.then(res =>{
			if(res.data.accounts.length>0)
			setAccount(res.data.accounts[0])
				
		})
		.catch(
			console.log('error fetching account')
		)
	},[])
	
	

	return (
		<div className="m-5">
			
			
			<Card>
			<Card.Header>
				<h2>My Wallet</h2>
            </Card.Header>
            	<Card.Body>
					<Card.Text>
						
					</Card.Text>
					<Row>
						<Col>
						{account?
							<div>
								<p>Savings:${account.savings}</p>
								<p>Investments:${account.investments}</p>
							</div>
							
							:
							<Button>
								Create an Account
							</Button>
						}
						</Col>
						<Col>
						<h4>Savings account: </h4>
						<h4>Investments account: </h4>
						</Col>
					</Row>
				</Card.Body>
			</Card>
			<hr />
			<h4>All Transactions</h4>
			<TransactionsIndex 
			user={user}
			msgAlert={msgAlert}/>
		</div>
	)
}

export default Wallet
