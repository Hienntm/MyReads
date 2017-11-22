import React from 'react'

const createReactClass = require('create-react-class')

const Book = createReactClass({
	
	render() {
		const {book,shelf,updateShelf} = this.props
		
		return (
		  <div>
			<div className="book">
			  <div className="book-top">
				<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : 'http://via.placeholder.com/128x193?text=No%20Cover'})` }}></div>
				<div className="book-shelf-changer">
				  <select value={shelf} onChange={(e)=>updateShelf(book,e.target.value)}>
					<option value="move" disabled>Move to...</option>
					<option value="currentlyReading">Currently Reading</option>
					<option value="wantToRead">Want to Read</option>
					<option value="read">Read</option>
					<option value="none">None</option>
				  </select>
				</div>
			  </div>
			  <div className="book-title">{book.title}</div>
			  <div className="book-authors">
				{
				  book.authors && (
					  book.authors.map(author => (<div key={author}>{author}</div>))
				  )
				}
			  </div>
			</div>
		  </div>			
		)
	}
})

export default Book;