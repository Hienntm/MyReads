import React from 'react'
import Book from './Book'

const createReactClass = require('create-react-class');

const ListBooks = createReactClass({

	render() {
		const {books,updateShelf} = this.props
		
		return (
                 <div className="bookshelf-books">
                    <ol className="books-grid">
						{
							books.map(book => (
								<li key={book.id}>
									<Book updateShelf={updateShelf} book={book} shelf={book.shelf}/>
								</li>
						  	))
					  	}

                    </ol>
                  </div>

		)
	}	
})

export default ListBooks;