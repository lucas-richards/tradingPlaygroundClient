import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
const linkStyle = {
    color: 'black',
    textDecoration: 'none'
}
const authenticatedOptions = (
	<>
		<Nav.Item className='m-2'>
			<Link to='stocks' style={linkStyle}>
				My Stocks
			</Link>
		</Nav.Item>
		<Nav.Item className='m-2'>
			<Link to='wallet' style={linkStyle}>
				My Wallet
			</Link>
		</Nav.Item>
		<Nav.Item className='m-2'>
			<Link to='create-stock' style={linkStyle}>
				Add Stock
			</Link>
		</Nav.Item>
		<Nav.Item className='m-2'>
			<Link to='change-password' style={linkStyle}>
				Change Password
			</Link>
		</Nav.Item>
		<Nav.Item className='m-2'>
			<Link to='sign-out' style={linkStyle}>
				Sign Out
			</Link>
		</Nav.Item>
	</>
)

const unauthenticatedOptions = (
	<>
        <Nav.Item className='m-2'>
		    <Link to='sign-up' style={linkStyle}>Sign Up</Link>
        </Nav.Item>
        <Nav.Item className='m-2'>
		    <Link to='sign-in' style={linkStyle}>Sign In</Link>
        </Nav.Item>
	</>
)

const alwaysOptions = (
	<>
		<Nav.Item className='m-2'>
			<Link to='/' style={linkStyle}>
				<span>Home</span>
			</Link>
		</Nav.Item>
	</>
)

const Header = ({ user }) => (
	<Navbar  bg='primary' variant='dark' expand='md'>
		<Navbar.Brand>
            <Link className='m-3' to='/' style={linkStyle}>
				<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 50 50">
					<path d="M 25.003906 2.3339844 C 24.825656 2.3339844 24.646781 2.3815625 24.488281 2.4765625 L 5.484375 13.896484 C 5.183375 14.077484 5 14.402906 5 14.753906 L 5 35.222656 C 5 35.571656 5.1805156 35.894172 5.4785156 36.076172 L 10.478516 39.128906 C 11.144516 39.535906 12 39.055391 12 38.275391 L 12 18.113281 L 25 10.173828 L 38 18.113281 L 38 38.314453 C 38 39.094453 38.853531 39.574922 39.519531 39.169922 L 44.519531 36.130859 C 44.818531 35.948859 45 35.625391 45 35.275391 L 45 14.753906 C 45 14.402906 44.816625 14.077484 44.515625 13.896484 L 25.517578 2.4765625 C 25.359078 2.3815625 25.182156 2.3339844 25.003906 2.3339844 z M 21.998047 17.175781 C 21.824234 17.175906 21.645016 17.222469 21.478516 17.324219 L 16.478516 20.378906 C 16.180516 20.560906 16 20.882469 16 21.230469 L 16 42.023438 C 16 42.374437 16.183375 42.699859 16.484375 42.880859 L 24.488281 47.689453 C 24.805281 47.880453 25.200578 47.879453 25.517578 47.689453 L 33.515625 42.882812 C 33.816625 42.701813 34 42.376391 34 42.025391 L 34 21.230469 C 34 20.882469 33.819484 20.559906 33.521484 20.378906 L 28.521484 17.324219 C 27.855484 16.917219 27 17.396734 27 18.177734 L 27 38.771484 L 25 39.994141 L 23 38.771484 L 23 18.177734 C 23 17.591984 22.519484 17.175406 21.998047 17.175781 z"></path>
				</svg>
            </Link>
        </Navbar.Brand>
		<Navbar.Toggle aria-controls='basic-navbar-nav' />
		<Navbar.Collapse id='basic-navbar-nav'>
			<Nav className='ml-auto'>
				{user && (
					<span className='navbar-text mr-2'>Welcome, {user.email}</span>
				)}
				{alwaysOptions}
				{user ? authenticatedOptions : unauthenticatedOptions}
			</Nav>
		</Navbar.Collapse>
	</Navbar>
)

export default Header
