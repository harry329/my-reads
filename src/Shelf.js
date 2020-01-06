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
    
    
    render() {
        console.log("I am coming from shelf")
        {console.log(this.props.bookList)}
        return(
            <a>
                <a>{this.props.heading}</a>
                <ol className="shelf-list">
                    {this.props.bookList.map((book) => (<li key={ book.title} className="shelf-list-item">
                        <img src={book.imageLinks.smallThumbnail} className="shelf-list-img"></img>
                        {book.title}
                        <button onClick={() => this.buttonClicked(book.title)}> clickMe </button>
                        {this.state.showMenu && this.state.booktitle === book.title && <button> I am clicked button </button>}

                    </li>))}
                </ol>
                
            </a>
        )
    }
}