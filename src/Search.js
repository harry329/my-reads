import React, {Component} from "react";
import * as BookApi from './BooksAPI'
import Shelf from "./Shelf";

export default class Search extends Component{


    constructor(props) {
        super(props)
        this.state = {text : '',books : []}

    }

    searched_books = {books : []}
     searchBook = async (value) => {
        console.log(value)
        this.setState(
            {text : value}
        )
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        let books = await BookApi.search(this.state.text)
        this.searched_books.books = books
        console.log(this.searched_books.books)
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

    render() {
        console.log(" i am in render")
        console.log(this.props.books)
        return(
            <div>
                <button>Back</button>
                <input value={this.state.text} type='text' placeholder='Search books' onChange={(event) => this.searchBook(event.target.value)}/>
                { this.getBooksLength() !== 0 && <Shelf heading = "Search books" bookList = {this.getBooks()}> </Shelf>}
            </div>
        )
    }


}