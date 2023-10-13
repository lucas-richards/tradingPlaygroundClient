import { useState,useEffect } from "react"
import TransactionsIndex from "./transactions/TransactionIndex"
import { Row, Col, Card, Button} from 'react-bootstrap'
import { getAllAccounts, createAccount } from "../api/account"
import LoadingScreen from "./shared/LoadingScreen"
import CreateAccount from "./accounts/CreateAccount"

const Wallet = (props) => {
	const {user, msgAlert} = props
	const [account,setAccount] = useState(null)

	
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
					<Card.Text>
						
					</Card.Text>
					<Row>
						<Col>
						{account?
							<div>
								<h4>Savings: ${account.savings}</h4>
								<h4>Investments: ${account.investments}</h4>
							</div>
							
							:
							<CreateAccount 
								user={user}
								setAccount = {setAccount}
							/>
						}
						</Col>
						<Col>
						<h4>Portfolio Graph </h4>
						
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
