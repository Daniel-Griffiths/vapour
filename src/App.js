import React, { Component } from 'react'
import Nav from './components/Nav'
import NavItem from './components/NavItem'
import NavButton from './components/NavButton'
import GameItem from './components/GameItem'
import GameList from './components/GameList'
import GameSearch from './components/GameSearch'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav>
          <NavItem>
            <GameSearch/>
          </NavItem>
          <NavItem>
            <NavButton>Test</NavButton>
          </NavItem>
          <NavItem>
            <NavButton>Test</NavButton>
          </NavItem>
          <NavItem>
            <NavButton>Test</NavButton>
          </NavItem>
        </Nav>
        <GameList>
          <GameItem>
            
          </GameItem>
        </GameList>
      </div>
    );
  }
}

export default App;
