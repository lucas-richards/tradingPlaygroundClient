

const Home = (props) => {

	const styleHome = {
		backgroundImage : 'url(investment.jpeg) ',
		backgroundRepeat : 'no-repeat',
		backgroundSize: 'cover',
		padding: '90px',
		height: '900px',
		color: 'white',
		
	}

	return (
		<div style={styleHome}>
			<h2>Trade with confidence on the world's leading social trading platform</h2>
			<p>
			Join millions who've already discovered smarter investing by automatically copying the leading traders in our community, or get copied yourself to earn a second income
			</p>
		</div>
	)
}

export default Home
