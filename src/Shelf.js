import React , {Component} from 'react'
import './MyReads.css'

export default class Shelf extends Component {

    constructor(props) {
        super(props)
    }
    
    render() {
        console.log("I am coming from shelf")
        {console.log(this.props.bookList)}
        return(
            <a>
                <a>{this.props.heading}</a>
                <ol className="shelf-list">
                    {this.props.bookList.map((book) => (<li key={ book.title} className="shelf-list-item"> <img src={book.imageLinks.smallThumbnail} className="shelf-list-img"></img>{book.title}</li>))}
                </ol>
            </a>
        )
    }
}