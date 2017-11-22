import React from 'react'
import {Switch,Route} from 'react-router-dom'
import MainPage from './MainPage'
import SearchPage from './SearchPage'
import NoMatch from './NoMatch'
import * as BooksAPI from './BooksAPI'
import './App.css'


class BooksApp extends React.Component {
  constructor(props) {
	  super(props);
	  this.state = {
		  books : []
	  };
  }
  
  componentDidMount() {
	  
	  BooksAPI.getAll().then((books) => {
		  this.setState({ books: books })
	  })
  }
	
	updateShelf = (book, shelf) => {
		BooksAPI.update(book, shelf).then(() => {
			book.shelf = shelf
			this.setState(previousState => ({
				books: previousState.books.filter(b=> b.id !== book.id).concat([book])
			}))
		})
	}  
	
  render() {
	const {books} = this.state
	  
    return (
      <div className="app">
      	<Switch>
			<Route exact path="/" render={()=>(		
			    <MainPage updateShelf={this.updateShelf} books={books}/>
			 )} />

			<Route path="/search" render={()=>(
				<SearchPage updateShelf={this.updateShelf} books={books}/>
			 )} />
       
       		<Route render={()=>(
				<NoMatch />
			)} />
        </Switch>
      </div>
    )
  }
}

export default BooksApp
