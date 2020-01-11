import React, {Component} from 'react';
import './MyReads.css';
import * as BooksAPI from './BooksAPI'
import Shelf from "./Shelf";
import {Link} from "react-router-dom";
import {Route} from 'react-router-dom';
import Search from "./Search";

class App extends Component {

    books = []

    constructor(props) {
        super(props);
        this.state = {
            update: false
        }
    }

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setBooks(books)
            this.setState({update: true})
        })
    }

    getBooks() {
        return this.books;
    }

    setBooks(books) {
        this.books = books
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(" I did update")
    }

    updateBook = (book) => {
        console.log("I am getting updated")
        console.log(book)
        BooksAPI.update(book, book.shelf).then(() => {
            BooksAPI.getAll().then((books) => {
                this.setBooks(books)
                this.setState({update: true})
            })
        })
    }

    getAllBookList() {
        const reading = this.getBooks().filter(book => book.shelf === "currentlyReading")
        const read = this.getBooks().filter(book => book.shelf === "read")
        const wantToRead = this.getBooks().filter(book => book.shelf === "wantToRead")
        return {reading: reading, read: read, wantToRead: wantToRead}
    }

    render() {
        const {reading, read, wantToRead} = this.getAllBookList();
        console.log("I am coming from render")
        console.log(reading)
        return (
            <div>
                <Route exact path='/' render={() => (
                    <div>
                        <div className="header">
                            MyReads
                        </div>
                        <Shelf heading="Currently Reading" bookList={reading} updateBook={this.updateBook}> </Shelf>
                        <Shelf heading="Read" bookList={read} updateBook={this.updateBook}> </Shelf>
                        <Shelf heading="Want To Read" bookList={wantToRead} updateBook={this.updateBook}> </Shelf>
                        <button className="search-box"><Link to="/search">Search Books</Link></button>
                    </div>
                )}/>
                <Route exact path='/search' render={() => (
                    <Search shelfedBooks={this.getBooks()} updateBook={this.updateBook}></Search>
                )}/>
            </div>
        )
    }
}

export default App;
