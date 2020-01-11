import React, {Component} from "react";
import * as BookApi from './BooksAPI'
import Shelf from "./Shelf";
import {Link} from "react-router-dom";

export default class Search extends Component {

    constructor(props) {
        super(props)
        this.state = {text: '', update: false}
    }

    searched_books = {books: []}

    searchBook = async (value) => {
        console.log(value)
        this.setState(
            {text: value}
        )
        if (value !== undefined && value !== '') {
            let books = await BookApi.search(value)
            console.log("books")
            console.log(books)
            if (Array.isArray(books)) {
                for (const book of books) {
                    for (const readBooks of this.props.shelfedBooks) {
                        if (readBooks.title === book.title) {
                            book.shelf = readBooks.shelf
                            break;
                        }
                    }
                }
                this.searched_books.books = books
            }
        } else {
            this.searched_books.books = []
        }
        console.log(this.searched_books)

    }

    getBooksLength = () => {
        if (this.searched_books.books !== undefined) {
            console.log(this.searched_books.books.length)
            return this.searched_books.books.length;
        }
        return 0
    }

    getBooks = () => {
        return this.searched_books.books;
    }

    async submitSearch(e) {
        e.preventDefault()
    }

    render() {
        console.log(" i am in render")
        console.log(this.props.shelfedBooks)
        return (
            <div>
                <button><Link to="/"> Back </Link></button>
                <form onSubmit={(e) => this.submitSearch(e)}>
                    <input value={this.state.text} type='text' placeholder='Search books'
                           onChange={(event) => this.searchBook(event.target.value)}/>
                </form>
                {this.getBooksLength() !== 0 &&
                <Shelf heading="Search books" bookList={this.getBooks()} updateBook={this.props.updateBook}> </Shelf>}
            </div>
        )
    }


}