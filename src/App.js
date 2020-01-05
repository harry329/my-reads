import React, {Component} from 'react';
import './MyReads.css';
import * as BooksAPI from './BooksAPI'
import Shelf from "./Shelf";

class App extends Component {
    state = {
        books: []
    }
    
  async componentDidMount() {
      this.updatedbooks =  await BooksAPI.getAll();
      this.setState({books: this.updatedbooks})
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
            <a>
              <a className="header">
                MyReads
              </a>
              <Shelf heading = "Currently Reading" bookList = {reading}> </Shelf>
              <Shelf heading = "Read" bookList = {read}> </Shelf>
              <Shelf heading = "Want To Read" bookList = {wantToRead}> </Shelf>
            </a>
        )
  }

}

export default App;
