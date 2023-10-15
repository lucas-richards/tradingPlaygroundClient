import {createAccount} from '../../api/account'
import {Button} from 'react-bootstrap'

const CreateAccount = (props)=> {

    const {user, setAccount, msgAlert} = props

    const handleClick = ()=>{
		createAccount(user)
			.then(res=>{
				console.log('this is the response for creating account',res.data.account)
				setAccount(res.data.account)
			})
			.catch(err =>{
				msgAlert({
                    heading: 'Account Created with extra cash 😎!',
                    variant: 'success'
                })
			})
	}

    return (
        <Button onClick={handleClick}>
            Create Account
        </Button>
    )
}

export default CreateAccount