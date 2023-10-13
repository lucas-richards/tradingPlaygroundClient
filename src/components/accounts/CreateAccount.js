import {createAccount} from '../../api/account'
import {Button} from 'react-bootstrap'

const CreateAccount = (props)=> {

    const {user, setAccount} = props

    const handleClick = ()=>{
		createAccount(user)
			.then(res=>{
				console.log('this is the response for creating account',res.data.account)
				setAccount(res.data.account)
			})
			.catch(err =>{
				console.log('error creating account',err)
			})
	}

    return (
        <Button onClick={handleClick}>
            Create Account To Trade
        </Button>
    )
}

export default CreateAccount