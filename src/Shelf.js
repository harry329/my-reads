import React , {Component} from 'react'
import './MyReads.css'

export default class Shelf extends Component {

    constructor(props) {
        super(props)
        this.state = {showMenu: false}
    }
    
    buttonClicked = (booktitle) => {
        console.log("button getting clicked ")
        this.setState({showMenu : true, booktitle: booktitle})
        
    }

    bookShelfChanged = (book, e) => {
        console.log("I am getting changed")
        if(e.target.value !== "None") {
            book.shelf = e.target.value
            this.props.updateBook(book)
            console.log("I am not none")
        }
        console.log(book)
        console.log(e.target.value)
        this.setState({showMenu: false})
    }

    
    
    render() {
        console.log("I am coming from shelf")
        console.log(this.props.bookList)
        if(this.props !== undefined && this.props.bookList !== undefined && Array.isArray(this.props.bookList)) {
        return(

            <div>
                <div>{this.props.heading}</div>
                <ol className="shelf-list">
                    {this.props.bookList.map((book) => (book.imageLinks.smallThumbnail!== undefined && <li key={ book.title} className="shelf-list-item">
                        <img src={book.imageLinks.smallThumbnail} className="shelf-list-img" alt="books cover"></img>
                        {book.title}
                        <button onClick={() => this.buttonClicked(book.title)}> clickMe </button>
                        {this.state.showMenu && this.state.booktitle === book.title &&
                            <label>
                                Status of your book:
                                <select value={book.shelf} onChange={(e) => this.bookShelfChanged(book, e)}>
                                    <option value = "currentlyReading">Currently Reading</option>
                                    <option value = "read">Read</option>
                                    <option value = "wantToRead">Want To Read</option>
                                    <option>None</option>

                                </select>
                            </label>
                        }

                    </li>))}
                </ol>
                
            </div>
        )} else {
            return (
                <div> Nothing found for your search</div>
            )
        }
    }
}