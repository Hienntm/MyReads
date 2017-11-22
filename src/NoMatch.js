import React from 'react'

const createReactClass = require('create-react-class')

const NoMatch = createReactClass({
	render() {
		return (
			<div className='error404'> 
				404 error
			</div>
		)
	}
})

export default NoMatch