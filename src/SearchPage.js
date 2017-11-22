import React from 'react'
import {Link} from 'react-router-dom'
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'


class SearchPage extends React.Component {
	
	state = {
		query: '',
		searchedBooks: []
	}
	
	updateQuery = (query) => (
		this.setState({query: query})
	)

	resetQuery = (query) => {
		this.setState({query: ''})
	}

	searchForBooks = (event) => {
		this.updateQuery(event.target.value)
	}
	
	render() {
		const {books, updateShelf} = this.props
		const {query, searchedBooks} = this.state
		if(query) {
			BooksAPI.search(query).then((searchedBooks) => {
				if(!searchedBooks.error) {
					searchedBooks.map(sb => {
						sb.shelf='none';
						for (let i=0;i<books.length;i++) {
							if(sb.id === books[i].id) {
								sb.shelf = books[i].shelf	
								break
							}
						}
					})
					this.setState({ searchedBooks: searchedBooks })
				}
			})

		}
		
		return (
          <div className="search-books">
              <div className="search-books-bar">
                  <Link to="/" className="close-search" >Close</Link>
              	  <div className="search-books-input-wrapper">
                  {
                  /*NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.*/
                  }
					  <input type="text" placeholder="Search by title or author" onChange={this.searchForBooks} />

                  </div>
              </div>
              <div className="search-books-results">

			      <ListBooks updateShelf={updateShelf} shelf='none' books={searchedBooks}/>
			           
              </div>
          </div>
		)
	}
}


export default SearchPage