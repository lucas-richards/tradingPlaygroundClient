import TransactionsIndex from "./transactions/TransactionIndex"
import { Row, Col, Card} from 'react-bootstrap'

const Wallet = (props) => {
	const {user, msgAlert} = props
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
						my wallet info
						</Col>
						<Col>
						<h4>Savings account: $1,120</h4>
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
