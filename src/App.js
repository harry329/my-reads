import React, {Component} from 'react';
import './MyReads.css';
import * as BooksAPI from './BooksAPI'
import Shelf from "./Shelf";

class App extends Component {
    state = {
        books: [],
        update: false
    }
    
  async componentDidMount() {
      this.updatedbooks =  await BooksAPI.getAll();
      console.log(" component did mount")
      this.setState({books: this.updatedbooks})
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(" I did update")
  }

    updateBook = (book) => {
        console.log("I am getting updated")
        console.log(book)
        BooksAPI.update(book, book.shelf)
        this.setState({update : true})
  }

  getAllBookList() {
        const reading = this.state.books.filter( book => book.shelf === "currentlyReading")
        const read = this.state.books.filter( book => book.shelf === "read")
        const wantToRead = this.state.books.filter( book => book.shelf === "wantToRead")
        return {reading: reading, read: read, wantToRead: wantToRead}
  }
    render() {
        const {reading, read, wantToRead} = this.getAllBookList();
        console.log("I am coming from render")
        console.log(reading)
        return(
            <div>
              <div className="header">
                MyReads
              </div>
              <Shelf heading = "Currently Reading" bookList = {reading} updateBook = {this.updateBook}> </Shelf>
              <Shelf heading = "Read" bookList = {read} updateBook = {this.updateBook}> </Shelf>
              <Shelf heading = "Want To Read" bookList = {wantToRead} updateBook = {this.updateBook}> </Shelf>
            </div>
        )
  }

}

export default App;
