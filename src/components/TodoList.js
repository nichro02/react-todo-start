import React, { Component } from "react";
import axios from 'axios'

//Components
import Todo from './Todo'
import TodoForm from './TodoForm'

/*
  TodoMVC ✔️
  1. display todos
  2. add todo 
  3. cross off todo 
  4. show number of active todos
  5. delete todo
  <--- EXTRA CREDIT 👇 ---> 
  6. filter all/active/complete 
  7. delete all complete
    7.1 only show if atleast one is complete 
  8. button to toggle all on/off 

  https://appian-mock.herokuapp.com/todos
*/

class TodoList extends Component {
  
  state = {
    todos: []
  }

  //fetch data after component renders
  componentDidMount(){
    axios.get('https://appian-mock.herokuapp.com/todos').then((res) => {
      this.setState({
        todos: res.data
      })
    })
  }

  //function passed to grab add todo from child

  addTodo = (todo) => {
    console.log(todo)
    this.setState((state) => ({
      //add new todo to front
      todos: [todo, ...state.todos]
    }))

  }

  //function passed with an id to toggle compete between true/false

  toggleComplete = (id) => {
    this.setState((state) => ({
      todos: state.todos.map((todo) => {
        if(todo.id === id) {
          return {
            ...todo,
            compete: !todo.compete
          }
        } else {
          return todo
        }
      })
    }))
  }

  deleteTodo = (id) => {
    console.log(id)
    this.setState((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id)
    }))
  }

  render() {
    return <div>
      <TodoForm addTodo={this.addTodo}/>
      {this.state.todos.map(todo => (
        <Todo key={todo.id} text={todo.text} compete={todo.compete} toggleComplete={() => this.toggleComplete(todo.id)} deleteTodo={() => this.deleteTodo(todo.id)}/>
      ))}
      <div>
        todos left: {this.state.todos.filter((todo) => !todo.compete).length}
      </div>
    </div>;
  }
}

export default TodoList;
