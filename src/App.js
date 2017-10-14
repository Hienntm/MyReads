import React from 'react'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'


class BooksApp extends React.Component {
  constructor(props) {
	  super(props);
	  this.state = {
		  showSearchPage: false, //list, search
		  books : [],
		  query: ''
	  };
  }
  
  componentDidMount() {
	  
	  BooksAPI.getAll().then((books) => {
		  this.setState({ books: books })
	  })
  }

  updateShelf = (book,shelf) => {
	  const updatedBooks = this.state.books;
	  const index = updatedBooks.indexOf(book);
	  updatedBooks[index].shelf = shelf;
	  this.setState({ books: updatedBooks});
	  
	  BooksAPI.update(book,shelf)
  }

  updateQuery = (query) => (
	this.setState({query: query.trim()})
  )

  resetQuery = (query) => {
	this.setState({query: ''})
  }
  
  render() {
	const {books,query} = this.state;
	let showingBooks;
	if(query) {
		const match = new RegExp(escapeRegExp(query), 'i');
		showingBooks = books.filter((book) => match.test(book.title)||match.test(book.authors));
	}else {
		showingBooks = books;
	}

	showingBooks.sort(sortBy('title'));	
	  
    return (
      <div className="app">
        {this.state.showSearchPage === true && (
          <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" value={query} onChange={(event) => this.updateQuery(event.target.value)} />

              </div>
            </div>
            <div className="search-books-results">
			  <ListBooks onUpdateShelf={this.updateShelf} shelf='' books={showingBooks}/>
            </div>
          </div>
        )}
		{this.state.showSearchPage === false && (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
             
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
				  <ListBooks onUpdateShelf={this.updateShelf} shelf='currentlyReading' books={this.state.books.filter(book => book.shelf === 'currentlyReading')}/>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
				  <ListBooks onUpdateShelf={this.updateShelf} shelf='wantToRead' books={this.state.books.filter(book => book.shelf === 'wantToRead')}/> 
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <ListBooks onUpdateShelf={this.updateShelf} shelf='read' books={this.state.books.filter(book => book.shelf === 'read')}/>
                </div>
              
            </div>
            <div className="open-search">
              
              <Link to="/search" onClick={() => this.setState({ showSearchPage: true })}>Search a book</Link>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
