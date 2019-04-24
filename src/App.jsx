import React from 'react';
import Timer from './components/Timer';
import TodoItem from './components/TodoItem';
import TodoInput from './components/TodoInput';
import ClearButton from './components/ClearButton';
import EmptyState from './components/EmptyState';

import './styles/App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.clearCompletedItems = this.clearCompletedItems.bind(this);
    this.startSession = this.startSession.bind(this);
    this.increaseSessionsCompleted = this.increaseSessionsCompleted.bind(this);
    this.toggleItemIsCompleted = this.toggleItemIsCompleted.bind(this);

    this.state = {
      items: [],
      nextItemId: 0,
      sessionIsRunning: false,
      itemIdRunning: null
    };
  }

  addItem(description) {
    const { nextItemId } = this.state;
    const newItem = {
      // TODO 2: initialize new item object
      id: nextItemId,
      description: description,
      sessionsCompleted: 0,
      isCompleted: false
    };
    this.setState((prevState => ({
      // TODO 2: append new items to list and increase nextItemId by 1
      items: [...prevState.items, newItem],
      nextItemId: prevState.nextItemId + 1
    })));
  }

  clearCompletedItems() {
    // TODO 6
    var newItems =  this.state.items.filter(item => item.isCompleted == false);
    this.setState({
      items: newItems
    })

  }

  increaseSessionsCompleted(itemId) {
    // TODO 5
    let newItems = [...this.state.items];
    for (var i in newItems) {
      if (itemId === newItems[i].id) {
        newItems[i].sessionsCompleted += 1;
        break;
      }
    }
    this.setState({
      items: newItems
    })

  }

  toggleItemIsCompleted(itemId) {
    // TODO 6
    let newItems = [...this.state.items];
    for (var i in newItems) {
      if (itemId === newItems[i].id) {
        if (newItems[i].isCompleted == true) {
          newItems[i].isCompleted = false;
        } else {
          newItems[i].isCompleted = true;
        }
        break;
      }
    }
    this.setState({
      items: newItems
    })
  }

  startSession(id) {
    this.setState({
      sessionIsRunning: true,
      itemIdRunning : id

    })

  }

  render() {
    const {
      items,
      sessionIsRunning,
      itemIdRunning,
      areItemsMarkedAsCompleted,
    } = this.state;
    const isEmpty = items.length === 0;
    return (
      <div className="flex-wrapper">
        <div className="container">
          <header>
            <h1 className="heading">Today</h1>
            <ClearButton onClick={this.clearCompletedItems} />
          </header>
          {sessionIsRunning&&
            <Timer
              mode="WORK"
              onSessionComplete={() => this.increaseSessionsCompleted(itemIdRunning)}
              autoPlays
              key = {itemIdRunning}
            /> 
          }
            <div className="items-container">
            { isEmpty? (<EmptyState />) :(items.map((item)=> 
              <TodoItem description = {item.description}
              sessionsCompleted = {item.sessionsCompleted}
              isCompleted={item.isCompleted}
              startSession={() => this.startSession(item.id)}
              toggleIsCompleted ={() =>this.toggleItemIsCompleted(item.id)}
              key = {item.id}/>
            ))}
            
            </div>
        </div>
        <footer>
          <TodoInput addItem={this.addItem} />
        </footer>
      </div>
    );
  }
}

export default App;
