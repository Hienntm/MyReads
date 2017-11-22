import React from 'react'
import {Link} from 'react-router-dom'
import ListBooks from './ListBooks'

const createReactClass = require('create-react-class')

const MainPage = createReactClass({
	render() {
		const {books, updateShelf} = this.props
		return (
			<div className="list-books">
				<div className="list-books-title">
					<h1>MyReads</h1>
				</div>
				<div className="list-books-content">
					<div className="bookshelf">
					  	<h2 className="bookshelf-title">Currently Reading</h2>
					  	<ListBooks updateShelf={updateShelf} books={books.filter(book => book.shelf === 'currentlyReading')}/>
					</div>
					<div className="bookshelf">
					  	<h2 className="bookshelf-title">Want to Read</h2>
					  	<ListBooks updateShelf={updateShelf} books={books.filter(book => book.shelf === 'wantToRead')}/> 
					</div>
					<div className="bookshelf">
					  	<h2 className="bookshelf-title">Read</h2>
					  	<ListBooks updateShelf={updateShelf} books={books.filter(book => book.shelf === 'read')}/>
					</div> 
				</div>
				<div className="open-search">
					<Link to="/search">Search a book</Link>
				</div>
			</div>
		)
	}
})

export default MainPage