import React from 'react'
//import React, { Component } from 'react'
//import { Link } from 'react-router-dom'
//import PropTypes from 'prop-types';
//import escapeRegExp from 'escape-string-regexp';
//import sortBy from 'sort-by';
//import * as BooksAPI from './BooksAPI'

const createReactClass = require('create-react-class');

const ListBooks = createReactClass({
							
	render() {
		const {books,onUpdateShelf,shelf} = this.props
		return (
                 <div className="bookshelf-books">
                    <ol className="books-grid">
                      {books.map(book => (
						  <li key={book.id}>
							<div className="book">
							  <div className="book-top">
								<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
								<div className="book-shelf-changer">
								  <select value={shelf} onChange={(e)=>onUpdateShelf(book,e.target.value)}>
									<option value={"none"} disabled>Move to...</option>
									<option value="currentlyReading">Currently Reading</option>
									<option value="wantToRead">Want to Read</option>
									<option value="read">Read</option>
									<option value="none">None</option>
								  </select>
								</div>
							  </div>
							  <div className="book-title">{book.title}</div>
							  <div className="book-authors">
								{book.authors.map(author => (<div key={author}>{author}</div>))}
							  </div>
							</div>
						  </li>
					  ))}
                    </ol>
                  </div>

		)
	}	
})

export default ListBooks;