import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './components/board/board.jsx'
import Modal from './components/modal/modal.jsx'
import Contestant from './components/contestant/contestant.jsx'
import Youtube from './components/youtube/youtube.jsx'
import Presenter from './components/presenter/presenter.jsx'
import Logo from './assets/numberwanglogo.png'
import JulieImg from './assets/julie.jpg'
import SimonImg from './assets/simon.jpg'
import pizza from './assets/pizza.jpg'
import poll from './assets/poll.jpg'
import doggo from './assets/doggo.jpg'
import catbox from './assets/catbox.jpg'
import closed from './assets/closed.jpg'





class App extends Component {


  constructor(props) {
    const PICS = [pizza, poll, doggo, catbox, closed]
    super(props)
    this.state = {
      youtube: true,
      numberwang: false,
      turn: "Julie",
      reRenderBoard: 0,
      roundLength: 0,
      turns: 0,
      roundTwo: false,
      roundTwoModal: false,
      rotateBoard: false,
      imgSrc: PICS[Math.round(Math.random() * 5)]
    }
    this.playTurn = this.playTurn.bind(this)
    this.start = this.start.bind(this)
    this.roundCheck = this.roundCheck.bind(this)
    this.rotateBoard = this.rotateBoard.bind(this)
  }

  start(){
    this.setState({youtube:false, turns: 0})
    this.determineRoundLength()
  }

  determineRoundLength() {
    let possibleRoundLengths = [3, 4, 4, 4, 5, 5, 6, 7, 8, 9, 9, 10]
    let roundLength = possibleRoundLengths[Math.round(Math.random() * 12)]
    this.state.roundLength = roundLength
  }

  roundCheck() {
    console.log(`Round length: ${this.state.roundLength}`)
    console.log(`turns: ${this.state.turns}`)
    if (this.state.turns < this.state.roundLength){
       return false
    } else {
      return true
    }
  }

  playTurn() {
    this.takeTurn()
    this.thatsNumberwang()
    if (this.roundCheck() && this.state.roundTwo === false) {
      setTimeout(() => this.displayModal('roundTwoModal'), 1000)
      setTimeout(() => this.setState({roundTwo: true}), 2000)
      setTimeout(() => this.rotateBoard(), 3000)
      setTimeout(() => this.start(), 6000)
    }
    if (this.roundCheck() && this.state.roundTwo === true) {
      console.log('That\'s the end of the game')
    }
  }

  reRenderBoard() {
    this.setState({reRenderBoard: this.state.reRenderBoard + 1})
  }

  rotateBoard () {
    this.setState({rotateBoard: true})
    setTimeout(() => this.setState({rotateBoard: false}), 3000)
  }

  isItNumberwang() {
    let isNumberwang = Math.round(Math.random())
    if (isNumberwang === 0) {
      this.reRenderBoard()
      return false
    } else {
      return true
    }
  }

  takeTurn() {
    this.state.turn === 'Julie' ? this.setState({turn: "Simon"}) : this.setState({turn: "Julie"})
    this.state.turns ++
  }

  thatsNumberwang() {
    let boolean = this.isItNumberwang()
    this.setState({numberwang: boolean})
    setTimeout(() => this.setState({numberwang: false}), 1000)
  }

  displayModal(modalName) {
    this.setState({[modalName]: true})
    setTimeout(() => this.setState({[modalName]: false}), 1000)
  }


  render() {
    return (
      <div className="App">
        <button onClick={this.rotateBoard}>TEST MY CODE</button>
        { this.state.youtube ? <Youtube start={this.start}/> : null }
        { this.state.roundTwoModal ? <Modal phrase="Round 2, Let's rotate the board!"/> : null }
        { this.state.numberwang ? <Modal phrase="That's Numberwang!"/> : null }
        <img src={Logo} className='logo animated rotateIn'/>
        <Board className='board' reRender={this.state.reRenderBoard} rotateBoard={this.state.rotateBoard} />
        {this.state.rotateBoard ? <img src={this.state.imgSrc} className="rotate-image"/> : null }
        <div className='contestant-1'>
          <Contestant
             src={JulieImg}
             name='Julie'
             playTurn={this.playTurn}
             />
        </div>
        <div className='contestant-2'>
          <Contestant
            src={SimonImg}
            name='Simon'
            playTurn={this.playTurn}
            />
        </div>
        <div className='presenter'>
          <Presenter turn={this.state.turn}/>
        </div>
      </div>
    );
  }
}

export default App;
