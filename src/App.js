// import React, { Component, Fragment } from 'react'
import React, { useState, Fragment, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import { getAllTransactions } from "./api/transaction"

// import AuthenticatedRoute from './components/shared/AuthenticatedRoute'
import AutoDismissAlert from './components/shared/AutoDismissAlert/AutoDismissAlert'
import Header from './components/shared/Header'
import RequireAuth from './components/shared/RequireAuth'
import Home from './components/Home'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import ChangePassword from './components/auth/ChangePassword'
import StockIndex from './components/stocks/StockIndex'
import StockCreate from './components/stocks/StockCreate'
import StockShow from './components/stocks/StockShow'
import StockDelete from './components/stocks/StockDelete'
import Wallet from './components/Wallet'

const App = () => {

	const [user, setUser] = useState(null)
	const [transactions, setTransactions] = useState(null)
	const [msgAlerts, setMsgAlerts] = useState([])

  	useEffect(() => { 
		// access localStorage
		const loggedInUser = localStorage.getItem('user')
		// console.log('the loggedInUser', loggedInUser)

		if (loggedInUser) {
			// we need to parse our JSON string
			const foundUser = JSON.parse(loggedInUser)
			// console.log('foundUser', foundUser)
			// then set the user
			setUser(foundUser)
		}
		getAllTransactions()
            .then(res => {
                setTransactions(res.data.transactions)
            })
            .catch(err => {
                console.log('error getting transactions')
            })

	}, [])


	const clearUser = () => {
		// console.log('clear user ran')
		setUser(null)
		localStorage.removeItem('user')
	}

	const deleteAlert = (id) => {
		setMsgAlerts((prevState) => {
			return (prevState.filter((msg) => msg.id !== id) )
		})
	}

	const msgAlert = ({ heading, message, variant }) => {
		const id = uuid()
		setMsgAlerts(() => {
			return (
				[{ heading, message, variant, id }]
      )
		})
	}

		return (
			<Fragment>
				<Header user={user} />
				<Routes>
					<Route path='/' element={<Home msgAlert={msgAlert} user={user} />} />
					<Route
						path='/sign-up'
						element={<SignUp msgAlert={msgAlert} setUser={setUser} />}
					/>
					<Route
						path='/sign-in'
						element={<SignIn msgAlert={msgAlert} setUser={setUser} />}
					/>
					<Route
						path='/sign-out'
						element={
						<RequireAuth user={user}>
							<SignOut msgAlert={msgAlert} clearUser={clearUser} user={user} />
						</RequireAuth>
						}
					/>
					<Route
						path='/change-password'
						element={
						<RequireAuth user={user}>
							<ChangePassword msgAlert={msgAlert} user={user} />
						</RequireAuth>}
					/>
					<Route
						path='/create-stock'
						element={
						<RequireAuth user={user}>
							<StockCreate msgAlert={msgAlert} user={user} />
						</RequireAuth>}
					/>
					<Route
						path='/stocks'
						element={<StockIndex user={user} msgAlert={msgAlert} />}
					/>
					<Route
						path='/stocks/:id'
						element={
						<RequireAuth user={user}>
							<StockShow 
								msgAlert={msgAlert} 
								user={user}
								transactions={transactions} />
						</RequireAuth>}
					/>
					<Route
						path='/stocks/:id/delete-stock'
						element={
						<RequireAuth user={user}>
							<StockDelete msgAlert={msgAlert} user={user} />
						</RequireAuth>}
					/>
					<Route
						path='/wallet'
						element={<Wallet 
									user={user} 
									msgAlert={msgAlert} 
									transactions={transactions}
								/>}
					/>
				</Routes>
				{msgAlerts.map((msgAlert) => (
					<AutoDismissAlert
						key={msgAlert.id}
						heading={msgAlert.heading}
						variant={msgAlert.variant}
						message={msgAlert.message}
						id={msgAlert.id}
						deleteAlert={deleteAlert}
					/>
				))}
			</Fragment>
		)
}

export default App
