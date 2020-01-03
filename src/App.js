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

    render() {
    return(
        <a>
          <a className="header">
            MyReads
          </a>
          <Shelf heading = "Currently Reading" bookList = {this.state.books}> </Shelf>  
        </a>
    )
  }

}

export default App;
