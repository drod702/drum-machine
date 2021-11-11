import React, { Component } from "react";
import "./index.css";
import drumpadData from "./drumpadData";



class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            displayText: 'Click a button or Press a key'
        }
        this.updateDisplay = this.updateDisplay.bind(this)
        this.clearDisplay = this.clearDisplay.bind(this)
    }

    updateDisplay(message, duration) {
        this.setState({
            displayText: message
        })
        setTimeout(()=>this.clearDisplay(), duration)
    }
    clearDisplay() {
        this.setState({
            displayText: ' '
        })
    }

    render() {
        return (
            <div id="container-sm myContainer" className="text-center">
                <div id="drum-machine">
                    <h1>A Simple Drum Machine</h1>
                    <h2>drod702</h2>
                    <Display displayText={this.state.displayText}/>
                    {drumpadData.map( drumpad =>
                        <Drumpad key={drumpad.id} drumpad={drumpad}
                        updateDisplay={this.updateDisplay}/>
                    )}
                </div>
            </div>
        )
    }
}

class Drumpad extends Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
        this.handleKeyDown = this.handleKeyDown.bind(this)
    }
    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown)
        window.focus()
    }
    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown)
    }
    handleClick = () => {
        this.audio.play()
        this.audio.currentTime = 0
        this.props.updateDisplay(this.props.drumpad.id, 2000)

    }

    handleKeyDown = (e) => {
        if(e.keyCode === this.props.drumpad.unicode) {
            this.audio.play()
            this.audio.currentTime = 0
            this.props.updateDisplay(this.props.drumpad.id, 2000)
        }
    }

    render() {

        return (
                <button
                    id={this.props.drumpad.id}
                    className="button drum-pad"
                    onClick={this.handleClick}
                    onKeyDown={this.handleKeyDown}>
                    {this.props.drumpad.innerText}
                        <audio
                            ref={ref => this.audio = ref}
                            id={this.props.drumpad.innerText}
                            className="clip"
                            src={this.props.drumpad.audioLink}>
                        </audio>
                </button>
        )
    }
}

class Display extends Component {
    render() {
        return (
            <div id="display" className="well">
                <h2>{this.props.displayText}</h2>
            </div>
        )
    }
}



export default App