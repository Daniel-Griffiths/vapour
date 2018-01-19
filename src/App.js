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
        <GameList games={
          [
            {
              name: 'Nier',
              image: 'http://cdn.edgecast.steamstatic.com/steam/apps/524220/header.jpg?t=1511792873'
            },
            {
              name: 'FF7',
              image: 'http://freepcgamesden.com/wp-content/uploads/2015/12/Final-Fantasy-VII-Steam-Free-Game-Full-Download.jpg'
            }
          ]
        }/>
      </div>
    );
  }
}

export default App;
