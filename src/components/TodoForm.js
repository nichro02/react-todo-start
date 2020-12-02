//class components require line 2
import React, {Component} from 'react'
import shortid from 'shortid'

export class TodoForm extends Component {

    state = {
        text: ''
    }

    handleChange = event => {
        this.setState({
            //look for name value in the state object
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = event => {
        //stop page from refreshing
        event.preventDefault()

        this.props.addTodo({
            id: shortid.generate(),
            text: this.state.text,
            compete: false
        })
    }

    render() {
        //console.log(this.state.text)
        return(
            <form onSubmit={this.handleSubmit}>
                <input name="text" value={this.state.text} onChange={this.handleChange} placeholder="todo..." />
                <button onSubmit={this.handleSubmit}>Add Todo</button>
            </form>
        )
    }
}

export default TodoForm